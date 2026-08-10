"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

interface FavoriteButtonProps {
  productId: string;
  initialIsFavorite?: boolean;
}

export default function FavoriteButton({ productId, initialIsFavorite = false }: FavoriteButtonProps) {
  const { data: session, status } = useSession();
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      fetch(`/api/favorites/check?productId=${productId}`)
        .then(res => res.json())
        .then(data => {
          if (data.isFavorite !== undefined) {
            setIsFavorite(data.isFavorite);
          }
        })
        .catch(err => console.error(err));
    }
  }, [status, productId]);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session) {
      toast.error("Vui lòng đăng nhập để lưu sản phẩm");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      if (!res.ok) throw new Error("Lỗi khi cập nhật yêu thích");
      
      const data = await res.json();
      const newIsFavorite = data.action === 'added';
      setIsFavorite(newIsFavorite);
      
      if (newIsFavorite) {
        toast.success("Đã thêm vào danh sách yêu thích");
      } else {
        toast.success("Đã xóa khỏi danh sách yêu thích");
      }
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      disabled={loading}
      className={`absolute top-3 right-3 p-2 rounded-full z-10 transition-colors shadow-sm ${
        isFavorite 
          ? "bg-white text-red-500 hover:bg-red-50" 
          : "bg-white/80 text-gray-500 hover:bg-white hover:text-red-500 backdrop-blur-sm"
      }`}
      title={isFavorite ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
    >
      <Heart 
        size={20} 
        className={`transition-all ${isFavorite ? "fill-red-500 scale-110" : "scale-100"}`} 
      />
    </button>
  );
}
