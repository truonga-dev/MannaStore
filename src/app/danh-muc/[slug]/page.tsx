import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import ProductCard from "@/components/product/ProductCard";
import { CATEGORY_MAP } from "@/lib/sampleData";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = CATEGORY_MAP[slug] || "Danh Mục";
  return {
    title: `${title} | Manna Store`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  let categoryName = CATEGORY_MAP[slug];
  if (!categoryName) {
    const category = await prisma.category.findUnique({ where: { slug } });
    if (category) {
      categoryName = category.name;
    } else {
      notFound();
    }
  }

  // Find products by category.
  // Note: in db categoryId is relational, but for fallback we just match anything we can
  let products = await prisma.product.findMany({
    where: { 
      isActive: true,
      category: { slug }
    },
    include: {
      variants: true
    },
    orderBy: { createdAt: 'desc' }
  });

  const totalDbProducts = await prisma.product.count();

  if (products.length === 0 && totalDbProducts < 10) {
    // No products found and DB seems empty. We removed mock data so it will just show empty state.
  }

  return (
    <div className="bg-[#F8F7F4] dark:bg-[#0C0C0C] min-h-screen pb-20 pt-8">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="mb-10 border-b border-gray-200 dark:border-gray-800 pb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-primary block" />
            <span className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">Danh mục</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">{categoryName}</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Khám phá các sản phẩm nổi bật nhất trong danh mục {categoryName.toLowerCase()}.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800">
            <p className="text-gray-500 dark:text-gray-400 mb-4">Hiện tại chưa có sản phẩm nào trong danh mục này.</p>
            <Link href="/san-pham" className="text-primary font-medium hover:underline">
              Xem tất cả sản phẩm
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <div key={product.id}>
                <ProductCard product={product as any} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
