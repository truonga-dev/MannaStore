"use client";

import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";

export default function BrandFooter() {
  return (
    <footer className="bg-[#0B1B3D] text-[#FAF8F5] pt-20 pb-12 px-6 sm:px-10 lg:px-16 border-t border-white/10 relative overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-14 border-b border-white/10 items-start">
          {/* Brand Info (Col 6) */}
          <div className="md:col-span-6 flex flex-col items-start">
            <Link href="#hero" className="flex flex-col items-start leading-none group mb-4">
              <span className="font-serif text-3xl font-bold tracking-[0.25em] text-white">
                MANNA STORE
              </span>
              <span className="text-[10px] font-sans tracking-[0.35em] font-medium text-white/60 uppercase mt-1">
                Christian Lifestyle
              </span>
            </Link>

            <p className="font-serif italic text-base text-[#D4AF37] mb-3">
              &ldquo;Trang bị đức tin vào từng ngày.&rdquo;
            </p>

            <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed max-w-sm mb-6">
              Dự án phong cách sống Cơ Đốc kết hợp giữa nghệ thuật đương đại, chất liệu bền bỉ và các thông điệp Kinh Thánh sâu sắc.
            </p>

            <div className="space-y-1.5 text-xs text-white/60">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                TP. Đà Nẵng, Việt Nam
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C5A880]" />
                hello@mannastore.vn
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                0347 084 605
              </p>
            </div>
          </div>

          {/* Quick Nav (Col 3) */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.25em] font-bold text-white/40 mb-4">
              Dự Án
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#about" className="text-white/70 hover:text-white transition-colors">
                  Về Manna Store
                </a>
              </li>
              <li>
                <a href="#vision" className="text-white/70 hover:text-white transition-colors">
                  Tầm Nhìn & Giá Trị
                </a>
              </li>
              <li>
                <a href="#meaning" className="text-white/70 hover:text-white transition-colors">
                  Ý Nghĩa Manna
                </a>
              </li>
              <li>
                <a href="#ecosystem" className="text-white/70 hover:text-white transition-colors">
                  Hệ Sinh Thái Sản Phẩm
                </a>
              </li>
              <li>
                <a href="#philosophy" className="text-white/70 hover:text-white transition-colors">
                  Triết Lý Thương Hiệu
                </a>
              </li>
            </ul>
          </div>

          {/* Social Channels (Col 3) */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.25em] font-bold text-white/40 mb-4">
              Kết Nối
            </h4>
            <p className="text-xs text-white/60 font-light mb-4 leading-relaxed">
              Theo dõi hành trình sáng tạo và nhận thông điệp khích lệ mỗi ngày:
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white hover:text-[#0B1B3D] transition-colors flex items-center justify-center text-white/80"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white hover:text-[#0B1B3D] transition-colors flex items-center justify-center text-white/80"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white hover:text-[#0B1B3D] transition-colors flex items-center justify-center text-white/80"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <p>© {new Date().getFullYear()} MANNA STORE. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/ve-chung-toi" className="hover:text-white transition-colors">
              Câu chuyện
            </Link>
            <Link href="/dieu-khoan" className="hover:text-white transition-colors">
              Điều khoản
            </Link>
            <Link href="/lien-he" className="hover:text-white transition-colors">
              Liên hệ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
