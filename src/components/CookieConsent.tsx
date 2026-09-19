"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, X } from "lucide-react";

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Hiển thị một lần duy nhất cho mỗi máy
    const hasConsented = localStorage.getItem("mana_cookie_consent");
    if (!hasConsented) {
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("mana_cookie_consent", "all");
    setShowConsent(false);
  };

  const rejectAll = () => {
    localStorage.setItem("mana_cookie_consent", "essential_only");
    setShowConsent(false);
  };

  const acceptSelection = () => {
    localStorage.setItem("mana_cookie_consent", "custom");
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "tween", duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-[90] border-t border-border bg-background shadow-[0_-10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
        >
          <div className="max-w-7xl mx-auto p-5 md:p-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              
              {/* Content */}
              <div className="flex items-start gap-4 max-w-4xl">
                <div className="hidden sm:flex mt-1 items-center justify-center min-w-10 min-h-10 rounded-sm bg-primary/10 text-primary">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="pr-8 sm:pr-0">
                  <h3 className="font-semibold text-foreground text-base mb-1">
                    Quyền riêng tư & Cookie
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    MannaStore sử dụng cookie thiết yếu để trang web hoạt động bình thường. 
                    Chúng tôi cũng muốn sử dụng cookie phân tích và tiếp thị để tối ưu hóa trải nghiệm 
                    của bạn và hiển thị nội dung phù hợp. Bạn có thể chọn loại cookie mình muốn cho phép.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center w-full lg:w-auto gap-3 shrink-0">
                <button 
                  onClick={() => setShowDetails(!showDetails)}
                  className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium border border-border text-foreground hover:bg-muted transition-colors rounded-sm"
                >
                  Tùy chỉnh
                </button>
                <button 
                  onClick={rejectAll}
                  className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium border border-border text-foreground hover:bg-muted transition-colors rounded-sm"
                >
                  Chỉ dùng thiết yếu
                </button>
                <button 
                  onClick={acceptAll}
                  className="w-full sm:w-auto px-6 py-2.5 text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm rounded-sm"
                >
                  Chấp nhận tất cả
                </button>
              </div>
            </div>

            {/* Custom Details Panel (Expandable) */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0, marginTop: 0 }}
                  animate={{ height: "auto", opacity: 1, marginTop: 24 }}
                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                  className="overflow-hidden border-t border-border"
                >
                  <div className="py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-semibold text-foreground">Cookie thiết yếu (Bắt buộc)</label>
                        <input type="checkbox" checked disabled className="w-4 h-4 rounded-sm border-gray-300 text-primary focus:ring-primary cursor-not-allowed" />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Cần thiết cho các chức năng cơ bản như bảo mật, quản lý mạng và duy trì đăng nhập. Không thể tắt.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-semibold text-foreground">Cookie phân tích</label>
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded-sm border-gray-300 text-primary focus:ring-primary cursor-pointer" />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Giúp chúng tôi hiểu cách khách truy cập tương tác với trang web, phát hiện lỗi và cải thiện hiệu suất.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-semibold text-foreground">Cookie tiếp thị</label>
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded-sm border-gray-300 text-primary focus:ring-primary cursor-pointer" />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Được sử dụng để theo dõi khách truy cập trên các trang web nhằm hiển thị quảng cáo có liên quan và thu hút hơn.
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end pt-4 border-t border-border/50">
                     <button 
                      onClick={acceptSelection}
                      className="px-6 py-2.5 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded-sm shadow-sm"
                    >
                      Lưu tùy chọn
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
          
          {/* Close Button at top right */}
          <button 
            onClick={rejectAll}
            className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors rounded-sm"
            aria-label="Đóng"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
