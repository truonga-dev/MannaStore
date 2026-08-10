"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProduct } from "@/app/actions/product";
import { Upload, Plus, Trash2, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { RichTextEditor } from "@/components/ui/RichTextEditor";
import Link from "next/link";
import { generateSlug } from "@/lib/utils";

export default function EditProductForm({ product, categories }: { product: any, categories: any[] }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: product.name,
    slug: product.slug,
    description: product.description || "",
    categoryId: product.categoryId || "",
    isActive: product.isActive,
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(product.imageUrl || "");

  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>(product.images || []);
  const [existingImages, setExistingImages] = useState<string[]>(product.images || []);
  const [variants, setVariants] = useState(product.variants.length > 0 ? product.variants : [
    { id: "", size: "", color: "", price: 0, stockQuantity: 0 }
  ]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = generateSlug(name);
    setFormData({ ...formData, name, slug });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setGalleryFiles([...galleryFiles, ...files]);
      setGalleryPreviews([...galleryPreviews, ...files.map(f => URL.createObjectURL(f))]);
    }
  };

  const removeGalleryImage = (index: number) => {
    // If it's an existing image, remove it from existingImages
    if (index < existingImages.length) {
      const newExisting = [...existingImages];
      newExisting.splice(index, 1);
      setExistingImages(newExisting);
    } else {
      // It's a newly added file
      const fileIndex = index - existingImages.length;
      const newFiles = [...galleryFiles];
      newFiles.splice(fileIndex, 1);
      setGalleryFiles(newFiles);
    }

    const newPreviews = [...galleryPreviews];
    newPreviews.splice(index, 1);
    setGalleryPreviews(newPreviews);
  };

  const addVariant = () => {
    setVariants([...variants, { id: "", size: "", color: "", price: 0, stockQuantity: 0 }]);
  };

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_: any, i: number) => i !== index));
  };

  const updateVariant = (index: number, field: string, value: string | number) => {
    const newVariants = [...variants];
    newVariants[index] = { ...newVariants[index], [field]: value };
    setVariants(newVariants);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      let imageUrl = product.imageUrl;
      
      // Upload image first if changed
      if (imageFile) {
        const uploadData = new FormData();
        uploadData.append("file", imageFile);
        
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });
        
        const uploadResult = await uploadRes.json();
        if (uploadResult.url) {
          imageUrl = uploadResult.url;
        }
      }

      let images: string[] = [...existingImages];
      if (galleryFiles.length > 0) {
        for (const file of galleryFiles) {
          const uploadData = new FormData();
          uploadData.append("file", file);
          const uploadRes = await fetch("/api/upload", {
            method: "POST",
            body: uploadData,
          });
          const uploadResult = await uploadRes.json();
          if (uploadResult.url) {
            images.push(uploadResult.url);
          }
        }
      }

      // Update product
      const res = await updateProduct(product.id, {
        ...formData,
        imageUrl,
        images,
        variants: variants.map((v: any) => ({
          ...v,
          price: Number(v.price),
          stockQuantity: Number(v.stockQuantity)
        }))
      });

      if (res.success) {
        toast.success("Cập nhật sản phẩm thành công!");
        router.push("/admin/products");
      } else {
        toast.error("Lỗi: " + res.error);
      }
    } catch (error) {
        toast.error("Đã xảy ra lỗi");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-10">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/products" className="p-2 text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="font-serif text-2xl font-bold">Chỉnh Sửa Sản Phẩm</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Thông tin cơ bản */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-lg shadow-sm">
          <h2 className="font-bold text-lg mb-4 pb-2 border-b dark:border-gray-800">Thông tin cơ bản</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Tên sản phẩm *</label>
                <input required type="text" value={formData.name} onChange={handleNameChange} className="w-full border dark:border-gray-700 p-2.5 rounded bg-transparent focus:ring-1 focus:ring-primary outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Đường dẫn tĩnh (Slug) *</label>
                <input required type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full border dark:border-gray-700 p-2.5 rounded bg-gray-50 dark:bg-gray-800 focus:ring-1 focus:ring-primary outline-none" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Danh mục</label>
                <select value={formData.categoryId} onChange={e => setFormData({...formData, categoryId: e.target.value})} className="w-full border dark:border-gray-700 p-2.5 rounded bg-transparent dark:bg-gray-900 focus:ring-1 focus:ring-primary outline-none">
                  <option value="">Chọn danh mục...</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Trạng thái hiển thị</label>
                <select value={formData.isActive ? "true" : "false"} onChange={e => setFormData({...formData, isActive: e.target.value === "true"})} className="w-full border dark:border-gray-700 p-2.5 rounded bg-transparent dark:bg-gray-900 focus:ring-1 focus:ring-primary outline-none">
                  <option value="true">Hiển thị</option>
                  <option value="false">Ẩn</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Mô tả</label>
              <RichTextEditor value={formData.description} onChange={val => setFormData({...formData, description: val})} />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Ảnh đại diện</label>
              <div className="flex items-center gap-4">
                {imagePreview ? (
                  <div className="relative w-24 h-24 border rounded overflow-hidden">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-24 h-24 border-2 border-dashed rounded flex flex-col items-center justify-center text-gray-400 bg-gray-50 dark:bg-gray-800">
                    <Upload size={24} />
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handleImageChange} className="flex-1 border p-2 rounded" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Thư viện ảnh (Các màu khác, góc chụp khác)</label>
              <div className="flex flex-col gap-4">
                <input type="file" accept="image/*" multiple onChange={handleGalleryChange} className="border p-2 rounded" />
                {galleryPreviews.length > 0 && (
                  <div className="flex flex-wrap gap-4 mt-2">
                    {galleryPreviews.map((preview, index) => (
                      <div key={index} className="relative w-24 h-24 border rounded overflow-hidden group">
                        <img src={preview} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                        <button type="button" onClick={() => removeGalleryImage(index)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Biến thể */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4 pb-2 border-b dark:border-gray-800">
            <h2 className="font-bold text-lg">Biến thể (Size/Màu) & Giá</h2>
            <button type="button" onClick={addVariant} className="text-sm flex items-center gap-1 text-primary font-medium hover:underline">
              <Plus size={16} /> Thêm biến thể
            </button>
          </div>
          
          <div className="space-y-4">
            {variants.map((variant: any, index: number) => (
              <div key={index} className="flex gap-4 items-end bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md border border-gray-100 dark:border-gray-800">
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">Kích thước</label>
                  <input type="text" placeholder="S, M, L..." value={variant.size || ''} onChange={(e) => updateVariant(index, 'size', e.target.value)} className="w-full border p-2 rounded text-sm bg-transparent" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">Màu sắc</label>
                  <input type="text" placeholder="Đỏ, Xanh..." value={variant.color || ''} onChange={(e) => updateVariant(index, 'color', e.target.value)} className="w-full border p-2 rounded text-sm bg-transparent" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">Giá bán *</label>
                  <input required type="number" value={variant.price || ''} onChange={(e) => updateVariant(index, 'price', e.target.value)} className="w-full border p-2 rounded text-sm bg-transparent" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">Tồn kho *</label>
                  <input required type="number" value={variant.stockQuantity || ''} onChange={(e) => updateVariant(index, 'stockQuantity', e.target.value)} className="w-full border p-2 rounded text-sm bg-transparent" />
                </div>
                {variants.length > 1 && (
                  <button type="button" onClick={() => removeVariant(index)} className="p-2 text-red-500 hover:bg-red-50 rounded">
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Link href="/admin/products" className="px-5 py-2.5 text-sm font-bold text-gray-400 bg-[#2A2A2A] hover:bg-[#333] hover:text-white rounded-full transition-all flex items-center justify-center">
            Hủy
          </Link>
          <button type="submit" disabled={isSubmitting} className="bg-red-600 hover:bg-red-700 hover:-translate-y-0.5 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md disabled:opacity-50 disabled:hover:translate-y-0 transition-all">
            {isSubmitting ? "Đang lưu..." : "Cập Nhật Sản Phẩm"}
          </button>
        </div>
      </form>
    </div>
  );
}
