"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { FEATURED_PRODUCTS, CATEGORIES_DATA } from "./landingData";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: Props) {
  const [query, setQuery] = useState("");

  if (!isOpen) return null;

  const filteredProducts = query.trim()
    ? FEATURED_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.verse.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-12 pt-20 sm:pt-28">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#0B1B3D]/30 backdrop-blur-md"
        />

        {/* Modal dialog */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-2xl bg-white/95 dark:bg-[#121620]/95 backdrop-blur-2xl rounded-3xl border border-white/80 dark:border-white/10 shadow-[0_25px_70px_rgba(11,27,61,0.2)] p-6 z-10 text-stone-900 dark:text-stone-100"
        >
          {/* Header & input */}
          <div className="flex items-center gap-3 border-b border-stone-200 dark:border-stone-800 pb-4">
            <Search className="w-5 h-5 text-stone-400" />
            <input
              type="text"
              autoFocus
              placeholder="Tìm áo thun, hoodie, sổ tay, câu Kinh Thánh..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-base sm:text-lg font-medium placeholder:text-stone-400"
            />
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick tags */}
          <div className="py-4">
            <p className="text-xs uppercase tracking-widest text-stone-400 font-semibold mb-2">
              Từ khóa phổ biến
            </p>
            <div className="flex flex-wrap gap-2">
              {["Salt & Light", "Grace", "Shalom", "Kinh Thánh", "Chosen", "Hoodie"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1 rounded-full text-xs bg-stone-100 dark:bg-stone-800/60 hover:bg-stone-200 text-stone-700 dark:text-stone-300 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="max-h-72 overflow-y-auto space-y-2 pt-2">
            {query.trim() && filteredProducts.length === 0 ? (
              <p className="text-sm text-stone-400 text-center py-8">
                Không tìm thấy kết quả phù hợp cho &ldquo;{query}&rdquo;
              </p>
            ) : (
              filteredProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/san-pham/${p.slug}`}
                  onClick={onClose}
                  className="flex items-center justify-between p-3 rounded-2xl hover:bg-stone-100 dark:hover:bg-stone-800/50 transition-colors group"
                >
                  <div>
                    <h4 className="font-serif text-sm font-semibold group-hover:text-primary transition-colors">
                      {p.name}
                    </h4>
                    <p className="text-xs text-stone-500">{p.subtitle}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-sm font-medium text-stone-900 dark:text-amber-200">
                      {p.price.toLocaleString("vi-VN")}₫
                    </span>
                    <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))
            )}
          </div>

          {/* Direct link to store search */}
          <div className="mt-4 pt-3 border-t border-stone-200/60 dark:border-stone-800 flex justify-between items-center text-xs text-stone-400">
            <span>Nhấn Enter để mở cửa hàng trực tuyến</span>
            <Link
              href={`/san-pham?search=${encodeURIComponent(query)}`}
              onClick={onClose}
              className="inline-flex items-center gap-1 text-[#0B1B3D] dark:text-amber-300 font-semibold hover:underline"
            >
              Xem tất cả tại Store <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
