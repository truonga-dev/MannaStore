"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Mail, ArrowRight, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Có lỗi xảy ra.");
      } else {
        toast.success(data.message);
        setIsSuccess(true);
      }
    } catch (error) {
      toast.error("Lỗi kết nối. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background/50">
      {/* Left side - Image */}
      <div className="hidden lg:flex w-1/2 relative bg-gray-900 overflow-hidden">
        <Image 
          src="/auth-bg.png" 
          alt="Forgot password background" 
          fill 
          className="object-cover opacity-80 hover:scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-16 text-white">
          <div className="max-w-xl">
            <h2 className="font-serif text-5xl font-bold mb-6 leading-tight">Khôi phục<br/>tài khoản</h2>
            <p className="text-lg text-gray-200 font-light leading-relaxed">
              Đừng lo lắng! Hãy nhập email của bạn và chúng tôi sẽ giúp bạn lấy lại quyền truy cập để tiếp tục hành trình tâm linh cùng Manna Store.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 xl:p-20">
        <div className="w-full max-w-[420px] space-y-10">
          <div className="text-center sm:text-left space-y-2">
            <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground">Quên mật khẩu?</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Nhập địa chỉ email đã đăng ký của bạn để nhận liên kết khôi phục mật khẩu.</p>
          </div>
          
          {isSuccess ? (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-green-800 dark:text-green-300">Kiểm tra email của bạn</h3>
              <p className="text-sm text-green-700 dark:text-green-400">
                Nếu tài khoản tồn tại, chúng tôi đã gửi một liên kết khôi phục mật khẩu đến hòm thư của bạn. Vui lòng kiểm tra (cả hộp thư rác).
              </p>
              <Link href="/dang-nhap" className="inline-block mt-4 w-full py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-medium text-sm text-foreground hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
                Quay lại đăng nhập
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input 
                    required 
                    type="email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl py-3.5 pl-12 pr-4 text-sm text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm" 
                    placeholder="Địa chỉ Email"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full relative group overflow-hidden bg-primary text-primary-foreground py-4 rounded-xl font-bold text-sm tracking-wide transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-primary/20 hover:shadow-primary/40 flex justify-center items-center gap-2"
              >
                <div className="absolute inset-0 w-full h-full bg-white/20 scale-x-0 group-hover:scale-x-100 transform origin-left transition-transform duration-500 ease-out"></div>
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                    <span>ĐANG GỬI...</span>
                  </>
                ) : (
                  <span className="flex items-center gap-2 relative z-10">
                    GỬI LIÊN KẾT <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </button>
            </form>
          )}

          <div className="text-center text-sm text-gray-500 mt-8">
            <Link href="/dang-nhap" className="inline-flex items-center gap-1.5 font-semibold text-primary hover:text-primary/80 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Quay lại đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
