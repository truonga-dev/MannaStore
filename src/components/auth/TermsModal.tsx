import React from "react";
import { X } from "lucide-react";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TermsModal({ isOpen, onClose }: TermsModalProps) {
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
            <h2 className="text-2xl font-serif font-bold text-foreground">Điều khoản dịch vụ</h2>
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
            <h3 className="text-lg font-semibold text-foreground mb-3">1. Giới thiệu</h3>
            <p className="mb-3">
              Chào mừng bạn đến với Manna Store. Khi truy cập và mua sắm tại nền tảng của chúng tôi, bạn đồng ý tuân thủ và chịu ràng buộc bởi các điều khoản và điều kiện sử dụng dưới đây. Vui lòng đọc kỹ các quy định này trước khi sử dụng dịch vụ.
            </p>
            <p>
              Nếu bạn không đồng ý với bất kỳ điều khoản nào, xin vui lòng không tiếp tục sử dụng trang web và dịch vụ của chúng tôi.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-foreground mb-3">2. Tài khoản người dùng</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Khi tạo tài khoản tại Manna Store, bạn cam kết cung cấp thông tin chính xác, đầy đủ và cập nhật.</li>
              <li>Bạn chịu trách nhiệm bảo mật mật khẩu và tài khoản của mình, cũng như mọi hoạt động diễn ra dưới tài khoản đó.</li>
              <li>Chúng tôi có quyền từ chối cung cấp dịch vụ, vô hiệu hóa tài khoản hoặc hủy đơn hàng nếu phát hiện hành vi gian lận hoặc vi phạm chính sách.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-foreground mb-3">3. Quyền sở hữu trí tuệ</h3>
            <p>
              Tất cả nội dung trên trang web này, bao gồm nhưng không giới hạn ở văn bản, đồ họa, logo, biểu tượng, hình ảnh và phần mềm, đều thuộc sở hữu của Manna Store hoặc các nhà cung cấp nội dung của chúng tôi và được bảo vệ bởi luật sở hữu trí tuệ Việt Nam và quốc tế.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-foreground mb-3">4. Chính sách mua hàng và thanh toán</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Giá sản phẩm được niêm yết bằng Việt Nam Đồng (VND) và có thể thay đổi mà không cần báo trước.</li>
              <li>Đơn hàng của bạn sẽ được xác nhận sau khi chúng tôi nhận được thanh toán hoặc xác nhận phương thức COD.</li>
              <li>Manna Store cam kết nỗ lực hết sức để đảm bảo thông tin sản phẩm và tình trạng tồn kho luôn chính xác, nhưng không loại trừ các sai sót khách quan.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-foreground mb-3">5. Giới hạn trách nhiệm</h3>
            <p>
              Manna Store sẽ không chịu trách nhiệm đối với bất kỳ thiệt hại trực tiếp, gián tiếp, ngẫu nhiên hoặc mang tính hậu quả nào phát sinh từ việc sử dụng hoặc không thể sử dụng dịch vụ của chúng tôi, bao gồm cả những sự cố liên quan đến lỗi kỹ thuật từ bên thứ ba.
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
