import React from "react";
import { X } from "lucide-react";

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground">Chính sách bảo mật</h2>
            <p className="text-xs text-gray-500 mt-1">Cập nhật lần cuối: 08/08/2026</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto space-y-8 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          <section>
            <h3 className="text-lg font-semibold text-foreground mb-3">1. Mục đích thu thập thông tin</h3>
            <p className="mb-3">
              Sự riêng tư của bạn rất quan trọng đối với Manna Store. Việc thu thập dữ liệu trên website bao gồm: email, điện thoại, mật khẩu đăng nhập, địa chỉ khách hàng nhằm:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Xử lý đơn hàng, giao hàng và hỗ trợ khách hàng.</li>
              <li>Cung cấp thông tin cập nhật về sản phẩm, khuyến mãi.</li>
              <li>Nâng cao chất lượng dịch vụ, cải thiện trải nghiệm người dùng.</li>
              <li>Ngăn ngừa các hoạt động phá hoại tài khoản hoặc giả mạo người dùng.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-foreground mb-3">2. Phạm vi sử dụng thông tin</h3>
            <p className="mb-3">
              Chúng tôi sử dụng thông tin cá nhân của bạn hoàn toàn hợp pháp và không bán, trao đổi cho bên thứ ba vì mục đích thương mại. Thông tin chỉ được chia sẻ:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Cho đối tác vận chuyển để thực hiện việc giao nhận hàng hóa.</li>
              <li>Cho đối tác thanh toán để hoàn tất các giao dịch trực tuyến.</li>
              <li>Khi có yêu cầu hợp pháp từ cơ quan chức năng nhà nước.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-foreground mb-3">3. Thời gian lưu trữ thông tin</h3>
            <p>
              Dữ liệu cá nhân của bạn sẽ được lưu trữ cho đến khi có yêu cầu hủy bỏ hoặc tự bạn đăng nhập và thực hiện hủy bỏ. Trong mọi trường hợp còn lại, thông tin cá nhân thành viên sẽ được bảo mật trên máy chủ của Manna Store.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-foreground mb-3">4. Cam kết bảo mật thông tin</h3>
            <p>
              Chúng tôi áp dụng các biện pháp kỹ thuật và an ninh thích hợp để ngăn chặn truy cập trái phép hoặc trái pháp luật, bị mất mát hoặc tiêu hủy, thiệt hại cho thông tin của bạn. Tuy nhiên, không có phương thức truyền tải nào qua Internet an toàn tuyệt đối.
            </p>
          </section>
        </div>
        
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm"
          >
            Đã hiểu
          </button>
        </div>
      </div>
    </div>
  );
}
