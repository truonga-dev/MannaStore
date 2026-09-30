"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export default function BrandExperienceFlow() {
  const steps = [
    {
      num: "01",
      step: "DISCOVER",
      title: "Nhận Biết",
      desc: "Gặp gỡ một thương hiệu Cơ Đốc với ngôn ngữ thẩm mỹ hiện đại và tinh tế.",
    },
    {
      num: "02",
      step: "EXPLORE",
      title: "Thấu Hiểu",
      desc: "Lắng nghe câu chuyện Lời Chúa và triết lý được gửi gắm trong từng thiết kế.",
    },
    {
      num: "03",
      step: "CONNECT",
      title: "Đồng Điệu",
      desc: "Tìm thấy tiếng nói chung giữa phong cách cá nhân và niềm tin sắt son nơi Chúa.",
    },
    {
      num: "04",
      step: "EXPERIENCE",
      title: "Sống Trọn",
      desc: "Đưa đức tin vào từng khoảnh khắc đời thường qua những gì bạn mặc và trao tặng.",
    },
  ];

  return (
    <section
      id="experience"
      className="relative py-28 sm:py-36 px-4 sm:px-8 lg:px-12 bg-[#F5F1EB] dark:bg-[#090D15] overflow-hidden"
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
            DÒNG TRẢI NGHIỆM · THE FLOW
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-3xl sm:text-5xl font-bold text-[#0B1B3D] dark:text-[#FAF8F5] leading-tight"
          >
            Hành trình từ khám phá đến đời sống
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-400 font-light"
          >
            Cách Manna Store đồng hành cùng bạn trên từng chặng đường đức tin.
          </motion.p>
        </div>

        {/* Horizontal Flow Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Subtle connecting line across desktop */}
          <div className="hidden md:block absolute top-1/2 left-8 right-8 h-[1px] bg-stone-300/60 dark:bg-stone-800 -translate-y-1/2 pointer-events-none -z-0" />

          {steps.map((item, idx) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              className="glass-panel p-8 rounded-3xl border border-white/80 dark:border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.04)] glass-card-hover flex flex-col justify-between relative z-10"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="w-10 h-10 rounded-2xl bg-[#0B1B3D] dark:bg-white text-white dark:text-[#0B1B3D] font-mono text-xs font-bold flex items-center justify-center shadow-md">
                    {item.num}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C5A880]">
                    {item.step}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#0B1B3D] dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-200/50 dark:border-stone-800 flex items-center justify-between text-xs text-stone-400">
                <span>Bước {idx + 1} / 4</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
