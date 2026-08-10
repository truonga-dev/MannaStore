import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const article = await prisma.article.findUnique({
      where: { id },
    });

    if (!article) {
      return NextResponse.json({ error: "Không tìm thấy bài viết" }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error("Fetch article error:", error);
    return NextResponse.json(
      { error: "Lỗi máy chủ nội bộ" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    // Check slug uniqueness (excluding current article)
    const existing = await prisma.article.findFirst({
      where: { 
        slug,
        id: { not: id }
      }
    });

    if (existing) {
      return NextResponse.json(
        { error: "Đường dẫn (slug) đã tồn tại" },
        { status: 400 }
      );
    }

    const currentArticle = await prisma.article.findUnique({
      where: { id }
    });

    if (!currentArticle) {
      return NextResponse.json({ error: "Không tìm thấy bài viết" }, { status: 404 });
    }

    // Determine if we need to update publishedAt
    let publishedAt = currentArticle.publishedAt;
    if (isPublished && !currentArticle.isPublished) {
      publishedAt = new Date(); // Update to now if just published
    }

    const article = await prisma.article.update({
      where: { id },
      data: {
        title,
        slug,
        excerpt,
        content,
        coverImage,
        author,
        tags,
        isPublished,
        publishedAt,
      },
    });

    return NextResponse.json(article);
  } catch (error) {
    console.error("Update article error:", error);
    return NextResponse.json(
      { error: "Lỗi máy chủ nội bộ" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.article.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete article error:", error);
    return NextResponse.json(
      { error: "Lỗi máy chủ nội bộ" },
      { status: 500 }
    );
  }
}
