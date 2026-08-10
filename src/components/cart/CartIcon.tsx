"use client";

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function CartIcon() {
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore((state) => state.totalItems());
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!session) {
      toast.error("Vui lòng đăng nhập để xem giỏ hàng");
      router.push('/dang-nhap');
    } else {
      router.push('/gio-hang');
    }
  };

  return (
    <button onClick={handleClick} className="p-2 hover:bg-black/5 rounded-full transition-colors relative">
      <ShoppingBag className="w-5 h-5 text-primary" />
      {mounted && totalItems > 0 && (
        <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </button>
  );
}
