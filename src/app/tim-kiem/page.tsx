import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { q } = await searchParams;
  const query = typeof q === 'string' ? q : '';

  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: query,
        // mode: 'insensitive' is not supported in SQLite, but we can do a standard contains
      }
    },
    include: {
      variants: true
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => {
          const minPrice = product.variants.length > 0 
            ? Math.min(...product.variants.map(v => v.price))
            : 0;
            
          return (
            <Link href={`/san-pham/${product.slug}`} key={product.id} className="group block">
              <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-gray-100 rounded-lg">
                {product.imageUrl && (
                  <Image 
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                )}
              </div>
              <div className="text-center">
                <h3 className="font-medium text-lg mb-1 group-hover:text-primary transition-colors line-clamp-2 px-2">{product.name}</h3>
                <p className="text-gray-600 font-serif font-semibold text-lg">
                  {minPrice.toLocaleString('vi-VN')}đ
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  );
}
