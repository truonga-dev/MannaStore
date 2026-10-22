"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, Sun, Feather } from "lucide-react";

export default function BrandMeaning() {
  return (
    <section
      id="meaning"
      className="relative py-28 sm:py-36 px-4 sm:px-8 lg:px-12 bg-gradient-to-b from-[#F5F1EB] via-[#F8F5EE] to-[#FAF7F2] dark:from-[#090D15] dark:via-[#0F1422] dark:to-[#0B0F18] overflow-hidden"
    >
      {/* Sunlight beam & warm glow */}
      <div className="absolute top-10 right-1/3 w-[500px] h-[500px] bg-gradient-to-b from-amber-200/25 via-amber-100/10 to-transparent blur-3xl pointer-events-none -rotate-12" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Storytelling & Meaning */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-[0.25em] uppercase text-stone-600 dark:text-stone-300 bg-white/70 dark:bg-white/5 border border-stone-200 dark:border-white/10 shadow-sm backdrop-blur-md mb-4">
              <Sun className="w-3.5 h-3.5 text-[#C5A880]" />
              NGUỒN GỐC TÊN GỌI · THE MEANING
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#0B1B3D] dark:text-[#FAF8F5] leading-tight">
              Ý nghĩa đằng sau <br />
              <span className="italic font-normal text-[#6B5744] dark:text-[#D4AF37]">
                cái tên &ldquo;Manna&rdquo;
              </span>
            </h2>

            <div className="mt-8 space-y-5 text-stone-700 dark:text-stone-300 text-sm sm:text-base font-light leading-relaxed">
              <p className="font-serif text-lg sm:text-xl italic text-stone-900 dark:text-stone-100 font-normal">
                &ldquo;Trong Kinh Thánh, Ma-na là thức ăn từ trời mà Đức Chúa Trời ban cho dân Y-sơ-ra-ên mỗi sớm mai giữa đồng vắng.&rdquo;
              </p>
              <p>
                Ma-na không được ban cho cả một năm hay một tháng cùng lúc. Ma-na rơi xuống <em>mỗi ngày một lần</em> — như một lời nhắc nhở rằng chúng ta cần nương cậy vào Đấng Tạo Hóa trong từng ngày sống, từng hơi thở và từng nhu cầu nhỏ nhất.
              </p>
              <p>
                Với Manna Store, mỗi ấn phẩm hay trang phục đều mang biểu tượng của sự chu cấp trọn vẹn và ân điển dư dật ấy: nhắc bạn thức dậy với lòng biết ơn, bước đi với niềm tin vững chãi và an nghỉ trong sự chăm sóc của Ngài.
              </p>
            </div>

            {/* 3 Core Aspects */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              <div className="p-4 rounded-2xl glass-panel border border-white/70 dark:border-white/10">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A880] block mb-1">
                  PROVISION
                </span>
                <h4 className="font-serif text-base font-bold text-[#0B1B3D] dark:text-white">
                  Sự Chu Cấp
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 font-light">
                  Chúa luôn ban đủ ơn cho mỗi ngày.
                </p>
              </div>

              <div className="p-4 rounded-2xl glass-panel border border-white/70 dark:border-white/10">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#5B6E57] block mb-1">
                  GRACE
                </span>
                <h4 className="font-serif text-base font-bold text-[#0B1B3D] dark:text-white">
                  Ân Điển
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 font-light">
                  Món quà nhưng không ban từ tình yêu.
                </p>
              </div>

              <div className="p-4 rounded-2xl glass-panel border border-white/70 dark:border-white/10">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#0B1B3D] dark:text-stone-300 block mb-1">
                  DAILY FAITH
                </span>
                <h4 className="font-serif text-base font-bold text-[#0B1B3D] dark:text-white">
                  Nương Cậy
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 font-light">
                  Đức tin bước đi cùng Chúa từng khoảnh khắc.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Serene Open Book & Light Composition */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden glass-panel p-3.5 shadow-2xl">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-900">
                <Image
                  src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1000&auto=format&fit=crop"
                  alt="Holy Bible & Morning Devotion"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 450px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                {/* Floating Scripture Inscription */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="font-serif text-lg sm:text-xl italic font-light leading-relaxed">
                    &ldquo;Hãy cho chúng tôi ngày nào đủ bánh ngày ấy.&rdquo;
                  </p>
                  <p className="text-xs uppercase tracking-widest text-amber-200 mt-2 font-medium">
                    — Lu-ca 11:3
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
