"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Shirt, Book, Key, Gift, Coffee, Watch, Music, Sparkles, Star, TrendingUp } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import ProductCard from "@/components/product/ProductCard";
import AnnouncementMarquee from "@/components/layout/AnnouncementMarquee";
import { useState, useEffect, useRef } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────────
type ProductWithVariants = {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
  variants: { id: string; price: number; size: string | null; color: string | null }[];
};

// ─── Data ──────────────────────────────────────────────────────────────────────
const BANNERS = [
  {
    src: "/banners/banner1_v2.jpg",
    link: "/danh-muc/thoi-trang",
    eyebrow: "Bộ sưu tập 2026",
    title: "Mặc đức tin\nvào cuộc sống",
    sub: "Áo Hoodie & Áo Thun thiết kế độc quyền",
    cta: "Khám phá ngay",
  },
  {
    src: "/banners/banner2_v2.jpg",
    link: "/danh-muc/thoi-trang",
    eyebrow: "Phong cách tối giản",
    title: "Đơn giản\nmà sâu sắc",
    sub: "Thiết kế tinh tế — Thông điệp chân thành",
    cta: "Xem bộ sưu tập",
  },
  {
    src: "/banners/banner3_v2.jpg",
    link: "/san-pham",
    eyebrow: "Độc quyền Manna",
    title: "Quà tặng\ncó ý nghĩa",
    sub: "Mỗi sản phẩm kể một câu chuyện riêng",
    cta: "Mua ngay",
  },
];

const CATEGORIES = [
  { name: "Áo Thun", icon: <Shirt size={22} strokeWidth={1.25} />, link: "/danh-muc/ao-thun", bg: "bg-[#0e1d35]", color: "text-[#3b82f6]" },
  { name: "Hoodie", icon: <Shirt size={22} strokeWidth={1.25} />, link: "/danh-muc/ao-hoodie", bg: "bg-[#201035]", color: "text-[#a855f7]" },
  { name: "Móc Khóa", icon: <Key size={22} strokeWidth={1.25} />, link: "/danh-muc/moc-khoa", bg: "bg-[#35250a]", color: "text-[#eab308]" },
  { name: "Sách", icon: <Book size={22} strokeWidth={1.25} />, link: "/danh-muc/sach", bg: "bg-[#082a1a]", color: "text-[#10b981]" },
  { name: "Ly & Cốc", icon: <Coffee size={22} strokeWidth={1.25} />, link: "/danh-muc/ly-coc", bg: "bg-[#351018]", color: "text-[#f43f5e]" },
  { name: "Đồng hồ", icon: <Watch size={22} strokeWidth={1.25} />, link: "/danh-muc/dong-ho", bg: "bg-[#1a1c23]", color: "text-[#9ca3af]" },
  { name: "Quà Tặng", icon: <Gift size={22} strokeWidth={1.25} />, link: "/danh-muc/qua-tang", bg: "bg-[#350a20]", color: "text-[#ec4899]" },
  { name: "Phụ kiện", icon: <Music size={22} strokeWidth={1.25} />, link: "/danh-muc/phu-kien", bg: "bg-[#351a08]", color: "text-[#f97316]" },
];

