"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ArticleClient({ initialArticles }: { initialArticles: any[] }) {
  const [articles, setArticles] = useState(initialArticles);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa bài viết này không?")) return;

    try {
      const res = await fetch(`/api/admin/articles/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Xóa bài viết thành công!");
        setArticles(articles.filter((a) => a.id !== id));
        router.refresh();
      } else {
        const data = await res.json();
        toast.error(data.error || "Xóa thất bại!");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi!");
    }
  };

  return (
    <div className="pb-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium text-gray-100">Quản lý Bài viết</h1>
        <Link
          href="/admin/articles/new"
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 hover:-translate-y-0.5 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md transition-all"
        >
          <Plus size={18} />
          Tạo bài viết mới
        </Link>
      </div>

      <div className="bg-[#1E1E1E] border border-gray-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="p-4 font-semibold uppercase tracking-wider text-xs text-gray-500">Tiêu đề</th>
                <th className="p-4 font-semibold uppercase tracking-wider text-xs text-gray-500">Tác giả</th>
                <th className="p-4 font-semibold uppercase tracking-wider text-xs text-gray-500">Trạng thái</th>
                <th className="p-4 font-semibold uppercase tracking-wider text-xs text-gray-500">Ngày đăng</th>
                <th className="p-4 font-semibold uppercase tracking-wider text-xs text-gray-500 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {articles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    Chưa có bài viết nào.
                  </td>
                </tr>
              ) : (
                articles.map((article) => (
                  <tr key={article.id} className="border-b border-gray-800/50 hover:bg-[#2A2A2A]/50 transition-colors">
                    <td className="p-4">
                      <div className="font-medium text-gray-200 mb-1 line-clamp-1">{article.title}</div>
                      <div className="text-xs text-gray-500 font-mono">{article.slug}</div>
                    </td>
                    <td className="p-4 text-gray-400">{article.author || "Admin"}</td>
                    <td className="p-4">
                      {article.isPublished ? (
                        <span className="flex items-center gap-1.5 w-fit text-xs font-medium text-emerald-400">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                          Đã xuất bản
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 w-fit text-xs font-medium text-orange-400">
                          <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                          Bản nháp
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-sm text-gray-400">
                      {new Date(article.publishedAt).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/admin/articles/${article.id}`} 
                          className="p-2 text-blue-500 hover:text-blue-4000/20 rounded-lg transition-colors"
                          title="Sửa bài viết"
                        >
                          <Edit size={16} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(article.id)} 
                          className="p-2 text-red-500 hover:bg-red-500/20 rounded-lg transition-colors"
                          title="Xóa bài viết"
                        >
                          <Trash2 size={16} />
                        </button>
                        <a 
                          href={`/bai-viet/${article.slug}`} 
                          target="_blank" 
                          rel="noreferrer"
                          className="p-2 text-gray-400 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
                          title="Xem trên trang web"
                        >
                          <ExternalLink size={16} />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

