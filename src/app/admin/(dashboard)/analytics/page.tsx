import AnalyticsClient from "./AnalyticsClient";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Thống kê & Theo dõi | Admin Mana Store",
  description: "Quản lý thống kê truy cập",
};

export default async function AnalyticsPage() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    redirect("/admin");
  }
  return <AnalyticsClient />;
}
