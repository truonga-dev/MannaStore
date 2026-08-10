import Link from 'next/link';
import { Heart, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

const InstagramIcon = ({ size = 16, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ size = 16, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const YoutubeIcon = ({ size = 16, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" />
  </svg>
);

const STORE_LINKS = [
  { label: "Tất cả sản phẩm", href: "/san-pham" },
  { label: "Áo Thun & Hoodie", href: "/danh-muc/ao-thun" },
  { label: "Quà Tặng", href: "/danh-muc/qua-tang" },
  { label: "Sách & Sổ tay", href: "/danh-muc/sach" },
  { label: "Phụ kiện", href: "/danh-muc/phu-kien" },
];

const SUPPORT_LINKS = [
  { label: "Chính sách đổi trả", href: "/chinh-sach-doi-tra" },
  { label: "Vận chuyển & Giao hàng", href: "/giao-hang" },
  { label: "Theo dõi đơn hàng", href: "/thong-tin" },
  { label: "Liên hệ", href: "/lien-he" },
  { label: "Câu hỏi thường gặp", href: "/lien-he#faq" },
];

const ABOUT_LINKS = [
  { label: "Câu chuyện của chúng tôi", href: "/ve-chung-toi" },
  { label: "Điều khoản sử dụng", href: "/dieu-khoan" },
  { label: "Chính sách bảo mật", href: "/bao-mat" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0B1B3D] dark:bg-[#050d1e] text-white mt-auto">

      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

        {/* Brand col — spans 2 cols on lg */}
        <div className="lg:col-span-2">
          <Link href="/" className="inline-flex flex-col items-center font-serif text-2xl font-bold tracking-[0.25em] mb-6 hover:opacity-80 transition-opacity leading-none">
            MANNA
            <span className="text-[10px] font-sans tracking-[0.3em] font-medium mt-1.5 uppercase text-white/90">Store</span>
          </Link>
          <p className="text-sm text-white/60 leading-relaxed mb-6 max-w-xs">
            Trang bị đời sống tâm linh. Tôi mang thông điệp bình an, hi vọng và yêu thương vào từng sản phẩm — để đức tin hiện diện mỗi ngày.
          </p>

          {/* Contact mini-info */}
          <div className="space-y-2 mb-8">
            {[
              { icon: <MapPin size={13} />, text: "TP. Đà Nẵng, Việt Nam" },
              { icon: <Phone size={13} />, text: "0347 084 605" },
              { icon: <Mail size={13} />, text: "hello@mannastore.vn" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-white/50">
                <span className="text-white/30">{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            {[
              { icon: <InstagramIcon size={16} />, href: "https://instagram.com", label: "Instagram" },
              { icon: <FacebookIcon size={16} />, href: "https://facebook.com", label: "Facebook" },
              { icon: <YoutubeIcon size={16} />, href: "https://youtube.com", label: "YouTube" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-white hover:text-[#0B1B3D] transition-all duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Cửa hàng */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-white/40 mb-5">Cửa Hàng</h4>
          <ul className="space-y-3">
            {STORE_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-white/70 hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Hỗ trợ */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-white/40 mb-5">Hỗ Trợ</h4>
          <ul className="space-y-3">
            {SUPPORT_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-white/70 hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* About + Newsletter */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-white/40 mb-5">Về Manna</h4>
          <ul className="space-y-3 mb-8">
            {ABOUT_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-white/70 hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Newsletter mini */}
          <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-white/40 mb-3">Nhận tin mới</h4>
          <p className="text-xs text-white/50 mb-3 leading-relaxed">Ưu đãi độc quyền & lời Chúa mỗi tuần.</p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Email của bạn"
              className="flex-1 min-w-0 px-3 py-2.5 bg-white/10 border border-white/15 text-white placeholder:text-white/30 text-xs outline-none focus:border-white/40 transition-colors rounded-lg"
            />
            <button
              type="submit"
              className="px-3 py-2.5 bg-white text-[#0B1B3D] rounded-lg hover:bg-white/90 transition-colors flex-shrink-0"
            >
              <ArrowRight size={15} />
            </button>
          </form>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10" />

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-white/35">
          © {new Date().getFullYear()} Manna Store. Bảo lưu mọi quyền.
        </p>
        <p className="text-xs text-white/35 flex items-center gap-1">
          Làm với <Heart size={11} className="text-rose-400 mx-0.5" fill="currentColor" /> cho cộng đồng Cơ Đốc Việt Nam.
        </p>
        <div className="flex items-center gap-4 text-xs text-white/35">
          <Link href="/dieu-khoan" className="hover:text-white/70 transition-colors">Điều khoản</Link>
          <span className="text-white/20">·</span>
          <Link href="/bao-mat" className="hover:text-white/70 transition-colors">Bảo mật</Link>
          <span className="text-white/20">·</span>
          <Link href="/lien-he" className="hover:text-white/70 transition-colors">Liên hệ</Link>
        </div>
      </div>
    </footer>
  );
}
