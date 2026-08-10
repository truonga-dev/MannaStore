"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import FavoriteButton from "./FavoriteButton";

type Variant = {
  id: string;
  price: number;
  size: string | null;
  color: string | null;
};

type ProductCardProps = {
  product: {
    id: string;
    name: string;
    slug: string;
    imageUrl: string | null;
    variants: Variant[];
  };
};

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const addItem = useCartStore(state => state.addItem);
  const { data: session } = useSession();

  const minPrice = product.variants.length > 0 
    ? Math.min(...product.variants.map(v => v.price))
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to the product page
    e.stopPropagation();

    if (!session) {
      toast.error('Vui lòng đăng nhập để mua hàng');
      router.push('/dang-nhap');
      return;
    }

    if (product.variants.length === 0) return;

    if (product.variants.length === 1) {
      // Direct add to cart if only 1 variant
      const variant = product.variants[0];
      addItem({
        productId: product.id,
        variantId: variant.id,
        name: product.name,
        price: variant.price,
        quantity: 1,
        imageUrl: product.imageUrl,
        size: variant.size,
        color: variant.color
      });
      toast.success('Đã thêm vào giỏ hàng!');
    } else {
      // Go to detail page to select variant
      router.push(`/san-pham/${product.slug}`);
    }
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session) {
      toast.error('Vui lòng đăng nhập để mua hàng');
      router.push('/dang-nhap');
      return;
    }

    if (product.variants.length === 0) return;

    if (product.variants.length === 1) {
      const variant = product.variants[0];
      addItem({
        productId: product.id,
        variantId: variant.id,
        name: product.name,
        price: variant.price,
        quantity: 1,
        imageUrl: product.imageUrl,
        size: variant.size,
        color: variant.color
      });
      router.push('/thanh-toan');
    } else {
      router.push(`/san-pham/${product.slug}`);
    }
  };

  return (
    <div className="group block bg-[#0B1320] border border-transparent hover:border-gray-700 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden rounded-xl h-full flex flex-col">
      <Link href={`/san-pham/${product.slug}`} className="block relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
        {product.imageUrl ? (
          <Image 
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
        
        {/* Favorite Button Overlay */}
        <div className="absolute top-3 right-3 z-10">
          <FavoriteButton productId={product.id} />
        </div>
        
        {/* Action Buttons Overlay (Hidden by default, shown on hover) */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex justify-between gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button 
            onClick={handleAddToCart}
            className="flex-1 bg-[#0b0b0b] text-white border border-white/80 text-sm font-semibold py-2.5 px-2 rounded flex items-center justify-center gap-2 hover:bg-black transition-colors"
            title="Thêm vào giỏ"
          >
            <ShoppingCart size={16} /> Thêm
          </button>
          <button 
            onClick={handleBuyNow}
            className="flex-1 bg-white text-[#0B1320] text-sm font-semibold py-2.5 px-2 rounded hover:bg-gray-100 transition-colors"
          >
            Mua Ngay
          </button>
        </div>
      </Link>
      
      {/* Product Info */}
      <div className="p-4 flex flex-col flex-1 bg-[#0B1320]">
        <Link href={`/san-pham/${product.slug}`} className="flex-1">
          <h3 className="text-sm font-medium text-white line-clamp-2 leading-relaxed mb-3 hover:text-gray-300 transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex justify-between items-end mt-auto">
          <p className="text-white font-bold text-lg">
            {minPrice.toLocaleString('vi-VN')}đ
          </p>
        </div>
      </div>
    </div>
  );
}
