"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Settings,
  PackageOpen,
  Tags,
  Ticket,
  LogOut,
  FileText,
  ChevronRight,
  BarChart2
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";

const menuGroups = [
  {
    title: "Quản lý",
    items: [
      { label: "Tổng quan", href: "/admin", icon: <LayoutDashboard size={18} />, allowedRoles: ["ADMIN", "STAFF"] },
      { label: "Thống kê", href: "/admin/analytics", icon: <BarChart2 size={18} />, allowedRoles: ["ADMIN"] },
      { label: "Sản phẩm", href: "/admin/products", icon: <PackageOpen size={18} />, allowedRoles: ["ADMIN", "STAFF"] },
      { label: "Danh mục", href: "/admin/categories", icon: <Tags size={18} />, allowedRoles: ["ADMIN"] },
      { label: "Bài viết", href: "/admin/articles", icon: <FileText size={18} />, allowedRoles: ["ADMIN"] },
    ]
  },
  {
    title: "Khách hàng",
    items: [
      { label: "Khách hàng", href: "/admin/customers", icon: <Users size={18} />, allowedRoles: ["ADMIN", "STAFF"] },
      { label: "Đơn hàng", href: "/admin/orders", icon: <ShoppingBag size={18} />, allowedRoles: ["ADMIN", "STAFF"] },
    ]
  },
  {
    title: "Tiếp thị",
    items: [
      { label: "Mã giảm giá", href: "/admin/coupons", icon: <Ticket size={18} />, allowedRoles: ["ADMIN"] },
    ]
  },
  {
    title: "Hệ thống",
    items: [
      { label: "Cài đặt", href: "/admin/settings", icon: <Settings size={18} />, allowedRoles: ["ADMIN"] },
    ]
  }
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const userRole = (session?.user as any)?.role || "USER";

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-[#0A0A0A] border-r border-gray-800/50 z-50 flex-col hidden md:flex text-gray-300">
      {/* Brand Logo */}
      <div className="p-5 border-b border-gray-800/50">
        <Link href="/admin" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/30 group-hover:shadow-red-900/50 transition-shadow">
            <span className="text-white font-bold text-base leading-none">M</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest leading-none mb-0.5">Admin Panel</span>
            <span className="font-bold text-white text-sm tracking-wide leading-tight">Mana Store</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-3 space-y-5 scrollbar-thin scrollbar-thumb-gray-800">
        {menuGroups.map((group, groupIndex) => {
          const filteredItems = group.items.filter(item => item.allowedRoles.includes(userRole));
          if (filteredItems.length === 0) return null;

          return (
            <div key={groupIndex}>
              <div className="px-3 mb-2 text-[10px] font-semibold text-gray-600 uppercase tracking-widest">
                {group.title}
              </div>
              <div className="space-y-0.5">
                {filteredItems.map((item, index) => {
                  const isActive = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href));
                  
                  return (
                    <Link
                      key={index}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                        isActive
                          ? "bg-red-600/10 text-white border border-red-600/20"
                          : "text-gray-400 hover:bg-[#1A1A1A] hover:text-gray-200"
                      }`}
                    >
                      <span className={`shrink-0 ${isActive ? "text-red-500" : "text-gray-600"}`}>
                        {item.icon}
                      </span>
                      <span className="flex-1">{item.label}</span>
                      {isActive && <ChevronRight size={14} className="text-red-500/50 shrink-0" />}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-800/50">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-red-600/10 hover:text-red-400 transition-all duration-150 group"
        >
          <LogOut size={18} className="text-gray-600 group-hover:text-red-500 transition-colors shrink-0" />
          Đăng xuất
        </button>
      </div>
    </aside>
  );
}
