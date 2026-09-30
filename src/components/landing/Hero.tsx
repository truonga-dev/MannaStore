"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Compass } from "lucide-react";
import Link from "next/link";
import Hero3DComposition from "./Hero3DComposition";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-28 sm:pt-32 pb-16 px-4 sm:px-8 lg:px-12 overflow-hidden bg-gradient-to-b from-[#FBF9F5] via-[#FAF7F2] to-[#F5F1EA] dark:from-[#0B101B] dark:via-[#0F1422] dark:to-[#0B0F18]">
      {/* Ambient background soft light gradients */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-amber-100/50 dark:bg-amber-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] rounded-full bg-stone-200/40 dark:bg-emerald-500/5 blur-3xl pointer-events-none" />

      {/* Subtle organic texture grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Editorial Headline & Copy */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="lg:col-span-7 flex flex-col items-start text-left max-w-2xl"
        >
          {/* Small Top Pill Label */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.25em] uppercase text-stone-700 dark:text-stone-300 bg-white/70 dark:bg-stone-900/70 border border-white/80 dark:border-white/10 shadow-[0_2px_10px_rgba(0,0,0,0.03)] backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-ping" />
              MANNA STORE · CHRISTIAN LIFESTYLE
            </span>
          </motion.div>

          {/* Headline with Serif Typography */}
          <motion.h1
            variants={itemVariants}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#0B1B3D] dark:text-[#F8F7F4] leading-[1.08] sm:leading-[1.06]"
          >
            Trang bị đức tin <br />
            <span className="italic font-normal text-[#6B5744] dark:text-[#D4AF37] relative inline-block">
              vào từng ngày.
              {/* Elegant underline flourish */}
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-[#C5A880]/40 dark:text-[#D4AF37]/30"
                viewBox="0 0 300 12"
                fill="none"
              >
                <path
                  d="M2 9C70 3 230 3 298 9"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h1>

          {/* Supporting Copy */}
          <motion.p
            variants={itemVariants}
            className="mt-7 text-base sm:text-lg text-stone-600 dark:text-stone-300 font-light leading-relaxed max-w-xl"
          >
            Những sản phẩm mang thông điệp đức tin, bình an và hy vọng — để
            những điều bạn tin được hiện diện tự nhiên trong từng khoảnh khắc
            của cuộc sống.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            {/* Primary CTA */}
            <a
              href="#collection"
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#0B1B3D] text-[#FAF8F5] hover:bg-[#15274d] dark:bg-white dark:text-[#0B1B3D] dark:hover:bg-stone-200 text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-[0_15px_30px_rgba(11,27,61,0.2)] hover:shadow-[0_20px_40px_rgba(11,27,61,0.3)] hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Khám phá bộ sưu tập</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Secondary CTA */}
            <Link
              href="/san-pham"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/60 dark:bg-white/5 hover:bg-white/90 dark:hover:bg-white/10 text-stone-800 dark:text-stone-200 text-sm font-medium tracking-wider uppercase border border-stone-200 dark:border-white/10 backdrop-blur-md transition-all duration-300 shadow-sm hover:shadow"
            >
              <span>Xem sản phẩm</span>
              <Compass className="w-4 h-4 text-stone-500" />
            </Link>
          </motion.div>

          {/* Micro Trust Indicators */}
          <motion.div
            variants={itemVariants}
            className="mt-12 pt-8 border-t border-stone-300/50 dark:border-white/10 flex flex-wrap items-center gap-6 sm:gap-8 text-xs text-stone-500 dark:text-stone-400"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#5B6E57]" />
              <span className="font-medium">Chất liệu cao cấp</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
              <span className="font-medium">Thiết kế Cơ Đốc độc bản</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0B1B3D] dark:bg-stone-300" />
              <span className="font-medium">1,000+ Bạn trẻ đồng hành</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: 3D Product Composition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="lg:col-span-5 relative w-full flex items-center justify-center"
        >
          <Hero3DComposition />
        </motion.div>
      </div>
    </section>
  );
}
