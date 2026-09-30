"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Compass } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative py-32 sm:py-44 px-4 sm:px-8 lg:px-12 bg-gradient-to-b from-[#F5F2EB] via-[#EFE9DD] to-[#ECE5D6] dark:from-[#0B0E17] dark:via-[#111723] dark:to-[#090D14] overflow-hidden flex items-center justify-center">
      {/* Warm atmospheric light spheres */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[700px] sm:h-[900px] rounded-full bg-gradient-to-tr from-amber-300/30 via-orange-200/20 to-emerald-200/20 dark:from-amber-500/10 dark:via-emerald-500/5 dark:to-transparent blur-3xl pointer-events-none" />

      {/* Floating 3D Accent Card (Left Background) */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="hidden lg:block absolute -left-12 top-1/3 w-64 h-80 rounded-3xl overflow-hidden glass-panel p-3 shadow-2xl rotate-[-8deg] pointer-events-none animate-float-slow"
      >
        <div className="relative w-full h-full rounded-2xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=600&auto=format&fit=crop"
            alt="Prayer Journal"
            fill
            className="object-cover opacity-85"
            sizes="250px"
          />
        </div>
      </motion.div>

      {/* Floating 3D Accent Card (Right Background) */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="hidden lg:block absolute -right-12 bottom-1/4 w-64 h-80 rounded-3xl overflow-hidden glass-panel p-3 shadow-2xl rotate-[8deg] pointer-events-none animate-float-gentle"
      >
        <div className="relative w-full h-full rounded-2xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop"
            alt="Manna T-Shirt"
            fill
            className="object-cover opacity-85"
            sizes="250px"
          />
        </div>
      </motion.div>

      {/* Central Content Box */}
      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
        {/* Subtle pill tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.25em] uppercase text-stone-700 dark:text-stone-300 bg-white/70 dark:bg-white/5 border border-stone-300/60 dark:border-white/10 shadow-sm backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            BẮT ĐẦU HÔM NAY · START YOUR JOURNEY
          </span>
        </motion.div>

        {/* Big Dual-Line Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.1 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-[#0B1B3D] dark:text-[#FAF8F5] leading-[1.08] tracking-tight"
        >
          Mặc điều bạn tin. <br />
          <span className="italic font-normal text-[#6B5744] dark:text-[#D4AF37]">
            Sống điều bạn tin.
          </span>
        </motion.h2>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-7 text-base sm:text-lg text-stone-600 dark:text-stone-300 font-light max-w-xl leading-relaxed"
        >
          Khám phá những thiết kế được tạo nên để đồng hành cùng đời sống đức tin
          mỗi ngày — để từng khoảnh khắc đều trở thành cơ hội làm vinh hiển Danh Ngài.
        </motion.p>

        {/* Dual Conversion Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
        >
          {/* Primary CTA */}
          <Link
            href="/san-pham"
            className="group inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full bg-[#0B1B3D] text-[#FAF8F5] hover:bg-[#15274d] dark:bg-white dark:text-[#0B1B3D] dark:hover:bg-stone-200 text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-[0_15px_35px_rgba(11,27,61,0.25)] hover:shadow-[0_20px_45px_rgba(11,27,61,0.35)] hover:-translate-y-0.5"
          >
            <span>Khám phá Manna Store</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Secondary CTA */}
          <a
            href="#collection"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/70 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 text-stone-800 dark:text-stone-200 text-sm font-medium tracking-wider uppercase border border-stone-300/80 dark:border-white/10 backdrop-blur-md transition-all duration-300 shadow-sm"
          >
            <span>Xem bộ sưu tập</span>
            <Compass className="w-4 h-4 text-stone-500" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
