"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ArrowLeft, Save, UploadCloud } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function BannerFormClient({ banner }: { banner?: any }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    src: banner?.src || "",
    link: banner?.link || "",
    eyebrow: banner?.eyebrow || "",
    title: banner?.title || "",
    sub: banner?.sub || "",
    cta: banner?.cta || "",
    isActive: banner ? banner.isActive : true,
    order: banner?.order || 0,
  });

  const [imagePreview, setImagePreview] = useState<string>(banner?.src || "");
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ảnh không được vượt quá 5MB");
      return;
    }

    try {
      setIsUploading(true);
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      setImagePreview(data.url);
      setFormData({ ...formData, src: data.url });
      toast.success("Tải ảnh lên thành công!");
    } catch (error) {
      toast.error("Lỗi khi tải ảnh lên!");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.src) {
      toast.error("Vui lòng tải ảnh banner lên");
      return;
    }
    if (!formData.title) {
      toast.error("Vui lòng nhập tiêu đề");
      return;
    }

    setIsSubmitting(true);

    try {
      const url = banner ? `/api/admin/banners/${banner.id}` : "/api/admin/banners";
      const method = banner ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(banner ? "Cập nhật thành công!" : "Tạo mới thành công!");
        router.push("/admin/banners");
        router.refresh();
      } else {
        const data = await res.json();
        toast.error(data.error || "Có lỗi xảy ra!");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi hệ thống!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl pb-10">
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/banners"
          className="p-2 hover:bg-gray-800 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-400" />
        </Link>
        <h1 className="text-2xl font-medium text-gray-100">
          {banner ? "Chỉnh sửa Banner" : "Thêm Banner mới"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-[#1F2937] p-6 rounded-xl border border-gray-700 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Hình ảnh Banner *</label>
              <div className="flex items-center gap-4">
                <div className="relative w-full h-48 md:w-80 border-2 border-dashed border-gray-600 rounded-xl overflow-hidden bg-gray-800 flex items-center justify-center">
                  {imagePreview ? (
                    <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                  ) : (
                    <div className="text-gray-500 text-sm flex flex-col items-center">
                      <UploadCloud className="w-8 h-8 mb-2 opacity-50" />
                      <span>Chưa có ảnh</span>
                    </div>
                  )}
                  {isUploading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer text-sm font-medium transition-colors text-center">
                    Tải ảnh lên
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={isUploading} />
                  </label>
                  <p className="text-xs text-gray-400 w-48">Định dạng JPG, PNG, WEBP. Tối đa 5MB. Kích thước khuyên dùng: 1920x1080 (16:9)</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-4">
              <h3 className="text-lg font-medium text-gray-200 border-b border-gray-700 pb-2">Nội dung text</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Dòng chữ nhỏ trên cùng (Eyebrow)</label>
                  <input
                    type="text"
                    value={formData.eyebrow}
                    onChange={(e) => setFormData({ ...formData, eyebrow: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="VD: Bộ sưu tập mới"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Liên kết (Link)</label>
                  <input
                    type="text"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="VD: /danh-muc/ao-thun"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Tiêu đề chính (Title) *</label>
                  <textarea
                    required
                    rows={2}
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                    placeholder="VD: Mặc đức tin\nvào cuộc sống (Dùng \n để xuống dòng)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Mô tả phụ (Sub)</label>
                  <input
                    type="text"
                    value={formData.sub}
                    onChange={(e) => setFormData({ ...formData, sub: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="VD: Áo Hoodie & Áo Thun thiết kế"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Chữ nút bấm (CTA)</label>
                  <input
                    type="text"
                    value={formData.cta}
                    onChange={(e) => setFormData({ ...formData, cta: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="VD: Khám phá ngay"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-4 h-4 rounded bg-gray-800 border-gray-600 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-900"
              />
              <label htmlFor="isActive" className="text-sm font-medium text-gray-300 cursor-pointer">
                Hiển thị banner này
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <Link
            href="/admin/banners"
            className="px-6 py-2.5 rounded-full text-gray-300 hover:text-white font-medium hover:bg-gray-800 transition-colors"
          >
            Hủy
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-full font-bold shadow-lg shadow-blue-900/20 transition-all disabled:opacity-70"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save size={18} />
            )}
            {banner ? "Cập nhật" : "Lưu Banner"}
          </button>
        </div>
      </form>
    </div>
  );
}
