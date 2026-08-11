import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import BannerClient from "./BannerClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý Banners | Manna Store Admin",
};

export default async function AdminBannersPage() {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== "ADMIN" && (session.user as any).role !== "STAFF") {
    redirect("/admin/login");
  }

  const banners = await prisma.banner.findMany({
    orderBy: {
      order: "asc",
    },
  });

  return (
    <div className="p-6">
      <BannerClient initialBanners={banners} />
    </div>
  );
}
