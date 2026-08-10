import React from "react";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Package, Truck, CheckCircle2, Clock, XCircle, CreditCard } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Theo dõi đơn hàng | Manna Store",
};

const STATUS_STEPS = ["PENDING", "UNPAID", "PAID", "SHIPPING", "COMPLETED"];

const STATUS_CONFIG: Record<string, { label: string; icon: React.ReactNode; color: string; bg: string }> = {
  PENDING:   { label: "Chờ xác nhận",  icon: <Clock className="w-5 h-5" />,        color: "text-yellow-600", bg: "bg-yellow-100" },
  UNPAID:    { label: "Đang chuẩn bị", icon: <Package className="w-5 h-5" />,      color: "text-purple-600", bg: "bg-purple-100" },
  PAID:      { label: "Đã thanh toán", icon: <CreditCard className="w-5 h-5" />,   color: "text-blue-600",   bg: "bg-blue-100" },
  SHIPPING:  { label: "Đang giao",     icon: <Truck className="w-5 h-5" />,        color: "text-orange-600", bg: "bg-orange-100" },
  COMPLETED: { label: "Hoàn thành",   icon: <CheckCircle2 className="w-5 h-5" />, color: "text-green-600",  bg: "bg-green-100" },
  CANCELLED: { label: "Đã hủy",       icon: <XCircle className="w-5 h-5" />,      color: "text-red-600",    bg: "bg-red-100" },
};

const PAYMENT_LABELS: Record<string, string> = {
  MANUAL: "Chuyển khoản ngân hàng",
  COD:    "Thanh toán khi nhận hàng",
  VNPAY:  "VNPay",
  MOMO:   "MoMo",
};

export default async function OrderTrackingPage({ params }: { params: Promise<{ orderCode: string }> }) {
  const { orderCode } = await params;

  const order = await prisma.order.findUnique({
    where: { orderCode },
    include: {
      items: {
        include: {
          variant: {
            include: { product: true }
          }
        }
      }
    }
  });

  if (!order) notFound();

  const isCancelled = order.status === "CANCELLED";
  const currentStepIdx = STATUS_STEPS.indexOf(order.status);
  const status = STATUS_CONFIG[order.status] || STATUS_CONFIG["PENDING"];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="font-serif text-2xl font-bold tracking-widest text-primary">
            MANNA <span className="text-[10px] font-sans tracking-[0.3em] font-medium">STORE</span>
          </Link>
          <h1 className="text-2xl font-bold mt-6 text-gray-900 dark:text-white">Theo dõi đơn hàng</h1>
        </div>

        {/* Status Badge */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm mb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Mã đơn hàng</p>
              <p className="font-mono text-xl font-bold text-primary">#{order.orderCode}</p>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${status.bg} ${status.color} font-bold text-sm`}>
              {status.icon}
              {status.label}
            </div>
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
            <p>📅 Ngày đặt: <span className="text-gray-700 dark:text-gray-200 font-medium">{order.createdAt.toLocaleString("vi-VN")}</span></p>
            <p>💳 Thanh toán: <span className="text-gray-700 dark:text-gray-200 font-medium">{PAYMENT_LABELS[order.paymentMethod] || order.paymentMethod}</span></p>
            <p>📍 Địa chỉ: <span className="text-gray-700 dark:text-gray-200 font-medium">{order.shippingAddress}</span></p>
          </div>
        </div>

        {/* Progress Timeline */}
        {!isCancelled && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm mb-4">
            <h2 className="font-bold text-sm uppercase tracking-widest text-gray-400 mb-6">Tiến trình đơn hàng</h2>
            <div className="flex items-center justify-between relative">
              {/* Progress Bar */}
              <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 mx-8">
                <div
                  className="h-full bg-primary transition-all duration-700"
                  style={{ width: `${currentStepIdx >= 0 ? (currentStepIdx / (STATUS_STEPS.length - 1)) * 100 : 0}%` }}
                />
              </div>

              {STATUS_STEPS.map((step, idx) => {
                const cfg = STATUS_CONFIG[step];
                const done = idx <= currentStepIdx;
                return (
                  <div key={step} className="flex flex-col items-center gap-2 z-10 flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${done ? "bg-primary border-primary text-white" : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-400"}`}>
                      {cfg.icon}
                    </div>
                    <span className={`text-xs font-medium text-center leading-tight ${done ? "text-primary" : "text-gray-400"}`}>
                      {cfg.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {isCancelled && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-5 mb-4 text-center">
            <XCircle className="w-10 h-10 text-red-500 mx-auto mb-2" />
            <p className="font-bold text-red-700 dark:text-red-400">Đơn hàng này đã bị hủy</p>
            <p className="text-sm text-red-600 dark:text-red-500 mt-1">Điểm thưởng đã được hoàn lại (nếu có).</p>
          </div>
        )}

        {/* Bank Transfer Info (if MANUAL & PENDING) */}
        {order.paymentMethod === "MANUAL" && order.status === "PENDING" && (
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-2xl p-5 mb-4">
            <p className="font-bold text-amber-800 dark:text-amber-300 mb-3">⚠️ Chờ chuyển khoản</p>
            <div className="text-sm text-amber-700 dark:text-amber-400 space-y-1">
              <p>Ngân hàng: <strong>MB Bank</strong></p>
              <p>Số tài khoản: <strong>{process.env.SEPAY_ACCOUNT_NO || "0123456789"}</strong></p>
              <p>Nội dung: <strong>#{order.orderCode}</strong></p>
              <p>Số tiền: <strong>{order.totalAmount.toLocaleString("vi-VN")}đ</strong></p>
            </div>
          </div>
        )}

        {/* Order Items */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm mb-4">
          <h2 className="font-bold text-sm uppercase tracking-widest text-gray-400 mb-4">Sản phẩm</h2>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden relative flex-shrink-0">
                  {item.variant.product.imageUrl ? (
                    <Image src={item.variant.product.imageUrl} alt={item.variant.product.name} fill className="object-cover" />
                  ) : (
                    <Package className="w-6 h-6 text-gray-400 m-auto" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white line-clamp-1">{item.variant.product.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {[item.variant.size, item.variant.color].filter(Boolean).join(" · ")} × {item.quantity}
                  </p>
                </div>
                <p className="font-semibold text-gray-900 dark:text-white flex-shrink-0">
                  {(item.priceAtTime * item.quantity).toLocaleString("vi-VN")}đ
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm mb-8">
          <div className="space-y-2 text-sm">
            {order.discountAmount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Giảm giá</span>
                <span>-{order.discountAmount.toLocaleString("vi-VN")}đ</span>
              </div>
            )}
            {order.pointsUsed > 0 && (
              <div className="flex justify-between text-blue-600">
                <span>Điểm đã dùng ({order.pointsUsed} điểm)</span>
                <span>-{(order.pointsUsed * 100).toLocaleString("vi-VN")}đ</span>
              </div>
            )}
            {order.status === "COMPLETED" && order.pointsEarned > 0 && (
              <div className="flex justify-between text-primary">
                <span>Điểm đã tích được</span>
                <span>+{order.pointsEarned} điểm</span>
              </div>
            )}
          </div>
          <div className="border-t border-gray-100 dark:border-gray-800 mt-3 pt-3 flex justify-between font-bold text-lg">
            <span>Tổng thanh toán</span>
            <span className="text-primary">{order.totalAmount.toLocaleString("vi-VN")}đ</span>
          </div>
        </div>

        <div className="text-center">
          <Link href="/thong-tin" className="text-sm text-primary hover:underline">← Xem tất cả đơn hàng của tôi</Link>
        </div>
      </div>
    </div>
  );
}
