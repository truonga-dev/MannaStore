"use client";

import { motion } from "framer-motion";
import { Sparkles, Compass, Feather } from "lucide-react";

export default function BrandStatement() {
  const pillars = [
    {
      num: "01",
      title: "Nhắc Nhớ",
      english: "REMIND",
      desc: "Một lời khuyên dạy, một câu Kinh Thánh thân quen được dệt khéo léo vào nếp sống mỗi sớm mai.",
    },
    {
      num: "02",
      title: "Hiện Diện",
      english: "EMBODY",
      desc: "Đức tin không xa rời thực tế; đức tin bước cùng bạn trên giảng đường, nơi văn phòng và các chuyến đi.",
    },
    {
      num: "03",
      title: "Lan Tỏa",
      english: "RADIATE",
      desc: "Trở thành nguồn khích lệ kín giấu và ánh sáng bình an cho những ai hữu duyên gặp gỡ bạn.",
    },
  ];

  return (
    <section
      id="statement"
      className="relative py-28 sm:py-36 px-6 sm:px-10 lg:px-16 bg-[#FAF7F2] dark:bg-[#0D121B] overflow-hidden"
    >
      {/* Decorative ambient warm orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-amber-200/20 via-stone-200/20 to-transparent dark:from-amber-500/5 dark:via-transparent blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Editorial Subtitle Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-stone-600 dark:text-stone-300 bg-white/60 dark:bg-white/5 border border-stone-200/70 dark:border-white/10 backdrop-blur-md">
            <Feather className="w-3.5 h-3.5 text-[#C5A880]" />
            TRIẾT LÝ THƯƠNG HIỆU · PHILOSOPHY
          </span>
        </motion.div>

        {/* Large Statement Headlines */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="space-y-3"
        >
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-stone-500 dark:text-stone-400 tracking-tight leading-tight">
            Không chỉ là một sản phẩm.
          </h2>
          <h3 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-[#0B1B3D] dark:text-[#F8F7F4] tracking-tight leading-tight">
            Đó là một lời nhắc nhở về điều bạn tin.
          </h3>
        </motion.div>

        {/* Floating Minimalist Glass Prism Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="my-12 sm:my-16 w-full max-w-3xl glass-panel p-8 sm:p-12 rounded-3xl relative overflow-hidden"
        >
          {/* Subtle cross watermark */}
          <div className="absolute top-4 right-6 text-stone-300/40 dark:text-white/5 pointer-events-none select-none font-serif text-8xl font-light">
            †
          </div>

          <p className="font-serif text-lg sm:text-2xl text-stone-800 dark:text-stone-200 font-light leading-relaxed max-w-2xl mx-auto italic">
            &ldquo;Manna Store hướng đến những sản phẩm giúp đức tin trở thành
            một phần tự nhiên trong đời sống hằng ngày — từ những gì bạn mặc đến
            những gì bạn đọc và trao tặng.&rdquo;
          </p>
        </motion.div>

        {/* 3 Pillars Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full mt-4">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.num}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              className="glass-panel p-6 sm:p-8 rounded-2xl text-left border border-white/80 dark:border-white/10 glass-card-hover group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-serif text-xs font-bold text-[#C5A880] tracking-widest">
                  {pillar.num}
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-stone-400 group-hover:text-stone-700 dark:group-hover:text-stone-200 transition-colors">
                  {pillar.english}
                </span>
              </div>
              <h4 className="font-serif text-xl font-bold text-[#0B1B3D] dark:text-white mb-2">
                {pillar.title}
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-light">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
