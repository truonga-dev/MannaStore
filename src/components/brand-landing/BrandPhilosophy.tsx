"use client";

import { motion } from "framer-motion";
import { Sparkles, Compass, Heart, Anchor } from "lucide-react";

export default function BrandPhilosophy() {
  const philosophies = [
    {
      word: "FAITH",
      vietnamese: "Đức Tin Sống Động",
      desc: "Đức tin không phải là một danh xưng trên lý thuyết. Đó là năng lực sống, là sự bình an trong tâm trí khi đối diện với bão táp, và là lòng can đảm để sống khác biệt giữa dòng đời.",
      icon: Anchor,
      tag: "CORE PILLAR 01",
    },
    {
      word: "PURPOSE",
      vietnamese: "Mục Đích Thiêng Liêng",
      desc: "Mỗi con người sinh ra đều mang trong mình một kế hoạch tốt lành của Chúa. Mỗi trang phục hay vật phẩm của Manna nhắc bạn giữ vững tâm thế làm chứng nhân và sống đời hữu ích.",
      icon: Compass,
      tag: "CORE PILLAR 02",
    },
    {
      word: "LOVE",
      vietnamese: "Tình Yêu Không Hư Mất",
      desc: "Mọi sự anh em làm, hãy làm với lòng yêu thương. Tình yêu là sợi chỉ đỏ kết nối con người với Đấng Tạo Hóa và gắn kết cộng đồng lại với nhau trong tinh thần tha thứ và phục vụ.",
      icon: Heart,
      tag: "CORE PILLAR 03",
    },
  ];

  return (
    <section
      id="philosophy"
      className="relative py-28 sm:py-36 px-4 sm:px-8 lg:px-12 bg-[#F3EFE6] dark:bg-[#0E131E] overflow-hidden"
    >
      {/* Background Soft Accent Orb */}
      <div className="absolute top-1/3 right-10 w-96 h-96 rounded-full bg-amber-200/20 dark:bg-amber-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-[0.25em] uppercase text-stone-600 dark:text-stone-300 bg-white/70 dark:bg-white/5 border border-stone-200 dark:border-white/10 shadow-sm backdrop-blur-md mb-4"
          >
            TRIẾT LÝ NỀN TẢNG · PHILOSOPHY
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-3xl sm:text-5xl font-bold text-[#0B1B3D] dark:text-[#FAF8F5] leading-tight"
          >
            Ba trụ cột tinh thần
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-400 font-light"
          >
            Khắc sâu trong từng bản thiết kế và định hình văn hóa Manna Store.
          </motion.p>
        </div>

        {/* 3 Large Editorial Statements */}
        <div className="space-y-12">
          {philosophies.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.word}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className="glass-panel rounded-3xl p-8 sm:p-14 border border-white/80 dark:border-white/10 shadow-[0_20px_50px_rgba(11,27,61,0.05)] relative overflow-hidden group"
              >
                {/* Large Background Typography Watermark */}
                <div className="absolute right-4 -bottom-6 font-serif text-6xl sm:text-9xl font-bold text-stone-300/25 dark:text-white/5 pointer-events-none select-none tracking-tight">
                  {item.word}
                </div>

                <div className="relative z-10 max-w-3xl">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-10 rounded-2xl bg-white/90 dark:bg-stone-800 flex items-center justify-center text-[#0B1B3D] dark:text-white shadow-sm">
                      <Icon className="w-5 h-5 text-[#C5A880]" />
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#C5A880]">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="font-serif text-3xl sm:text-5xl font-bold text-[#0B1B3D] dark:text-white mb-2 tracking-tight">
                    {item.word}
                    <span className="font-sans text-lg sm:text-xl font-normal text-stone-500 dark:text-stone-400 block sm:inline sm:ml-4">
                      — {item.vietnamese}
                    </span>
                  </h3>

                  <p className="mt-5 text-sm sm:text-base text-stone-700 dark:text-stone-300 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
