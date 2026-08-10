"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { z } from "zod";
import { sendOrderConfirmationEmail } from "@/lib/email";

import { headers } from "next/headers";

const schema = z.object({
  customerName: z.string().min(1, "Vui lòng nhập tên người nhận"),
  customerPhone: z.string().min(1, "Vui lòng nhập số điện thoại"),
  customerEmail: z.union([z.string().email(), z.string().max(0), z.null(), z.undefined()]).optional(),
  shippingAddress: z.string().min(1, "Vui lòng nhập địa chỉ"),
  notes: z.string().optional(),
  paymentMethod: z.string(),
  items: z.array(z.object({
    productId: z.string(),
    variantId: z.string(),
    quantity: z.number().min(1),
  })).min(1, "Giỏ hàng trống"),
  couponCode: z.string().optional().nullable(),
  pointsToUse: z.number().min(0).optional().default(0),
  shippingFee: z.number().min(0).optional().default(0),
});

export async function createOrder(orderData: any) {
  try {
    const data = schema.parse(orderData);
    
    // --- RATE LIMITING ---
    const ip = (await headers()).get("x-forwarded-for") || "unknown";
    if (ip !== "unknown") {
      const fiveMinsAgo = new Date(Date.now() - 5 * 60 * 1000);
      const recentOrders = await prisma.rateLimit.count({
        where: { ip, action: "CREATE_ORDER", createdAt: { gte: fiveMinsAgo } }
      });
      if (recentOrders >= 3) {
        return { success: false, error: "Bạn đã tạo quá nhiều đơn hàng. Vui lòng thử lại sau 5 phút." };
      }
      await prisma.rateLimit.create({ data: { ip, action: "CREATE_ORDER" } });
    }
    // -----------------------

    const session = await getServerSession(authOptions);
    let userId = null;
    let user = null;

    if (session?.user?.email) {
      user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });
      if (user) {
        userId = user.id;
      }
    }

    if (data.pointsToUse > 0 && !userId) {
      return { success: false, error: "Vui lòng đăng nhập để sử dụng điểm." };
    }

    // --- SECURE PRICE CALCULATION ---
    let subtotal = 0;
    let validatedItems: any[] = [];
    for (const item of data.items) {
      const variant = await prisma.productVariant.findUnique({ where: { id: item.variantId } });
      if (!variant) return { success: false, error: "Sản phẩm không tồn tại." };
      subtotal += variant.price * item.quantity;
      validatedItems.push({ ...item, price: variant.price });
    }
    // --------------------------------

    let couponDiscountAmount = 0;

    if (data.couponCode) {
      const coupon = await prisma.coupon.findUnique({ where: { code: data.couponCode } });
      if (coupon && coupon.isActive && (!coupon.maxUses || coupon.currentUses < coupon.maxUses)) {
        if (!coupon.minOrderValue || subtotal >= coupon.minOrderValue) {
          if (coupon.discountPercentage) {
            couponDiscountAmount = subtotal * (coupon.discountPercentage / 100);
          } else if (coupon.discountAmount) {
            couponDiscountAmount = coupon.discountAmount;
          }
        }
      }
    }

    let pointsDiscountAmount = 0;
    if (data.pointsToUse > 0) {
      if (!user || user.points < data.pointsToUse) {
        return { success: false, error: "Số điểm không hợp lệ hoặc không đủ." };
      }
      // 1 point = 1,000 VND
      pointsDiscountAmount = data.pointsToUse * 1000;
    }

    const shippingFee = data.shippingFee || 0;
    const totalDiscountAmount = couponDiscountAmount + pointsDiscountAmount;
    const totalAmount = Math.max(0, subtotal - totalDiscountAmount) + shippingFee;

    // Unique order code: MN + YYMMDD + auto-increment count of that day
    const today = new Date();
    const yy = String(today.getFullYear()).slice(2);
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const datePrefix = `MN${yy}${mm}${dd}`;
    
    // Count orders today to generate sequential number robustly
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    
    const lastOrder = await prisma.order.findFirst({
      where: { createdAt: { gte: startOfDay } },
      orderBy: { orderCode: 'desc' }
    });

    let nextSeq = 1;
    if (lastOrder && lastOrder.orderCode) {
      const seqStr = lastOrder.orderCode.slice(-3);
      const seq = parseInt(seqStr, 10);
      if (!isNaN(seq)) {
        nextSeq = seq + 1;
      }
    }
    const orderCode = `${datePrefix}${String(nextSeq).padStart(3, '0')}`;

    // Use transaction to ensure data consistency
    const result = await prisma.$transaction(async (tx) => {
      // 1. Check stock and decrement
      for (const item of validatedItems) {
        const variant = await tx.productVariant.findUnique({
          where: { id: item.variantId },
          include: { product: true }
        });
        
        if (!variant) {
          throw new Error(`Không tìm thấy sản phẩm phân loại ID: ${item.variantId}`);
        }
        
        if (variant.stockQuantity < item.quantity) {
          throw new Error(`Sản phẩm ${variant.product.name} (${variant.color} - ${variant.size}) chỉ còn ${variant.stockQuantity} sản phẩm trong kho.`);
        }

        await tx.productVariant.update({
          where: { id: item.variantId },
          data: { stockQuantity: { decrement: item.quantity } }
        });
      }

      // 2. Create the order
      const order = await tx.order.create({
        data: {
          orderCode,
          userId,
          shippingName: data.customerName,
          shippingPhone: data.customerPhone,
          shippingAddress: data.shippingAddress,
          totalAmount: totalAmount,
          status: "PENDING",
          paymentMethod: data.paymentMethod,
          couponCode: data.couponCode,
          discountAmount: totalDiscountAmount,
          pointsUsed: data.pointsToUse,
          items: {
            create: validatedItems.map((item) => ({
              quantity: item.quantity,
              priceAtTime: item.price,
              variant: { connect: { id: item.variantId } },
            })),
          },
        },
      });

      if (data.pointsToUse > 0 && userId) {
        await tx.user.update({
          where: { id: userId },
          data: { 
            points: { decrement: data.pointsToUse },
            pointsUpdatedAt: new Date(),
            pointTransactions: {
              create: {
                orderId: order.id,
                amount: -data.pointsToUse,
                type: 'SPEND',
                description: `Sử dụng điểm cho thanh toán đơn hàng ${orderCode}`,
              }
            }
          }
        });
      }

      if (data.couponCode) {
        await tx.coupon.update({
          where: { code: data.couponCode },
          data: { currentUses: { increment: 1 } }
        });
      }

      return order;
    });
    
    revalidatePath("/admin");
    revalidatePath("/thong-tin");

    // Send order confirmation email (non-blocking)
    const emailAddress = data.customerEmail || user?.email;
    if (emailAddress) {
      const orderItems = await prisma.orderItem.findMany({
        where: { orderId: result.id },
        include: { variant: { include: { product: true } } }
      });
      sendOrderConfirmationEmail({
        to: emailAddress,
        customerName: data.customerName,
        orderCode,
        totalAmount,
        items: orderItems.map(i => ({
          name: i.variant.product.name,
          quantity: i.quantity,
          price: i.priceAtTime,
          size: i.variant.size,
          color: i.variant.color,
        })),
        shippingAddress: data.shippingAddress,
        paymentMethod: data.paymentMethod,
      });
    }

    return { success: true, orderId: result.id, orderCode };
  } catch (error: any) {
    console.error("Error creating order:", JSON.stringify(error?.issues || error, null, 2), error);
    const zodMessage = error?.issues?.[0]?.message;
    const dbMessage = error?.message ? `(Lỗi HT: ${error.message.substring(0, 50)}...)` : "";
    return { success: false, error: zodMessage || `Không thể tạo đơn hàng. Vui lòng thử lại. ${dbMessage}` };
  }
}

