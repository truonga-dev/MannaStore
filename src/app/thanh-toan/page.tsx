"use client";

import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createOrder } from "@/app/actions/order";
import toast from "react-hot-toast";
import { MapPin, Ticket, Coins, CreditCard, ChevronRight, CheckCircle2, Truck, MessageSquare, UserCheck } from "lucide-react";
import Link from "next/link";
import { TermsModal } from "@/components/auth/TermsModal";

type UserProfile = {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
};

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("SEPAY");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountAmount: number } | null>(null);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  

  const [showTerms, setShowTerms] = useState(false);
  
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [placedOrderCode, setPlacedOrderCode] = useState("");

  const [provinces, setProvinces] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [shippingFee, setShippingFee] = useState(35000);

  const { items, totalPrice, clearCart, updateQuantity, removeItem } = useCartStore();
  const router = useRouter();

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/p/")
      .then(r => r.json())
      .then(data => setProvinces(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      const pId = provinces.find(p => p.name === selectedProvince)?.code;
      if (pId) {
        fetch(`https://provinces.open-api.vn/api/p/${pId}?depth=2`)
          .then(r => r.json())
          .then(data => setDistricts(data.districts || []))
          .catch(console.error);
      }
      if (selectedProvince.includes("Hà Nội") || selectedProvince.includes("Hồ Chí Minh")) {
        setShippingFee(20000);
      } else {
        setShippingFee(35000);
      }
    } else {
      setDistricts([]);
      setWards([]);
      setShippingFee(35000);
    }
    setSelectedDistrict("");
    setSelectedWard("");
  }, [selectedProvince, provinces]);

  useEffect(() => {
    if (selectedDistrict) {
      const dId = districts.find(d => d.name === selectedDistrict)?.code;
      if (dId) {
        fetch(`https://provinces.open-api.vn/api/d/${dId}?depth=2`)
          .then(r => r.json())
          .then(data => setWards(data.wards || []))
          .catch(console.error);
      }
    } else {
      setWards([]);
    }
    setSelectedWard("");
  }, [selectedDistrict, districts]);

  useEffect(() => {
    setMounted(true);
    fetch("/api/user/profile").then(r => r.json()).then(profileData => {
      if (profileData?.user) setUserProfile(profileData.user);
    }).catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (mounted && items.length === 0) {
      router.push("/gio-hang");
    }
  }, [mounted, items.length, router]);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error("Vui lòng nhập mã giảm giá");
      return;
    }

    setIsApplyingCoupon(true);
    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode, orderAmount: totalPrice() }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Mã giảm giá không hợp lệ");
        setAppliedCoupon(null);
      } else {
        toast.success(data.message);
        setAppliedCoupon(data.coupon);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedProvince || !selectedDistrict || !selectedWard || !streetAddress.trim()) {
      toast.error("Vui lòng nhập đầy đủ địa chỉ giao hàng");
      return;
    }

    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const finalAmount = totalPrice() + shippingFee - (appliedCoupon?.discountAmount || 0);
    const fullAddress = `${streetAddress.trim()}, ${selectedWard}, ${selectedDistrict}, ${selectedProvince}`;
    
    try {
      const rawEmail = (formData.get("email") as string || "").trim();
      const res = await createOrder({
        customerName: formData.get("name") as string,
        customerPhone: formData.get("phone") as string,
        customerEmail: rawEmail || null,
        shippingAddress: fullAddress,
        shippingFee: shippingFee,
        notes: formData.get("notes") as string,
        totalAmount: Math.max(0, finalAmount),
        paymentMethod,
        couponCode: appliedCoupon?.code || null,
        pointsToUse: 0,
        items: items.map(item => ({
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
          price: item.price,
        }))
      });

      if (res.success && res.orderId) {
        clearCart();
        // Redirect to the dedicated success page which handles QR codes and polling
        router.push(`/thanh-toan/thanh-cong?id=${res.orderId}`);
      } else {
        toast.error(res.error || "Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại.");
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
      setIsSubmitting(false);
    }
  };

  if (!mounted || items.length === 0) return null;

  const couponDiscount = appliedCoupon?.discountAmount || 0;
  const subtotal = totalPrice();
  const finalTotal = Math.max(0, subtotal + shippingFee - couponDiscount);

  return (
    <div className="bg-[#FAFAFA] dark:bg-[#0A0A0A] min-h-screen text-gray-900 dark:text-gray-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="mb-10 text-center lg:text-left">
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-2">Thanh Toán</h1>
          <p className="text-gray-500 dark:text-gray-400">Hoàn tất đơn hàng của bạn một cách an toàn.</p>
        </div>
        
        <form id="checkout-form" onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-10">
          
          {/* Left Column - Forms */}
          <div className="w-full lg:w-3/5 space-y-8">
            
            {/* 1. Contact & Shipping */}
            <section className="bg-white dark:bg-[#141414] rounded-3xl p-8 shadow-[0_2px_20px_rgb(0,0,0,0.04)] dark:shadow-none dark:border dark:border-white/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
              
              <div className="flex items-center gap-3 mb-6 text-xl font-bold">
                <div className="bg-primary/10 text-primary p-2 rounded-full">
                  <MapPin size={20} />
                </div>
                <h2>Thông tin vận chuyển</h2>
              </div>

              {/* Auto-fill banner */}
              {userProfile?.name && userProfile?.address && (
                <div className="flex items-center gap-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl px-4 py-3 mb-5">
                  <UserCheck size={18} className="text-green-600 dark:text-green-400 flex-shrink-0" />
                  <div className="flex-1 text-sm">
                    <span className="text-green-700 dark:text-green-300 font-medium">Đã tự động điền từ hồ sơ của bạn.</span>
                    <span className="text-green-600/70 dark:text-green-400/70"> Bạn có thể chỉnh sửa nếu cần.</span>
                  </div>
                  <Link href="/thong-tin" className="text-xs text-green-600 dark:text-green-400 underline whitespace-nowrap">Sửa hồ sơ</Link>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">Họ và tên</label>
                  <input required name="name" type="text" defaultValue={userProfile?.name || ""} key={`name-${userProfile?.name}`} className="w-full bg-gray-50 dark:bg-[#1A1A1A] border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="Nguyễn Văn A" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">Số điện thoại</label>
                  <input required name="phone" type="tel" defaultValue={userProfile?.phone || ""} key={`phone-${userProfile?.phone}`} className="w-full bg-gray-50 dark:bg-[#1A1A1A] border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="(+84) 123 456 789" />
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">Email <span className="lowercase font-normal opacity-70">(Tuỳ chọn)</span></label>
                  <input name="email" type="email" defaultValue={userProfile?.email || ""} key={`email-${userProfile?.email}`} className="w-full bg-gray-50 dark:bg-[#1A1A1A] border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="email@example.com" />
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">Địa chỉ giao hàng</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <select required value={selectedProvince} onChange={e => setSelectedProvince(e.target.value)} className="w-full bg-gray-50 dark:bg-[#1A1A1A] border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-primary outline-none transition-all cursor-pointer">
                      <option value="">Tỉnh/Thành phố</option>
                      {provinces.map(p => <option key={p.code} value={p.name}>{p.name}</option>)}
                    </select>
                    <select required value={selectedDistrict} onChange={e => setSelectedDistrict(e.target.value)} disabled={!selectedProvince} className="w-full bg-gray-50 dark:bg-[#1A1A1A] border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-primary outline-none transition-all cursor-pointer disabled:opacity-50">
                      <option value="">Quận/Huyện</option>
                      {districts.map(d => <option key={d.code} value={d.name}>{d.name}</option>)}
                    </select>
                    <select required value={selectedWard} onChange={e => setSelectedWard(e.target.value)} disabled={!selectedDistrict} className="w-full bg-gray-50 dark:bg-[#1A1A1A] border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-primary outline-none transition-all cursor-pointer disabled:opacity-50">
                      <option value="">Phường/Xã</option>
                      {wards.map(w => <option key={w.code} value={w.name}>{w.name}</option>)}
                    </select>
                  </div>
                  <input required name="streetAddress" type="text" value={streetAddress} onChange={e => setStreetAddress(e.target.value)} className="w-full bg-gray-50 dark:bg-[#1A1A1A] border-none rounded-xl px-4 py-3.5 mt-3 focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="Số nhà, Tên đường..." />
                </div>
              </div>
            </section>

            {/* 2. Shipping Method & Notes */}
            <section className="bg-white dark:bg-[#141414] rounded-3xl p-8 shadow-[0_2px_20px_rgb(0,0,0,0.04)] dark:shadow-none dark:border dark:border-white/10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3 text-xl font-bold">
                  <div className="bg-blue-500/10 text-blue-500 p-2 rounded-full">
                    <Truck size={20} />
                  </div>
                  <h2>Giao hàng</h2>
                </div>
                <span className="font-semibold">{shippingFee.toLocaleString('vi-VN')}đ</span>
              </div>
              
              <div className="border border-blue-500/30 bg-blue-50 dark:bg-blue-500/5 rounded-2xl p-4 flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="text-blue-500"><CheckCircle2 size={24} /></div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">Giao Hàng Tiêu Chuẩn</p>
                    <p className="text-sm text-gray-500">Dự kiến giao hàng trong 2-3 ngày làm việc</p>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1 flex items-center gap-1">
                  <MessageSquare size={12} /> Lời nhắn cho cửa hàng
                </label>
                <textarea name="notes" rows={2} className="w-full bg-gray-50 dark:bg-[#1A1A1A] border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all resize-none" placeholder="Ghi chú thêm về đơn hàng..."></textarea>
              </div>
            </section>

            {/* 3. Payment Method */}
            <section className="bg-white dark:bg-[#141414] rounded-3xl p-8 shadow-[0_2px_20px_rgb(0,0,0,0.04)] dark:shadow-none dark:border dark:border-white/10">
              <div className="flex items-center gap-3 mb-6 text-xl font-bold">
                <div className="bg-orange-500/10 text-orange-500 p-2 rounded-full">
                  <CreditCard size={20} />
                </div>
                <h2>Thanh toán</h2>
              </div>
              
              <div className="space-y-4">
                <label className={`relative flex items-start gap-4 p-5 rounded-2xl cursor-pointer transition-all border-2 ${paymentMethod === 'SEPAY' ? 'border-primary bg-primary/5' : 'border-transparent bg-gray-50 dark:bg-[#1A1A1A] hover:bg-gray-100 dark:hover:bg-[#202020]'}`}>
                  <div className="flex items-center h-6">
                    <input type="radio" name="paymentMethod" value="SEPAY" checked={paymentMethod === 'SEPAY'} onChange={() => setPaymentMethod('SEPAY')} className="w-5 h-5 text-primary bg-white border-gray-300 focus:ring-primary dark:bg-gray-700 dark:border-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-lg mb-1 flex items-center justify-between">
                      Chuyển khoản Ngân Hàng
                      {paymentMethod === 'SEPAY' && <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full uppercase tracking-wider">Khuyên dùng</span>}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Thanh toán thủ công qua chuyển khoản ngân hàng. Đơn hàng sẽ được xử lý sau khi nhận tiền.</p>
                  </div>
                </label>

                <label className={`relative flex items-start gap-4 p-5 rounded-2xl cursor-pointer transition-all border-2 ${paymentMethod === 'COD' ? 'border-primary bg-primary/5' : 'border-transparent bg-gray-50 dark:bg-[#1A1A1A] hover:bg-gray-100 dark:hover:bg-[#202020]'}`}>
                  <div className="flex items-center h-6">
                    <input type="radio" name="paymentMethod" value="COD" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} className="w-5 h-5 text-primary bg-white border-gray-300 focus:ring-primary dark:bg-gray-700 dark:border-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-lg mb-1">Thanh toán khi nhận hàng (COD)</div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Thanh toán bằng tiền mặt khi shipper giao hàng đến tận tay bạn.</p>
                  </div>
                </label>
              </div>
            </section>
          </div>

          {/* Right Column - Order Summary */}
          <div className="w-full lg:w-2/5">
            <div className="sticky top-8 space-y-6">
              
              {/* Cart Summary */}
              <div className="bg-white dark:bg-[#141414] rounded-3xl p-6 shadow-[0_2px_20px_rgb(0,0,0,0.04)] dark:shadow-none dark:border dark:border-white/10">
                <h3 className="text-lg font-bold mb-6 flex items-center justify-between">
                  Tóm tắt đơn hàng
                  <span className="bg-gray-100 dark:bg-gray-800 text-sm px-3 py-1 rounded-full">{items.reduce((acc, item) => acc + item.quantity, 0)} mục</span>
                </h3>
                
                <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-4 group">
                      <div className="relative w-16 h-20 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                        {item.imageUrl && <Image src={item.imageUrl} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />}
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="flex justify-between items-start mb-1">
                          <p className="font-semibold text-sm line-clamp-2 leading-snug">{item.name}</p>
                          <button 
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-red-500 text-xs ml-2"
                            title="Xóa"
                          >
                            Xóa
                          </button>
                        </div>
                        {(item.size || item.color) && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            Phân loại: {[item.size, item.color].filter(Boolean).join(', ')}
                          </p>
                        )}
                        <div className="flex justify-between items-center mt-auto">
                          <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded overflow-hidden">
                            <button 
                              type="button"
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 bg-white dark:bg-gray-900 text-gray-500 border-r border-gray-200 dark:border-gray-700"
                            >
                              -
                            </button>
                            <span className="w-8 h-6 flex items-center justify-center text-xs bg-white dark:bg-gray-900 border-x-0">{item.quantity}</span>
                            <button 
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 bg-white dark:bg-gray-900 text-gray-500 border-l border-gray-200 dark:border-gray-700"
                            >
                              +
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-sm text-primary">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</p>
                          </div>
                        </div>
                        <a href={`/tim-kiem?q=${encodeURIComponent(item.name)}`} className="text-xs text-blue-500 hover:underline mt-2 inline-block">
                          Tìm kiếm sản phẩm tương tự
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 dark:border-gray-800/50 mt-6 pt-6 space-y-4">
                  {/* Voucher Input */}
                  <div>
                    {appliedCoupon ? (
                      <div className="flex justify-between items-center bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 p-3 rounded-xl">
                        <div className="flex items-center gap-2">
                          <Ticket size={16} className="text-green-600 dark:text-green-400" />
                          <span className="font-bold text-green-700 dark:text-green-400 text-sm">{appliedCoupon.code}</span>
                        </div>
                        <button type="button" onClick={handleRemoveCoupon} className="text-xs font-semibold text-red-500 hover:text-red-700 uppercase">Gỡ bỏ</button>
                      </div>
                    ) : (
                      <div className="flex gap-2 relative">
                        <input 
                          type="text" 
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Mã giảm giá" 
                          className="w-full bg-gray-50 dark:bg-[#1A1A1A] border-none rounded-xl pl-10 pr-24 py-3 focus:ring-2 focus:ring-primary outline-none text-sm uppercase transition-all"
                        />
                        <Ticket size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <button 
                          type="button"
                          onClick={handleApplyCoupon}
                          disabled={isApplyingCoupon || !couponCode.trim()}
                          className="absolute right-1 top-1 bottom-1 bg-black dark:bg-white text-white dark:text-black px-4 text-xs font-bold rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50 transition-colors"
                        >
                          ÁP DỤNG
                        </button>
                      </div>
                    )}
                  </div>


                </div>
              </div>

              {/* Total Calculation */}
              <div className="bg-white dark:bg-[#141414] rounded-3xl p-6 shadow-[0_2px_20px_rgb(0,0,0,0.04)] dark:shadow-none dark:border dark:border-white/10">
                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between text-gray-500 dark:text-gray-400">
                    <span>Tạm tính</span>
                    <span className="font-medium text-gray-900 dark:text-gray-200">{subtotal.toLocaleString('vi-VN')}đ</span>
                  </div>
                  <div className="flex justify-between text-gray-500 dark:text-gray-400">
                    <span>Phí vận chuyển</span>
                    <span className="font-medium text-gray-900 dark:text-gray-200">{shippingFee.toLocaleString('vi-VN')}đ</span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-green-600 dark:text-green-400 font-medium">
                      <span>Voucher</span>
                      <span>-{couponDiscount.toLocaleString('vi-VN')}đ</span>
                    </div>
                  )}

                </div>
                
                <div className="border-t border-gray-100 dark:border-gray-800 pt-4 flex flex-col">
                  <div className="flex justify-between items-end mb-6">
                    <span className="text-base font-bold text-gray-800 dark:text-gray-200">Tổng thanh toán</span>
                    <span className="text-3xl font-black text-primary">{finalTotal.toLocaleString('vi-VN')}đ</span>
                  </div>

                  <button 
                    type="submit"
                    form="checkout-form"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-bold text-lg hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                  >
                    {isSubmitting ? 'Đang xử lý...' : 'Xác Nhận Đặt Hàng'}
                    {!isSubmitting && <ChevronRight size={20} />}
                  </button>

                  <p className="text-center text-xs text-gray-400 mt-4">
                    Bằng việc đặt hàng, bạn đồng ý với <button type="button" onClick={() => setShowTerms(true)} className="underline hover:text-primary transition-colors">Điều khoản & Điều kiện</button> của chúng tôi.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </form>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #374151; }
      `}} />

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-white dark:bg-[#141414] rounded-3xl p-8 max-w-md w-full shadow-2xl transform transition-all text-center border border-gray-100 dark:border-white/10">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} className="text-green-500" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Đặt Hàng Thành Công!</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Cảm ơn bạn đã mua sắm tại ManaStore. Đơn hàng <span className="font-bold text-primary">#{placedOrderCode}</span> của bạn đã được tiếp nhận và đang chờ xử lý.
            </p>
            <div className="flex flex-col gap-3">
              <Link href={`/don-hang/${placedOrderCode}`} className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl font-bold hover:opacity-90 transition-opacity">
                Theo dõi đơn hàng
              </Link>
              <Link href="/san-pham" className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white py-3.5 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        </div>
      )}
      
      <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />
    </div>
  );
}
