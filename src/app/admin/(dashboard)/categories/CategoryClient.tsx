"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { createCategory, updateCategory, deleteCategory } from "@/app/actions/category";
import toast from "react-hot-toast";
import { generateSlug } from "@/lib/utils";

export default function CategoryClient({ initialCategories }: { initialCategories: any[] }) {
  const [categories, setCategories] = useState(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [formData, setFormData] = useState({ name: "", slug: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = generateSlug(name);
    setFormData({ name, slug });
  };

  const openAddModal = () => {
    setEditingCategory(null);
    setFormData({ name: "", slug: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (category: any) => {
    setEditingCategory(category);
    setFormData({ name: category.name, slug: category.slug });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingCategory) {
        const res = await updateCategory(editingCategory.id, formData);
        if (res.success) {
          toast.success("Cập nhật danh mục thành công");
          setCategories(categories.map(c => c.id === editingCategory.id ? { ...c, ...formData } : c));
          closeModal();
        } else {
          toast.error("Lỗi: " + res.error);
        }
      } else {
        const res = await createCategory(formData);
        if (res.success) {
          toast.success("Thêm danh mục thành công");
          closeModal();
          window.location.reload();
        } else {
          toast.error("Lỗi: " + res.error);
        }
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      const res = await deleteCategory(id);
      if (res.success) {
        toast.success("Xóa danh mục thành công");
        setCategories(categories.filter(c => c.id !== id));
      } else {
        toast.error("Lỗi: " + res.error);
      }
    }
  };

  return (
    <div className="pb-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium text-gray-100">Quản lý Danh Mục</h1>
        <button onClick={openAddModal} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 hover:-translate-y-0.5 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-sm transition-all">
          <Plus size={18} />
          Thêm Danh Mục
        </button>
      </div>

      <div className="bg-[#1E1E1E] border border-gray-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="p-4 font-semibold uppercase tracking-wider text-xs text-gray-500">Tên danh mục</th>
                <th className="p-4 font-semibold uppercase tracking-wider text-xs text-gray-500">Slug</th>
                <th className="p-4 font-semibold uppercase tracking-wider text-xs text-gray-500">Số sản phẩm</th>
                <th className="p-4 font-semibold uppercase tracking-wider text-xs text-gray-500 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">Chưa có danh mục nào.</td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr key={category.id} className="border-b border-gray-800/50 hover:bg-[#2A2A2A]/50 transition-colors">
                    <td className="p-4 font-medium text-gray-200">{category.name}</td>
                    <td className="p-4 text-sm text-gray-400">{category.slug}</td>
                    <td className="p-4 text-sm text-gray-400">{category._count?.products ?? 0}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEditModal(category)} className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors" title="Chỉnh sửa">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => handleDelete(category.id)} className="p-2 text-red-500 hover:bg-red-500/20 rounded-lg transition-colors" title="Xóa">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#1E1E1E] border border-gray-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
              <h2 className="font-semibold text-gray-100">{editingCategory ? "Sửa Danh Mục" : "Thêm Danh Mục"}</h2>
              <button onClick={closeModal} className="text-gray-500 hover:bg-gray-800 hover:text-white p-1 rounded-lg transition-colors">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-400">Tên danh mục *</label>
                <input required type="text" value={formData.name} onChange={handleNameChange} className="w-full border border-gray-700 p-2.5 rounded-xl bg-[#121212] focus:ring-1 focus:ring-blue-500 outline-none text-gray-200" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-400">Đường dẫn tĩnh (Slug) *</label>
                <input required type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full border border-gray-700 p-2.5 rounded-xl bg-[#2A2A2A] focus:ring-1 focus:ring-blue-500 outline-none text-gray-200" />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
                <button type="button" onClick={closeModal} className="px-5 py-2.5 text-sm font-bold text-gray-400 bg-[#2A2A2A] hover:bg-[#333] hover:text-white rounded-full transition-all">
                  Hủy
                </button>
                <button type="submit" disabled={isSubmitting} className="bg-red-600 hover:bg-red-700 hover:-translate-y-0.5 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md disabled:opacity-50 disabled:hover:translate-y-0 transition-all">
                  {isSubmitting ? "Đang lưu..." : "Lưu danh mục"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
