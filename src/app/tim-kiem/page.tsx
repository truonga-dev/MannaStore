import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import ProductCard from "@/components/product/ProductCard";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { q } = await searchParams;
  const query = typeof q === 'string' ? q : '';

  const products = await prisma.product.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: 'insensitive',
          }
        },
        {
          description: {
            contains: query,
            mode: 'insensitive',
          }
        },
        {
          slug: {
            contains: query,
            mode: 'insensitive',
          }
        }
      ]
    },
    include: {
      variants: true,
      category: true,
    }
  });

  return (
    <div className="container mx-auto px-4 py-12 min-h-[60vh]">
      <div className="mb-10 text-center">
        <h1 className="font-serif text-3xl font-bold mb-4">Kết quả tìm kiếm</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {products.length > 0 ? `Tìm thấy ${products.length} sản phẩm cho "${query}"` : `Không tìm thấy sản phẩm nào cho "${query}"`}
        </p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-xl">
          <p className="text-xl text-gray-500 mb-4">Rất tiếc, chúng tôi không tìm thấy sản phẩm nào phù hợp.</p>
          <Link href="/san-pham" className="text-primary hover:underline font-medium">
            Xem tất cả sản phẩm
          </Link>
        </div>
      )}
    </div>
  );
}
