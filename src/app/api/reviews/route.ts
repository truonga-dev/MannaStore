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

    const { productId, rating, comment } = await req.json();
    if (!productId || !rating) {
      return NextResponse.json({ error: "Missing productId or rating" }, { status: 400 });
    }

    const userId = (session.user as any).id;

    // Check if user has already reviewed this product
    const existingReview = await prisma.review.findFirst({
      where: {
        userId,
        productId
      }
    });

    if (existingReview) {
      return NextResponse.json({ error: "You have already reviewed this product" }, { status: 400 });
    }

    const review = await prisma.review.create({
      data: {
        rating: Number(rating),
        comment,
        userId,
        productId
      }
    });

    return NextResponse.json({ success: true, review });
  } catch (error) {
    console.error("Submit review error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
