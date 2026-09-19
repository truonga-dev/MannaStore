"use client";

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Loader2 } from 'lucide-react';
import { submitContactMessage } from '../actions/contact';
import toast from 'react-hot-toast';

export default function LienHePage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Hỗ trợ đơn hàng',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    setLoading(true);
    const res = await submitContactMessage(formData);
    setLoading(false);

    if (res.success) {
      toast.success("Gửi tin nhắn thành công! Chúng tôi sẽ phản hồi sớm nhất.");
      setFormData({ ...formData, message: '' }); // keep name/email but clear message
    } else {
      toast.error(res.error || "Có lỗi xảy ra");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] dark:bg-[#0C0C0C] py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            Liên Hệ Với Chúng Tôi
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-base">
            Bạn có câu hỏi, góp ý hay cần hỗ trợ về đơn hàng? Đội ngũ Manna Store luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc của bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-start">
          {/* Contact Info (Left) */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Thông Tin Liên Hệ</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 text-gray-700 dark:text-gray-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Email</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Chúng tôi sẽ phản hồi trong 24h</p>
                    <a href="mailto:hello@mannastore.vn" className="font-medium text-[#0B1B3D] dark:text-blue-400 hover:underline">
                      truonga01.dev@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 text-gray-700 dark:text-gray-300">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Điện Thoại & Zalo</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Hỗ trợ nhanh chóng</p>
                    <a href="tel:0347084605" className="font-medium text-[#0B1B3D] dark:text-blue-400 hover:underline">
                      0347084605
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 text-gray-700 dark:text-gray-300">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Địa Chỉ</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Văn phòng chính</p>
                    <p className="font-medium text-gray-700 dark:text-gray-300">TP. Đà Nẵng, Việt Nam</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 text-gray-700 dark:text-gray-300">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Giờ Làm Việc</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Thứ 2 - Thứ 7</p>
                    <p className="font-medium text-gray-700 dark:text-gray-300">08:00 - 22:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form (Right) */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Gửi Lời Nhắn</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Họ và tên</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#0B1B3D] dark:focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white"
                    placeholder="Tên của bạn"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#0B1B3D] dark:focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white"
                    placeholder="nguyenvana@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Chủ đề</label>
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#0B1B3D] dark:focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white"
                >
                  <option>Hỗ trợ đơn hàng</option>
                  <option>Tư vấn sản phẩm</option>
                  <option>Hợp tác / Sỉ</option>
                  <option>Góp ý khác</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Nội dung</label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#0B1B3D] dark:focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none dark:text-white"
                  placeholder="Bạn cần chúng tôi giúp gì?"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 bg-[#0B1B3D] dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl hover:bg-[#0B1B3D]/90 dark:hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>Gửi tin nhắn <Send className="w-4 h-4" /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
