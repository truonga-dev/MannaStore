"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

export default function BrandFinalCTA() {
  return (
    <section className="relative py-32 sm:py-48 px-4 sm:px-8 lg:px-12 bg-gradient-to-b from-[#F5F1EB] via-[#ECE5D6] to-[#E5DDD0] dark:from-[#090D15] dark:via-[#111723] dark:to-[#0B0F18] overflow-hidden flex items-center justify-center">
      {/* Warm atmospheric radiant glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[700px] sm:h-[900px] rounded-full bg-gradient-to-tr from-amber-300/30 via-orange-200/20 to-emerald-200/20 dark:from-amber-500/10 dark:via-emerald-500/5 dark:to-transparent blur-3xl pointer-events-none" />

      {/* Floating 3D Accent Card Left */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="hidden lg:block absolute -left-10 top-1/3 w-64 h-80 rounded-3xl overflow-hidden glass-panel p-3 shadow-2xl rotate-[-8deg] pointer-events-none animate-float-slow"
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

      {/* Floating 3D Accent Card Right */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="hidden lg:block absolute -right-10 bottom-1/4 w-64 h-80 rounded-3xl overflow-hidden glass-panel p-3 shadow-2xl rotate-[8deg] pointer-events-none animate-float-gentle"
      >
        <div className="relative w-full h-full rounded-2xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop"
            alt="Manna Tee"
            fill
            className="object-cover opacity-85"
            sizes="250px"
          />
        </div>
      </motion.div>

      {/* Central Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.28em] uppercase text-stone-700 dark:text-stone-300 bg-white/70 dark:bg-white/5 border border-stone-300/60 dark:border-white/10 shadow-sm backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            ĐỒNG HÀNH CÙNG MANNA
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.1 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-[#0B1B3D] dark:text-[#FAF8F5] leading-[1.08] tracking-tight"
        >
          Khám phá một cách mới <br />
          <span className="italic font-normal text-[#6B5744] dark:text-[#D4AF37]">
            để mang đức tin vào đời sống.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg text-stone-600 dark:text-stone-300 font-light max-w-lg leading-relaxed"
        >
          Bước vào thế giới Manna Store.
        </motion.p>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10"
        >
          <a
            href="https://manna-store-eight.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-[#0B1B3D] text-[#FAF8F5] hover:bg-[#15274d] dark:bg-white dark:text-[#0B1B3D] dark:hover:bg-stone-200 text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-[0_15px_35px_rgba(11,27,61,0.25)] hover:shadow-2xl hover:-translate-y-0.5"
          >
            <span>Khám phá Manna Store →</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
