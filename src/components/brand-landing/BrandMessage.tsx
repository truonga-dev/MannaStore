"use client";

import { motion } from "framer-motion";
import { Feather } from "lucide-react";

export default function BrandMessage() {
  return (
    <section className="relative py-32 sm:py-44 px-4 sm:px-8 lg:px-12 bg-gradient-to-b from-[#FAF7F2] via-[#F4EFE6] to-[#FAF7F2] dark:from-[#0B0F18] dark:via-[#090D15] dark:to-[#0E131E] overflow-hidden flex items-center justify-center">
      {/* Sunlight beam & ethereal ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-amber-200/20 via-stone-200/20 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Subtle Minimal Cross Symbol */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10 flex flex-col items-center"
        >
          <div className="relative w-8 h-14 flex items-center justify-center opacity-60">
            <div className="w-[1.5px] h-full bg-[#0B1B3D] dark:bg-[#C5A880]" />
            <div className="absolute top-4 w-7 h-[1.5px] bg-[#0B1B3D] dark:bg-[#C5A880]" />
          </div>
          <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-stone-500 dark:text-stone-400 mt-3">
            THÔNG ĐIỆP BÌNH AN · THE MESSAGE
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-[#0B1B3D] dark:text-[#FAF8F5] leading-tight"
        >
          &ldquo;Đức tin hiện diện <br />
          trong những điều rất bình thường.&rdquo;
        </motion.h2>

        {/* Poetic Supporting Stanza */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.2 }}
          className="mt-10 p-8 sm:p-12 glass-panel rounded-3xl border border-white/80 dark:border-white/10 shadow-[0_20px_50px_rgba(11,27,61,0.05)] max-w-xl mx-auto"
        >
          <div className="space-y-2 font-serif text-lg sm:text-2xl text-stone-800 dark:text-stone-200 italic font-light leading-relaxed">
            <p>Có thể là một chiếc áo.</p>
            <p>Một cuốn sách.</p>
            <p>Một món quà.</p>
            <p>Một lời nhắc nhở.</p>
          </div>

          <div className="w-12 h-[1px] bg-[#C5A880] mx-auto my-6" />

          <p className="font-serif text-lg sm:text-xl font-medium text-[#0B1B3D] dark:text-[#D4AF37]">
            Nhưng phía sau mỗi điều nhỏ bé <br />
            là một niềm tin lớn.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
