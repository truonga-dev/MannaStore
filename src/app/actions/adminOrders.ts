"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { sendOrderStatusEmail } from "@/lib/email";

const POINTS_PER_VND = 10000; // 10,000 VND = 1 point

export async function updateOrderStatus(orderId: string, newStatus: string) {
  try {
    // Auth check — chỉ ADMIN và STAFF được cập nhật
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return { error: "Vui lòng đăng nhập." };
    }
    const role = (session.user as any).role;
    if (role !== "ADMIN" && role !== "STAFF") {
      return { error: "Bạn không có quyền cập nhật đơn hàng." };
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { 
        items: { include: { variant: true } },
        user: true 
      }
    });

    if (!order) return { error: "Không tìm thấy đơn hàng." };

    const previousStatus = order.status;

    // Không làm gì nếu status không đổi
    if (previousStatus === newStatus) {
      return { success: true };
    }

    await prisma.$transaction(async (tx) => {
      // 1. Update the order status
      await tx.order.update({
        where: { id: orderId },
        data: { status: newStatus },
      });

      // ================================================================
      // 2. COMPLETED: Award loyalty points to the customer
      // ================================================================
      if (newStatus === "COMPLETED" && previousStatus !== "COMPLETED" && order.userId) {
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

          await tx.order.update({
            where: { id: orderId },
            data: { pointsEarned },
          });
        }
      }

      // ================================================================
      // 3. CANCELLED: Refund points + Restore inventory
      // ================================================================
      if (newStatus === "CANCELLED" && previousStatus !== "CANCELLED" && order.userId) {
        // 3a. Refund points that customer SPENT on this order
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

        // 3b. Claw back earned points if order was previously COMPLETED
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

        // 3c. Restore inventory (từ order.ts, logic bị thiếu ở phiên bản cũ)
        for (const item of order.items) {
          if (item.variantId) {
            await tx.productVariant.update({
              where: { id: item.variantId },
              data: { stockQuantity: { increment: item.quantity } },
            });
          }
        }
      }
    });

    revalidatePath("/admin/orders");
    revalidatePath("/thong-tin");
    
    // Gửi email thông báo trạng thái đơn hàng
    const customerEmail = (order as any).customerEmail || order.user?.email;
    if (customerEmail) {
      sendOrderStatusEmail({
        to: customerEmail,
        customerName: order.shippingName || order.user?.name || "Quý khách",
        orderCode: order.orderCode || order.id.slice(-8).toUpperCase(),
        status: newStatus,
        totalAmount: order.totalAmount,
      });
    }

    return { success: true };
  } catch (error) {
    console.error("updateOrderStatus error:", error);
    return { error: "Lỗi cập nhật trạng thái đơn hàng." };
  }
}
