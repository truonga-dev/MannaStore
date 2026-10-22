"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Heart, Compass } from "lucide-react";

export default function LifestyleStory() {
  return (
    <section
      id="story"
      className="relative py-28 sm:py-36 px-4 sm:px-8 lg:px-12 bg-[#F3EFE6] dark:bg-[#0B0F17] overflow-hidden"
    >
      {/* Background Soft Accent Glow */}
      <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full bg-emerald-100/30 dark:bg-emerald-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Cinematic Lifestyle Imagery with Glass Overlays (Col 6) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="lg:col-span-6 relative"
        >
          {/* Main Large Image Container */}
          <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden glass-panel p-3 shadow-[0_25px_60px_rgba(11,27,61,0.08)]">
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop"
                alt="Manna Lifestyle and Quiet Time"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Overlapping Floating Glass Metric Badge */}
            <div className="absolute bottom-8 left-8 right-8 glass-panel rounded-2xl p-5 border border-white/80 dark:border-white/20 shadow-xl backdrop-blur-xl">
              <div className="grid grid-cols-3 gap-4 text-center divide-x divide-stone-200 dark:divide-stone-700">
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1B3D] dark:text-white">
                    1K+
                  </p>
                  <p className="text-[10px] uppercase tracking-widest text-stone-500 dark:text-stone-400 mt-0.5">
                    Tín Hữu
                  </p>
                </div>
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1B3D] dark:text-white">
                    50+
                  </p>
                  <p className="text-[10px] uppercase tracking-widest text-stone-500 dark:text-stone-400 mt-0.5">
                    Thiết Kế
                  </p>
                </div>
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-[#5B6E57] dark:text-emerald-400 flex items-center justify-center gap-1">
                    4.9 <Star className="w-4 h-4 fill-current inline" />
                  </p>
                  <p className="text-[10px] uppercase tracking-widest text-stone-500 dark:text-stone-400 mt-0.5">
                    Đánh Giá
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Overlapping Floating Glass Polaroids */}
          <div className="hidden sm:block absolute -top-8 -right-6 w-44 h-44 rounded-2xl overflow-hidden glass-panel p-2 shadow-2xl border border-white/80 dark:border-white/10 animate-float-gentle">
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=400&auto=format&fit=crop"
                alt="Prayer Notebook"
                fill
                className="object-cover"
                sizes="180px"
              />
            </div>
          </div>
        </motion.div>

        {/* Right Column: Editorial Narrative & Typography (Col 6) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          className="lg:col-span-6 flex flex-col items-start"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-[1px] bg-[#C5A880] block" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#0B1B3D] dark:text-stone-300">
              HÀNH TRÌNH TÂM LINH & PHONG CÁCH
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#0B1B3D] dark:text-[#FAF8F5] leading-tight">
            Được tạo nên từ đức tin.
          </h2>

          <div className="mt-8 space-y-5 text-stone-700 dark:text-stone-300 text-sm sm:text-base font-light leading-relaxed">
            <p className="font-serif text-lg sm:text-xl italic text-stone-900 dark:text-stone-100 font-normal">
              &ldquo;Manna Store không chỉ hướng đến việc tạo ra những sản phẩm
              đẹp. Mỗi thiết kế là một cách để nhắc nhớ về đức tin, hy vọng, tình
              yêu và hành trình bước đi với Đấng Christ.&rdquo;
            </p>
            <p>
              Chúng tôi tin rằng Cơ Đốc nhân không cần phải thỏa hiệp giữa gu thẩm
              mỹ hiện đại và bản sắc thuộc linh. Một chiếc áo phông mang câu Kinh
              Thánh được thiết kế tinh tế có thể trở thành chủ đề của một cuộc trò
              chuyện đầy ý nghĩa tại quán cà phê hay nơi công sở.
            </p>
            <p>
              Từ cuốn sổ tay ghi lại những lời cầu nguyện thầm lặng lúc bình minh
              cho đến chiếc ly sứ thân quen trên bàn làm việc — từng chi tiết nhỏ
              đều góp phần gìn giữ tâm hồn bạn được an nhiên giữa những ồn ào của
              thế giới.
            </p>
          </div>

          {/* Core Commitments List */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <div className="p-4 rounded-2xl glass-panel border border-white/70 dark:border-white/10">
              <span className="font-serif text-base font-bold text-[#0B1B3D] dark:text-white block mb-1">
                Tận Tâm Từng Thước Vải
              </span>
              <span className="text-xs text-stone-600 dark:text-stone-400 font-light">
                Cotton dệt mật độ cao, độ co rút dưới 2%, giữ form hoàn hảo.
              </span>
            </div>
            <div className="p-4 rounded-2xl glass-panel border border-white/70 dark:border-white/10">
              <span className="font-serif text-base font-bold text-[#0B1B3D] dark:text-white block mb-1">
                Thông Điệp Vĩnh Cửu
              </span>
              <span className="text-xs text-stone-600 dark:text-stone-400 font-light">
                Khắc ghi Lời Hằng Sống, nâng đỡ và khích lệ người đối diện.
              </span>
            </div>
          </div>

          {/* CTA Link */}
          <div className="mt-10">
            <Link
              href="/ve-chung-toi"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#0B1B3D] dark:bg-white text-white dark:text-[#0B1B3D] hover:bg-[#15274d] dark:hover:bg-stone-200 text-xs uppercase tracking-widest font-semibold transition-all shadow-md hover:shadow-lg"
            >
              <span>Câu chuyện của Manna</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
