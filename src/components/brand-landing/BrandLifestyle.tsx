"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, Camera } from "lucide-react";

export default function BrandLifestyle() {
  const moments = [
    {
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop",
      title: "Góc Tĩnh Nguyện Bình Minh",
      desc: "Bắt đầu ngày mới với một tách trà ấm, cuốn Kinh Thánh mở sẵn và sự bình an ngập tràn trong tâm hồn.",
      tag: "MORNING SERENITY",
      colSpan: "lg:col-span-7",
      aspect: "aspect-[16/10]",
    },
    {
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
      title: "Đồng Hành Nơi Giảng Đường & Công Sở",
      desc: "Chiếc túi tote canvas đựng laptop và sổ tay, mang theo tinh thần tử tế vào từng môi trường làm việc.",
      tag: "DAILY COMMUTE",
      colSpan: "lg:col-span-5",
      aspect: "aspect-[4/3] lg:aspect-auto",
    },
    {
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop",
      title: "Hiệp Một Giữa Giới Trẻ",
      desc: "Những buổi gặp gỡ, trò chuyện và cùng chia sẻ niềm tin chân thành của thế hệ Cơ Đốc mới.",
      tag: "FELLOWSHIP",
      colSpan: "lg:col-span-5",
      aspect: "aspect-[4/3] lg:aspect-auto",
    },
    {
      image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1000&auto=format&fit=crop",
      title: "Phong Cách Tối Giản, Giá Trị Bền Vững",
      desc: "Trang phục với chất liệu cotton tự nhiên, tôn trọng cơ thể và mang thông điệp nhẹ nhàng nhưng sâu lắng.",
      tag: "TIMELESS WARDROBE",
      colSpan: "lg:col-span-7",
      aspect: "aspect-[16/10]",
    },
  ];

  return (
    <section className="relative py-28 sm:py-36 px-4 sm:px-8 lg:px-12 bg-[#FAF7F2] dark:bg-[#0B0F18] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-[0.25em] uppercase text-stone-600 dark:text-stone-300 bg-white/70 dark:bg-white/5 border border-stone-200 dark:border-white/10 shadow-sm backdrop-blur-md mb-4"
          >
            <Camera className="w-3.5 h-3.5 text-[#C5A880]" />
            LỐI SỐNG THỰC TẾ · LIFESTYLE
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-3xl sm:text-5xl font-bold text-[#0B1B3D] dark:text-[#FAF8F5] leading-tight"
          >
            Manna trong từng nhịp sống
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-400 font-light"
          >
            Cách đức tin và thẩm mỹ hiện diện tự nhiên trong không gian sống của bạn.
          </motion.p>
        </div>

        {/* Cinematic Visual Grid (Large Images, NOT Product Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {moments.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.12 }}
              className={`${item.colSpan} group relative rounded-3xl overflow-hidden glass-panel shadow-[0_20px_50px_rgba(0,0,0,0.06)] min-h-[380px] sm:min-h-[440px] flex flex-col justify-end p-6 sm:p-10`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

              {/* Tag chip */}
              <div className="absolute top-6 left-6 z-10">
                <span className="glass-pill px-3.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-stone-900 dark:text-white">
                  {item.tag}
                </span>
              </div>

              {/* Story content on image */}
              <div className="relative z-10 text-white max-w-lg">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
