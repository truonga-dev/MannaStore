import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";

export default async function FavoritesPage() {
  const session = await getServerSession(authOptions);

  if (!session || !(session.user as any)?.id) {
    redirect('/dang-nhap');
  }

  const favorites = await prisma.favorite.findMany({
    where: {
      userId: (session.user as any).id
    },
    include: {
      product: {
        include: {
          variants: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10 border-b border-gray-200 dark:border-gray-800 pb-4">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Sản Phẩm Yêu Thích</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Danh sách các sản phẩm bạn đã lưu.
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p>Bạn chưa có sản phẩm yêu thích nào.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {favorites.map((favorite) => (
            <div key={favorite.id}>
              <ProductCard product={favorite.product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
