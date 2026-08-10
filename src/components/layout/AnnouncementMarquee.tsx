"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function AnnouncementMarquee() {
  return (
    <div className="bg-[#0B1320] overflow-hidden py-2.5 border-b border-[#0B1320] flex items-center">
      <motion.div
        className="flex gap-12 whitespace-nowrap min-w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
      >
        {[...Array(8)].map((_, i) => (
          <span
            key={i}
            className="text-white text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold flex items-center gap-8"
          >
            <Sparkles size={12} className="opacity-40" />
            Manna Store
            <span className="opacity-30">·</span>
            Trang bị đời sống tâm linh
            <span className="opacity-30">·</span>
            Thiết kế độc quyền
            <span className="opacity-30">·</span>
            Giao hàng toàn quốc
          </span>
        ))}
      </motion.div>
    </div>
  );
}
