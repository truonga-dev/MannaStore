"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { RefreshCcw, Home, AlertTriangle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#F8F7F4] dark:bg-[#0C0C0C] flex items-center justify-center p-4 selection:bg-red-500 selection:text-white">
      <div className="max-w-2xl w-full text-center">
        {/* Animated Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mb-8"
        >
          <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-12 h-12 text-red-500" />
          </div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-3xl md:text-5xl font-bold font-serif text-gray-900 dark:text-white mb-4 leading-tight">
            Đã xảy ra sự cố
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-10 leading-relaxed text-lg">
            Hệ thống đang gặp trục trặc kỹ thuật hoặc mất kết nối. Xin lỗi vì sự bất tiện này.
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
            onClick={() => reset()}
            className="group flex items-center justify-center gap-2 px-8 py-3.5 w-full sm:w-auto
                       bg-red-500 text-white
                       hover:bg-red-600 transition-all duration-300"
          >
            <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            <span className="font-medium tracking-wide text-sm uppercase">Thử lại ngay</span>
          </button>
          
          <Link
            href="/"
            className="group flex items-center justify-center gap-2 px-8 py-3.5 w-full sm:w-auto
                       border border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white 
                       hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
          >
            <Home className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            <span className="font-medium tracking-wide text-sm uppercase">Về trang chủ</span>
          </Link>
        </motion.div>

        {/* Error Code/Digest if available */}
        {error.digest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-xs text-gray-400 dark:text-gray-600 font-mono"
          >
            Mã lỗi: {error.digest}
          </motion.div>
        )}
      </div>
    </div>
  );
}
