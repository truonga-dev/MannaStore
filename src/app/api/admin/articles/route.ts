import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";

    const articles = await prisma.article.findMany({
      where: search ? {
        title: {
          contains: search
        }
      } : undefined,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(articles);
  } catch (error) {
    console.error("Fetch articles error:", error);
    return NextResponse.json(
      { error: "Lỗi máy chủ nội bộ" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, slug, excerpt, content, coverImage, author, tags, isPublished } = body;

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: "Vui lòng nhập đủ các trường bắt buộc" },
        { status: 400 }
      );
    }

    // Check slug
    const existing = await prisma.article.findUnique({
      where: { slug }
    });

    if (existing) {
      return NextResponse.json(
        { error: "Đường dẫn (slug) đã tồn tại" },
        { status: 400 }
      );
    }

    const article = await prisma.article.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        coverImage,
        author: author || "Admin",
        tags,
        isPublished: isPublished ?? true,
        publishedAt: (isPublished ?? true) ? new Date() : new Date(),
      },
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error("Create article error:", error);
    return NextResponse.json(
      { error: "Lỗi máy chủ nội bộ" },
      { status: 500 }
    );
  }
}
