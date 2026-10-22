"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Feather, Sun, Heart, Sparkles } from "lucide-react";
import { SCRIPTURE_TABS } from "./landingData";

export default function ChristianMessage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="relative py-28 sm:py-36 px-4 sm:px-8 lg:px-12 bg-gradient-to-b from-[#F3EFE6] via-[#F8F5EE] to-[#FAF7F2] dark:from-[#0B0F17] dark:via-[#0E131E] dark:to-[#0D121B] overflow-hidden">
      {/* Sunlight beam atmospheric gradient effect */}
      <div className="absolute -top-32 left-1/3 w-[500px] h-[500px] bg-gradient-to-b from-amber-200/30 via-amber-100/10 to-transparent blur-3xl pointer-events-none -rotate-12" />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Minimal Cross Motif */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8 flex flex-col items-center"
        >
          <div className="relative w-8 h-12 flex items-center justify-center opacity-70">
            <div className="w-[1.5px] h-full bg-[#0B1B3D] dark:bg-[#C5A880]" />
            <div className="absolute top-3 w-7 h-[1.5px] bg-[#0B1B3D] dark:bg-[#C5A880]" />
          </div>
          <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-stone-500 dark:text-stone-400 mt-3">
            SUY NGẪM & TĨNH LẶNG
          </span>
        </motion.div>

        {/* Section Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-[#0B1B3D] dark:text-[#FAF8F5] leading-tight max-w-2xl"
        >
          &ldquo;Đức tin được sống ra <br className="hidden sm:inline" />
          trong những điều rất bình thường.&rdquo;
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-stone-600 dark:text-stone-400 text-sm sm:text-base font-light max-w-lg leading-relaxed"
        >
          Không cần những lời đao to búa lớn. Chỉ cần một tâm lòng yêu thương,
          sự chính trực trong công việc và nếp sống soi chiếu ánh sáng bình an của Chúa.
        </motion.p>

        {/* Meditative Scripture Card with Frosted Glass & Linen Texture */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.3 }}
          className="mt-12 w-full glass-panel rounded-3xl p-8 sm:p-12 border border-white/80 dark:border-white/10 shadow-[0_20px_60px_rgba(11,27,61,0.06)] relative overflow-hidden"
        >
          {/* Tabs for interchangeable Scriptures */}
          <div className="flex flex-wrap justify-center gap-2 mb-8 border-b border-stone-200/60 dark:border-stone-800 pb-5">
            {SCRIPTURE_TABS.map((tab, idx) => (
              <button
                key={tab.reference}
                onClick={() => setActiveTab(idx)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
                  activeTab === idx
                    ? "bg-[#0B1B3D] text-white dark:bg-white dark:text-stone-900 shadow-md"
                    : "text-stone-600 dark:text-stone-400 hover:bg-stone-200/50 dark:hover:bg-stone-800/50"
                }`}
              >
                {tab.reference}
              </button>
            ))}
          </div>

          {/* Active Scripture Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center"
            >
              <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#0B1B3D] dark:text-[#F8F7F4] font-medium italic leading-relaxed max-w-2xl">
                &ldquo;{SCRIPTURE_TABS[activeTab].verse}&rdquo;
              </p>

              <div className="w-12 h-[1px] bg-[#C5A880] my-6" />

              <p className="text-xs uppercase tracking-[0.25em] font-bold text-stone-500 dark:text-stone-400">
                {SCRIPTURE_TABS[activeTab].reference}
              </p>

              <p className="mt-3 text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-light max-w-md">
                {SCRIPTURE_TABS[activeTab].context}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
