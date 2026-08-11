import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import BannerFormClient from "../BannerFormClient";
import prisma from "@/lib/prisma";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chỉnh sửa Banner | Manna Store Admin",
};

export default async function EditBannerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== "ADMIN" && (session.user as any).role !== "STAFF") {
    redirect("/admin/login");
  }

  const banner = await prisma.banner.findUnique({
    where: { id },
  });

  if (!banner) {
    redirect("/admin/banners");
  }

  return (
    <div className="p-6">
      <BannerFormClient banner={banner} />
    </div>
  );
}
