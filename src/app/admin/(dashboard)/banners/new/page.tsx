import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import BannerFormClient from "../BannerFormClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tạo Banner | Manna Store Admin",
};

export default async function NewBannerPage() {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== "ADMIN" && (session.user as any).role !== "STAFF") {
    redirect("/admin/login");
  }

  return (
    <div className="p-6">
      <BannerFormClient />
    </div>
  );
}
