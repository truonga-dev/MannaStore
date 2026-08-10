import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import ArticleFormClient from "../ArticleFormClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chỉnh sửa Bài viết | Manna Store Admin",
};

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== "ADMIN") {
    redirect("/admin/login");
  }

  const article = await prisma.article.findUnique({
    where: { id },
  });

  if (!article) {
    redirect("/admin/articles");
  }

  return (
    <div className="p-6">
      <ArticleFormClient initialData={article} />
    </div>
  );
}
