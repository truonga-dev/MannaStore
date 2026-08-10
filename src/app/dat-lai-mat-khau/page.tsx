"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { Lock, ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error("Không tìm thấy mã xác thực. Vui lòng kiểm tra lại đường dẫn trong email.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp.");
      return;
    }
    if (password.length < 6) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
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

  if (!token) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center space-y-4">
        <h3 className="font-semibold text-red-800 dark:text-red-300">Đường dẫn không hợp lệ</h3>
        <p className="text-sm text-red-700 dark:text-red-400">
          Vui lòng kiểm tra lại liên kết trong email của bạn hoặc yêu cầu gửi lại email khôi phục.
        </p>
        <Link href="/quen-mat-khau" className="inline-block mt-4 w-full py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-medium text-sm text-foreground hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
          Gửi lại yêu cầu
        </Link>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 text-center space-y-4">
        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="font-semibold text-green-800 dark:text-green-300">Đổi mật khẩu thành công</h3>
        <p className="text-sm text-green-700 dark:text-green-400">
          Mật khẩu của bạn đã được cập nhật. Bạn có thể sử dụng mật khẩu mới để đăng nhập.
        </p>
        <Link href="/dang-nhap" className="inline-block mt-4 w-full py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-medium text-sm text-foreground hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
          Đăng nhập ngay
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
            <Lock className="h-5 w-5" />
          </div>
          <input 
            required 
            type="password" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl py-3.5 pl-12 pr-4 text-sm text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm" 
            placeholder="Mật khẩu mới (tối thiểu 6 ký tự)"
            minLength={6}
          />
        </div>

        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
            <Lock className="h-5 w-5" />
          </div>
          <input 
            required 
            type="password" 
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl py-3.5 pl-12 pr-4 text-sm text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm" 
            placeholder="Xác nhận mật khẩu mới"
            minLength={6}
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
            <span>ĐANG LƯU...</span>
          </>
        ) : (
          <span className="flex items-center gap-2 relative z-10">
            LƯU MẬT KHẨU <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        )}
      </button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex bg-background/50">
      {/* Left side - Image */}
      <div className="hidden lg:flex w-1/2 relative bg-gray-900 overflow-hidden">
        <Image 
          src="/auth-bg.png" 
          alt="Reset password background" 
          fill 
          className="object-cover opacity-80 hover:scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-16 text-white">
          <div className="max-w-xl">
            <h2 className="font-serif text-5xl font-bold mb-6 leading-tight">Khởi đầu<br/>mới</h2>
            <p className="text-lg text-gray-200 font-light leading-relaxed">
              Tạo mật khẩu mới cho tài khoản của bạn để tiếp tục tận hưởng những trải nghiệm tuyệt vời tại Manna Store.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 xl:p-20">
        <div className="w-full max-w-[420px] space-y-10">
          <div className="text-center sm:text-left space-y-2">
            <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground">Đặt lại mật khẩu</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Vui lòng nhập mật khẩu mới cho tài khoản của bạn.</p>
          </div>
          
          <Suspense fallback={<div className="w-full h-32 flex items-center justify-center"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
            <ResetPasswordForm />
          </Suspense>

        </div>
      </div>
    </div>
  );
}
