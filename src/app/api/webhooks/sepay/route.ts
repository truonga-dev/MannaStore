import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // 1. Verify API Key
    const authHeader = request.headers.get("Authorization");
    const expectedApiKey = process.env.SEPAY_API_KEY;
    
    // SePay sends `Authorization: Apikey <your_api_key>` or `Bearer <your_api_key>`
    if (expectedApiKey && !authHeader?.includes(expectedApiKey)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    
    // SePay payload example:
    // {
    //   "id": 123,
    //   "gateway": "Vietcombank",
    //   "transactionDate": "2023-10-10 10:10:10",
    //   "accountNumber": "0123456789",
    //   "code": "XYZ123",
    //   "content": "MANNA MN8X2F",
    //   "transferType": "in",
    //   "transferAmount": 500000,
    //   "accumulated": 1500000,
    //   "subAccount": null,
    //   "referenceCode": "MB123"
    // }

    const { content, transferType, transferAmount } = body;

    if (transferType !== "in") {
      return NextResponse.json({ message: "Ignored, not incoming transfer" });
    }

    // 2. Extract orderCode from content
    // Match MN followed by 4-8 uppercase letters/numbers
    const match = content.match(/MN[A-Z0-9]{4,8}/i);
    if (!match) {
      return NextResponse.json({ message: "No order code found in content" });
    }

    const orderCode = match[0].toUpperCase();

    // 3. Find Order
    const order = await prisma.order.findUnique({
      where: { orderCode },
      include: { user: true }
    });

    if (!order) {
      return NextResponse.json({ message: "Order not found" });
    }

    if (order.status === "COMPLETED") {
      return NextResponse.json({ message: "Order already completed" });
    }

    // 4. Verify Amount
    if (transferAmount >= order.totalAmount) {
      // Complete order
      await prisma.order.update({
        where: { id: order.id },
        data: { status: "COMPLETED" },
      });

      // Reward points if it's a registered user
      // 100,000 VND = 10 points
      if (order.userId) {
        const pointsToReward = Math.floor(order.totalAmount / 100000) * 10;
        await prisma.user.update({
          where: { id: order.userId },
          data: {
            points: { increment: pointsToReward }
          }
        });
      }

      return NextResponse.json({ message: "Order updated successfully" });
    } else {
      return NextResponse.json({ message: "Transfer amount is less than total amount" });
    }

  } catch (error) {
    console.error("SePay Webhook Error:", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
