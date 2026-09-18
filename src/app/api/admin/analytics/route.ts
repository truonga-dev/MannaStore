import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { format } from "date-fns";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const daysParam = searchParams.get("days");
    const days = daysParam ? parseInt(daysParam, 10) : 1;

    // Lượt truy cập trong 5 phút qua (Active now)
    const fiveMinutesAgo = new Date();
    fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);
    
    const activeVisits = await prisma.pageVisit.groupBy({
      by: ['ip'],
      where: {
        createdAt: { gte: fiveMinutesAgo }
      },
    });
    const activeUsers = activeVisits.length;

    // Start Date for the queries
    const startDate = new Date();
    if (days === 1) {
      startDate.setHours(0, 0, 0, 0);
    } else {
      startDate.setDate(startDate.getDate() - (days - 1));
      startDate.setHours(0, 0, 0, 0);
    }

    // Summary data
    const totalVisits = await prisma.pageVisit.count({
      where: { createdAt: { gte: startDate } }
    });

    const uniqueVisitors = await prisma.pageVisit.groupBy({
      by: ['ip'],
      where: { createdAt: { gte: startDate } }
    });

    const totalClicks = await prisma.actionLog.count({
      where: {
        action: "click",
        createdAt: { gte: startDate }
      }
    });

    // Top pages visited
    const topPages = await prisma.pageVisit.groupBy({
      by: ['path'],
      where: { createdAt: { gte: startDate } },
      _count: { path: true },
      orderBy: { _count: { path: 'desc' } },
      take: 10
    });

    // Top actions clicked
    const topActions = await prisma.actionLog.groupBy({
      by: ['element'],
      where: {
        action: "click",
        createdAt: { gte: startDate },
        element: { not: null }
      },
      _count: { element: true },
      orderBy: { _count: { element: 'desc' } },
      take: 10
    });

    // Daily Traffic for Charts
    const lastXDays = Array.from({ length: days === 1 ? 7 : days }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - ((days === 1 ? 6 : days - 1) - i));
      return d;
    });

    const dailyTraffic = await Promise.all(
      lastXDays.map(async (date) => {
        const start = new Date(date);
        start.setHours(0, 0, 0, 0);
        const end = new Date(date);
        end.setHours(23, 59, 59, 999);
        
        const visits = await prisma.pageVisit.count({
          where: { createdAt: { gte: start, lte: end } }
        });

        const uniques = await prisma.pageVisit.groupBy({
          by: ['ip'],
          where: { createdAt: { gte: start, lte: end } }
        });

        return {
          date: format(date, "dd/MM"),
          visits: visits,
          uniqueVisitors: uniques.length
        };
      })
    );

    return NextResponse.json({
      activeUsers,
      totalVisits,
      uniqueVisitors: uniqueVisitors.length,
      totalClicks,
      topPages: topPages.map(p => ({ path: p.path, count: p._count.path })),
      topActions: topActions.map(a => ({ element: a.element, count: a._count.element })),
      dailyTraffic
    });

  } catch (error: any) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch analytics" }, { status: 500 });
  }
}
