"use client";

import { useState } from "react";
import { lookupOrder } from "@/app/actions/orderLookup";
import { Search, Loader2 } from "lucide-react";
import OrderLookupResult from "./OrderLookupResult";

export default function OrderLookupForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData(e.currentTarget);
    const response = await lookupOrder(formData);

    if (response.error) {
      setError(response.error);
    } else if (response.order) {
      setResult(response.order);
    }

    setLoading(false);
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white dark:bg-[#1A1A1A] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 md:p-8 mb-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-2">
            Tra Cứu Đơn Hàng
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Vui lòng nhập Mã đơn hàng và Số điện thoại đặt hàng để kiểm tra trạng thái đơn hàng của bạn.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="orderCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Mã đơn hàng <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="orderCode"
                name="orderCode"
                required
                placeholder="VD: ORD-12345678"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0C0C0C] text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Số điện thoại đặt hàng <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                placeholder="VD: 0901234567"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0C0C0C] text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/50 rounded-xl text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-black px-8 py-3.5 rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-50 w-full md:w-auto min-w-[200px]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Đang tra cứu...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Tra Cứu Ngay
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {result && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <OrderLookupResult order={result} />
        </div>
      )}
    </div>
  );
}
