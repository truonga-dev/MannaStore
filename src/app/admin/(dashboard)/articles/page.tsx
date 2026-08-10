import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import ArticleClient from "./ArticleClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý Bài viết | Manna Store Admin",
};

export default async function AdminArticlesPage() {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== "ADMIN") {
    redirect("/admin/login");
  }

  const articles = await prisma.article.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6">
      <ArticleClient initialArticles={articles} />
    </div>
  );
}
