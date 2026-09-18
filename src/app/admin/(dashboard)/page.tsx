import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import DashboardClient from "./DashboardClient";
import { unstable_cache } from "next/cache";

const getDashboardData = unstable_cache(
  async () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const startDate = new Date(currentYear, currentMonth, 1);

    const prevMonthStartDate = new Date(currentYear, currentMonth - 1, 1);
    const prevMonthEndDate = new Date(currentYear, currentMonth, 0, 23, 59, 59, 999);

    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(now.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);
    const today = new Date(now);
    today.setHours(23, 59, 59, 999);

    const [
      totalRevenueData,
      currentMonthRevenueData,
      prevMonthRevenueData,
      newUsersCount,
      prevMonthUsers,
      monthOrders,
      prevMonthOrders,
      lowStockVariants,
      recentReviews,
      recentMessages,
      orderStats,
      revenueOrders,
      recentOrders
    ] = await Promise.all([
      prisma.order.aggregate({ _sum: { totalAmount: true }, where: { status: "COMPLETED" } }),
      prisma.order.aggregate({ _sum: { totalAmount: true }, where: { status: "COMPLETED", createdAt: { gte: startDate } } }),
      prisma.order.aggregate({ _sum: { totalAmount: true }, where: { status: "COMPLETED", createdAt: { gte: prevMonthStartDate, lte: prevMonthEndDate } } }),
      prisma.user.count({ where: { role: "USER", createdAt: { gte: startDate } } }),
      prisma.user.count({ where: { role: "USER", createdAt: { gte: prevMonthStartDate, lte: prevMonthEndDate } } }),
      prisma.order.count({ where: { createdAt: { gte: startDate } } }),
      prisma.order.count({ where: { createdAt: { gte: prevMonthStartDate, lte: prevMonthEndDate } } }),
      prisma.productVariant.findMany({ where: { stockQuantity: { lte: 10 } }, include: { product: true }, take: 5, orderBy: { stockQuantity: 'asc' } }),
      prisma.review.findMany({ take: 3, orderBy: { createdAt: "desc" }, include: { user: true, product: true } }),
      prisma.contactMessage.findMany({ take: 2, orderBy: { createdAt: "desc" } }),
      prisma.order.groupBy({ by: ['status'], _count: { id: true }, _sum: { totalAmount: true } }),
      prisma.order.findMany({ where: { status: "COMPLETED", createdAt: { gte: sevenDaysAgo, lte: today } }, select: { totalAmount: true, createdAt: true } }),
      prisma.order.findMany({ take: 5, orderBy: { createdAt: "desc" }, include: { user: true } })
    ]);

    const totalRevenue = totalRevenueData._sum.totalAmount || 0;
    const currentMonthRevenue = currentMonthRevenueData._sum.totalAmount || 0;
    const prevMonthRevenue = prevMonthRevenueData._sum.totalAmount || 0;

    const calcGrowth = (current: number, prev: number) => {
      if (prev === 0) return current > 0 ? "+100%" : "0%";
      const percent = ((current - prev) / prev) * 100;
      return `${percent > 0 ? '+' : ''}${percent.toFixed(1)}%`;
    };

    const revenueGrowth = calcGrowth(currentMonthRevenue, prevMonthRevenue);
    const usersGrowth = calcGrowth(newUsersCount, prevMonthUsers);
    const ordersGrowth = calcGrowth(monthOrders, prevMonthOrders);

    const kpis = [
      { title: "TỔNG DOANH THU", value: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalRevenue), suffix: "", increase: `${revenueGrowth} tháng trước` },
      { title: "TỔNG ĐƠN HÀNG", value: monthOrders.toString(), suffix: " Đơn", increase: `${ordersGrowth} tháng trước` },
      { title: "KHÁCH HÀNG MỚI", value: newUsersCount.toString(), suffix: " Khách", increase: `${usersGrowth} tháng trước` },
    ];

    const last7Days = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(now);
      d.setDate(d.getDate() - (6 - i));
      return d;
    });

    const revenueData = last7Days.map((date) => {
      const dayStr = format(date, "dd/MM");
      const dayStart = new Date(date);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(date);
      dayEnd.setHours(23, 59, 59, 999);

      const dayRevenue = revenueOrders
        .filter((o) => new Date(o.createdAt) >= dayStart && new Date(o.createdAt) <= dayEnd)
        .reduce((sum, o) => sum + o.totalAmount, 0);

      return { date: dayStr, revenue: dayRevenue };
    });

    const orderStatuses = [
      { status: 'PENDING', count: 0, _sum: { totalAmount: 0 } },
      { status: 'UNPAID', count: 0, _sum: { totalAmount: 0 } },
      { status: 'SHIPPING', count: 0, _sum: { totalAmount: 0 } },
      { status: 'COMPLETED', count: 0, _sum: { totalAmount: 0 } },
      { status: 'CANCELLED', count: 0, _sum: { totalAmount: 0 } }
    ];

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

    const recentActivities = [
      ...recentReviews.map(r => ({
        id: r.id,
        type: "REVIEW",
        user: r.user?.name || r.user?.email || (r as any).customerName || "Khách vãng lai",
        content: `Đã đánh giá ${r.rating} sao cho ${r.product.name}`,
        date: r.createdAt.toISOString()
      })),
      ...recentMessages.map(m => ({
        id: m.id,
        type: "MESSAGE",
        user: m.name,
        content: `Gửi tin nhắn liên hệ: ${m.subject}`,
        date: m.createdAt.toISOString()
      }))
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 4);

    return {
      kpis,
      revenueData,
      pieData,
      totalRevenue,
      lowStockVariants,
      recentOrders,
      recentActivities
    };
  },
  ['admin-dashboard-stats'],
  { revalidate: 300 } // Cache for 5 minutes
);

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  const adminName = session?.user?.name || "Admin";

  const data = await getDashboardData();

  return (
    <DashboardClient 
      adminName={adminName}
      kpis={data.kpis}
      initialRevenueData={data.revenueData}
      pieData={data.pieData}
      recentOrders={data.recentOrders.map((o: any) => ({ ...o, createdAt: new Date(o.createdAt), updatedAt: new Date(o.updatedAt) }))}
      totalRevenue={data.totalRevenue}
      lowStockVariants={data.lowStockVariants.map((v: any) => ({
        ...v,
        product: { ...v.product, createdAt: new Date(v.product.createdAt), updatedAt: new Date(v.product.updatedAt) }
      }))}
      recentActivities={data.recentActivities.map(a => ({ ...a, date: new Date(a.date) }))}
    />
  );
}
