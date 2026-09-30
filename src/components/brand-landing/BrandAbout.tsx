"use client";

import { motion } from "framer-motion";
import { Sparkles, Feather, Compass } from "lucide-react";

export default function BrandAbout() {
  return (
    <section
      id="about"
      className="relative py-28 sm:py-36 px-4 sm:px-8 lg:px-12 bg-[#FAF7F2] dark:bg-[#0E131E] overflow-hidden"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Top Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold tracking-[0.28em] uppercase text-stone-600 dark:text-stone-300 bg-white/70 dark:bg-white/5 border border-stone-200/80 dark:border-white/10 shadow-sm backdrop-blur-md">
            <Feather className="w-3.5 h-3.5 text-[#C5A880]" />
            GIỚI THIỆU DỰ ÁN · ABOUT
          </span>
        </motion.div>

        {/* Section Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-[#0B1B3D] dark:text-[#FAF8F5] leading-tight"
        >
          Manna Store là gì?
        </motion.h2>

        {/* Main Editorial Glass Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.2 }}
          className="mt-12 w-full glass-panel p-8 sm:p-14 rounded-3xl relative overflow-hidden border border-white/80 dark:border-white/10 shadow-[0_20px_50px_rgba(11,27,61,0.06)]"
        >
          {/* Subtle Watermark Cross */}
          <div className="absolute top-4 right-8 font-serif text-8xl text-stone-300/30 dark:text-white/5 pointer-events-none select-none font-light">
            †
          </div>

          <p className="font-serif text-xl sm:text-3xl text-[#0B1B3D] dark:text-stone-100 font-normal leading-relaxed italic max-w-3xl mx-auto">
            &ldquo;Manna Store là một Christian Lifestyle Brand hướng đến việc đưa những giá trị của đức tin vào những điều rất gần gũi trong cuộc sống.&rdquo;
          </p>

          <div className="w-16 h-[1.5px] bg-[#C5A880] mx-auto my-8" />

          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 font-light leading-relaxed max-w-2xl mx-auto">
            Chúng tôi sinh ra từ mong muốn tạo nên những ấn phẩm và trang phục đương đại mà bất kỳ ai theo Chúa đều tự hào khoác lên mình. Không khoa trương, không gượng ép — chỉ là những thông điệp chân thật, nhắc nhở ta về tình yêu thương, niềm hy vọng và sự bình an trong từng bước đi mỗi ngày.
          </p>
        </motion.div>

        {/* 3 Conceptual Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-panel p-6 rounded-2xl text-left border border-white/70 dark:border-white/10"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A880] block mb-2">
              01 · NGUỒN CẢM HỨNG
            </span>
            <h4 className="font-serif text-lg font-bold text-[#0B1B3D] dark:text-white mb-2">
              Kinh Thánh & Đời Thường
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-400 font-light leading-relaxed">
              Mỗi câu chữ và đường nét đều khởi nguồn từ những lời hứa vĩnh cửu trong Lời Chúa.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-panel p-6 rounded-2xl text-left border border-white/70 dark:border-white/10"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#5B6E57] block mb-2">
              02 · PHONG CÁCH
            </span>
            <h4 className="font-serif text-lg font-bold text-[#0B1B3D] dark:text-white mb-2">
              Tối Giản & Tinh Tế
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-400 font-light leading-relaxed">
              Thiết kế theo ngôn ngữ thẩm mỹ hiện đại, dễ dàng hòa vào phong cách sống mỗi ngày.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass-panel p-6 rounded-2xl text-left border border-white/70 dark:border-white/10"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#0B1B3D] dark:text-stone-300 block mb-2">
              03 · SỨ MỆNH
            </span>
            <h4 className="font-serif text-lg font-bold text-[#0B1B3D] dark:text-white mb-2">
              Lan Tỏa Đức Tin
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-400 font-light leading-relaxed">
              Trở thành chiếc cầu nối giúp chia sẻ niềm tin một cách ấm áp và tự nhiên nhất.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
