"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Sparkles, MessageCircle, ShieldCheck, HeartHandshake, Compass, ArrowRight } from "lucide-react";
import { SHOWCASE_CARDS } from "./landingData";
import Link from "next/link";

export default function Product3DShowcase() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const activeCard = SHOWCASE_CARDS[activeCardIndex];

  return (
    <section className="relative py-28 sm:py-36 px-4 sm:px-8 lg:px-12 bg-[#F8F5EE] dark:bg-[#090D15] overflow-hidden">
      {/* Background Soft Atmospheric Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-amber-200/20 via-emerald-200/10 to-transparent dark:from-amber-500/5 dark:via-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-[0.25em] uppercase text-stone-600 dark:text-stone-300 bg-white/70 dark:bg-white/5 border border-stone-200 dark:border-white/10 shadow-sm backdrop-blur-md mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            THÔNG ĐIỆP ĐỨC TIN · 3D SHOWCASE
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-3xl sm:text-5xl font-bold text-[#0B1B3D] dark:text-[#FAF8F5] leading-tight"
          >
            Những thông điệp vượt thời gian
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-400 font-light"
          >
            Khám phá ý nghĩa Kinh Thánh và tâm huyết sáng tạo được lồng ghép sau mỗi sản phẩm.
          </motion.p>
        </div>

        {/* 3D Showcase Arena: Center Product Stage + Orbiting Glass Message Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left / Center: Interactive 3D Product Stage (Col 7) */}
          <div className="lg:col-span-7 relative flex items-center justify-center">
            {/* Center Product Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="relative w-full max-w-[460px] aspect-[4/5] rounded-3xl overflow-hidden glass-panel p-4 shadow-[0_30px_70px_rgba(11,27,61,0.12)] group"
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-stone-200 dark:bg-stone-900">
                <Image
                  src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop"
                  alt="Manna 3D Showcase Hoodie"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 460px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                {/* Bottom label on hero image */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-amber-300 font-semibold block">
                      HERO SHOWCASE
                    </span>
                    <h3 className="font-serif text-2xl font-bold">
                      Áo Hoodie &quot;Grace&quot;
                    </h3>
                  </div>
                  <Link
                    href="/san-pham/ao-hoodie-grace"
                    className="p-3 rounded-full bg-white text-stone-900 hover:bg-stone-100 transition-colors shadow-lg"
                    aria-label="Xem sản phẩm"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Floating Orbiting Mini Badges */}
              <div className="absolute -top-4 -left-4 glass-panel px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-wider text-stone-900 dark:text-white uppercase shadow-lg animate-float-gentle">
                ✦ 100% Organic Cotton
              </div>
              <div className="absolute -bottom-4 -right-4 glass-panel px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-wider text-stone-900 dark:text-white uppercase shadow-lg animate-float-slow">
                ✦ Thêu 3D Tinh Xảo
              </div>
            </motion.div>
          </div>

          {/* Right: Orbiting Message Cards (Col 5) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {SHOWCASE_CARDS.map((card, idx) => {
              const isActive = activeCardIndex === idx;
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  onClick={() => setActiveCardIndex(idx)}
                  className={`cursor-pointer rounded-2xl p-5 transition-all duration-400 border ${
                    isActive
                      ? "glass-panel border-[#0B1B3D]/30 dark:border-white/30 shadow-[0_15px_35px_rgba(11,27,61,0.1)] scale-[1.02]"
                      : "bg-white/40 dark:bg-stone-900/30 hover:bg-white/70 dark:hover:bg-stone-900/60 border-stone-200/60 dark:border-white/5 opacity-80 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#C5A880]">
                      {card.label}
                    </span>
                    <span className="text-xs font-serif italic text-stone-500">
                      {card.reference}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0B1B3D] dark:text-white">
                    {card.title}
                  </h3>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden mt-3 pt-3 border-t border-stone-200/60 dark:border-stone-800"
                      >
                        <p className="text-xs italic text-stone-600 dark:text-stone-300 font-serif mb-2">
                          &ldquo;{card.scripture}&rdquo;
                        </p>
                        <p className="text-xs text-stone-500 dark:text-stone-400 font-light leading-relaxed">
                          {card.significance}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
