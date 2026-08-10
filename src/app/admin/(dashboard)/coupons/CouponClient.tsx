"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { createCoupon, updateCoupon, deleteCoupon } from "@/app/actions/coupon";
import toast from "react-hot-toast";

export default function CouponClient({ initialCoupons }: { initialCoupons: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    code: "",
    discountPercentage: "",
    discountAmount: "",
    minOrderValue: "",
    maxUses: "",
    isActive: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openAddModal = () => {
    setEditingCoupon(null);
    setFormData({
      code: "",
      discountPercentage: "",
      discountAmount: "",
      minOrderValue: "",
      maxUses: "",
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (coupon: any) => {
    setEditingCoupon(coupon);
    setFormData({
      code: coupon.code,
      discountPercentage: coupon.discountPercentage || "",
      discountAmount: coupon.discountAmount || "",
      minOrderValue: coupon.minOrderValue || "",
      maxUses: coupon.maxUses || "",
      isActive: coupon.isActive,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const dataToSubmit = {
        code: formData.code,
        discountPercentage: formData.discountPercentage ? Number(formData.discountPercentage) : null,
        discountAmount: formData.discountAmount ? Number(formData.discountAmount) : null,
        minOrderValue: formData.minOrderValue ? Number(formData.minOrderValue) : null,
        maxUses: formData.maxUses ? Number(formData.maxUses) : null,
        isActive: formData.isActive,
      };

      if (editingCoupon) {
        const res = await updateCoupon(editingCoupon.id, dataToSubmit);
        if (res.success) {
          toast.success("Cập nhật mã giảm giá thành công");
          closeModal();
        } else {
          toast.error("Li: " + res.error);
        }
      } else {
        const res = await createCoupon(dataToSubmit);
        if (res.success) {
          toast.success("Thêm mã giảm giá thành công");
          closeModal();
        } else {
          toast.error("Li: " + res.error);
        }
      }
    } catch (error) {
      toast.error("Đã xảy ra li");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Bạn có chắc chắn mun xóa mã giảm giá này?")) {
      const res = await deleteCoupon(id);
      if (res.success) {
        toast.success("Xóa mã giảm giá thành công");
      } else {
        toast.error("Li: " + res.error);
      }
    }
  };

  return (
    <div className="pb-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium text-gray-100">Quản lý Mã Giảm Giá</h1>
        <button onClick={openAddModal} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 hover:-translate-y-0.5 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-sm transition-all">
          <Plus size={18} />
          Thêm Mã
        </button>
      </div>

      <div className="bg-[#1E1E1E] border border-gray-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="p-4 font-semibold uppercase tracking-wider text-xs text-gray-500">Mã</th>
                <th className="p-4 font-semibold uppercase tracking-wider text-xs text-gray-500">Giảm giá</th>
                <th className="p-4 font-semibold uppercase tracking-wider text-xs text-gray-500">Điều kiện (Tối thiểu)</th>
                <th className="p-4 font-semibold uppercase tracking-wider text-xs text-gray-500">Đã dùng / Tối đa</th>
                <th className="p-4 font-semibold uppercase tracking-wider text-xs text-gray-500">Trạng thái</th>
                <th className="p-4 font-semibold uppercase tracking-wider text-xs text-gray-500 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {initialCoupons.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    Chưa có mã giảm giá nào.
                  </td>
                </tr>
              ) : (
                initialCoupons.map((coupon) => (
                  <tr key={coupon.id} className="border-b border-gray-800/50 hover:bg-[#2A2A2A]/50 transition-colors">
                    <td className="p-4 font-mono font-medium text-gray-200">{coupon.code}</td>
                    <td className="p-4 text-sm text-gray-300">
                      {coupon.discountPercentage ? `${coupon.discountPercentage}%` : ''}
                      {coupon.discountPercentage && coupon.discountAmount ? ' hoặc ' : ''}
                      {coupon.discountAmount ? `${coupon.discountAmount.toLocaleString('vi-VN')}` : ''}
                    </td>
                    <td className="p-4 text-sm text-gray-400">
                      {coupon.minOrderValue ? `${coupon.minOrderValue.toLocaleString('vi-VN')}` : 'Không có'}
                    </td>
                    <td className="p-4 text-sm text-gray-400">
                      <span className="text-gray-200">{coupon.currentUses}</span> / {coupon.maxUses || '~'}
                    </td>
                    <td className="p-4">
                      <span className={`flex items-center gap-1.5 w-fit text-xs font-medium ${
                        coupon.isActive ? 'text-emerald-400' : 'text-gray-400'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          coupon.isActive ? 'bg-emerald-400' : 'bg-gray-400'
                        }`}></div>
                        {coupon.isActive ? 'Hoạt động' : 'Đã tắt'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEditModal(coupon)} className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors" title="Chỉnh sửa">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => handleDelete(coupon.id)} className="p-2 text-red-500 hover:bg-red-500/20 rounded-lg transition-colors" title="Xóa">
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#1E1E1E] border border-gray-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
              <h2 className="font-semibold text-gray-100">{editingCoupon ? "Sửa Mã Giảm Giá" : "Thêm Mã Giảm Giá"}</h2>
              <button onClick={closeModal} className="text-gray-500 hover:bg-gray-800 hover:text-white p-1 rounded-lg transition-colors">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-400">Mã giảm giá *</label>
                <input required type="text" value={formData.code} onChange={e => setFormData({...formData, code: e.target.value.toUpperCase()})} className="w-full border border-gray-700 p-2.5 rounded-xl bg-[#121212] focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-200" placeholder="VD: TET2024" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-400">Giảm theo %</label>
                  <input type="number" min="0" max="100" value={formData.discountPercentage} onChange={e => setFormData({...formData, discountPercentage: e.target.value})} className="w-full border border-gray-700 p-2.5 rounded-xl bg-[#121212] focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-200" placeholder="0 - 100" />
                </div>
                <div>
                   <label className="block text-sm font-medium mb-2 text-gray-400">Giảm số tiền cố định</label>
                  <input type="number" min="0" value={formData.discountAmount} onChange={e => setFormData({...formData, discountAmount: e.target.value})} className="w-full border border-gray-700 p-2.5 rounded-xl bg-[#121212] focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-200" placeholder="VD: 50000" />
                </div>
              </div>
              <p className="text-xs text-gray-500 -mt-2">Lưu ý: Chỉ nên nhập một trong hai loại giảm giá trên.</p>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-400">Đơn hàng tối thiểu</label>
                <input type="number" min="0" value={formData.minOrderValue} onChange={e => setFormData({...formData, minOrderValue: e.target.value})} className="w-full border border-gray-700 p-2.5 rounded-xl bg-[#121212] focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-200" placeholder="VD: 200000" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-sm font-medium mb-2 text-gray-400">Số lượng sử dụng tối đa</label>
                   <input type="number" min="1" value={formData.maxUses} onChange={e => setFormData({...formData, maxUses: e.target.value})} className="w-full border border-gray-700 p-2.5 rounded-xl bg-[#121212] focus:ring-1 focus:ring-blue-500 outline-none text-gray-200" placeholder="Bỏ trống nếu vô hạn" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-400">Trạng thái</label>
                  <select value={formData.isActive ? "true" : "false"} onChange={e => setFormData({...formData, isActive: e.target.value === "true"})} className="w-full border border-gray-700 p-2.5 rounded-xl bg-[#121212] focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-200">
                    <option value="true">Hoạt động</option>
                    <option value="false">Đã tắt</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-800 mt-6">
                <button type="button" onClick={closeModal} className="px-5 py-2.5 text-sm font-bold text-gray-400 bg-[#2A2A2A] hover:bg-[#333] hover:text-white rounded-full transition-all">
                  Hủy
                </button>
                <button type="submit" disabled={isSubmitting} className="bg-red-600 hover:bg-red-700 hover:-translate-y-0.5 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md disabled:opacity-50 disabled:hover:translate-y-0 transition-all">
                  {isSubmitting ? "Đang lưu..." : "Lưu mã giảm giá"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

