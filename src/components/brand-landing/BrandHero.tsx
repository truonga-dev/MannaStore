"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Sparkles, Compass } from "lucide-react";

export default function BrandHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCollection, setActiveCollection] = useState(0);

  const collections = [
    {
      image: "/banners/banner2_v2.jpg",
      tag: "THE PATH COLLECTION",
      title: "The Way · The Truth · The Life",
      subtitle: "Áo nỉ thêu thủ công cùng Kinh Thánh cổ & Thánh giá gỗ",
      badge: "FAITH × FASHION",
      badgeSub: "Embroidered Heritage",
    },
    {
      image: "/banners/banner1_v2.jpg",
      tag: "GRACE & MIRACLES",
      title: "God Does Miracles",
      subtitle: "Áo hoodie nỉ bông tối giản trên bục đá khắc biểu tượng bồ câu",
      badge: "SACRED STREETWEAR",
      badgeSub: "Daily Encouragement",
    },
    {
      image: "/banners/banner3_v2.jpg",
      tag: "THE COVENANT DROP",
      title: "Cross & Clay — Jesus",
      subtitle: "Tone màu đất tự nhiên lấy cảm hứng từ biểu tượng Ichthys",
      badge: "MEANINGFUL CRAFT",
      badgeSub: "Washed Heritage Cotton",
    },
  ];

  // Auto-cycle through the 3 signature drops every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCollection((prev) => (prev + 1) % collections.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [collections.length]);

  // Mouse coordinate motion values for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-9, 9]);

  const fgX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const fgY = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);

  const bgX = useTransform(smoothX, [-0.5, 0.5], [6, -6]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], [6, -6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-28 sm:pt-36 pb-20 px-4 sm:px-8 lg:px-12 bg-gradient-to-b from-[#FBF9F5] via-[#FAF7F2] to-[#F5F1EB] dark:from-[#0B101B] dark:via-[#0F1422] dark:to-[#0B0F18] overflow-hidden"
    >
      {/* Ambient background soft light spheres */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-amber-100/40 dark:bg-amber-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[550px] h-[550px] rounded-full bg-stone-200/40 dark:bg-emerald-500/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Brand Statement & Editorial Headlines */}
        <div className="lg:col-span-7 flex flex-col items-start text-left max-w-2xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.28em] uppercase text-stone-700 dark:text-stone-300 bg-white/70 dark:bg-stone-900/70 border border-white/80 dark:border-white/10 shadow-sm backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-ping" />
              MANNA STORE · CHRISTIAN LIFESTYLE
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#0B1B3D] dark:text-[#F8F7F4] leading-[1.08]"
          >
            Trang bị đức tin <br />
            <span className="italic font-normal text-[#6B5744] dark:text-[#D4AF37] relative inline-block">
              vào từng ngày.
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-[#C5A880]/40 dark:text-[#D4AF37]/30"
                viewBox="0 0 300 12"
                fill="none"
              >
                <path
                  d="M2 9C70 3 230 3 298 9"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h1>

          {/* Supporting Copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-7 text-base sm:text-lg text-stone-600 dark:text-stone-300 font-light leading-relaxed max-w-xl"
          >
            Những sản phẩm mang thông điệp đức tin, bình an và hy vọng — để những điều bạn tin được hiện diện trong từng khoảnh khắc của cuộc sống.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            <a
              href="https://manna-store-eight.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Khám phá"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#0B1B3D] text-[#FAF8F5] hover:bg-[#15274d] dark:bg-white dark:text-[#0B1B3D] dark:hover:bg-stone-200 text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-[0_15px_30px_rgba(11,27,61,0.18)] hover:shadow-xl hover:-translate-y-0.5"
            >
              <span>Khám phá bộ sưu tập</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#about"
              data-cursor="Câu chuyện"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/60 dark:bg-white/5 hover:bg-white/90 dark:hover:bg-white/10 text-stone-800 dark:text-stone-200 text-xs uppercase tracking-widest font-medium border border-stone-200 dark:border-white/10 backdrop-blur-md transition-all duration-300 shadow-sm"
            >
              <span>Tìm hiểu câu chuyện</span>
              <Compass className="w-4 h-4 text-stone-500" />
            </a>
          </motion.div>
        </div>

        {/* Right Column: Luxury 3D Brand Presentation (NOT a plain blank stock t-shirt) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.25, ease: "easeOut" }}
          className="lg:col-span-5 relative w-full flex items-center justify-center p-2 sm:p-6"
        >
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            data-cursor="Xem BST"
            className="relative w-full max-w-[480px] aspect-[4/5] flex items-center justify-center perspective-1200 cursor-pointer select-none"
          >
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative w-full h-full flex items-center justify-center"
            >
              {/* Abstract Christian Symbol: Minimal Cross in Champagne Gold */}
              <motion.div
                style={{ x: bgX, y: bgY, translateZ: -30 }}
                className="absolute pointer-events-none opacity-30 dark:opacity-20 flex items-center justify-center"
              >
                <div className="relative w-64 h-80 flex items-center justify-center">
                  <div className="w-[1.5px] h-full bg-gradient-to-b from-transparent via-[#C5A880] to-transparent shadow-[0_0_12px_rgba(197,168,128,0.5)]" />
                  <div className="absolute top-[28%] w-48 h-[1.5px] bg-gradient-to-r from-transparent via-[#C5A880] to-transparent shadow-[0_0_12px_rgba(197,168,128,0.5)]" />
                  <div className="absolute top-[28%] -translate-y-1/2 w-36 h-36 rounded-full border border-[#C5A880]/30 border-dashed animate-[spin_60s_linear_infinite]" />
                </div>
              </motion.div>

              {/* Translucent Glass Sphere with Refraction (Within bounds, never clipped) */}
              <motion.div
                style={{ x: bgX, y: bgY, translateZ: 15 }}
                className="absolute top-0 right-4 w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-white/60 via-white/20 to-white/5 dark:from-white/15 dark:to-transparent backdrop-blur-xl border border-white/70 dark:border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.06),inset_0_2px_4px_rgba(255,255,255,0.8)] pointer-events-none animate-float-slow"
              >
                <div className="absolute top-3 left-5 w-6 h-3 rounded-full bg-white/70 blur-[2px] transform -rotate-45" />
              </motion.div>

              {/* Main Brand Hero Piece: Genuine High-End Christian Lifestyle Showcase */}
              <motion.div
                style={{ x: fgX, y: fgY, translateZ: 35 }}
                className="relative z-10 w-[84%] aspect-[4/5] rounded-3xl overflow-hidden glass-panel p-3 sm:p-3.5 shadow-[0_30px_70px_-15px_rgba(11,27,61,0.20)] group"
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#ECE8E1] dark:bg-stone-900">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={collections[activeCollection].image}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={collections[activeCollection].image}
                        alt={collections[activeCollection].title}
                        fill
                        priority
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 80vw, 450px"
                      />
                    </motion.div>
                  </AnimatePresence>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

                  {/* Top Pill on Card */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="glass-pill px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest text-stone-900 dark:text-white shadow-sm">
                      {collections[activeCollection].tag}
                    </span>
                  </div>

                  {/* Brand Concept Floating Label */}
                  <div className="absolute bottom-5 left-5 right-5 text-white z-10">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight">
                      {collections[activeCollection].title}
                    </h3>
                    <p className="text-xs text-stone-200/90 font-light mt-1 line-clamp-1">
                      {collections[activeCollection].subtitle}
                    </p>

                    {/* Interactive Drop Selector Dots */}
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/20">
                      {collections.map((item, idx) => (
                        <button
                          key={item.tag}
                          onClick={() => setActiveCollection(idx)}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            activeCollection === idx
                              ? "bg-[#D4AF37] w-8 shadow-sm"
                              : "bg-white/40 hover:bg-white/70 w-3"
                          }`}
                          aria-label={`Xem ${item.tag}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Devotional Scripture Note (Positioned safely within stage bounds) */}
              <motion.div
                style={{ translateZ: 65 }}
                className="absolute -bottom-3 left-2 sm:bottom-2 sm:left-4 z-30 w-48 sm:w-56 glass-panel p-3 rounded-2xl border border-white/90 dark:border-white/20 shadow-2xl backdrop-blur-2xl -rotate-3 animate-float-gentle"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                  <span className="text-[9px] uppercase font-bold tracking-widest text-[#0B1B3D] dark:text-amber-200">
                    SỨ ĐIỆP BÌNH AN
                  </span>
                </div>
                <p className="font-serif italic text-xs text-stone-800 dark:text-stone-200 leading-snug">
                  &ldquo;Đức tin là sự biết chắc vững vàng...&rdquo;
                </p>
                <p className="text-[9px] text-stone-500 dark:text-stone-400 mt-1 uppercase tracking-wider">
                  Hê-bơ-rơ 11:1
                </p>
              </motion.div>

              {/* Top Floating Badge (Safely within container) */}
              <motion.div
                style={{ translateZ: 75 }}
                className="absolute top-4 left-2 sm:top-6 sm:left-3 z-30 glass-panel px-3.5 py-2 rounded-2xl border border-white/80 dark:border-white/20 shadow-xl backdrop-blur-xl animate-float-gentle"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span className="text-[10px] uppercase font-bold tracking-[0.18em] text-stone-800 dark:text-stone-200 whitespace-nowrap">
                    {collections[activeCollection].badge}
                  </span>
                </div>
              </motion.div>

              {/* Bottom Floating Badge (Safely within container) */}
              <motion.div
                style={{ translateZ: 55 }}
                className="absolute bottom-4 right-2 sm:bottom-6 sm:right-3 z-20 glass-panel px-4 py-2 rounded-2xl border border-white/80 dark:border-white/20 shadow-xl backdrop-blur-xl animate-float-slow"
              >
                <p className="text-[10px] uppercase font-bold tracking-[0.18em] text-stone-800 dark:text-stone-200 whitespace-nowrap">
                  {collections[activeCollection].badgeSub}
                </p>
                <p className="text-[9px] text-stone-500 dark:text-stone-400 whitespace-nowrap">
                  Tận tâm trong từng chi tiết
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
