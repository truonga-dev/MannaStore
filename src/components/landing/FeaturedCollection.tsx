"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, ShoppingBag, Sparkles } from "lucide-react";
import { FEATURED_PRODUCTS, LandingProduct } from "./landingData";
import ProductQuickViewModal from "./ProductQuickViewModal";

export default function FeaturedCollection() {
  const [selectedProduct, setSelectedProduct] = useState<LandingProduct | null>(null);

  const heroItem = FEATURED_PRODUCTS[0]; // Salt & Light Tee (Prominent item)
  const secondaryItems = FEATURED_PRODUCTS.slice(1);

  return (
    <section
      id="collection"
      className="relative py-28 sm:py-36 px-4 sm:px-8 lg:px-12 bg-[#FAF7F2] dark:bg-[#0E131E] overflow-hidden"
    >
      {/* Ambient background soft light */}
      <div className="absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-amber-100/40 dark:bg-amber-400/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-[0.25em] uppercase text-stone-600 dark:text-stone-300 bg-white/70 dark:bg-white/5 border border-stone-200 dark:border-white/10 shadow-sm backdrop-blur-md mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5B6E57]" />
              BUILT FOR EVERYDAY FAITH
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#0B1B3D] dark:text-[#FAF8F5] leading-tight">
              Essentials Collection
            </h2>
            <p className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-400 font-light">
              Tuyển tập những thiết kế biểu tượng, mang vẻ đẹp tối giản cùng lời nhắc nhở thiêng liêng.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 md:mt-0"
          >
            <Link
              href="/san-pham"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0B1B3D] dark:bg-white text-white dark:text-[#0B1B3D] text-xs uppercase tracking-widest font-semibold hover:bg-[#15284d] dark:hover:bg-stone-200 transition-all shadow"
            >
              <span>Xem toàn bộ cửa hàng</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Overlapping Visual Composition: 1 Spotlight Hero Product + 3 Companion Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Spotlight Hero Product (Col 7) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85 }}
            className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative group shadow-[0_20px_50px_rgba(11,27,61,0.06)]"
          >
            {/* Tag chip */}
            <div className="flex items-center justify-between mb-4">
              <span className="glass-pill px-3.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-stone-900 dark:text-white flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-500" />
                {heroItem.tag}
              </span>
              <span className="font-serif text-xs text-stone-500 italic">
                {heroItem.verseRef}
              </span>
            </div>

            {/* Big High-Res Showcase Image */}
            <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-900 border border-stone-200/50 dark:border-stone-800">
              <Image
                src={heroItem.image}
                alt={heroItem.name}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />

              {/* Hover Quick Action Buttons */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                <button
                  onClick={() => setSelectedProduct(heroItem)}
                  className="px-5 py-2.5 rounded-full bg-white/90 text-stone-900 text-xs font-semibold uppercase tracking-wider backdrop-blur-md shadow-lg hover:bg-white transition-all transform hover:scale-105 flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Xem nhanh
                </button>
                <Link
                  href={`/san-pham/${heroItem.slug}`}
                  className="px-5 py-2.5 rounded-full bg-[#0B1B3D] text-white text-xs font-semibold uppercase tracking-wider shadow-lg hover:bg-[#15284d] transition-all transform hover:scale-105 flex items-center gap-2"
                >
                  <ArrowRight className="w-4 h-4" />
                  Chi tiết
                </Link>
              </div>
            </div>

            {/* Product Meta */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400 font-medium">
                  {heroItem.subtitle}
                </p>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white mt-1">
                  {heroItem.name}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-light mt-2 max-w-md line-clamp-2">
                  {heroItem.description}
                </p>
              </div>

              <div className="flex flex-col items-start sm:items-end shrink-0">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1B3D] dark:text-amber-200">
                  {heroItem.price.toLocaleString("vi-VN")}₫
                </span>
                <button
                  onClick={() => setSelectedProduct(heroItem)}
                  className="mt-2 inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#0B1B3D] dark:text-stone-300 hover:underline"
                >
                  <span>Khám phá sản phẩm</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Secondary Companion Products (Col 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {secondaryItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className="glass-panel rounded-2xl p-4 sm:p-5 flex items-center gap-5 glass-card-hover group cursor-pointer"
                onClick={() => setSelectedProduct(item)}
              >
                {/* Thumbnail */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-900 shrink-0 border border-stone-200/50 dark:border-stone-800">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="130px"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-stone-500 dark:text-stone-400 block mb-1">
                    {item.category}
                  </span>
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-stone-900 dark:text-white truncate">
                    {item.name}
                  </h4>
                  <p className="text-xs text-stone-500 dark:text-stone-400 italic truncate mt-0.5">
                    &ldquo;{item.verse}&rdquo;
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-serif text-base sm:text-lg font-bold text-[#0B1B3D] dark:text-amber-200">
                      {item.price.toLocaleString("vi-VN")}₫
                    </span>
                    <span className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 group-hover:bg-[#0B1B3D] group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-stone-900 transition-colors flex items-center justify-center text-stone-600 dark:text-stone-300">
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <ProductQuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
