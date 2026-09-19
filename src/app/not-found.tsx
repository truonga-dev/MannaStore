"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8F7F4] dark:bg-[#0C0C0C] flex items-center justify-center p-4 selection:bg-primary selection:text-white">
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-[120px] md:text-[180px] font-bold font-serif text-gray-900 dark:text-white leading-none tracking-tighter mb-4">
            4<span className="text-primary">0</span>4
          </h1>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
            Không tìm thấy trang
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-10 leading-relaxed">
            Rất tiếc, nội dung bạn đang tìm kiếm không tồn tại, đã bị xóa hoặc đường dẫn không chính xác.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => window.history.back()}
            className="group flex items-center justify-center gap-2 px-8 py-3.5 w-full sm:w-auto
                       border border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white 
                       hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium tracking-wide text-sm uppercase">Quay lại</span>
          </button>
          
          <Link
            href="/"
            className="group flex items-center justify-center gap-2 px-8 py-3.5 w-full sm:w-auto
                       bg-gray-900 dark:bg-white text-white dark:text-gray-900 
                       hover:bg-primary dark:hover:bg-primary hover:text-white dark:hover:text-white transition-all duration-300"
          >
            <Home className="w-4 h-4" />
            <span className="font-medium tracking-wide text-sm uppercase">Trang chủ</span>
          </Link>
        </motion.div>

        {/* Footer/Search Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 flex items-center justify-center gap-2 text-sm text-gray-400 dark:text-gray-500"
        >
          <Search className="w-4 h-4" />
          <span>Sử dụng thanh tìm kiếm để tìm sản phẩm hoặc bài viết khác.</span>
        </motion.div>
      </div>
    </div>
  );
}