// ─── Reusable Animation Components ─────────────────────────────────────────────
function RevealOnScroll({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as any }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <span className="w-8 h-px bg-primary block" />
      <span className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">{children}</span>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────────
export default function HomeClient({ products }: { products: ProductWithVariants[] }) {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [bannerDir, setBannerDir] = useState(1); // 1 = next, -1 = prev
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Auto-play
  useEffect(() => {
    const t = setInterval(() => { setBannerDir(1); setCurrentBanner(p => (p + 1) % BANNERS.length); }, 5500);
    return () => clearInterval(t);
  }, []);

  const goNext = () => { setBannerDir(1); setCurrentBanner(p => (p + 1) % BANNERS.length); };
  const goPrev = () => { setBannerDir(-1); setCurrentBanner(p => (p - 1 + BANNERS.length) % BANNERS.length); };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as any } },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as any } }),
  };

  const textVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] as any } }),
  };

  return (
    <div className="bg-[#F8F7F4] dark:bg-[#0C0C0C] min-h-screen overflow-x-hidden">
      <AnnouncementMarquee />
      
      {/* ═══════════════════════════════════════════════════════
          SECTION 1 — HERO FULLSCREEN SLIDER
      ═══════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative w-full h-[90vh] min-h-[560px] overflow-hidden">
        {/* Parallax image layer */}
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 w-full h-full">
          <AnimatePresence initial={false} custom={bannerDir} mode="sync">
            <motion.div
              key={currentBanner}
              custom={bannerDir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              <Image
                src={BANNERS[currentBanner].src}
                alt={BANNERS[currentBanner].title}
                fill
                className="object-cover"
                priority
              />
              {/* Deep gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Hero Text Content */}
        <div className="relative z-10 h-full flex flex-col justify-end pb-20 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div key={`text-${currentBanner}`} className="max-w-2xl">
              <motion.p
                custom={0}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="text-white/60 text-xs uppercase tracking-[0.35em] font-medium mb-4"
              >
                {BANNERS[currentBanner].eyebrow}
              </motion.p>
              <motion.h1
                custom={1}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="text-white font-serif text-5xl md:text-7xl font-bold leading-[1.05] mb-5 whitespace-pre-line"
              >
                {BANNERS[currentBanner].title}
              </motion.h1>
              <motion.p
                custom={2}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="text-white/70 text-base md:text-lg mb-10 font-light"
              >
                {BANNERS[currentBanner].sub}
              </motion.p>
              <motion.div
                custom={3}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-4"
              >
                <Link
                  href={BANNERS[currentBanner].link}
                  className="group relative inline-flex items-center gap-3 bg-white text-gray-900 font-bold px-8 py-4 rounded-full overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                >
                  <span className="relative z-10">{BANNERS[currentBanner].cta}</span>
                  <motion.span
                    className="relative z-10"
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <ArrowRight size={18} />
                  </motion.span>
                  {/* Shine sweep on hover */}
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-in-out" />
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Controls */}
          <div className="absolute right-6 md:right-16 bottom-20 flex flex-col items-center gap-4">
            {/* Slide counter */}
            <span className="text-white/40 text-xs font-mono tracking-widest">
              {String(currentBanner + 1).padStart(2, "0")} / {String(BANNERS.length).padStart(2, "0")}
            </span>
            {/* Dots */}
            <div className="flex flex-col gap-2">
              {BANNERS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => { setBannerDir(idx > currentBanner ? 1 : -1); setCurrentBanner(idx); }}
                  className={`block rounded-full transition-all duration-500 ${idx === currentBanner ? "w-1 h-8 bg-white" : "w-1 h-3 bg-white/30 hover:bg-white/60"}`}
                />
              ))}
            </div>
            {/* Arrow buttons */}
            <div className="flex gap-2 mt-1">
              <button onClick={goPrev} className="w-9 h-9 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white/10 transition-colors">
                <ChevronLeft size={16} />
              </button>
              <button onClick={goNext} className="w-9 h-9 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white/10 transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Bottom progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
            <motion.div
              key={currentBanner}
              className="h-full bg-white"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 5.5, ease: "linear" }}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 2 — CATEGORIES (Horizontal scroll pills)
      ═══════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <RevealOnScroll>
          <SectionLabel>Danh mục</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-10">
            Tìm theo phong cách
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-3 md:gap-4 mt-8">
          {CATEGORIES.map((cat, idx) => (
            <RevealOnScroll key={idx} delay={idx * 0.05}>
              <Link href={cat.link} className="group flex flex-col items-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-[70px] h-[70px] rounded-[22px] flex items-center justify-center transition-all shadow-sm group-hover:shadow-md ${cat.bg} ${cat.color}`}
                >
                  {cat.icon}
                </motion.div>
                <span className="text-[11px] md:text-xs font-medium text-gray-700 dark:text-gray-300 text-center transition-colors leading-tight">
                  {cat.name}
                </span>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 4 — FEATURE SPLIT (Brand story strip)
      ═══════════════════════════════════════════════════════ */}
      <RevealOnScroll>
        <section className="max-w-7xl mx-auto px-6 md:px-10 py-6 mb-6">
          <div className="relative rounded-3xl overflow-hidden bg-gray-900 dark:bg-gray-800 min-h-[300px] flex items-center">
            <Image
              src="/banners/banner2_v2.jpg"
              alt="Manna Brand Story"
              fill
              className="object-cover opacity-30"
            />
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 p-10 md:p-16 w-full">
              <div>
                <p className="text-white/50 text-xs uppercase tracking-widest mb-3">Câu chuyện</p>
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                  Mỗi sản phẩm<br />là một lời nhắc nhở
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  Manna Store được tạo ra từ niềm tin rằng đức tin nên hiện diện trong từng khoảnh khắc bình thường — chiếc áo bạn mặc, cuốn sách bạn đọc.
                </p>
                <Link
                  href="/ve-chung-toi"
                  className="inline-flex items-center gap-2 text-white border border-white/30 px-6 py-3 rounded-full text-sm font-medium hover:bg-white hover:text-gray-900 transition-all duration-300 group"
                >
                  Tìm hiểu thêm
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="hidden md:grid grid-cols-3 gap-6 items-center">
                {[
                  { num: "1K+", label: "Khách hàng" },
                  { num: "50+", label: "Thiết kế" },
                  { num: "4.9★", label: "Đánh giá" },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <p className="text-white text-3xl font-serif font-bold">{stat.num}</p>
                    <p className="text-white/50 text-xs uppercase tracking-widest mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* ═══════════════════════════════════════════════════════
          SECTION 5 — FEATURED PRODUCTS (Masonry-feel grid)
      ═══════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-10">
        <RevealOnScroll className="flex items-end justify-between mb-10">
          <div>
            <SectionLabel>Sản phẩm nổi bật</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white">
              Gợi ý cho bạn
            </h2>
          </div>
          <Link
            href="/san-pham"
            className="group hidden md:flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors font-medium"
          >
            Xem tất cả
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </RevealOnScroll>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, idx) => (
            <RevealOnScroll key={product.id} delay={Math.min(idx * 0.07, 0.4)}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <ProductCard product={product} />
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll className="mt-12 text-center">
          <Link
            href="/san-pham"
            className="group inline-flex items-center gap-3 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white font-bold px-10 py-4 rounded-full hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300"
          >
            Xem tất cả sản phẩm
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </RevealOnScroll>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 6 — VALUES GRID (Why Manna)
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-white dark:bg-gray-900/50 py-20 mt-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <RevealOnScroll className="text-center mb-14">
            <SectionLabel>Cam kết</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white">
              Tại sao chọn Manna?
            </h2>
          </RevealOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Star size={22} className="text-amber-500" />, title: "Thiết kế độc quyền", desc: "Mỗi mẫu được thiết kế riêng — không bán ở bất kỳ nơi nào khác." },
              { icon: <TrendingUp size={22} className="text-emerald-500" />, title: "Tích điểm thưởng", desc: "10.000đ = 1 điểm. Mua càng nhiều, được giảm càng nhiều." },
              { icon: <Gift size={22} className="text-rose-500" />, title: "Đóng gói quà tặng", desc: "Tất cả đơn hàng được đóng gói cẩn thận như một món quà thật sự." },
              { icon: <Sparkles size={22} className="text-violet-500" />, title: "Cộng đồng", desc: "Tham gia cộng đồng Cơ Đốc trẻ — chia sẻ niềm tin qua phong cách." },
            ].map((item, idx) => (
              <RevealOnScroll key={idx} delay={idx * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-7 border border-gray-100 dark:border-gray-700/50 h-full"
                >
                  <div className="w-11 h-11 rounded-xl bg-white dark:bg-gray-700 flex items-center justify-center mb-5 shadow-sm">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-base">{item.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                </motion.div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 7 — FINAL CTA BANNER
      ═══════════════════════════════════════════════════════ */}
      <RevealOnScroll>
        <section className="max-w-7xl mx-auto px-6 md:px-10 py-20">
          <div className="relative rounded-3xl overflow-hidden bg-[#0B1B3D] text-center py-20 px-6 isolate">
            {/* Decorative blobs */}
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute inset-0 bg-[url('/banners/banner3_v2.jpg')] bg-cover bg-center opacity-10" />
            <div className="relative z-10">
              <p className="text-xs uppercase tracking-[0.35em] mb-4 text-white/50">Bắt đầu ngay hôm nay</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-5 leading-tight text-white">
                Trang bị đức tin<br />vào từng ngày
              </h2>
              <p className="text-white/60 max-w-md mx-auto mb-10 text-sm md:text-base">
                Mỗi đơn hàng là một bước gần hơn với cộng đồng những người sống có mục đích.
              </p>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/san-pham"
                  className="inline-flex items-center gap-3 bg-white text-[#0B1B3D] font-bold px-10 py-4 rounded-full hover:bg-white/90 transition-colors duration-300 shadow-xl"
                >
                  Khám phá cửa hàng
                  <ArrowRight size={18} />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </RevealOnScroll>

    </div>
  );
}
