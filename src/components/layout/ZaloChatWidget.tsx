"use client";

import Image from "next/image";

// Thay số điện thoại Zalo của bạn vào đây
const ZALO_PHONE = "0347084605";

export default function ZaloChatWidget() {
  return (
    <a
      href={`https://zalo.me/${ZALO_PHONE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat Zalo với Manna Store"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group"
    >
      {/* Tooltip */}
      <span className="hidden group-hover:flex items-center bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm font-semibold px-4 py-2 rounded-full shadow-lg whitespace-nowrap border border-gray-100 dark:border-gray-700 transition-all">
        Chat với chúng tôi
      </span>

      {/* Zalo Button */}
      <div className="relative w-14 h-14 flex-shrink-0">
        {/* Animated pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#0068FF]/40 animate-ping" />
        {/* Shadow glow */}
        <span className="absolute inset-0 rounded-full bg-[#0068FF]/20 blur-md" />
        {/* Button */}
        <div className="relative w-14 h-14 rounded-full bg-white shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-200 border-2 border-[#0068FF]/10">
          {/* Official Zalo logo image from Zalo's own CDN */}
          <Image
            src="https://page.widget.zalo.me/static/images/2.0/Logo.svg"
            alt="Zalo"
            width={44}
            height={44}
            className="rounded-full"
          />
        </div>
      </div>
    </a>
  );
}
