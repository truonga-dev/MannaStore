import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !(session.user as any).id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await req.json();
    if (!productId) {
      return NextResponse.json({ error: "Missing productId" }, { status: 400 });
    }

    const userId = (session.user as any).id;

    const existing = await prisma.favorite.findUnique({
      where: {
        userId_productId: {
          userId,
          productId
        }
      }
    });

    if (existing) {
      // Remove favorite
      await prisma.favorite.delete({
        where: { id: existing.id }
      });
      return NextResponse.json({ success: true, action: 'removed' });
    } else {
      // Add favorite
      await prisma.favorite.create({
        data: {
          userId,
          productId
        }
      });
      return NextResponse.json({ success: true, action: 'added' });
    }
  } catch (error) {
    console.error("Toggle favorite error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