export async function updateOrderStatus(orderId: string, status: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== 'ADMIN') {
      return { success: false, error: "Unauthorized" };
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true, user: true }
    });

    if (!order) return { success: false, error: "Order not found" };

    const result = await prisma.$transaction(async (tx) => {
      const updatedOrder = await tx.order.update({
        where: { id: orderId },
        data: { status }
      });

      // If status changed to COMPLETED, add points to user if not already earned
      if (status === 'COMPLETED' && order.status !== 'COMPLETED' && order.userId && order.pointsEarned === 0) {
        // 100,000 VND = 10 points
        const earnedPoints = Math.floor(order.totalAmount / 100000) * 10;
        
        if (earnedPoints > 0) {
          await tx.order.update({
            where: { id: orderId },
            data: { pointsEarned: earnedPoints }
          });

          await tx.user.update({
            where: { id: order.userId },
            data: { 
              points: { increment: earnedPoints },
              pointsUpdatedAt: new Date(),
              pointTransactions: {
                create: {
                  orderId: order.id,
                  amount: earnedPoints,
                  type: 'EARN',
                  description: `Hoàn thành đơn hàng ${order.orderCode}`
                }
              }
            }
          });
        }
      }

      // If CANCELLED and was not CANCELLED before
      if (status === 'CANCELLED' && order.status !== 'CANCELLED') {
        // 1. Return used points
        if (order.userId && order.pointsUsed > 0) {
          await tx.user.update({
            where: { id: order.userId },
            data: {
              points: { increment: order.pointsUsed },
              pointsUpdatedAt: new Date(),
              pointTransactions: {
                create: {
                  orderId: order.id,
                  amount: order.pointsUsed,
                  type: 'REFUND',
                  description: `Hoàn điểm do hủy đơn hàng ${order.orderCode}`
                }
              }
            }
          });
        }
        
        // 2. Restore inventory
        for (const item of order.items) {
          if (item.variantId) {
            await tx.productVariant.update({
              where: { id: item.variantId },
              data: { stockQuantity: { increment: item.quantity } }
            });
          }
        }
      }

      return updatedOrder;
    });

    revalidatePath("/admin/orders");
    return { success: true, order: result };
  } catch (error) {
    console.error("Error updating order status:", error);
    return { success: false, error: "Failed to update order status" };
  }
}
