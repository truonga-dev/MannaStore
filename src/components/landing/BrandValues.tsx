"use client";

import { motion } from "framer-motion";
import { BRAND_VALUES } from "./landingData";
import { Sparkles, Shield, Compass, HeartHandshake } from "lucide-react";

export default function BrandValues() {
  const icons = [Sparkles, Compass, Shield, HeartHandshake];

  return (
    <section
      id="values"
      className="relative py-28 sm:py-36 px-4 sm:px-8 lg:px-12 bg-[#FAF7F2] dark:bg-[#0D121B] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-[0.25em] uppercase text-stone-600 dark:text-stone-300 bg-white/70 dark:bg-white/5 border border-stone-200 dark:border-white/10 shadow-sm backdrop-blur-md mb-4"
          >
            GIÁ TRỊ CỐT LÕI · CORE VALUES
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-3xl sm:text-5xl font-bold text-[#0B1B3D] dark:text-[#FAF8F5] leading-tight"
          >
            Định hình từ niềm tin sâu sắc
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-400 font-light"
          >
            Bốn nguyên tắc dẫn đường trong từng quyết định thiết kế và vận hành của Manna Store.
          </motion.p>
        </div>

        {/* 4 Premium Glass Cards with 3D Depth */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BRAND_VALUES.map((val, idx) => {
            const Icon = icons[idx];
            return (
              <motion.div
                key={val.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.12 }}
                className="glass-panel p-7 sm:p-8 rounded-3xl border border-white/80 dark:border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.04)] glass-card-hover flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Big faint number in background */}
                <div className="absolute top-2 right-4 font-serif text-6xl sm:text-7xl font-bold text-stone-300/30 dark:text-white/5 pointer-events-none select-none group-hover:scale-105 transition-transform duration-500">
                  {val.number}
                </div>

                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/80 dark:bg-stone-800/80 border border-stone-200/50 dark:border-stone-700 flex items-center justify-center text-[#0B1B3D] dark:text-amber-300 shadow-sm mb-6 group-hover:bg-[#0B1B3D] group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-stone-900 transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>

                  <p className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#C5A880] mb-1">
                    {val.number} · {val.title}
                  </p>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0B1B3D] dark:text-white mb-3">
                    {val.subtitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                    {val.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-stone-200/50 dark:border-stone-800/80 flex items-center justify-between text-[11px] text-stone-400 font-medium">
                  <span>Manna Standard</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
