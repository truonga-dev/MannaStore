"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Quote, CheckCircle, Heart } from "lucide-react";
import { TESTIMONIALS, LIFESTYLE_GALLERY } from "./landingData";

export default function SocialProof() {
  return (
    <section className="relative py-28 sm:py-36 px-4 sm:px-8 lg:px-12 bg-[#F5F2EB] dark:bg-[#0B0E17] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-[0.25em] uppercase text-stone-600 dark:text-stone-300 bg-white/70 dark:bg-white/5 border border-stone-200 dark:border-white/10 shadow-sm backdrop-blur-md mb-4"
          >
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" />
            CỘNG ĐỒNG & CHIA SẺ · COMMUNITY
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-3xl sm:text-5xl font-bold text-[#0B1B3D] dark:text-[#FAF8F5] leading-tight"
          >
            Manna trong đời sống thật.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-400 font-light"
          >
            Những khoảnh khắc tự nhiên khi đức tin đồng hành cùng nhịp sống hàng ngày của các bạn trẻ.
          </motion.p>
        </div>

        {/* Visual Lifestyle Gallery Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {LIFESTYLE_GALLERY.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden glass-panel shadow-md"
            >
              <Image
                src={item.image}
                alt={item.caption}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[9px] uppercase tracking-widest font-semibold text-amber-200 block mb-0.5">
                  {item.tag}
                </span>
                <p className="text-xs font-serif font-medium leading-snug">
                  {item.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 3 Authentic Glass Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              className="glass-panel p-7 rounded-3xl border border-white/80 dark:border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.04)] flex flex-col justify-between glass-card-hover"
            >
              <div>
                {/* Rating Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-stone-300 dark:text-stone-700" />
                </div>

                {/* Quote Text */}
                <p className="font-serif italic text-sm sm:text-base text-stone-800 dark:text-stone-200 leading-relaxed font-light">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author & Verification */}
              <div className="mt-6 pt-5 border-t border-stone-200/50 dark:border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white shadow-sm shrink-0">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                      {t.name}
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500/10" />
                    </h4>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400">
                      {t.location} · {t.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note on Authenticity */}
        <p className="mt-8 text-center text-[11px] text-stone-400 uppercase tracking-widest font-mono">
          Nội dung mẫu phản hồi thực tế từ cộng đồng tín hữu Manna Store
        </p>
      </div>
    </section>
  );
}
