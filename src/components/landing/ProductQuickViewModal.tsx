"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Sparkles, Check, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { LandingProduct } from "./landingData";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";
import Link from "next/link";

interface Props {
  product: LandingProduct | null;
  onClose: () => void;
}

export default function ProductQuickViewModal({ product, onClose }: Props) {
  const [selectedSize, setSelectedSize] = useState<string>("Freesize");
  const [isAdding, setIsAdding] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  if (!product) return null;

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem({
      productId: product.id,
      variantId: `var-${product.id}-${selectedSize}`,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.image,
      size: selectedSize,
      color: "Tiêu chuẩn"
    });

    toast.success(`Đã thêm ${product.name} vào giỏ hàng`, {
      style: {
        background: "#0B1B3D",
        color: "#F8F7F4",
        borderRadius: "999px",
        padding: "12px 24px",
        fontSize: "14px"
      },
      icon: "✨"
    });

    setTimeout(() => {
      setIsAdding(false);
    }, 600);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#0B1B3D]/40 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#FDFCF9]/95 dark:bg-[#121620]/95 backdrop-blur-2xl rounded-3xl border border-white/80 dark:border-white/10 shadow-[0_25px_70px_rgba(11,27,61,0.2)] p-6 md:p-10 z-10 text-stone-900 dark:text-stone-100"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-stone-200/50 dark:bg-stone-800/60 hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors z-20 text-stone-600 dark:text-stone-300"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Product Image Stage */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-900 border border-stone-200/50 dark:border-stone-800 shadow-inner group">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-white/80 dark:bg-stone-900/80 backdrop-blur-md text-stone-800 dark:text-stone-200 border border-white/60 dark:border-white/10 shadow-sm">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  {product.tag}
                </span>
              </div>
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-between space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-500 dark:text-stone-400 mb-2">
                  {product.category} · MANNA ESSENTIALS
                </p>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white leading-tight">
                  {product.name}
                </h3>
                <p className="text-sm text-stone-500 dark:text-stone-400 mt-1 font-medium">
                  {product.subtitle}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-3 mt-4">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1B3D] dark:text-amber-200">
                    {product.price.toLocaleString("vi-VN")}₫
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-stone-400 line-through">
                      {product.originalPrice.toLocaleString("vi-VN")}₫
                    </span>
                  )}
                </div>

                {/* Scripture Inscription Box */}
                <div className="mt-5 p-4 rounded-2xl bg-amber-500/5 dark:bg-amber-400/5 border border-amber-500/20 dark:border-amber-400/10">
                  <p className="text-xs uppercase tracking-widest font-semibold text-amber-700 dark:text-amber-300 mb-1 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    Lời Chúa Khắc Ghi
                  </p>
                  <p className="font-serif italic text-sm text-stone-700 dark:text-stone-300">
                    &ldquo;{product.verse}&rdquo;
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 text-right font-medium">
                    — {product.verseRef}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed mt-4 font-light">
                  {product.description}
                </p>

                {/* Highlights */}
                <div className="mt-4 space-y-2">
                  {product.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-400">
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-stone-200/60 dark:border-stone-800 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#0B1B3D] text-[#F8F7F4] hover:bg-[#15274d] dark:bg-white dark:text-[#0B1B3D] dark:hover:bg-stone-200 font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {isAdding ? "Đang thêm..." : "Thêm vào giỏ hàng"}
                </button>
                <Link
                  href={`/san-pham/${product.slug}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 font-medium text-sm transition-colors"
                >
                  Chi tiết tại store
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
