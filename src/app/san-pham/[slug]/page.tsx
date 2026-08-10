import Image from "next/image";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import ProductClientDetails from "@/components/product/ProductClientDetails";
import ProductReviews from "@/components/product/ProductReviews";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let product: any = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      variants: true,
      reviews: {
        include: {
          user: {
            select: { name: true, image: true }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  });

  if (!product) {
    notFound();
  }

  const session = await getServerSession(authOptions);
  let isFavorite = false;
  let hasPurchased = false;

  const userId = (session?.user as any)?.id;
  if (userId) {
    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_productId: {
          userId,
          productId: product.id
        }
      }
    });
    isFavorite = !!favorite;

    const purchase = await prisma.order.findFirst({
      where: {
        userId,
        status: 'COMPLETED',
        items: {
          some: {
            variant: {
              productId: product.id
            }
          }
        }
      }
    });
    hasPurchased = !!purchase;
  }

  const minPrice = product.variants.length > 0 
    ? Math.min(...product.variants.map((v: any) => v.price))
    : 0;

  // Lấy ngẫu nhiên 3 sản phẩm để gợi ý (hiện tại lấy 3 sản phẩm mới nhất trừ sản phẩm hiện tại)
  const suggestedProducts = await prisma.product.findMany({
    where: { isActive: true, id: { not: product.id } },
    include: { variants: true },
    take: 3,
    orderBy: { createdAt: 'desc' }
  });
    
  const maxPrice = product.variants.length > 0 
    ? Math.max(...product.variants.map((v: any) => v.price))
    : 0;
    
  const priceDisplay = minPrice === maxPrice 
    ? `${minPrice.toLocaleString('vi-VN')}đ` 
    : `${minPrice.toLocaleString('vi-VN')}đ - ${maxPrice.toLocaleString('vi-VN')}đ`;

  return (
    <div className="container mx-auto px-4 py-12">
      <ProductClientDetails product={product} isFavorite={isFavorite} />
      
      {/* Reviews Section */}
      <ProductReviews 
        productId={product.id} 
        initialReviews={product.reviews} 
        hasPurchased={hasPurchased}
      />
    </div>
  );
}
