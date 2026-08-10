import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Lượt truy cập trong 5 phút qua (Active now)
    const fiveMinutesAgo = new Date();
    fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);
    
    // Đếm số lượng IP duy nhất (coi như người dùng) trong 5 phút qua
    const activeVisits = await prisma.pageVisit.groupBy({
      by: ['ip'],
      where: {
        createdAt: { gte: fiveMinutesAgo }
      },
    });
    
    const activeUsers = activeVisits.length;

    // Hôm nay (từ 00:00)
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const todayVisits = await prisma.pageVisit.count({
      where: {
        createdAt: { gte: startOfToday }
      }
    });

    const todayUniqueVisitors = await prisma.pageVisit.groupBy({
      by: ['ip'],
      where: {
        createdAt: { gte: startOfToday }
      }
    });

    const todayClicks = await prisma.actionLog.count({
      where: {
        action: "click",
        createdAt: { gte: startOfToday }
      }
    });

    // Top pages visited today
    const topPages = await prisma.pageVisit.groupBy({
      by: ['path'],
      where: {
        createdAt: { gte: startOfToday }
      },
      _count: { path: true },
      orderBy: { _count: { path: 'desc' } },
      take: 10
    });

    // Top actions clicked today
    const topActions = await prisma.actionLog.groupBy({
      by: ['element'],
      where: {
        action: "click",
        createdAt: { gte: startOfToday },
        element: { not: null }
      },
      _count: { element: true },
      orderBy: { _count: { element: 'desc' } },
      take: 10
    });

    return NextResponse.json({
      activeUsers,
      todayVisits,
      todayUniqueVisitors: todayUniqueVisitors.length,
      todayClicks,
      topPages: topPages.map(p => ({ path: p.path, count: p._count.path })),
      topActions: topActions.map(a => ({ element: a.element, count: a._count.element }))
    });

  } catch (error: any) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch analytics" }, { status: 500 });
  }
}
