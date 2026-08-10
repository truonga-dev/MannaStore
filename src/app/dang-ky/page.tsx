"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Mail, Lock, User as UserIcon, ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { TermsModal } from "@/components/auth/TermsModal";
import { PrivacyModal } from "@/components/auth/PrivacyModal";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      toast.error("Vui lòng đồng ý với Điều khoản dịch vụ.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Có lỗi xảy ra.");
      } else {
        toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
        router.push("/dang-nhap");
      }
    } catch (error) {
      toast.error("Lỗi kết nối. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-[#0B0D17]">
      {/* Left side - Image */}
      <div className="hidden lg:flex w-1/2 relative bg-gray-900 overflow-hidden">
        <Image 
          src="/auth-bg.png" 
          alt="Login background" 
          fill 
          className="object-cover opacity-80 hover:scale-105 transition-transform duration-[2000ms] ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D17] via-[#0B0D17]/40 to-transparent flex flex-col justify-end p-16 pb-32 text-white">
          <div className="max-w-xl translate-y-0 hover:-translate-y-2 transition-transform duration-500">
            <h2 className="font-serif text-5xl font-bold mb-6 leading-tight drop-shadow-lg">Bánh từ trời<br/>Manna Store</h2>
            <p className="text-base text-gray-300 font-light leading-relaxed drop-shadow">
              Hành trình đức tin cần những nguồn dưỡng chất tươi mới. Hãy tạo tài khoản ngay hôm nay để khám phá các ấn phẩm Cơ Đốc được chọn lọc kỹ lưỡng, mang thông điệp bình an và hy vọng cho tâm hồn bạn.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-[380px] space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="text-center sm:text-left space-y-1.5">
            <h1 className="font-serif text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Đăng ký</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Tạo tài khoản mới hoàn toàn miễn phí.</p>
          </div>
          
          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                  <UserIcon className="h-4 w-4" />
                </div>
                <input 
                  required 
                  type="text" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-gray-900 dark:text-white focus:bg-white dark:focus:bg-white/10 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all shadow-sm placeholder:text-gray-400" 
                  placeholder="Họ và tên"
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <input 
                  required 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-gray-900 dark:text-white focus:bg-white dark:focus:bg-white/10 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all shadow-sm placeholder:text-gray-400" 
                  placeholder="Địa chỉ Email"
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                  <Lock className="h-4 w-4" />
                </div>
                <input 
                  required 
                  type="password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-gray-900 dark:text-white focus:bg-white dark:focus:bg-white/10 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all shadow-sm placeholder:text-gray-400" 
                  placeholder="Mật khẩu (tối thiểu 6 ký tự)"
                  minLength={6}
                />
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center w-4 h-4 mt-0.5 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 group-hover:border-blue-500 transition-colors flex-shrink-0">
                <input 
                  type="checkbox" 
                  required
                  className="sr-only"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                {agreed && <Check className="w-3 h-3 text-blue-500" />}
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed select-none group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
                Tôi đồng ý với các <button type="button" onClick={() => setShowTerms(true)} className="font-medium text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors">Điều khoản dịch vụ</button> và <button type="button" onClick={() => setShowPrivacy(true)} className="font-medium text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors">Chính sách bảo mật</button> của Manna Store.
              </span>
            </label>
            
            <button 
              type="submit" 
              disabled={isSubmitting || !agreed}
              className="w-full relative group overflow-hidden bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 rounded-xl font-semibold text-sm tracking-wide transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex justify-center items-center gap-2"
            >
              <div className="absolute inset-0 w-full h-full bg-white/20 dark:bg-black/10 scale-x-0 group-hover:scale-x-100 transform origin-left transition-transform duration-500 ease-out"></div>
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin"></div>
                  <span>ĐANG XỬ LÝ...</span>
                </>
              ) : (
                <span className="flex items-center gap-2 relative z-10">
                  TẠO TÀI KHOẢN <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>
          </form>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-gray-200 dark:border-gray-800"></div>
            <span className="flex-shrink-0 mx-4 text-[11px] font-medium text-gray-400 uppercase tracking-widest">Hoặc đăng ký với</span>
            <div className="flex-grow border-t border-gray-200 dark:border-gray-800"></div>
          </div>

          <button 
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="w-full flex items-center justify-center gap-3 bg-white dark:bg-[#11131F] border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-200 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-[#1A1D2D] hover:border-gray-300 dark:hover:border-gray-700 transition-all font-medium text-sm shadow-sm hover:shadow group"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-110 transition-transform">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>

          <div className="text-center text-sm text-gray-500 mt-6">
            Đã có tài khoản?{" "}
            <Link href="/dang-nhap" className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
              Đăng nhập ngay
            </Link>
          </div>
        </div>
      </div>

      <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />
      <PrivacyModal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />
    </div>
  );
}
