"use client";

import { Bell, Search, Menu, Package, AlertCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function AdminHeader() {
  const { data: session } = useSession();
  const { data: notifs } = useSWR("/api/admin/notifications", fetcher, { refreshInterval: 15000 });
  const pathname = usePathname();
  const router = useRouter();
  
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/admin/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const getPageName = () => {
    if (pathname.includes('/products/new')) return 'Thêm Sản Phẩm';
    if (pathname.includes('/products')) return 'Sản Phẩm';
    if (pathname.includes('/orders')) return 'Đơn Hàng';
    if (pathname.includes('/customers')) return 'Khách Hàng';
    if (pathname.includes('/categories')) return 'Danh Mục';
    if (pathname.includes('/coupons')) return 'Mã Giảm Giá';
    if (pathname.includes('/articles')) return 'Bài Viết';
    if (pathname.includes('/settings')) return 'Cài Đặt';
    return 'Tổng Quan';
  };

  const totalUnread = notifs?.count || 0;
  const pageName = getPageName();

  return (
    <header className="sticky top-0 z-40 bg-[#121212]/80 backdrop-blur-md border-b border-gray-800/80 h-16 flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 -ml-2 text-gray-400 hover:text-white transition-colors">
          <Menu size={20} />
        </button>
        
        {/* Breadcrumbs */}
        <div className="hidden md:flex items-center text-sm font-medium">
          <Link href="/admin" className="text-gray-400 hover:text-gray-200 transition-colors">Dashboard</Link>
          <span className="mx-2 text-gray-700">/</span>
          <span className="text-gray-100">{pageName}</span>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        {/* Global Search */}
        <form 
          onSubmit={handleSearch} 
          className="hidden md:flex items-center bg-[#1A1A1A] hover:bg-[#222] rounded-lg px-3 py-2 w-72 border border-gray-800 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 focus-within:bg-[#1A1A1A] transition-all duration-200 group"
        >
          <Search size={16} className="text-gray-500 mr-2.5 group-focus-within:text-blue-500 transition-colors" />
          <input 
            ref={searchInputRef}
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm sản phẩm..." 
            className="bg-transparent border-none outline-none w-full text-sm text-gray-200 placeholder-gray-500"
          />
          <div className="flex items-center gap-0.5 border border-gray-700 rounded px-1.5 py-0.5 bg-[#2A2A2A] ml-2 shrink-0 select-none">
             <span className="text-[10px] font-medium text-gray-400">⌘</span>
             <span className="text-[10px] font-medium text-gray-400">K</span>
          </div>
        </form>

        {/* Notifications */}
        <div className="relative" ref={dropdownRef}>
          <button 
            className="p-2.5 relative text-gray-400 hover:text-white transition-colors hover:bg-gray-800/50 rounded-full"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <Bell size={18} />
            {totalUnread > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-[#121212]"></span>
            )}
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-80 bg-[#1E1E1E] border border-gray-800 rounded-xl shadow-xl overflow-hidden z-50">
              <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                <h3 className="font-semibold text-sm text-gray-200">Thông báo</h3>
                {totalUnread > 0 && (
                  <span className="bg-blue-500/10 text-blue-400 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                    {totalUnread} mới
                  </span>
                )}
              </div>
              <div className="max-h-[60vh] overflow-y-auto">
                {(!notifs?.items || notifs.items.length === 0) ? (
                  <div className="p-6 text-center text-sm text-gray-500">
                    Không có thông báo nào.
                  </div>
                ) : (
                  <div className="divide-y divide-gray-800/50">
                    {notifs.items.map((n: any) => (
                      <Link 
                        href={n.href} 
                        key={n.id}
                        onClick={() => setShowDropdown(false)}
                        className="flex items-start gap-3 p-4 hover:bg-gray-800/40 transition-colors"
                      >
                        <div className={`p-2 rounded-full flex-shrink-0 ${n.id === 'orders' ? 'bg-blue-500/10 text-blue-400' : 'bg-orange-500/10 text-orange-400'}`}>
                          {n.id === 'orders' ? <Package size={16} /> : <AlertCircle size={16} />}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-200">{n.title}</p>
                          <p className="text-xs text-gray-500 mt-1">{n.message}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center overflow-hidden border border-gray-700/50 cursor-pointer hover:opacity-90 transition-opacity">
          {session?.user?.image ? (
            <img src={session.user.image} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <span className="font-semibold text-white text-xs">
              {(session?.user?.name || "A").charAt(0).toUpperCase()}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
