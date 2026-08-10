"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const { items, updateQuantity, removeItem, totalPrice } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center min-h-[50vh] flex flex-col items-center justify-center">
        <h1 className="font-serif text-3xl font-bold mb-4">Giỏ hàng của bạn đang trống</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Hãy khám phá các sản phẩm ý nghĩa tại Manna Store nhé.</p>
        <Link 
          href="/danh-muc/thoi-trang" 
          className="bg-primary text-primary-foreground px-8 py-3 font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
        >
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-serif text-3xl md:text-4xl font-bold mb-10 border-b border-gray-200 pb-4">Giỏ Hàng</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 border-b border-gray-200 pb-6">
              <div className="relative w-24 h-32 bg-gray-100 flex-shrink-0">
                {item.imageUrl && (
                  <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                )}
              </div>
              
              <div className="flex-1 flex flex-col justify-between w-full">
                <div className="flex justify-between items-start mb-2">
                  <div className="w-full">
                    <h3 className="font-medium text-lg leading-tight mb-2 line-clamp-2">{item.name}</h3>
                    {(item.size || item.color) && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 inline-block px-2 py-1 rounded">
                        Phân Loại Hàng: {[item.size, item.color].filter(Boolean).join(', ')}
                      </p>
                    )}
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors ml-4 whitespace-nowrap text-sm font-medium"
                  >
                    Xóa
                  </button>
                </div>
                
                <div className="flex justify-between items-end mt-4">
                  <p className="font-semibold text-gray-500 line-through text-sm mr-2 hidden sm:block">
                    {/* Placeholder for original price if any */}
                  </p>
                  <p className="font-semibold text-lg text-primary mr-auto">
                    {item.price.toLocaleString('vi-VN')}đ
                  </p>
                  
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                      <button 
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border-r border-gray-300"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-10 h-8 flex items-center justify-center text-sm bg-white dark:bg-gray-900 border-x-0">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border-l border-gray-300"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="font-medium text-sm text-primary hidden sm:block">
                      {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 dark:bg-gray-900 p-6 h-fit border border-gray-100 dark:border-gray-800 rounded-lg">
          <h2 className="font-bold uppercase tracking-wider text-lg mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">Tóm tắt đơn hàng</h2>
          
          <div className="flex justify-between mb-4 text-gray-600 dark:text-gray-400">
            <span>Tạm tính</span>
            <span>{totalPrice().toLocaleString('vi-VN')}đ</span>
          </div>
          <div className="flex justify-between mb-6 text-gray-600 dark:text-gray-400">
            <span>Phí giao hàng</span>
            <span>Tính ở bước thanh toán</span>
          </div>
          
          <div className="flex justify-between mb-8 border-t border-gray-200 dark:border-gray-800 pt-4 font-bold text-xl">
            <span>Tổng cộng</span>
            <span className="text-primary">{totalPrice().toLocaleString('vi-VN')}đ</span>
          </div>
          
          <Link 
            href="/thanh-toan"
            className="w-full flex justify-center items-center bg-primary text-primary-foreground py-4 font-bold uppercase tracking-wider hover:opacity-90 transition-opacity rounded-md"
          >
            Tiến Hành Thanh Toán <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
