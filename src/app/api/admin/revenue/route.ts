import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { subDays, format, startOfDay, endOfDay } from "date-fns";
import { vi } from "date-fns/locale";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "STAFF")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const days = parseInt(searchParams.get("days") || "30", 10);
    const startDate = startOfDay(subDays(new Date(), days - 1));
    const endDate = endOfDay(new Date());

    // Fetch all successful orders in the range
    const orders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
        status: {
          in: ["COMPLETED", "SHIPPING", "PROCESSING"] // Assume these generate revenue
        }
      },
      include: {
        items: {
          include: {
            variant: {
              include: {
                product: true
              }
            }
          }
        }
      }
    });

    // 1. Calculate Daily Revenue & Orders
    const dailyDataMap = new Map<string, { date: string, revenue: number, orders: number }>();
    
    // Initialize all days in range with 0
    for (let i = 0; i < days; i++) {
      const d = startOfDay(subDays(new Date(), i));
      const dateStr = format(d, "dd/MM", { locale: vi });
      dailyDataMap.set(dateStr, { date: dateStr, revenue: 0, orders: 0 });
    }

    let totalRevenue = 0;
    let totalOrders = orders.length;

    // 2. Calculate Top Products
    const productStats = new Map<string, { name: string, quantity: number, revenue: number, imageUrl: string | null }>();

    orders.forEach(order => {
      // Group by day
      const dateStr = format(order.createdAt, "dd/MM", { locale: vi });
      const dayData = dailyDataMap.get(dateStr);
      if (dayData) {
        dayData.revenue += order.totalAmount;
        dayData.orders += 1;
      }
      totalRevenue += order.totalAmount;

      // Group by products
      order.items.forEach(item => {
        const productName = item.variant.product.name;
        const productId = item.variant.product.id;
        const imageUrl = item.variant.product.imageUrl;
        const itemRevenue = item.priceAtTime * item.quantity;
        
        if (!productStats.has(productId)) {
          productStats.set(productId, { name: productName, quantity: 0, revenue: 0, imageUrl });
        }
        const stat = productStats.get(productId)!;
        stat.quantity += item.quantity;
        stat.revenue += itemRevenue;
      });
    });

    // Convert daily map to sorted array (chronological)
    const dailyRevenue = Array.from(dailyDataMap.values()).reverse();

    // Convert products map to array and sort by revenue descending
    const topProducts = Array.from(productStats.values())
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    const aov = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

    return NextResponse.json({
      summary: {
        totalRevenue,
        totalOrders,
        aov,
      },
      dailyRevenue,
      topProducts
    });

  } catch (error) {
    console.error("Error fetching revenue analytics:", error);
    return NextResponse.json(
      { message: "Lỗi server khi lấy dữ liệu doanh thu." },
      { status: 500 }
    );
  }
}
