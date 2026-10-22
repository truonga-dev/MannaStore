"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { CATEGORIES_DATA } from "./landingData";

export default function Categories() {
  const [catTee, catHoodie, catAccessories, catBooks, catGifts] = CATEGORIES_DATA;

  return (
    <section
      id="categories"
      className="relative py-28 sm:py-36 px-4 sm:px-8 lg:px-12 bg-[#F5F2EB] dark:bg-[#0B0F18] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[1px] bg-[#0B1B3D] dark:bg-stone-300 block" />
              <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#0B1B3D] dark:text-stone-300">
                DANH MỤC THIẾT KẾ
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#0B1B3D] dark:text-[#FAF8F5] leading-tight">
              Khám phá thế giới Manna
            </h2>
            <p className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-400 font-light">
              Những điều nhỏ bé mang theo những thông điệp lớn.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 md:mt-0"
          >
            <Link
              href="/san-pham"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#0B1B3D] dark:text-stone-300 hover:text-stone-600 dark:hover:text-white transition-colors group"
            >
              <span>Xem tất cả danh mục</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Asymmetrical Editorial Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Large Featured Card - Áo Thun (Col 7) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-7 group relative h-[480px] sm:h-[560px] rounded-3xl overflow-hidden glass-panel shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
          >
            <Link href={catTee.slug} className="block w-full h-full relative">
              <Image
                src={catTee.image}
                alt={catTee.title}
                fill
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

              {/* Top Glass Badge */}
              <div className="absolute top-6 left-6 z-10">
                <span className="glass-pill px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase text-stone-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  {catTee.itemCount}
                </span>
              </div>

              {/* Bottom Editorial Content */}
              <div className="absolute bottom-6 left-6 right-6 z-10 text-white">
                <p className="text-xs uppercase tracking-[0.25em] text-amber-200 font-medium mb-1">
                  “{catTee.tagline}”
                </p>
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
                      {catTee.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-stone-300 font-light max-w-md line-clamp-2">
                      {catTee.description}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-white shrink-0 ml-4 group-hover:bg-white group-hover:text-stone-900 transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Right Column: 2 Cards Stacked (Col 5) */}
          <div className="md:col-span-5 flex flex-col gap-6">
            {/* Card 2: Hoodie */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="group relative h-[268px] rounded-3xl overflow-hidden glass-panel shadow-[0_15px_40px_rgba(0,0,0,0.05)]"
            >
              <Link href={catHoodie.slug} className="block w-full h-full relative">
                <Image
                  src={catHoodie.image}
                  alt={catHoodie.title}
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

                <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full glass-panel flex items-center justify-center text-white group-hover:bg-white group-hover:text-stone-900 transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </div>

                <div className="absolute bottom-5 left-5 right-5 z-10 text-white">
                  <p className="text-[11px] uppercase tracking-widest text-amber-200/90 font-medium mb-1">
                    “{catHoodie.tagline}”
                  </p>
                  <h3 className="font-serif text-2xl font-bold">{catHoodie.title}</h3>
                  <p className="text-xs text-stone-300 font-light mt-1 line-clamp-1">
                    {catHoodie.description}
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* Card 3: Phụ Kiện */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="group relative h-[268px] rounded-3xl overflow-hidden glass-panel shadow-[0_15px_40px_rgba(0,0,0,0.05)]"
            >
              <Link href={catAccessories.slug} className="block w-full h-full relative">
                <Image
                  src={catAccessories.image}
                  alt={catAccessories.title}
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

                <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full glass-panel flex items-center justify-center text-white group-hover:bg-white group-hover:text-stone-900 transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </div>

                <div className="absolute bottom-5 left-5 right-5 z-10 text-white">
                  <p className="text-[11px] uppercase tracking-widest text-emerald-200/90 font-medium mb-1">
                    “{catAccessories.tagline}”
                  </p>
                  <h3 className="font-serif text-2xl font-bold">{catAccessories.title}</h3>
                  <p className="text-xs text-stone-300 font-light mt-1 line-clamp-1">
                    {catAccessories.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Bottom Row: 2 Cards (Col 6 + Col 6) */}
          {/* Card 4: Sách & Sổ Tay */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="md:col-span-6 group relative h-[320px] rounded-3xl overflow-hidden glass-panel shadow-[0_15px_40px_rgba(0,0,0,0.05)]"
          >
            <Link href={catBooks.slug} className="block w-full h-full relative">
              <Image
                src={catBooks.image}
                alt={catBooks.title}
                fill
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />

              <div className="absolute top-5 left-5 z-10">
                <span className="glass-pill px-3.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-stone-900 dark:text-white">
                  {catBooks.itemCount}
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 z-10 text-white flex items-end justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-amber-200 font-medium mb-1">
                    “{catBooks.tagline}”
                  </p>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold">{catBooks.title}</h3>
                  <p className="text-xs sm:text-sm text-stone-300 font-light mt-1 line-clamp-2 max-w-sm">
                    {catBooks.description}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-white shrink-0 ml-4 group-hover:bg-white group-hover:text-stone-900 transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Card 5: Quà Tặng */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="md:col-span-6 group relative h-[320px] rounded-3xl overflow-hidden glass-panel shadow-[0_15px_40px_rgba(0,0,0,0.05)]"
          >
            <Link href={catGifts.slug} className="block w-full h-full relative">
              <Image
                src={catGifts.image}
                alt={catGifts.title}
                fill
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />

              <div className="absolute top-5 left-5 z-10">
                <span className="glass-pill px-3.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-stone-900 dark:text-white">
                  {catGifts.itemCount}
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 z-10 text-white flex items-end justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-rose-200 font-medium mb-1">
                    “{catGifts.tagline}”
                  </p>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold">{catGifts.title}</h3>
                  <p className="text-xs sm:text-sm text-stone-300 font-light mt-1 line-clamp-2 max-w-sm">
                    {catGifts.description}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-white shrink-0 ml-4 group-hover:bg-white group-hover:text-stone-900 transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
