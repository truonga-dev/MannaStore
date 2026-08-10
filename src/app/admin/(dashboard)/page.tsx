import prisma from "@/lib/prisma";
import Link from "next/link";
import { format } from "date-fns";
import { RevenueChart, OrderStatusChart } from "@/components/admin/dashboard/DashboardCharts";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import DashboardClient from "./DashboardClient";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  const adminName = session?.user?.name || "Admin";

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const startDate = new Date(currentYear, currentMonth, 1);

  // Fetch KPIs
  const [totalOrders, totalRevenueData, totalProducts, newUsersCount, monthOrders, lowStockProducts] = await Promise.all([
    prisma.order.count(),
    prisma.order.aggregate({
      _sum: { totalAmount: true },
      where: { status: "COMPLETED" }
    }),
    prisma.product.count(),
    prisma.user.count({
      where: { role: "USER", createdAt: { gte: startDate } }
    }),
    prisma.order.count({
      where: { createdAt: { gte: startDate } }
    }),
    prisma.productVariant.count({
      where: { stockQuantity: { lte: 10 } }
    })
  ]);

  const totalRevenue = totalRevenueData._sum.totalAmount || 0;

  // Fetch Chart Data (Mocking last 7 days revenue for simplicity)
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d;
  });

  const revenueData = await Promise.all(
    last7Days.map(async (date) => {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      
      const sum = await prisma.order.aggregate({
        _sum: { totalAmount: true },
        where: {
          status: "COMPLETED",
          createdAt: { gte: start, lte: end },
        }
      });
      return {
        date: format(date, "dd/MM"),
        revenue: sum._sum.totalAmount || 0,
      };
    })
  );

  const orderStatuses = [
    { status: 'PENDING', count: 0, _sum: { totalAmount: 0 } },
    { status: 'UNPAID', count: 0, _sum: { totalAmount: 0 } },
    { status: 'SHIPPING', count: 0, _sum: { totalAmount: 0 } },
    { status: 'COMPLETED', count: 0, _sum: { totalAmount: 0 } },
    { status: 'CANCELLED', count: 0, _sum: { totalAmount: 0 } }
  ];

  const orderStats = await prisma.order.groupBy({
    by: ['status'],
    _count: { id: true },
    _sum: { totalAmount: true }
  });

  orderStats.forEach(stat => {
    const existing = orderStatuses.find(s => s.status === stat.status);
    if (existing) {
      existing.count = stat._count.id;
      existing._sum.totalAmount = stat._sum.totalAmount || 0;
    } else {
      orderStatuses.push({
        status: stat.status,
        count: stat._count.id,
        _sum: { totalAmount: stat._sum.totalAmount || 0 }
      });
    }
  });

  const statusLabels: Record<string, string> = {
    PENDING: "Chờ xử lý",
    UNPAID: "Đang chuẩn bị",
    SHIPPING: "Đang giao",
    COMPLETED: "Hoàn thành",
    CANCELLED: "Đã hủy"
  };

  const pieData = ['PENDING', 'UNPAID', 'SHIPPING', 'COMPLETED', 'CANCELLED'].map(status => {
    const found = orderStatuses.find(s => s.status === status);
    return {
      name: statusLabels[status] || status,
      value: found ? found.count : 0
    };
  });

  // Recent Orders
  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });

  const kpis = [
    { title: "TỔNG DOANH THU", value: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalRevenue), suffix: "", increase: "+2.4% tháng trước" },
    { title: "TỔNG ĐƠN HÀNG", value: monthOrders.toString(), suffix: " Đơn", increase: "+1.2% tháng trước" },
    { title: "KHÁCH HÀNG MỚI", value: newUsersCount.toString(), suffix: " Khách", increase: "+5.1% tháng trước" },
  ];

  return (
    <DashboardClient 
      adminName={adminName}
      kpis={kpis}
      initialRevenueData={revenueData}
      pieData={pieData}
      recentOrders={recentOrders}
      totalRevenue={totalRevenue}
    />
  );
}
