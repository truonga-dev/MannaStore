"use client";

import { useCartStore } from '@/store/cartStore';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface Variant {
  id: string;
  size: string | null;
  color: string | null;
  price: number;
}

interface AddToCartButtonProps {
  productId: string;
  productName: string;
  productImageUrl: string | null;
  uniqueColors: string[];
  uniqueSizes: string[];
  selectedColor: string | null;
  selectedSize: string | null;
  onColorSelect: (color: string) => void;
  onSizeSelect: (size: string) => void;
  selectedVariant: any;
}

export default function AddToCartButton({
  productId,
  productName,
  productImageUrl,
  uniqueColors,
  uniqueSizes,
  selectedColor,
  selectedSize,
  onColorSelect,
  onSizeSelect,
  selectedVariant
}: AddToCartButtonProps) {
  const addItem = useCartStore(state => state.addItem);
  const router = useRouter();
  const { data: session } = useSession();

  const handleAddToCart = () => {
    if (!session) {
      toast.error('Vui lòng đăng nhập để mua hàng');
      router.push('/dang-nhap');
      return;
    }

    if (!selectedVariant) return;
    
    addItem({
      productId,
      variantId: selectedVariant.id,
      name: productName,
      price: selectedVariant.price,
      quantity: 1,
      imageUrl: productImageUrl,
      size: selectedVariant.size,
      color: selectedVariant.color
    });
    
    toast.success('Đã thêm sản phẩm vào giỏ hàng!', {
      style: {
        border: '1px solid #10b981',
        padding: '16px',
        color: '#065f46',
      },
      iconTheme: {
        primary: '#10b981',
        secondary: '#FFFAEE',
      },
    });
  };

  const handleBuyNow = () => {
    if (!session) {
      toast.error('Vui lòng đăng nhập để mua hàng');
      router.push('/dang-nhap');
      return;
    }

    if (!selectedVariant) return;
    
    addItem({
      productId,
      variantId: selectedVariant.id,
      name: productName,
      price: selectedVariant.price,
      quantity: 1,
      imageUrl: productImageUrl,
      size: selectedVariant.size,
      color: selectedVariant.color
    });
    
    router.push('/thanh-toan');
  };

  return (
    <>
      <div className="mb-8 border-t border-b border-gray-200 dark:border-gray-800 py-6">
        
        {uniqueColors.length > 0 && (
          <div className="mb-6">
            <h3 className="font-bold uppercase tracking-wider text-sm mb-3 text-gray-900 dark:text-gray-100">Màu sắc: <span className="font-normal text-gray-500">{selectedColor}</span></h3>
            <div className="flex flex-wrap gap-2">
              {uniqueColors.map(color => (
                <button 
                  key={color} 
                  onClick={() => onColorSelect(color)}
                  className={`px-4 py-2 border rounded-md text-sm transition-all ${
                    selectedColor === color 
                      ? 'border-red-600 text-red-600 bg-red-50 dark:bg-red-900/20' 
                      : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        {uniqueSizes.length > 0 && (
          <div>
            <h3 className="font-bold uppercase tracking-wider text-sm mb-3 text-gray-900 dark:text-gray-100">Kích thước: <span className="font-normal text-gray-500">{selectedSize}</span></h3>
            <div className="flex flex-wrap gap-2">
              {uniqueSizes.map(size => (
                <button 
                  key={size} 
                  onClick={() => onSizeSelect(size)}
                  className={`min-w-[3rem] px-4 py-2 border rounded-md text-sm font-medium transition-all ${
                    selectedSize === size 
                      ? 'border-red-600 text-red-600 bg-red-50 dark:bg-red-900/20' 
                      : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {uniqueColors.length === 0 && uniqueSizes.length === 0 && (
          <div className="text-sm text-gray-500">
            Sản phẩm không có biến thể
          </div>
        )}

        {!selectedVariant && (uniqueColors.length > 0 || uniqueSizes.length > 0) && (
          <div className="mt-4 text-sm text-red-500">
            * Phân loại này hiện không có sẵn, vui lòng chọn phân loại khác.
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <button 
          onClick={handleAddToCart}
          disabled={!selectedVariant}
          className="flex-1 bg-transparent border border-red-600 text-red-600 py-3 font-bold uppercase tracking-wider hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-full text-sm"
        >
          Thêm Vào Giỏ
        </button>
        <button 
          onClick={handleBuyNow}
          disabled={!selectedVariant}
          className="flex-1 bg-red-600 text-white py-3 font-bold uppercase tracking-wider hover:bg-red-700 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 rounded-full shadow-md hover:shadow-lg text-sm"
        >
          Mua Ngay
        </button>
      </div>
    </>
  );
}
