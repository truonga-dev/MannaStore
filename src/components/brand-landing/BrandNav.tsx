"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";

export default function BrandNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Giới thiệu", href: "#about" },
    { label: "Tầm nhìn", href: "#vision" },
    { label: "Ý nghĩa Manna", href: "#meaning" },
    { label: "Hệ sinh thái", href: "#ecosystem" },
    { label: "Triết lý", href: "#philosophy" },
    { label: "Trải nghiệm", href: "#experience" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 py-3.5 sm:py-5 px-4 sm:px-8 flex justify-center transition-all duration-500 pointer-events-none">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`w-full max-w-6xl transition-all duration-500 rounded-full px-5 sm:px-8 py-3 flex items-center justify-between pointer-events-auto ${
            scrolled
              ? "bg-[#FAF8F5]/90 dark:bg-[#121620]/90 backdrop-blur-2xl border border-white/80 dark:border-white/10 shadow-[0_12px_36px_rgba(11,27,61,0.08)]"
              : "bg-[#FAF8F5]/60 dark:bg-[#121620]/60 backdrop-blur-xl border border-white/50 dark:border-white/5 shadow-sm"
          }`}
        >
          {/* Brand Logo: Icon Emblem + MANNA STORE */}
          <Link
            href="#hero"
            className="flex items-center gap-3 group select-none flex-shrink-0 mr-4 lg:mr-8"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl glass-panel flex items-center justify-center border border-white/80 dark:border-white/20 shadow-sm group-hover:scale-105 transition-transform duration-300">
              {/* Minimal Christian cross symbol */}
              <div className="relative w-3.5 h-4 sm:w-4 sm:h-5 flex items-center justify-center">
                <div className="w-[1.75px] h-full bg-[#0B1B3D] dark:bg-[#D4AF37] rounded-full" />
                <div className="absolute top-[34%] w-3 h-[1.75px] sm:w-3.5 bg-[#0B1B3D] dark:bg-[#D4AF37] rounded-full" />
              </div>
            </div>

            <div className="flex flex-col items-start leading-none">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-[0.22em] text-[#0B1B3D] dark:text-white group-hover:opacity-85 transition-opacity">
                MANNA
              </span>
              <span className="text-[8px] sm:text-[9px] font-sans tracking-[0.35em] font-semibold text-stone-500 dark:text-stone-400 uppercase mt-0.5">
                STORE
              </span>
            </div>
          </Link>

          {/* Center Navigation Links (Strictly whitespace-nowrap, never breaking lines) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 flex-1 justify-center">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="whitespace-nowrap text-[11px] xl:text-xs uppercase tracking-[0.14em] font-medium text-stone-600 dark:text-stone-300 hover:text-[#0B1B3D] dark:hover:text-white transition-colors relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#0B1B3D] dark:bg-[#D4AF37] group-hover:w-full transition-all duration-300 ease-out" />
              </a>
            ))}
          </nav>

          {/* Right CTA Button (Single line, whitespace-nowrap) */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href="/cua-hang"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0B1B3D] dark:bg-white text-white dark:text-[#0B1B3D] hover:bg-[#15284d] dark:hover:bg-stone-200 text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <span>Khám phá Manna</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile / Tablet Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-700 dark:text-stone-200 hover:bg-stone-200/50 rounded-full transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-4 top-20 z-50 lg:hidden bg-[#FAF8F5]/95 dark:bg-[#121620]/95 backdrop-blur-2xl rounded-3xl border border-white/80 dark:border-white/10 shadow-2xl p-6"
          >
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium tracking-wider uppercase text-stone-800 dark:text-stone-200 hover:text-stone-500 py-2 border-b border-stone-200/50 dark:border-stone-800"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3">
                <a
                  href="/cua-hang"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-[#0B1B3D] text-white font-semibold text-xs uppercase tracking-wider shadow"
                >
                  <span>Khám phá Manna</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
