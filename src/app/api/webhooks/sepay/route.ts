import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const POINTS_PER_VND = 10000; // 10,000 VND = 1 point (thống nhất với adminOrders.ts)

export async function POST(request: Request) {
  try {
    // 1. Verify API Key — từ chối nếu chưa cấu hình
    const authHeader = request.headers.get("Authorization");
    const expectedApiKey = process.env.SEPAY_API_KEY;
    
    if (!expectedApiKey) {
      console.error("SePay Webhook: SEPAY_API_KEY chưa được cấu hình");
      return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
    }

    // SePay gửi `Authorization: Apikey <your_api_key>` hoặc `Bearer <your_api_key>`
    const apiKeyFromHeader = authHeader
      ?.replace(/^(Apikey|Bearer)\s+/i, "")
      ?.trim();

    if (!apiKeyFromHeader || apiKeyFromHeader !== expectedApiKey) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const { content, transferType, transferAmount, id: transactionId } = body;

    if (transferType !== "in") {
      return NextResponse.json({ message: "Ignored, not incoming transfer" });
    }

    // Validate dữ liệu đầu vào
    if (typeof content !== "string" || typeof transferAmount !== "number") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    // 2. Extract orderCode from content
    const match = content.match(/MN[A-Z0-9]{4,15}/i);
    if (!match) {
      return NextResponse.json({ message: "No order code found in content" });
    }

    const orderCode = match[0].toUpperCase();

    // 3. Find Order — dùng transaction để đảm bảo idempotency
    const result = await prisma.$transaction(async (tx) => {
      const order = await tx.order.findUnique({
        where: { orderCode },
        include: { user: true },
      });

      if (!order) {
        return { status: "not_found", message: "Order not found" };
      }

      // Idempotency: nếu đã completed, bỏ qua
      if (order.status === "COMPLETED") {
        return { status: "already_completed", message: "Order already completed" };
      }

      // 4. Verify Amount
      if (transferAmount < order.totalAmount) {
        return { status: "insufficient", message: "Transfer amount is less than total amount" };
      }

      // 5. Update order status + cộng điểm trong cùng 1 transaction
      const pointsEarned = Math.floor(order.totalAmount / POINTS_PER_VND);

      await tx.order.update({
        where: { id: order.id },
        data: {
          status: "COMPLETED",
          pointsEarned: pointsEarned > 0 ? pointsEarned : 0,
        },
      });

      // Cộng điểm nếu là user đã đăng ký
      if (order.userId && pointsEarned > 0) {
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
                description: `Thanh toán đơn hàng ${orderCode} (+${pointsEarned} điểm)`,
              },
            },
          },
        });
      }

      return { status: "success", message: "Order updated successfully" };
    });

    return NextResponse.json({ message: result.message });

  } catch (error) {
    console.error("SePay Webhook Error:", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
