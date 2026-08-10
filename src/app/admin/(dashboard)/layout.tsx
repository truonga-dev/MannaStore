import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user || !["ADMIN", "STAFF"].includes((session.user as any).role)) {
    redirect("/admin/login"); // Redirect to admin login if not admin or staff
  }

  return (
    <div className="flex min-h-screen bg-[#121212] text-gray-100">
      <AdminSidebar />
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen transition-all">
        <AdminHeader />
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
