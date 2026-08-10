"use client";

import { useState } from "react";
import { updateOrderStatus } from "@/app/actions/adminOrders";
import toast from "react-hot-toast";

export default function OrderStatusSelect({ orderId, initialStatus }: { orderId: string, initialStatus: string }) {
  const [status, setStatus] = useState(initialStatus);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setIsLoading(true);
    
    const res = await updateOrderStatus(orderId, newStatus);
    if (res.error) {
      toast.error(res.error);
      setStatus(initialStatus); // revert
    } else {
      toast.success("Cập nhật trạng thái thành công!");
    }
    setIsLoading(false);
  };

  return (
    <select 
      value={status}
      onChange={handleChange}
      disabled={isLoading}
      className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full border-2 outline-none cursor-pointer appearance-none text-center ${
        status === 'PENDING' ? 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:border-yellow-900/50' :
        status === 'PAID' ? 'bg-green-100 text-green-800 border-green-200 dark:border-green-900/50' :
        status === 'CANCELLED' ? 'bg-red-100 text-red-800 border-red-200 dark:border-red-900/50' :
        'bg-gray-100 text-gray-800 border-gray-200 dark:border-gray-700'
      } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <option value="PENDING" className="bg-white text-gray-900">ĐANG CHỜ</option>
      <option value="PAID" className="bg-white text-gray-900">ĐÃ THANH TOÁN</option>
      <option value="SHIPPING" className="bg-white text-gray-900">ĐANG GIAO</option>
      <option value="COMPLETED" className="bg-white text-gray-900">HOÀN THÀNH</option>
      <option value="CANCELLED" className="bg-white text-gray-900">ĐÃ HỦY</option>
    </select>
  );
}
