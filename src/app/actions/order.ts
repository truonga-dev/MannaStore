"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { z } from "zod";
import { sendOrderConfirmationEmail } from "@/lib/email";
import { getStoreSettings } from "@/app/actions/settings";

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

    const settings = await getStoreSettings();
    let shippingFee = settings.baseShippingFee;
    if (settings.freeShippingThreshold > 0 && subtotal >= settings.freeShippingThreshold) {
      shippingFee = 0;
    }

    let couponDiscountAmount = 0;

    if (data.couponCode) {
      const coupon = await prisma.coupon.findUnique({ where: { code: data.couponCode } });
      if (coupon && coupon.isActive && (!coupon.maxUses || coupon.currentUses < coupon.maxUses)) {
        if (!coupon.minOrderValue || subtotal >= coupon.minOrderValue) {
          const discountableAmount = subtotal + shippingFee;
          if (coupon.discountPercentage) {
            couponDiscountAmount = Math.floor(discountableAmount * (coupon.discountPercentage / 100));
            if (coupon.discountAmount && couponDiscountAmount > coupon.discountAmount) {
              couponDiscountAmount = coupon.discountAmount;
            }
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

    const totalDiscountAmount = couponDiscountAmount + pointsDiscountAmount;
    const totalAmount = Math.max(0, subtotal + shippingFee - totalDiscountAmount);

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
e x p o r t   a s y n c   f u n c t i o n   d e l e t e O r d e r ( o r d e r I d :   s t r i n g )   { 
     t r y   { 
         c o n s t   s e s s i o n   =   a w a i t   g e t S e r v e r S e s s i o n ( a u t h O p t i o n s ) ; 
         i f   ( ! s e s s i o n )   { 
             r e t u r n   {   s u c c e s s :   f a l s e ,   e r r o r :   ' U n a u t h o r i z e d '   } ; 
         } 
 
         c o n s t   o r d e r   =   a w a i t   p r i s m a . o r d e r . f i n d U n i q u e ( { 
             w h e r e :   {   i d :   o r d e r I d   } , 
             i n c l u d e :   {   i t e m s :   t r u e   } , 
         } ) ; 
 
         i f   ( ! o r d e r )   { 
             r e t u r n   {   s u c c e s s :   f a l s e ,   e r r o r :   ' O r d e r   n o t   f o u n d '   } ; 
         } 
 
         / /   R o l e   c h e c k :   O n l y   A D M I N / S T A F F   c a n   d e l e t e   a n y   o r d e r ,   U S E R   c a n   o n l y   d e l e t e   t h e i r   o w n 
         c o n s t   r o l e   =   ( s e s s i o n . u s e r   a s   a n y ) . r o l e ; 
         i f   ( r o l e   ! = =   ' A D M I N '   & &   r o l e   ! = =   ' S T A F F '   & &   o r d e r . u s e r I d   ! = =   ( s e s s i o n . u s e r   a s   a n y ) . i d )   { 
             r e t u r n   {   s u c c e s s :   f a l s e ,   e r r o r :   ' U n a u t h o r i z e d '   } ; 
         } 
 
         / /   A l s o   m a y b e   o n l y   a l l o w   d e l e t i n g   i f   C A N C E L L E D   o r   P E N D I N G   f o r   u s e r s ,   b u t   a d m i n   c a n   d e l e t e   a n y t h i n g ? 
         / /   U s e r   r e q u e s t e d   ' d e l e t e   o r d e r   h i s t o r y ' ,   s o   t h e y   s h o u l d   b e   a b l e   t o   d e l e t e   i t   f o r   c l e a n u p . 
 
         a w a i t   p r i s m a . o r d e r . d e l e t e ( { 
             w h e r e :   {   i d :   o r d e r I d   } 
         } ) ; 
 
         r e v a l i d a t e P a t h ( ' / a d m i n / o r d e r s ' ) ; 
         r e v a l i d a t e P a t h ( ' / t h o n g - t i n ' ) ; 
         r e t u r n   {   s u c c e s s :   t r u e   } ; 
     }   c a t c h   ( e r r o r )   { 
         c o n s o l e . e r r o r ( ' E r r o r   d e l e t i n g   o r d e r : ' ,   e r r o r ) ; 
         r e t u r n   {   s u c c e s s :   f a l s e ,   e r r o r :   ' F a i l e d   t o   d e l e t e   o r d e r '   } ; 
     } 
 }  
 