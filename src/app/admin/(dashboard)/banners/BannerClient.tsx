"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function BannerClient({ initialBanners }: { initialBanners: any[] }) {
  const [banners, setBanners] = useState(initialBanners);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa banner này không?")) return;

    try {
      const res = await fetch(`/api/admin/banners/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Xóa banner thành công!");
        setBanners(banners.filter((b) => b.id !== id));
        router.refresh();
      } else {
        const data = await res.json();
        toast.error(data.error || "Xóa thất bại!");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi!");
    }
  };

  const moveBanner = async (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === banners.length - 1) return;

    const newBanners = [...banners];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap order
    const tempOrder = newBanners[index].order;
    newBanners[index].order = newBanners[targetIndex].order;
    newBanners[targetIndex].order = tempOrder;

    // Swap position in array for immediate UI update
    const temp = newBanners[index];
    newBanners[index] = newBanners[targetIndex];
    newBanners[targetIndex] = temp;

    setBanners(newBanners);

    try {
      // API calls to update both
      await Promise.all([
        fetch(`/api/admin/banners/${newBanners[index].id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order: newBanners[index].order }),
        }),
        fetch(`/api/admin/banners/${newBanners[targetIndex].id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order: newBanners[targetIndex].order }),
        }),
      ]);
      router.refresh();
    } catch (error) {
      toast.error("Lỗi khi đổi thứ tự");
    }
  };

  return (
    <div className="pb-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium text-gray-100">Quản lý Banners</h1>
        <Link
          href="/admin/banners/new"
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 hover:-translate-y-0.5 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md transition-all"
        >
          <Plus size={18} />
          Thêm Banner
        </Link>
      </div>

      <div className="bg-[#1F2937] rounded-xl border border-gray-700 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-800/50 text-gray-400 text-xs uppercase tracking-wider">
                <th className="p-4 font-medium border-b border-gray-700">Hình ảnh</th>
                <th className="p-4 font-medium border-b border-gray-700">Tiêu đề (Title)</th>
                <th className="p-4 font-medium border-b border-gray-700">Trạng thái</th>
                <th className="p-4 font-medium border-b border-gray-700 text-center">Thứ tự</th>
                <th className="p-4 font-medium border-b border-gray-700 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {banners.map((banner, index) => (
                <tr key={banner.id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="p-4">
                    <div className="w-32 h-16 relative rounded overflow-hidden bg-gray-800">
                      <Image 
                        src={banner.src} 
                        alt="Banner" 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm font-medium text-gray-200">{banner.title.split('\n')[0]}...</div>
                    <div className="text-xs text-gray-500 mt-1">{banner.sub}</div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      banner.isActive ? "bg-green-500/20 text-green-400" : "bg-gray-600/50 text-gray-400"
                    }`}>
                      {banner.isActive ? "Hiển thị" : "Đã ẩn"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-1">
                      <button 
                        onClick={() => moveBanner(index, 'up')}
                        disabled={index === 0}
                        className="p-1 text-gray-400 hover:text-white disabled:opacity-30 disabled:hover:text-gray-400"
                      >
                        <ArrowUp size={16} />
                      </button>
                      <button 
                        onClick={() => moveBanner(index, 'down')}
                        disabled={index === banners.length - 1}
                        className="p-1 text-gray-400 hover:text-white disabled:opacity-30 disabled:hover:text-gray-400"
                      >
                        <ArrowDown size={16} />
                      </button>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/banners/${banner.id}`}
                        className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded transition-colors"
                        title="Chỉnh sửa"
                      >
                        <Edit size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(banner.id)}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
                        title="Xóa"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {banners.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    Chưa có banner nào. Hãy thêm banner mới.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
