import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CheckCircle2, Copy, AlertCircle } from "lucide-react";
import OrderStatusChecker from "./OrderStatusChecker";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  const { id } = await searchParams; // searchParams is a Promise in Next.js 15
  if (!id) {
    redirect("/");
  }

  const order = await prisma.order.findUnique({
    where: { id },
  });

  if (!order) {
    redirect("/");
  }

  const isSePay = order.paymentMethod === "SEPAY";
  const isPending = order.status === "PENDING";

  let qrUrl = "";
  if (isSePay && isPending && order.orderCode) {
    const bankId = process.env.SEPAY_BANK_ID || "MB";
    const accNo = process.env.SEPAY_ACCOUNT_NO || "0123456789";
    const amount = order.totalAmount;
    const des = `MANNA ${order.orderCode}`;
    qrUrl = `https://qr.sepay.vn/img?acc=${bankId}-${accNo}&bank=${bankId}&amount=${amount}&des=${encodeURIComponent(des)}`;
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-24 max-w-3xl">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        
        {/* Header */}
        <div className="bg-primary p-8 text-center text-primary-foreground relative">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
          {order.status === "COMPLETED" ? (
            <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-green-400" />
          ) : isSePay ? (
            <AlertCircle className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
          ) : (
            <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-green-400" />
          )}
          
          <h1 className="font-serif text-3xl font-bold mb-2">
            {order.status === "COMPLETED" 
              ? "Thanh Toán Thành Công!" 
              : isSePay 
                ? "Chờ Thanh Toán" 
                : "Đặt Hàng Thành Công!"}
          </h1>
          <p className="opacity-90">
            Mã đơn hàng của bạn: <span className="font-bold font-mono tracking-wider">{order.orderCode || order.id.slice(-8).toUpperCase()}</span>
          </p>
        </div>

        {/* Content */}
        <div className="p-8">
          {isSePay && isPending ? (
            <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
              {/* QR Code */}
              <div className="w-64 flex-shrink-0 text-center">
                <div className="bg-white p-4 rounded-xl shadow-md border-2 border-primary/20 mb-4 relative aspect-square">
                  {qrUrl && (
                    <Image src={qrUrl} alt="Mã QR Thanh Toán" fill className="object-contain p-2" />
                  )}
                </div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Quét mã qua ứng dụng ngân hàng</p>
              </div>

              {/* Manual Transfer Info */}
              <div className="flex-1 space-y-4 w-full">
                <h3 className="font-bold text-lg border-b pb-2 dark:border-gray-700">Chuyển khoản thủ công</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                    <span className="text-gray-500 dark:text-gray-400">Ngân hàng</span>
                    <span className="font-bold">{process.env.SEPAY_BANK_ID || "MBBank"}</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                    <span className="text-gray-500 dark:text-gray-400">Số tài khoản</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{process.env.SEPAY_ACCOUNT_NO || "0123456789"}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                    <span className="text-gray-500 dark:text-gray-400">Số tiền</span>
                    <span className="font-bold text-primary dark:text-white text-lg">{order.totalAmount.toLocaleString('vi-VN')}đ</span>
                  </div>
                  <div className="flex justify-between items-center bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800">
                    <span className="text-blue-800 dark:text-blue-300 font-medium">Nội dung (Bắt buộc)</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-blue-900 dark:text-blue-100 uppercase">MANNA {order.orderCode}</span>
                    </div>
                  </div>
                </div>
                
                {/* Polling Component */}
                <OrderStatusChecker orderId={order.id} />

              </div>
            </div>
          ) : (
            <div className="text-center space-y-6 py-8">
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {order.status === "COMPLETED" 
                  ? "Chúng tôi đã nhận được thanh toán của bạn. Đơn hàng đang được xử lý và sẽ sớm giao đến tay bạn."
                  : "Đơn hàng của bạn đã được ghi nhận. Vui lòng chuẩn bị tiền mặt khi nhận hàng (COD)."}
              </p>
              
              <div className="flex justify-center gap-4 pt-6">
                <Link href="/" className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  Về Trang Chủ
                </Link>
                <Link href="/thong-tin" className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:opacity-90 transition">
                  Xem Đơn Hàng
                </Link>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
