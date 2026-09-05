import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const createReviewSchema = z.object({
  productId: z.string().min(1),
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
  customerName: z.string().optional(),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json({ error: "Missing productId" }, { status: 400 });
    }

    const reviews = await prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { name: true, image: true },
        },
      },
    });

    // Calculate average rating
    const totalReviews = reviews.length;
    const averageRating =
      totalReviews > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
        : 0;

    return NextResponse.json({
      reviews,
      totalReviews,
      averageRating: Number(averageRating.toFixed(1)),
    });
  } catch (error) {
    console.error("[REVIEWS_GET]", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await request.json();
    const validatedData = createReviewSchema.parse(body);

    const { productId, rating, comment, customerName } = validatedData;

    let finalCustomerName = customerName;
    let userId = null;

    if (session?.user) {
      userId = (session.user as any).id;
      finalCustomerName = session.user.name || "Khách hàng";
    }

    if (!finalCustomerName) {
      finalCustomerName = "Khách vãng lai";
    }

    const safeComment = comment
      ? String(comment).slice(0, 1000).replace(/<[^>]*>/g, "")
      : null;

    const review = await prisma.review.create({
      data: {
        productId,
        rating,
        comment: safeComment,
        customerName: finalCustomerName,
        userId,
      },
      include: {
        user: { select: { name: true, image: true } },
      },
    });

    return NextResponse.json({ success: true, review });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data", details: error.issues }, { status: 400 });
    }
    console.error("[REVIEWS_POST]", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
