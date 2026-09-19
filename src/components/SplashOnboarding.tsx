"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function SplashOnboarding() {
  const [showSplash, setShowSplash] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem("mana_has_seen_splash");
    if (!hasSeenSplash) {
      setShowSplash(true);
      document.body.style.overflow = "hidden";
    }
  }, []);

  const handleFinish = () => {
    sessionStorage.setItem("mana_has_seen_splash", "true");
    setShowSplash(false);
    document.body.style.overflow = "auto";
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      handleFinish();
    }
  };

  const slides = [
    {
      title: "Trang Bị Đức Tin",
      subtitle: "Vào Từng Ngày",
      description: "Khám phá bộ sưu tập các ấn phẩm, sản phẩm mang thông điệp Cơ Đốc ý nghĩa và chất lượng cao.",
      image: "/banners/banner1_v2.jpg"
    },
    {
      title: "Phong Cách",
      subtitle: "Và Sự Tận Tâm",
      description: "Mỗi thiết kế đều được chăm chút tỉ mỉ, giúp bạn tự tin chia sẻ và lan tỏa niềm tin của mình.",
      image: "/banners/banner2_v2.jpg"
    }
  ];

  if (!showSplash) return null;

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex bg-[#0B1B3D] overflow-hidden"
        >
          {/* Background Images with Crossfade */}
          <div className="absolute inset-0 w-full h-full bg-black">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image 
                  src={slides[currentSlide].image}
                  alt="Background"
                  fill
                  className="object-cover opacity-[0.65]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3D] via-[#0B1B3D]/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0B1B3D]/90 via-[#0B1B3D]/40 to-transparent" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Content Area */}
          <div className="relative z-10 w-full h-full flex flex-col justify-end p-8 md:p-16 lg:p-24 max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="max-w-2xl"
              >
                <div className="flex items-center gap-3 mb-8">
                  <span className="w-12 h-[1px] bg-white block" />
                  <span className="text-xs uppercase tracking-[0.3em] text-white font-semibold">Manna Store</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-playfair font-bold text-white leading-[1.1] mb-2 drop-shadow-xl">
                  {slides[currentSlide].title}
                </h1>
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-playfair font-medium text-white/90 leading-[1.1] mb-8 italic drop-shadow-lg">
                  {slides[currentSlide].subtitle}
                </h2>
                
                <p className="text-white/80 text-base md:text-xl leading-relaxed mb-12 max-w-xl font-light drop-shadow-md">
                  {slides[currentSlide].description}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 mt-auto pt-8 border-t border-white/20">
              {/* Dots */}
              <div className="flex gap-3">
                {slides.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-500 ease-in-out ${
                      currentSlide === idx ? "bg-white w-12" : "bg-white/30 w-4"
                    }`}
                  />
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-6 self-start sm:self-auto">
                {currentSlide < slides.length - 1 && (
                  <button 
                    onClick={handleFinish}
                    className="text-white/60 hover:text-white text-sm uppercase tracking-widest font-semibold transition-colors"
                  >
                    Bỏ qua
                  </button>
                )}
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextSlide}
                  className="group flex items-center gap-3 px-8 py-4 bg-white text-[#0B1B3D] rounded-full font-bold shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] transition-all"
                >
                  {currentSlide < slides.length - 1 ? "Tiếp theo" : "Khám phá ngay"}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
