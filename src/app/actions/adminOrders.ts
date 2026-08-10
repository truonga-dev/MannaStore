"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const POINTS_PER_VND = 10000; // 10,000 VND = 1 point

export async function updateOrderStatus(orderId: string, newStatus: string) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: { include: { variant: true } } }
    });

    if (!order) return { error: "Không tìm thấy đơn hàng." };

    const previousStatus = order.status;

    await prisma.$transaction(async (tx) => {
      // 1. Update the order status
      await tx.order.update({
        where: { id: orderId },
        data: { status: newStatus },
      });

      // ================================================================
      // 2. COMPLETED: Award loyalty points to the customer
      // Only award if: (a) previous status was NOT completed, (b) user exists
      // ================================================================
      if (newStatus === "COMPLETED" && previousStatus !== "COMPLETED" && order.userId) {
        // Calculate points earned: totalAmount / POINTS_PER_VND
        const pointsEarned = Math.floor(order.totalAmount / POINTS_PER_VND);

        if (pointsEarned > 0) {
          await tx.user.update({
            where: { id: order.userId },
            data: {
              points: { increment: pointsEarned },
              pointsUpdatedAt: new Date(),
              pointTransactions: {
                create: {
                  orderId: order.id,
                  amount: pointsEarned,
                  type: "EARN",
                  description: `Tích điểm từ đơn hàng ${order.orderCode || orderId.slice(-8).toUpperCase()} (${order.totalAmount.toLocaleString("vi-VN")}đ → +${pointsEarned} điểm)`,
                },
              },
            },
          });

          // Update pointsEarned on the order for record-keeping
          await tx.order.update({
            where: { id: orderId },
            data: { pointsEarned },
          });
        }
      }

      // ================================================================
      // 3. CANCELLED: Refund points that were SPENT on this order
      // ================================================================
      if (newStatus === "CANCELLED" && previousStatus !== "CANCELLED" && order.userId) {
        // 3a. Refund pointsUsed if customer had spent points on this order
        if (order.pointsUsed > 0) {
          await tx.user.update({
            where: { id: order.userId },
            data: {
              points: { increment: order.pointsUsed },
              pointsUpdatedAt: new Date(),
              pointTransactions: {
                create: {
                  orderId: order.id,
                  amount: order.pointsUsed,
                  type: "REFUND",
                  description: `Hoàn điểm do hủy đơn hàng ${order.orderCode || orderId.slice(-8).toUpperCase()}`,
                },
              },
            },
          });
        }

        // 3b. If order was previously COMPLETED, claw back the earned points
        if (previousStatus === "COMPLETED" && order.pointsEarned > 0) {
          await tx.user.update({
            where: { id: order.userId },
            data: {
              points: { decrement: order.pointsEarned },
              pointsUpdatedAt: new Date(),
              pointTransactions: {
                create: {
                  orderId: order.id,
                  amount: -order.pointsEarned,
                  type: "REFUND",
                  description: `Thu hồi điểm do hủy đơn hàng đã hoàn thành ${order.orderCode || orderId.slice(-8).toUpperCase()}`,
                },
              },
            },
          });
        }
      }
    });

    revalidatePath("/admin/orders");
    revalidatePath("/thong-tin");
    return { success: true };
  } catch (error) {
    console.error("updateOrderStatus error:", error);
    return { error: "Lỗi cập nhật trạng thái đơn hàng." };
  }
}
