"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { Sparkles, Heart, Anchor, ShieldCheck } from "lucide-react";
import { HERO_TAGS } from "./landingData";

export default function Hero3DComposition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coordinate motion values normalized to [-0.5, 0.5]
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for luxurious Apple-like fluid response
  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax rotations & offsets
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);

  // Foreground (Product) moves 12-16px
  const productX = useTransform(smoothX, [-0.5, 0.5], [-16, 16]);
  const productY = useTransform(smoothY, [-0.5, 0.5], [-16, 16]);

  // Background elements move 4-6px
  const bgX = useTransform(smoothX, [-0.5, 0.5], [6, -6]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], [6, -6]);

  // Handle cursor interaction over the 3D stage
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-square max-w-[560px] mx-auto flex items-center justify-center perspective-1200 cursor-pointer select-none"
    >
      {/* 3D Root Canvas */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Layer 0: Ambient Warm Halo Glow */}
        <motion.div
          style={{ x: bgX, y: bgY, translateZ: -60 }}
          className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-amber-200/40 via-amber-100/30 to-emerald-100/20 dark:from-amber-500/10 dark:via-emerald-500/10 dark:to-transparent blur-3xl pointer-events-none -z-10 animate-pulse-glow"
        />

        {/* Layer 1: Abstract Christian Minimalist Cross Motif (Champagne Gold lines) */}
        <motion.div
          style={{ x: bgX, y: bgY, translateZ: -30 }}
          className="absolute pointer-events-none opacity-40 dark:opacity-20 flex items-center justify-center"
        >
          <div className="relative w-64 h-80 flex items-center justify-center">
            {/* Vertical beam */}
            <div className="w-[1.5px] h-full bg-gradient-to-b from-transparent via-[#C5A880] to-transparent shadow-[0_0_12px_rgba(197,168,128,0.5)]" />
            {/* Horizontal beam */}
            <div className="absolute top-[28%] w-48 h-[1.5px] bg-gradient-to-r from-transparent via-[#C5A880] to-transparent shadow-[0_0_12px_rgba(197,168,128,0.5)]" />
            {/* Radiant orbital ring */}
            <div className="absolute top-[28%] -translate-y-1/2 w-32 h-32 rounded-full border border-[#C5A880]/30 border-dashed animate-[spin_60s_linear_infinite]" />
          </div>
        </motion.div>

        {/* Layer 2: Translucent Frosted Glass Sphere / Orb */}
        <motion.div
          style={{ x: bgX, y: bgY, translateZ: 10 }}
          className="absolute -top-4 -right-2 sm:right-6 w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-br from-white/60 via-white/20 to-white/5 dark:from-white/15 dark:to-transparent backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.06),inset_0_2px_4px_rgba(255,255,255,0.8)] pointer-events-none animate-float-slow"
        >
          {/* Specular highlight */}
          <div className="absolute top-4 left-6 w-8 h-5 rounded-full bg-white/70 blur-[2px] transform -rotate-45" />
        </motion.div>

        {/* Layer 3: Central Hero Product (Floating Boxy Tee Presentation with dynamic cast shadow) */}
        <motion.div
          style={{ x: productX, y: productY, translateZ: 40 }}
          className="relative z-10 w-[78%] aspect-[4/5] rounded-3xl overflow-hidden glass-panel p-3 sm:p-4 shadow-[0_25px_60px_-15px_rgba(11,27,61,0.15)] group"
        >
          {/* Product Image Frame */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#ECE8E1] dark:bg-stone-900 flex items-center justify-center">
            <Image
              src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop"
              alt="Manna Signature Christian Tee - Salt & Light"
              fill
              priority
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 80vw, 450px"
            />

            {/* Subtle Gradient Overlays for Luxury Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

            {/* Glass Badge on Image */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="glass-pill px-3.5 py-1.5 rounded-full flex items-center gap-2 text-stone-900 dark:text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-bold tracking-wider uppercase font-sans">
                  SALT & LIGHT TEE
                </span>
              </div>
              <span className="text-[11px] font-serif font-bold text-white tracking-widest bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                220.000₫
              </span>
            </div>
          </div>

          {/* Light Reflection Sheen */}
          <div className="absolute inset-0 pointer-events-none rounded-3xl bg-gradient-to-tr from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </motion.div>

        {/* Dynamic Shadow underneath the garment */}
        <motion.div
          style={{ x: productX, y: productY, translateZ: -20 }}
          className="absolute -bottom-6 w-3/4 h-8 bg-black/15 dark:bg-black/40 rounded-full blur-xl pointer-events-none"
        />

        {/* Layer 4: Orbiting Glass Floating Cards (FAITH, HOPE, LOVE) */}
        {/* Card 1: FAITH (Top Left) */}
        <motion.div
          style={{
            x: useTransform(smoothX, [-0.5, 0.5], [HERO_TAGS[0].offset.x - 12, HERO_TAGS[0].offset.x + 12]),
            y: useTransform(smoothY, [-0.5, 0.5], [HERO_TAGS[0].offset.y - 10, HERO_TAGS[0].offset.y + 10]),
            translateZ: HERO_TAGS[0].offset.z,
          }}
          className="absolute -top-4 -left-4 sm:top-2 sm:-left-6 z-20 glass-panel px-4 py-2.5 rounded-2xl border border-white/80 dark:border-white/20 shadow-xl backdrop-blur-xl animate-float-gentle"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-amber-500/15 dark:bg-amber-400/20 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold text-xs">
              <Anchor className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-stone-900 dark:text-white">
                FAITH
              </p>
              <p className="text-[9px] text-stone-500 dark:text-stone-300 font-medium">
                Hê-bơ-rơ 11:1
              </p>
            </div>
          </div>
        </motion.div>

        {/* Card 2: HOPE (Bottom Right) */}
        <motion.div
          style={{
            x: useTransform(smoothX, [-0.5, 0.5], [HERO_TAGS[1].offset.x - 15, HERO_TAGS[1].offset.x + 15]),
            y: useTransform(smoothY, [-0.5, 0.5], [HERO_TAGS[1].offset.y - 12, HERO_TAGS[1].offset.y + 12]),
            translateZ: HERO_TAGS[1].offset.z,
          }}
          className="absolute -bottom-6 -right-2 sm:bottom-4 sm:-right-4 z-20 glass-panel px-4 py-2.5 rounded-2xl border border-white/80 dark:border-white/20 shadow-xl backdrop-blur-xl animate-float-slow"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-emerald-500/15 dark:bg-emerald-400/20 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-xs">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-stone-900 dark:text-white">
                HOPE
              </p>
              <p className="text-[9px] text-stone-500 dark:text-stone-300 font-medium">
                Rô-ma 5:5
              </p>
            </div>
          </div>
        </motion.div>

        {/* Card 3: LOVE (Top Right) */}
        <motion.div
          style={{
            x: useTransform(smoothX, [-0.5, 0.5], [HERO_TAGS[2].offset.x - 10, HERO_TAGS[2].offset.x + 10]),
            y: useTransform(smoothY, [-0.5, 0.5], [HERO_TAGS[2].offset.y - 8, HERO_TAGS[2].offset.y + 8]),
            translateZ: HERO_TAGS[2].offset.z,
          }}
          className="absolute top-12 right-[-10px] sm:top-14 sm:right-[-20px] z-20 glass-panel px-4 py-2.5 rounded-2xl border border-white/80 dark:border-white/20 shadow-xl backdrop-blur-xl animate-float-gentle"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-rose-500/15 dark:bg-rose-400/20 text-rose-700 dark:text-rose-300 flex items-center justify-center font-bold text-xs">
              <Heart className="w-3.5 h-3.5 fill-rose-500/20" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-stone-900 dark:text-white">
                LOVE
              </p>
              <p className="text-[9px] text-stone-500 dark:text-stone-300 font-medium">
                1 Cô-rinh-tô 13:8
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
