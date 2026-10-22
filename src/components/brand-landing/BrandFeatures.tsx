"use client";

import { motion } from "framer-motion";
import { Compass, Sparkles, HeartHandshake, Share2 } from "lucide-react";

export default function BrandFeatures() {
  const features = [
    {
      step: "DISCOVER",
      title: "Khám Phá",
      desc: "Tìm thấy những sản phẩm mang thông điệp ý nghĩa, hòa quyện giữa chất liệu cao cấp và cảm xúc bình an.",
      icon: Compass,
      accent: "#C5A880",
    },
    {
      step: "CONNECT",
      title: "Kết Nối",
      desc: "Hiểu sâu hơn về câu chuyện, cảm hứng Kinh Thánh và tâm huyết gửi gắm đằng sau từng đường kim mũi chỉ.",
      icon: Sparkles,
      accent: "#5B6E57",
    },
    {
      step: "EXPRESS",
      title: "Thể Hiện",
      desc: "Tự tin sống thật với niềm tin và bản sắc thuộc linh của mình qua những lựa chọn trang phục mỗi ngày.",
      icon: HeartHandshake,
      accent: "#0B1B3D",
    },
    {
      step: "SHARE",
      title: "Lan Tỏa",
      desc: "Trao tặng những món quà ý nghĩa, đem sự khích lệ và hy vọng của Chúa đến cho những người bạn yêu thương.",
      icon: Share2,
      accent: "#B85C50",
    },
  ];

  return (
    <section className="relative py-28 sm:py-36 px-4 sm:px-8 lg:px-12 bg-[#FAF7F2] dark:bg-[#0E131E] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-[0.25em] uppercase text-stone-600 dark:text-stone-300 bg-white/70 dark:bg-white/5 border border-stone-200 dark:border-white/10 shadow-sm backdrop-blur-md mb-4"
          >
            HÀNH TRÌNH TRẢI NGHIỆM · EXPERIENCE
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-3xl sm:text-5xl font-bold text-[#0B1B3D] dark:text-[#FAF8F5] leading-tight"
          >
            Trải nghiệm cùng Manna
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-400 font-light"
          >
            Bốn bước gắn kết giúp bạn tìm thấy vẻ đẹp của đức tin trong nhịp sống hằng ngày.
          </motion.p>
        </div>

        {/* 4 Glass Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.12 }}
                className="glass-panel p-8 rounded-3xl border border-white/80 dark:border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.04)] glass-card-hover flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/80 dark:bg-stone-800 border border-stone-200/50 dark:border-stone-700 flex items-center justify-center text-[#0B1B3D] dark:text-white shadow-sm mb-6 group-hover:scale-105 transition-transform duration-300">
                    <Icon className="w-5 h-5 text-[#C5A880]" />
                  </div>

                  <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C5A880] block mb-1">
                    {feat.step}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#0B1B3D] dark:text-white mb-3">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-stone-200/50 dark:border-stone-800 flex items-center justify-between text-[11px] text-stone-400 font-medium">
                  <span>Manna Touchpoint</span>
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
