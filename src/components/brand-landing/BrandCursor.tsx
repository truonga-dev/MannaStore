"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function BrandCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClickable, setIsClickable] = useState(false);
  const [isTextHovered, setIsTextHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Silky-smooth responsive spring physics for the trailing ring
  const ringSpringConfig = { damping: 28, stiffness: 320, mass: 0.35 };
  const smoothRingX = useSpring(mouseX, ringSpringConfig);
  const smoothRingY = useSpring(mouseY, ringSpringConfig);

  // Gentle ambient light spring
  const glowSpringConfig = { damping: 40, stiffness: 100, mass: 1 };
  const smoothGlowX = useSpring(mouseX, glowSpringConfig);
  const smoothGlowY = useSpring(mouseY, glowSpringConfig);

  useEffect(() => {
    // Only enable on pointer devices that support hover (disabled on touch devices)
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Clickable elements (links, buttons) ONLY - never entire reading cards!
      const clickable = target.closest('a, button, [role="button"], input, select, textarea');
      setIsClickable(!!clickable);

      // Detect when reading text to minimize the ring and avoid distraction
      const isText = target.closest('p, h1, h2, h3, h4, h5, h6, blockquote, li') && !clickable;
      setIsTextHovered(!!isText);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* 1. Subtle, ethereal ambient light following cursor (Low opacity, never washes text out) */}
      <motion.div
        style={{
          x: smoothGlowX,
          y: smoothGlowY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute w-[360px] h-[360px] rounded-full bg-gradient-to-r from-[#D4AF37]/8 via-[#C5A880]/5 to-transparent blur-[90px] dark:from-[#D4AF37]/8 dark:via-amber-400/4 pointer-events-none -z-10"
      />

      {/* 2. Sleek, Luxury Precision Ring (100% Transparent interior, NEVER covers text) */}
      <motion.div
        style={{
          x: smoothRingX,
          y: smoothRingY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isPressed ? 0.8 : isClickable ? 1.4 : isTextHovered ? 0.6 : 1,
          opacity: isVisible ? (isTextHovered ? 0.35 : 1) : 0,
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className={`absolute rounded-full pointer-events-none flex items-center justify-center transition-colors duration-200 ${
          isClickable
            ? "w-10 h-10 border border-[#D4AF37] dark:border-[#D4AF37] shadow-[0_0_14px_rgba(212,175,55,0.4)]"
            : "w-7 h-7 border border-[#0B1B3D]/30 dark:border-white/35 shadow-[0_0_8px_rgba(0,0,0,0.04)]"
        }`}
      />

      {/* 3. Center Precision Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isPressed ? 0.6 : isClickable ? 0.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.1 }}
        className="absolute w-1.5 h-1.5 rounded-full bg-[#0B1B3D] dark:bg-[#D4AF37] shadow-[0_0_6px_rgba(212,175,55,0.5)] pointer-events-none"
      />
    </div>
  );
}
