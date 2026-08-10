import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit, Trash2 } from "lucide-react";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      variants: true,
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="pb-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium text-gray-100">Quản lý Sản Phẩm</h1>
        <Link href="/admin/products/new" className="flex items-center gap-2 bg-red-600 hover:bg-red-700 hover:-translate-y-0.5 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md transition-all">
          <Plus size={18} />
          Thêm Sản Phẩm
        </Link>
      </div>

      <div className="bg-[#1E1E1E] border border-gray-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="p-4 font-semibold uppercase tracking-wider text-xs text-gray-500">Sản phẩm</th>
                <th className="p-4 font-semibold uppercase tracking-wider text-xs text-gray-500">Danh mục</th>
                <th className="p-4 font-semibold uppercase tracking-wider text-xs text-gray-500">Trạng thái</th>
                <th className="p-4 font-semibold uppercase tracking-wider text-xs text-gray-500">Biến thể</th>
                <th className="p-4 font-semibold uppercase tracking-wider text-xs text-gray-500 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    Chưa có sản phẩm nào.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-800/50 hover:bg-[#2A2A2A]/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg bg-gray-800 overflow-hidden border border-gray-700">
                          {product.imageUrl ? (
                            <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full bg-gray-800"></div>
                          )}
                        </div>
                        <div className="font-medium text-gray-200">{product.name}</div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-400">
                      {product.category?.name || "---"}
                    </td>
                    <td className="p-4">
                      <span className={`flex items-center gap-1.5 w-fit text-xs font-medium ${
                        product.isActive ? 'text-emerald-400' : 'text-gray-400'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          product.isActive ? 'bg-emerald-400' : 'bg-gray-400'
                        }`}></div>
                        {product.isActive ? 'Hiện' : 'Ẩn'}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-400">
                      <div className="flex flex-col">
                        <span className="text-gray-200">{product.variants.length} loại</span>
                        <span className="text-xs">
                          Kho: {product.variants.reduce((acc, curr) => acc + curr.stockQuantity, 0)}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/products/${product.id}`} className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors" title="Chỉnh sửa">
                          <Edit size={16} />
                        </Link>
                        <button className="p-2 text-red-500 hover:bg-red-500/20 rounded-lg transition-colors" title="Xóa">
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
    </div>
  );
}

