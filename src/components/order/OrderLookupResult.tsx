"use client";

import Image from "next/image";
import { Check, Truck, Package, XCircle, Clock } from "lucide-react";
import Link from "next/link";

interface OrderLookupResultProps {
  order: any;
}

export default function OrderLookupResult({ order }: OrderLookupResultProps) {
  // Define status steps
  const steps = [
    { id: 'PENDING', label: 'Chờ xác nhận', icon: Clock },
    { id: 'SHIPPING', label: 'Đang giao', icon: Truck },
    { id: 'COMPLETED', label: 'Thành công', icon: Check },
  ];

  // Determine current step index
  let currentStep = 0;
  if (order.status === 'SHIPPING') currentStep = 1;
  if (order.status === 'COMPLETED') currentStep = 2;
  
  const isCancelled = order.status === 'CANCELLED';

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="bg-white dark:bg-[#1A1A1A] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 dark:border-gray-800 pb-6 mb-8 gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            Đơn hàng #{order.orderCode || order.id.slice(-8).toUpperCase()}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Đặt lúc {new Date(order.createdAt).toLocaleString('vi-VN')}
          </p>
        </div>
        <div className="text-left md:text-right">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Tổng tiền</p>
          <p className="text-2xl font-bold text-primary">{formatPrice(order.totalAmount)}</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-12">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-6">Trạng thái đơn hàng</h4>
        
        {isCancelled ? (
          <div className="flex items-center gap-3 text-red-500 bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-100 dark:border-red-900/50">
            <XCircle className="w-6 h-6" />
            <div>
              <p className="font-medium">Đã hủy</p>
              <p className="text-sm text-red-400">Đơn hàng này đã bị hủy.</p>
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 dark:bg-gray-800 -translate-y-1/2 rounded-full hidden sm:block"></div>
            <div className="absolute top-1/2 left-0 h-1 bg-black dark:bg-white -translate-y-1/2 rounded-full hidden sm:block transition-all duration-500" 
                 style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}></div>
            
            <div className="flex flex-col sm:flex-row justify-between gap-6 relative z-10">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index <= currentStep;
                const isCurrent = index === currentStep;
                
                return (
                  <div key={step.id} className="flex sm:flex-col items-center sm:items-center gap-4 sm:gap-3 flex-1">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-4 transition-colors duration-300 ${
                      isActive 
                        ? 'bg-black dark:bg-white border-white dark:border-[#1A1A1A] text-white dark:text-black' 
                        : 'bg-gray-100 dark:bg-gray-800 border-white dark:border-[#1A1A1A] text-gray-400 dark:text-gray-500'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="sm:text-center">
                      <p className={`font-medium ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>
                        {step.label}
                      </p>
                      {isCurrent && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 sm:hidden">Trạng thái hiện tại</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items List */}
        <div className="lg:col-span-2">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Sản phẩm ({order.items.length})</h4>
          <div className="space-y-4">
            {order.items.map((item: any) => (
              <div key={item.id} className="flex gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-gray-200">
                  {item.variant.product.imageUrl ? (
                    <Image
                      src={item.variant.product.imageUrl}
                      alt={item.variant.product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <Package className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <Link href={`/san-pham/${item.variant.product.slug}`} className="font-medium text-gray-900 dark:text-white hover:underline line-clamp-1">
                      {item.variant.product.name}
                    </Link>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Phân loại: {item.variant.color || "Tiêu chuẩn"}
                      {item.variant.size ? ` - ${item.variant.size}` : ""}
                    </p>
                  </div>
                  <div className="flex justify-between items-end mt-2">
                    <p className="text-sm font-medium">x{item.quantity}</p>
                    <p className="font-medium">{formatPrice(item.priceAtTime)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Info */}
        <div>
          <div className="bg-gray-50 dark:bg-[#0C0C0C] rounded-xl p-6 border border-gray-100 dark:border-gray-800">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Thông tin giao hàng</h4>
            
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-gray-500 dark:text-gray-400 mb-1">Người nhận</p>
                <p className="font-medium text-gray-900 dark:text-white">{order.shippingName || "Khách hàng"}</p>
              </div>
              
              <div>
                <p className="text-gray-500 dark:text-gray-400 mb-1">Số điện thoại</p>
                <p className="font-medium text-gray-900 dark:text-white">{order.shippingPhone}</p>
              </div>
              
              <div>
                <p className="text-gray-500 dark:text-gray-400 mb-1">Địa chỉ giao hàng</p>
                <p className="font-medium text-gray-900 dark:text-white leading-relaxed">
                  {order.shippingAddress || "Chưa cập nhật"}
                </p>
              </div>
              
              <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-800">
                <p className="text-gray-500 dark:text-gray-400 mb-1">Phương thức thanh toán</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {order.paymentMethod === 'MANUAL' ? 'Thanh toán khi nhận hàng (COD)' : order.paymentMethod}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
