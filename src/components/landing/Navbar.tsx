"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import SearchModal from "./SearchModal";

interface Props {
  onOpenCart?: () => void;
}

export default function Navbar({ onOpenCart }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Zustand cart total
  const totalItems = useCartStore((state) => state.totalItems());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Bộ Sưu Tập", href: "#collection" },
    { label: "Danh Mục", href: "#categories" },
    { label: "Tuyên Ngôn", href: "#statement" },
    { label: "Câu Chuyện", href: "#story" },
    { label: "Giá Trị", href: "#values" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 py-3 sm:py-5 px-4 sm:px-8 flex justify-center`}
      >
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`w-full max-w-6xl transition-all duration-500 rounded-full px-5 sm:px-7 py-3 flex items-center justify-between ${
            scrolled
              ? "bg-[#FAF8F5]/85 dark:bg-[#121620]/85 backdrop-blur-2xl border border-white/70 dark:border-white/10 shadow-[0_12px_40px_rgba(11,27,61,0.08)]"
              : "bg-[#FAF8F5]/50 dark:bg-[#121620]/50 backdrop-blur-md border border-white/40 dark:border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
          }`}
        >
          {/* Brand Logo */}
          <Link
            href="/landing"
            className="group flex flex-col items-start leading-none select-none"
          >
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.22em] text-[#0B1B3D] dark:text-white group-hover:opacity-85 transition-opacity">
              MANNA
            </span>
            <span className="text-[9px] font-sans tracking-[0.3em] font-semibold text-stone-500 dark:text-stone-400 uppercase mt-0.5">
              Christian Lifestyle
            </span>
          </Link>

          {/* Desktop Center Links */}
          <nav className="hidden md:flex items-center space-x-7 lg:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs uppercase tracking-[0.16em] font-medium text-stone-700 dark:text-stone-300 hover:text-[#0B1B3D] dark:hover:text-white transition-colors relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#0B1B3D] dark:bg-white group-hover:w-full transition-all duration-300 ease-out" />
              </a>
            ))}
          </nav>

          {/* Right Action Icons & Primary CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Icon */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 sm:p-2.5 rounded-full text-stone-600 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800/60 transition-colors"
              aria-label="Tìm kiếm"
              title="Tìm kiếm"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Cart Icon with Live Count */}
            <Link
              href="/gio-hang"
              className="relative p-2 sm:p-2.5 rounded-full text-stone-600 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800/60 transition-colors"
              aria-label="Giỏ hàng"
              title="Giỏ hàng"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#0B1B3D] text-white dark:bg-amber-300 dark:text-stone-950 text-[10px] font-bold flex items-center justify-center shadow-sm"
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>

            {/* Primary CTA "Khám phá" */}
            <a
              href="#collection"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0B1B3D] dark:bg-white text-white dark:text-[#0B1B3D] hover:bg-[#15284d] dark:hover:bg-stone-200 text-xs uppercase tracking-wider font-semibold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <span>Khám phá</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-stone-700 dark:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800/60 transition-colors"
              aria-label="Mở menu"
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
            className="fixed inset-x-4 top-20 z-40 md:hidden bg-[#FAF8F5]/95 dark:bg-[#121620]/95 backdrop-blur-2xl rounded-3xl border border-white/70 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-6"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold tracking-wider uppercase text-stone-800 dark:text-stone-200 hover:text-stone-500 py-2 border-b border-stone-200/60 dark:border-stone-800"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 flex flex-col gap-3">
                <a
                  href="#collection"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-[#0B1B3D] text-white font-semibold text-xs uppercase tracking-wider shadow"
                >
                  <span>Khám phá bộ sưu tập</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  href="/san-pham"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 font-medium text-xs uppercase tracking-wider"
                >
                  <span>Vào cửa hàng Online</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
