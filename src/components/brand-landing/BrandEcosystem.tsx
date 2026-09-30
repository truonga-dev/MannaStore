"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, ArrowRight } from "lucide-react";

export default function BrandEcosystem() {
  const ecosystemItems = [
    {
      num: "01",
      category: "APPAREL",
      title: "Trang Phục",
      motto: "Wear your faith.",
      desc: "Những chiếc áo thun boxy, áo khoác hoodie nỉ bông mang typography Kinh Thánh tối giản, giúp bạn tự tin chia sẻ đức tin qua gu thời trang thường nhật.",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
    },
    {
      num: "02",
      category: "BOOKS",
      title: "Sách & Sổ Tay",
      motto: "Grow in faith.",
      desc: "Kinh Thánh bìa da dập chìm và sổ tĩnh nguyện giấy ngà, tạo nên không gian riêng tư lắng đọng để trò chuyện cùng Chúa mỗi sớm mai.",
      image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=800&auto=format&fit=crop",
    },
    {
      num: "03",
      category: "ACCESSORIES",
      title: "Phụ Kiện",
      motto: "Carry meaning.",
      desc: "Mũ lưỡi trai dad-hat, túi tote canvas mộc và móc khóa gỗ Olive từ vùng Đất Thánh — những chi tiết nhỏ lưu giữ câu chuyện lớn.",
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
    },
    {
      num: "04",
      category: "GIFTS",
      title: "Quà Tặng Ý Nghĩa",
      motto: "Give with purpose.",
      desc: "Ly gốm sứ Shalom, khung tranh châm ngôn và hộp quà Kraft thủ công kèm thiệp chúc — gửi trao sự khích lệ và phước hạnh đến người thân yêu.",
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=800&auto=format&fit=crop",
    },
  ];

  return (
    <section
      id="ecosystem"
      className="relative py-28 sm:py-36 px-4 sm:px-8 lg:px-12 bg-[#FAF7F2] dark:bg-[#0B0F18] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-[0.25em] uppercase text-stone-600 dark:text-stone-300 bg-white/70 dark:bg-white/5 border border-stone-200 dark:border-white/10 shadow-sm backdrop-blur-md mb-4"
          >
            HỆ SINH THÁI SẢN PHẨM · ECOSYSTEM
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-3xl sm:text-5xl font-bold text-[#0B1B3D] dark:text-[#FAF8F5] leading-tight"
          >
            Hệ sinh thái Manna
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-400 font-light"
          >
            Mỗi nhóm sản phẩm là một khía cạnh biểu đạt lối sống Cơ Đốc trong đời sống đương đại.
          </motion.p>
        </div>

        {/* Conceptual Ecosystem: 4 Floating 3D Glass Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ecosystemItems.map((item, idx) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.12 }}
              className="group relative rounded-3xl overflow-hidden glass-panel border border-white/80 dark:border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.05)] glass-card-hover flex flex-col"
            >
              {/* Visual Showcase Thumbnail */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 dark:bg-stone-900">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Number Badge */}
                <div className="absolute top-4 left-4">
                  <span className="glass-pill px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest text-stone-900 dark:text-white">
                    {item.num}
                  </span>
                </div>

                {/* Motto */}
                <div className="absolute bottom-3 left-4 text-white">
                  <p className="text-[11px] uppercase tracking-widest text-amber-200 font-medium">
                    “{item.motto}”
                  </p>
                </div>
              </div>

              {/* Conceptual Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#C5A880] block mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#0B1B3D] dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-200/50 dark:border-stone-800 flex items-center justify-between text-xs text-[#0B1B3D] dark:text-stone-300 font-medium">
                  <span className="text-[11px] uppercase tracking-wider text-stone-400">
                    Khám phá dòng sản phẩm
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
