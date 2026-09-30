"use client";

import { motion } from "framer-motion";
import { Anchor, Compass, ShieldCheck, Heart } from "lucide-react";

export default function BrandVision() {
  const visionElements = [
    {
      icon: Anchor,
      title: "FAITH",
      subtitle: "Đức Tin",
      desc: "Không phải chỉ là niềm tin giấu kín trong lòng, mà là kim chỉ nam cho cách ta suy nghĩ, hành động và sống mỗi ngày.",
      color: "from-amber-400/15 to-transparent",
      accent: "#C5A880",
    },
    {
      icon: Compass,
      title: "PURPOSE",
      subtitle: "Mục Đích",
      desc: "Mọi sản phẩm, mọi việc ta làm đều hướng về sự vinh hiển của Chúa và phục vụ tha nhân bằng sự tận tụy.",
      color: "from-emerald-400/15 to-transparent",
      accent: "#5B6E57",
    },
    {
      icon: ShieldCheck,
      title: "HOPE",
      subtitle: "Hy Vọng",
      desc: "Lời nhắc nhở về sự cứu rỗi và tương lai bình an ngay giữa những thăng trầm và lo âu của thế giới hiện đại.",
      color: "from-blue-400/15 to-transparent",
      accent: "#0B1B3D",
    },
    {
      icon: Heart,
      title: "LOVE",
      subtitle: "Yêu Thương",
      desc: "Nền tảng tối cao và động lực lớn nhất. Yêu thương Chúa và yêu thương mọi người chung quanh ta vô điều kiện.",
      color: "from-rose-400/15 to-transparent",
      accent: "#B85C50",
    },
  ];

  return (
    <section
      id="vision"
      className="relative py-28 sm:py-36 px-4 sm:px-8 lg:px-12 bg-[#F5F1EB] dark:bg-[#090D15] overflow-hidden"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-amber-100/30 dark:bg-amber-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Editorial Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-[0.25em] uppercase text-stone-600 dark:text-stone-300 bg-white/70 dark:bg-white/5 border border-stone-200 dark:border-white/10 shadow-sm backdrop-blur-md mb-4"
          >
            TẦM NHÌN DỰ ÁN · THE VISION
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-[#0B1B3D] dark:text-[#FAF8F5] leading-tight"
          >
            “Để đức tin không chỉ <br />
            được nói ra, <br />
            <span className="italic font-normal text-[#6B5744] dark:text-[#D4AF37]">
              mà được sống ra.”
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 text-stone-600 dark:text-stone-400 text-sm sm:text-base font-light leading-relaxed"
          >
            Manna Store được xây dựng như một nguồn cảm hứng hằng ngày, giúp mỗi người trẻ Cơ Đốc sống trọn vẹn với bốn giá trị nền tảng:
          </motion.p>
        </div>

        {/* 4 Floating Glass Elements */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visionElements.map((el, idx) => {
            const Icon = el.icon;
            return (
              <motion.div
                key={el.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.12 }}
                className="glass-panel p-7 rounded-3xl border border-white/80 dark:border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.04)] glass-card-hover flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/80 dark:bg-stone-800/80 border border-stone-200/50 dark:border-stone-700 flex items-center justify-center text-[#0B1B3D] dark:text-white shadow-sm mb-6">
                    <Icon className="w-5 h-5" />
                  </div>

                  <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#C5A880] mb-1">
                    {el.title}
                  </p>
                  <h3 className="font-serif text-2xl font-bold text-[#0B1B3D] dark:text-white mb-3">
                    {el.subtitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                    {el.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-stone-200/50 dark:border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
                  <span>Manna Vision</span>
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
