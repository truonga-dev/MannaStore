"use client";

import { useState } from "react";
import { Store, CreditCard, Save, MapPin, Truck, Bell, Gift, Megaphone } from "lucide-react";
import toast from "react-hot-toast";

export default function SettingsClient() {
  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // General Settings
  const [storeName, setStoreName] = useState("Manna Store");
  const [contactEmail, setContactEmail] = useState("contact@mannastore.com");
  const [hotline, setHotline] = useState("0123 456 789");
  const [address, setAddress] = useState("123 Faith Avenue, Hồ Chí Minh");
  const [description, setDescription] = useState("Cửa hàng sản phẩm Cơ Đốc - Mặc đức tin vào cuộc sống.");

  // Payment Settings
  const [enableCOD, setEnableCOD] = useState(true);
  const [enableSePay, setEnableSePay] = useState(true);
  const [sepayApiKey, setSepayApiKey] = useState("************************");
  const [sepayAccountNumber, setSepayAccountNumber] = useState("123456789 (Vietcombank)");

  // Notification Settings
  const [notifyNewOrder, setNotifyNewOrder] = useState(true);
  const [notifyLowStock, setNotifyLowStock] = useState(true);

  // Shipping Settings
  const [shippingFlatRate, setShippingFlatRate] = useState("30000");
  const [freeShippingThreshold, setFreeShippingThreshold] = useState("500000");

  // Loyalty Settings
  const [loyaltyEarnRate, setLoyaltyEarnRate] = useState("100000");
  const [loyaltySpendRate, setLoyaltySpendRate] = useState("1000");
  const [enableLoyalty, setEnableLoyalty] = useState(true);

  // Marketing Settings
  const [fbPixelId, setFbPixelId] = useState("");
  const [tiktokPixelId, setTiktokPixelId] = useState("");

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      toast.success("Đã lưu cấu hình thành công!");
    }, 800);
  };

  const tabs = [
    { id: "general", label: "Cửa hàng", icon: Store },
    { id: "payment", label: "Thanh toán", icon: CreditCard },
    { id: "shipping", label: "Giao hàng", icon: Truck },
    { id: "notifications", label: "Thông báo", icon: Bell },
    { id: "loyalty", label: "Điểm thưởng", icon: Gift },
    { id: "marketing", label: "Marketing", icon: Megaphone },
  ];

  return (
    <div className="pb-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium text-gray-100">Cài đặt Hệ thống</h1>
        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="flex items-center justify-center px-6 py-2.5 rounded-full shadow-sm text-sm font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700 transition-all"
          >
            Chỉnh sửa thông tin
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-bold text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-all"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 hover:-translate-y-0.5 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md disabled:opacity-50 disabled:hover:translate-y-0 transition-all"
            >
              <Save size={18} />
              {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Settings Tabs */}
        <div className="w-full md:w-64 space-y-2 shrink-0">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors text-sm font-medium ${
                  activeTab === tab.id
                    ? "bg-red-600/10 text-red-400 border border-red-500/20"
                    : "hover:bg-[#1E1E1E] text-gray-400 border border-transparent"
                }`}
              >
                <Icon size={18} /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-[#1E1E1E] border border-gray-800 rounded-2xl shadow-sm overflow-hidden min-h-[500px]">
          {/* General Tab */}
          {activeTab === "general" && (
            <div className="p-6 md:p-8">
              <h2 className="text-lg font-semibold mb-6 pb-4 border-b border-gray-800 text-gray-100">Thông tin cửa hàng</h2>
              <div className="space-y-5 max-w-2xl">
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-gray-400">Tên cửa hàng</label>
                  <input type="text" value={storeName} onChange={(e) => isEditing && setStoreName(e.target.value)} disabled={!isEditing} className="w-full border border-gray-700 p-3 rounded-xl bg-[#121212] focus:ring-1 focus:ring-red-500 outline-none text-gray-200 disabled:opacity-60" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-gray-400">Email liên hệ</label>
                    <input type="email" value={contactEmail} onChange={(e) => isEditing && setContactEmail(e.target.value)} disabled={!isEditing} className="w-full border border-gray-700 p-3 rounded-xl bg-[#121212] focus:ring-1 focus:ring-red-500 outline-none text-gray-200 disabled:opacity-60" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-gray-400">Hotline</label>
                    <input type="text" value={hotline} onChange={(e) => isEditing && setHotline(e.target.value)} disabled={!isEditing} className="w-full border border-gray-700 p-3 rounded-xl bg-[#121212] focus:ring-1 focus:ring-red-500 outline-none text-gray-200 disabled:opacity-60" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-gray-400 flex items-center gap-2">
                    <MapPin size={16} /> Địa chỉ cửa hàng
                  </label>
                  <input type="text" value={address} onChange={(e) => isEditing && setAddress(e.target.value)} disabled={!isEditing} className="w-full border border-gray-700 p-3 rounded-xl bg-[#121212] focus:ring-1 focus:ring-red-500 outline-none text-gray-200 disabled:opacity-60" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-gray-400">Mô tả ngắn (SEO)</label>
                  <textarea rows={3} value={description} onChange={(e) => isEditing && setDescription(e.target.value)} disabled={!isEditing} className="w-full border border-gray-700 p-3 rounded-xl bg-[#121212] focus:ring-1 focus:ring-red-500 outline-none resize-none text-gray-200 disabled:opacity-60" />
                </div>
              </div>
            </div>
          )}

          {/* Payment Tab */}
          {activeTab === "payment" && (
            <div className="p-6 md:p-8">
              <h2 className="text-lg font-semibold mb-6 pb-4 border-b border-gray-800 text-gray-100">Cấu hình Thanh toán</h2>
              <div className="space-y-6 max-w-2xl">
                <div className="flex items-start justify-between p-5 border border-gray-800 rounded-xl bg-[#2A2A2A]/50">
                  <div>
                    <h3 className="font-medium text-gray-200">Thanh toán khi nhận hàng (COD)</h3>
                    <p className="text-sm text-gray-400 mt-1">Cho phép khách hàng thanh toán bằng tiền mặt khi shipper giao hàng.</p>
                  </div>
                  <label className={`relative inline-flex items-center mt-1 ${isEditing ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}>
                    <input type="checkbox" className="sr-only peer" checked={enableCOD} disabled={!isEditing} onChange={() => isEditing && setEnableCOD(!enableCOD)} />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600 border-gray-600"></div>
                  </label>
                </div>

                <div className="border border-gray-800 rounded-xl bg-[#2A2A2A]/50 overflow-hidden">
                  <div className="flex items-start justify-between p-5 border-b border-gray-800">
                    <div>
                      <h3 className="font-medium text-gray-200">Chuyển khoản QR (SePay)</h3>
                      <p className="text-sm text-gray-400 mt-1">Tự động xác nhận thanh toán qua SePay Webhook bằng mã QR động.</p>
                    </div>
                    <label className={`relative inline-flex items-center mt-1 ${isEditing ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}>
                      <input type="checkbox" className="sr-only peer" checked={enableSePay} disabled={!isEditing} onChange={() => isEditing && setEnableSePay(!enableSePay)} />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600 border-gray-600"></div>
                    </label>
                  </div>
                  {enableSePay && (
                    <div className="p-5 space-y-4 bg-[#1E1E1E]">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-400">Tài khoản ngân hàng tích hợp</label>
                        <input type="text" value={sepayAccountNumber} onChange={(e) => isEditing && setSepayAccountNumber(e.target.value)} disabled={!isEditing} className="w-full border border-gray-700 p-3 rounded-xl bg-[#121212] focus:ring-1 focus:ring-red-500 outline-none text-gray-200 disabled:opacity-60" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-400">API Key SePay</label>
                        <input type="password" value={sepayApiKey} onChange={(e) => isEditing && setSepayApiKey(e.target.value)} disabled={!isEditing} className="w-full border border-gray-700 p-3 rounded-xl bg-[#121212] focus:ring-1 focus:ring-red-500 outline-none text-gray-200 disabled:opacity-60" />
                        <p className="text-xs text-gray-500 mt-2">Dùng để kết nối với tài khoản SePay của bạn để lấy lịch sử giao dịch.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Shipping Tab */}
          {activeTab === "shipping" && (
            <div className="p-6 md:p-8">
              <h2 className="text-lg font-semibold mb-6 pb-4 border-b border-gray-800 text-gray-100">Giao hàng & Vận chuyển</h2>
              <div className="space-y-6 max-w-2xl">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-400">Phí giao hàng cơ bản (VNĐ)</label>
                  <input type="number" value={shippingFlatRate} onChange={(e) => isEditing && setShippingFlatRate(e.target.value)} disabled={!isEditing} className="w-full border border-gray-700 p-3 rounded-xl bg-[#121212] focus:ring-1 focus:ring-red-500 outline-none text-gray-200 disabled:opacity-60" />
                  <p className="text-xs text-gray-500 mt-2">Phí vận chuyển mặc định áp dụng cho tất cả đơn hàng nếu không tích hợp hãng vận chuyển.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-400">Ngưỡng miễn phí vận chuyển (VNĐ)</label>
                  <input type="number" value={freeShippingThreshold} onChange={(e) => isEditing && setFreeShippingThreshold(e.target.value)} disabled={!isEditing} className="w-full border border-gray-700 p-3 rounded-xl bg-[#121212] focus:ring-1 focus:ring-red-500 outline-none text-gray-200 disabled:opacity-60" />
                  <p className="text-xs text-gray-500 mt-2">Đơn hàng có tổng trị giá trên mức này sẽ được miễn phí vận chuyển. Đặt 0 để tắt.</p>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="p-6 md:p-8">
              <h2 className="text-lg font-semibold mb-6 pb-4 border-b border-gray-800 text-gray-100">Thông báo Email</h2>
              <div className="space-y-4 max-w-2xl">
                <div className="flex items-center justify-between p-5 border border-gray-800 rounded-xl bg-[#2A2A2A]/50">
                  <div>
                    <h3 className="font-medium text-gray-200">Đơn hàng mới</h3>
                    <p className="text-sm text-gray-400 mt-1">Gửi email thông báo cho Admin khi có khách đặt hàng mới.</p>
                  </div>
                  <label className={`relative inline-flex items-center mt-1 ${isEditing ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}>
                    <input type="checkbox" className="sr-only peer" checked={notifyNewOrder} disabled={!isEditing} onChange={() => isEditing && setNotifyNewOrder(!notifyNewOrder)} />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600 border-gray-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-5 border border-gray-800 rounded-xl bg-[#2A2A2A]/50">
                  <div>
                    <h3 className="font-medium text-gray-200">Cảnh báo sắp hết hàng</h3>
                    <p className="text-sm text-gray-400 mt-1">Gửi email nhắc nhở khi sản phẩm có tồn kho dưới 10.</p>
                  </div>
                  <label className={`relative inline-flex items-center mt-1 ${isEditing ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}>
                    <input type="checkbox" className="sr-only peer" checked={notifyLowStock} disabled={!isEditing} onChange={() => isEditing && setNotifyLowStock(!notifyLowStock)} />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600 border-gray-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Loyalty Points Tab */}
          {activeTab === "loyalty" && (
            <div className="p-6 md:p-8">
              <h2 className="text-lg font-semibold mb-6 pb-4 border-b border-gray-800 text-gray-100">Khách hàng thân thiết & Điểm thưởng</h2>
              <div className="space-y-6 max-w-2xl">
                <div className="flex items-start justify-between p-5 border border-gray-800 rounded-xl bg-[#2A2A2A]/50">
                  <div>
                    <h3 className="font-medium text-gray-200">Kích hoạt tích điểm</h3>
                    <p className="text-sm text-gray-400 mt-1">Cho phép khách hàng tích lũy và sử dụng điểm thưởng khi mua sắm.</p>
                  </div>
                  <label className={`relative inline-flex items-center mt-1 ${isEditing ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}>
                    <input type="checkbox" className="sr-only peer" checked={enableLoyalty} disabled={!isEditing} onChange={() => isEditing && setEnableLoyalty(!enableLoyalty)} />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600 border-gray-600"></div>
                  </label>
                </div>

                {enableLoyalty && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-400">Tích lũy (VNĐ = 1 Điểm)</label>
                      <input type="number" value={loyaltyEarnRate} onChange={(e) => isEditing && setLoyaltyEarnRate(e.target.value)} disabled={!isEditing} className="w-full border border-gray-700 p-3 rounded-xl bg-[#121212] focus:ring-1 focus:ring-red-500 outline-none text-gray-200 disabled:opacity-60" />
                      <p className="text-xs text-gray-500 mt-2">Ví dụ: 100,000 VNĐ = 1 Điểm</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-400">Quy đổi (1 Điểm = VNĐ)</label>
                      <input type="number" value={loyaltySpendRate} onChange={(e) => isEditing && setLoyaltySpendRate(e.target.value)} disabled={!isEditing} className="w-full border border-gray-700 p-3 rounded-xl bg-[#121212] focus:ring-1 focus:ring-red-500 outline-none text-gray-200 disabled:opacity-60" />
                      <p className="text-xs text-gray-500 mt-2">Ví dụ: 1 Điểm = 1,000 VNĐ giảm giá</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Marketing Tab */}
          {activeTab === "marketing" && (
            <div className="p-6 md:p-8">
              <h2 className="text-lg font-semibold mb-6 pb-4 border-b border-gray-800 text-gray-100">Marketing & Social Media</h2>
              <div className="space-y-6 max-w-2xl">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-400">Meta (Facebook) Pixel ID</label>
                  <input type="text" value={fbPixelId} onChange={(e) => isEditing && setFbPixelId(e.target.value)} disabled={!isEditing} placeholder="Ví dụ: 123456789012345" className="w-full border border-gray-700 p-3 rounded-xl bg-[#121212] focus:ring-1 focus:ring-red-500 outline-none text-gray-200 disabled:opacity-60" />
                  <p className="text-xs text-gray-500 mt-2">Dùng để theo dõi chuyển đổi quảng cáo từ Facebook/Instagram.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-400">TikTok Pixel ID</label>
                  <input type="text" value={tiktokPixelId} onChange={(e) => isEditing && setTiktokPixelId(e.target.value)} disabled={!isEditing} placeholder="Ví dụ: CDG123456789" className="w-full border border-gray-700 p-3 rounded-xl bg-[#121212] focus:ring-1 focus:ring-red-500 outline-none text-gray-200 disabled:opacity-60" />
                  <p className="text-xs text-gray-500 mt-2">Dùng để theo dõi chuyển đổi quảng cáo từ TikTok.</p>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-800">
                  <h3 className="font-medium text-gray-200 mb-4">Các tính năng SEO & Chia sẻ tự động</h3>
                  <ul className="space-y-3 text-sm text-gray-400">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                      OpenGraph & Twitter Cards đã được bật mặc định.
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                      Nút chia sẻ mạng xã hội (Facebook, Zalo) đã tích hợp trong trang Sản phẩm.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
