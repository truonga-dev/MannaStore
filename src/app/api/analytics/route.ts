import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { type, path, userId, action, element } = await req.json();
    
    // Get IP address
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : "unknown";
    
    // Optional: Session ID could be from a cookie or just null for now
    const sessionId = req.cookies.get("next-auth.session-token")?.value || null;

    if (type === "pageview") {
      await prisma.pageVisit.create({
        data: {
          path: path || "/",
          ip: ip !== "unknown" ? ip : null,
          sessionId,
          userId: userId || null,
        }
      });
    } else if (type === "action") {
      await prisma.actionLog.create({
        data: {
          action: action || "click",
          element: element || null,
          path: path || "/",
          ip: ip !== "unknown" ? ip : null,
          sessionId,
          userId: userId || null,
        }
      });
    }

    // Update user's last IP if userId is provided
    if (userId && ip !== "unknown") {
      await prisma.user.update({
        where: { id: userId },
        data: { lastIp: ip }
      }).catch(err => console.error("Failed to update user IP:", err));
    }

    // Opportunistically delete logs older than 30 days (10% chance to run)
    if (Math.random() < 0.1) {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      Promise.all([
        prisma.pageVisit.deleteMany({ where: { createdAt: { lt: thirtyDaysAgo } } }),
        prisma.actionLog.deleteMany({ where: { createdAt: { lt: thirtyDaysAgo } } })
      ]).catch(err => console.error("Failed to cleanup old analytics:", err));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Analytics Error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
