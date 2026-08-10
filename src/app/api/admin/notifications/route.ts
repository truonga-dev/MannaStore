import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Lấy số đơn hàng mới (PENDING)
    const pendingOrdersCount = await prisma.order.count({
      where: { status: "PENDING" }
    });

    // Lấy số sản phẩm sắp hết hàng (stockQuantity <= 10)
    const lowStockCount = await prisma.productVariant.count({
      where: { stockQuantity: { lte: 10 } }
    });

    const notifications = [];

    if (pendingOrdersCount > 0) {
      notifications.push({
        id: "orders",
        title: "Đơn hàng mới",
        message: `Có ${pendingOrdersCount} đơn hàng chờ xác nhận.`,
        time: new Date().toISOString(),
        href: "/admin/orders",
        isUnread: true
      });
    }

    if (lowStockCount > 0) {
      notifications.push({
        id: "stock",
        title: "Cảnh báo tồn kho",
        message: `Có ${lowStockCount} sản phẩm/biến thể sắp hết hàng.`,
        time: new Date().toISOString(),
        href: "/admin/products",
        isUnread: true
      });
    }

    return NextResponse.json({
      count: pendingOrdersCount + lowStockCount,
      items: notifications
    });
  } catch (error) {
    console.error("Notifications API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
