'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';

export default function FavoritesList({ favorites }: { favorites: any[] }) {
  if (!favorites || favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Bạn chưa yêu thích sản phẩm nào</h3>
        <p className="text-gray-500 mt-2 mb-6">Hãy lướt xem các sản phẩm và nhấn yêu thích để lưu lại nhé.</p>
        <Link href="/san-pham" className="inline-flex items-center justify-center bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition">
          <ShoppingBag className="w-5 h-5 mr-2" />
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {favorites.map((fav) => (
        <div key={fav.id} className="group relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
          <div className="aspect-[4/5] relative overflow-hidden bg-gray-100 dark:bg-gray-800">
            <Image
              src={fav.product.imageUrl || '/placeholder.png'}
              alt={fav.product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500 shadow-sm hover:bg-red-50 transition-colors z-10">
              <Heart className="w-5 h-5 fill-current" />
            </button>
          </div>
          <div className="p-5">
            <Link href={`/san-pham/${fav.product.slug}`} className="block group-hover:text-primary transition-colors">
              <h3 className="font-serif font-bold text-lg text-gray-900 dark:text-white truncate">{fav.product.name}</h3>
            </Link>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{fav.product.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
