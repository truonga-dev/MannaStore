import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { code, orderAmount } = await req.json();

    if (!code) {
      return NextResponse.json({ error: "Vui lòng nhập mã giảm giá" }, { status: 400 });
    }

    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase() }
    });

    if (!coupon) {
      return NextResponse.json({ error: "Mã giảm giá không hợp lệ" }, { status: 404 });
    }

    if (!coupon.isActive) {
      return NextResponse.json({ error: "Mã giảm giá đã hết hạn hoặc bị khóa" }, { status: 400 });
    }

    if (coupon.maxUses && coupon.currentUses >= coupon.maxUses) {
      return NextResponse.json({ error: "Mã giảm giá đã hết lượt sử dụng" }, { status: 400 });
    }

    if (coupon.minOrderValue && orderAmount < coupon.minOrderValue) {
      return NextResponse.json({ error: `Đơn hàng tối thiểu ${coupon.minOrderValue.toLocaleString('vi-VN')}đ để sử dụng mã này` }, { status: 400 });
    }

    // Calculate discount amount based on type
    let calculatedDiscountAmount = 0;
    if (coupon.discountPercentage) {
      calculatedDiscountAmount = Math.floor(orderAmount * (coupon.discountPercentage / 100));
    } else if (coupon.discountAmount) {
      calculatedDiscountAmount = coupon.discountAmount;
    }

    // Don't discount more than the order amount
    if (calculatedDiscountAmount > orderAmount) {
      calculatedDiscountAmount = orderAmount;
    }

    return NextResponse.json({
      message: "Áp dụng mã thành công",
      coupon: {
        id: coupon.id,
        code: coupon.code,
        discountPercentage: coupon.discountPercentage,
        discountAmount: coupon.discountAmount,
        calculatedDiscountAmount: calculatedDiscountAmount
      }
    });

  } catch (error) {
    console.error("Coupon API Error:", error);
    return NextResponse.json({ error: "Lỗi hệ thống" }, { status: 500 });
  }
}
