import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import ArticleFormClient from "../ArticleFormClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tạo Bài viết | Manna Store Admin",
};

export default async function NewArticlePage() {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== "ADMIN") {
    redirect("/admin/login");
  }

  return (
    <div className="p-6">
      <ArticleFormClient />
    </div>
  );
}
