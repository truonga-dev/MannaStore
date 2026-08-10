"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function updateOrderStatus(orderId: string, newStatus: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== "ADMIN") {
      return { success: false, error: "Unauthorized" };
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId }
    });

    if (!order) {
      return { success: false, error: "Order not found" };
    }

    // Skip logic if status isn't changing
    if (order.status === newStatus) {
      return { success: true };
    }

    // 1. EARN POINTS logic (when moving to COMPLETED)
    if (newStatus === "COMPLETED" && order.userId) {
      // Calculate points (1 point per 10,000 VND)
      const pointsToEarn = Math.floor(order.totalAmount / 10000);
      
      if (pointsToEarn > 0) {
        await prisma.$transaction([
          prisma.order.update({
            where: { id: orderId },
            data: { 
              status: newStatus,
              pointsEarned: pointsToEarn 
            }
          }),
          prisma.user.update({
            where: { id: order.userId },
            data: {
              points: { increment: pointsToEarn },
              pointsUpdatedAt: new Date(),
              pointTransactions: {
                create: {
                  orderId: order.id,
                  amount: pointsToEarn,
                  type: 'EARN',
                  description: `Cộng điểm từ đơn hàng ${order.orderCode || order.id}`
                }
              }
            }
          })
        ]);
        revalidatePath("/admin");
        return { success: true };
      }
    }

    // 2. REFUND POINTS logic (when moving to REFUNDED)
    if (newStatus === "REFUNDED" && order.userId && order.pointsEarned > 0) {
      // We only deduct points if they were previously earned
      // Note: we just subtract the points, it might go negative which is acceptable in some systems, 
      // or we floor it at 0 if preferred. Here we just decrement it.
      await prisma.$transaction([
        prisma.order.update({
          where: { id: orderId },
          data: { status: newStatus }
        }),
        prisma.user.update({
          where: { id: order.userId },
          data: {
            points: { decrement: order.pointsEarned },
            pointsUpdatedAt: new Date(),
            pointTransactions: {
              create: {
                orderId: order.id,
                amount: -order.pointsEarned,
                type: 'REFUND',
                description: `Thu hồi điểm do hoàn trả đơn hàng ${order.orderCode || order.id}`
              }
            }
          }
        })
      ]);
      revalidatePath("/admin");
      return { success: true };
    }

    // 3. Normal status update without points logic
    await prisma.order.update({
      where: { id: orderId },
      data: { status: newStatus }
    });

    revalidatePath("/admin");
    return { success: true };

  } catch (error) {
    console.error("Error updating order status:", error);
    return { success: false, error: "Failed to update order status" };
  }
}
