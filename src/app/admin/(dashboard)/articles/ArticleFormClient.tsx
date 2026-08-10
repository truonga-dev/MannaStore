"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import TiptapEditor from "@/components/admin/TiptapEditor";
import Image from "next/image";
import { UploadCloud, X, ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

interface ArticleFormProps {
  initialData?: any;
}

export default function ArticleFormClient({ initialData }: ArticleFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    author: initialData?.author || "Admin",
    tags: initialData?.tags || "",
    coverImage: initialData?.coverImage || "",
    isPublished: initialData?.isPublished ?? true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[�Đ]/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: newTitle,
      // Only auto-generate slug if we are creating new
      slug: !initialData ? generateSlug(newTitle) : prev.slug,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleEditorChange = (content: string) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploadingImage(true);
    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);

    const toastId = toast.loading("Đang tải ảnh lên...");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Upload failed");

      const json = await res.json();
      if (json.url) {
        setFormData((prev) => ({ ...prev, coverImage: json.url }));
        toast.success("Tải ảnh thành công", { id: toastId });
      }
    } catch (error) {
      toast.error("L�i khi tải ảnh lên", { id: toastId });
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug || !formData.content) {
      toast.error("Vui lòng nhập đầy đủ Tiêu đề, Slug và Nội dung");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Đang lưu bài viết...");

    try {
      const url = initialData ? `/api/admin/articles/${initialData.id}` : "/api/admin/articles";
      const method = initialData ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Đã lưu bài viết thành công!", { id: toastId });
        router.push("/admin/articles");
        router.refresh();
      } else {
        toast.error(data.error || "Có lỗi xảy ra", { id: toastId });
      }
    } catch (error) {
      toast.error("Lỗi kết nối máy chủ", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/articles" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </Link>
          <h1 className="font-serif text-3xl font-bold text-gray-900 dark:text-white">
            {initialData ? "Chỉnh sửa Bài viết" : "Tạo Bài viết mới"}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tiêu đề <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleTitleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white transition-shadow"
                placeholder="Nhập tiêu đề bài viết..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nội dung <span className="text-red-500">*</span>
              </label>
              <TiptapEditor content={formData.content} onChange={handleEditorChange} />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tóm tắt (Excerpt)
              </label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white transition-shadow"
                placeholder="Nhập tóm tắt ngắn cho bài viết..."
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Đường dẫn (Slug) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white transition-shadow font-mono text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Ảnh đại diện
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 text-center">
                {formData.coverImage ? (
                  <div className="relative aspect-video w-full mb-3 rounded overflow-hidden">
                    <Image src={formData.coverImage} alt="Cover" fill className="object-cover" />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, coverImage: "" }))}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-md transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="py-6 flex flex-col items-center">
                    <UploadCloud className="w-10 h-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Chưa có ảnh đại diện</p>
                  </div>
                )}
                
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  ref={fileInputRef}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingImage}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors font-medium disabled:opacity-50"
                >
                  {uploadingImage ? "Đang tải..." : "Chọn ảnh"}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tác giả
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white transition-shadow"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Thẻ (Tags)
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="Ví dụ: Cầu nguyện, Chữa lành..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white transition-shadow"
              />
              <p className="text-xs text-gray-500 mt-1">Phân cách nhau bằng dấu phẩy (,)</p>
            </div>

            <div className="flex items-center gap-3 py-2">
              <input
                type="checkbox"
                id="isPublished"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleChange}
                className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="isPublished" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                Xuất bản ngay
              </label>
            </div>
            
            <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 hover:-translate-y-0.5 text-white font-bold rounded-full transition-all disabled:opacity-70 disabled:hover:translate-y-0 shadow-md"
              >
                <Save className="w-5 h-5" />
                {isSubmitting ? "Đang lưu..." : "Lưu bài viết"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

