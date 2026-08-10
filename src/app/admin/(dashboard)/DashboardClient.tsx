"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { ChevronDown } from "lucide-react";
import { RevenueChart, OrderStatusChart } from "@/components/admin/dashboard/DashboardCharts";

type Order = any; // We can type this properly later
type RevenueData = any[];
type PieData = any[];

interface DashboardClientProps {
  adminName: string;
  kpis: { title: string; value: string; suffix: string; increase: string }[];
  initialRevenueData: RevenueData;
  pieData: PieData;
  recentOrders: Order[];
  totalRevenue: number;
}

export default function DashboardClient({
  adminName,
  kpis,
  initialRevenueData,
  pieData,
  recentOrders,
  totalRevenue,
}: DashboardClientProps) {
  const [revenueFilter, setRevenueFilter] = useState("week");
  const [orderStatusFilter, setOrderStatusFilter] = useState("ALL");

  const statusMap = {
    PENDING: "Chờ xử lý",
    SHIPPING: "Đang giao",
    COMPLETED: "Hoàn thành",
    CANCELLED: "Đã hủy"
  };

  // Lọc đơn hàng gần đây
  const filteredOrders = orderStatusFilter === "ALL" 
    ? recentOrders 
    : recentOrders.filter(order => order.status === orderStatusFilter);
  
  return (
    <div className="space-y-6 pb-10">
      <h1 className="text-2xl font-medium text-gray-100">Chào mừng trở lại, {adminName}</h1>
      
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpis.map((kpi, i) => (
          <div key={i} className="bg-[#1E1E1E] p-6 rounded-2xl border border-gray-800 shadow-sm flex flex-col justify-between hover:border-gray-700 transition-colors">
            <div className="flex justify-between items-start">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{kpi.title}</p>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <h3 className="text-3xl font-semibold text-white">{kpi.value}</h3>
              {kpi.suffix && <span className="text-sm text-gray-500 font-medium">{kpi.suffix}</span>}
            </div>
            <div className="mt-6 flex justify-between items-center text-xs">
              <span className="text-gray-500">i</span>
              <span className="text-emerald-500 font-medium">{kpi.increase}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#1E1E1E] border border-gray-800 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">BIỂU ĐỒ DOANH THU</h2>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-semibold text-white">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalRevenue)}
                </span>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500/20 border border-blue-500"></div> DOANH THU</div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 bg-[#121212] rounded-lg p-1 border border-gray-800">
              <button 
                onClick={() => setRevenueFilter("week")}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${revenueFilter === "week" ? "text-white bg-[#2A2A2A] shadow-sm" : "text-gray-400 hover:text-white"}`}>Tuần</button>
              <button 
                onClick={() => setRevenueFilter("month")}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${revenueFilter === "month" ? "text-white bg-[#2A2A2A] shadow-sm" : "text-gray-400 hover:text-white"}`}>Tháng</button>
              <button 
                onClick={() => setRevenueFilter("year")}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${revenueFilter === "year" ? "text-white bg-[#2A2A2A] shadow-sm" : "text-gray-400 hover:text-white"}`}>Năm</button>
            </div>
          </div>
          <div className="h-64 mt-4 relative">
             <RevenueChart data={initialRevenueData} filter={revenueFilter} />
          </div>
        </div>

        <div className="bg-[#1E1E1E] border border-gray-800 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-6">TRẠNG THÁI ĐƠN HÀNG</h2>
          <OrderStatusChart data={pieData} />
        </div>
      </div>

      <div className="bg-[#1E1E1E] border border-gray-800 rounded-2xl p-6 shadow-sm mt-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">GIAO DỊCH GẦN ĐÂY</h2>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <select 
                value={orderStatusFilter}
                onChange={(e) => setOrderStatusFilter(e.target.value)}
                className="appearance-none bg-[#121212] border border-gray-800 hover:border-gray-700 text-gray-300 text-sm rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 block pl-4 pr-10 py-2 outline-none cursor-pointer transition-colors"
              >
                <option value="ALL">Tất cả trạng thái</option>
                <option value="PENDING">Chờ xử lý</option>
                <option value="SHIPPING">Đang giao</option>
                <option value="COMPLETED">Hoàn thành</option>
                <option value="CANCELLED">Đã hủy</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
            </div>
            <Link href="/admin/orders" className="text-blue-500 text-sm font-medium hover:underline">
              Xem tất cả
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="text-xs text-gray-500 uppercase border-b border-gray-800">
              <tr>
                <th className="px-4 py-4 font-medium">Mã Đơn</th>
                <th className="px-4 py-4 font-medium">Khách Hàng</th>
                <th className="px-4 py-4 font-medium">Ngày Đặt</th>
                <th className="px-4 py-4 font-medium">Trạng Thái</th>
                <th className="px-4 py-4 font-medium">Tổng Tiền</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order: any) => (
                <tr key={order.id} className="border-b border-gray-800/50 last:border-0 hover:bg-[#2A2A2A]/50 transition-colors">
                  <td className="px-4 py-4 font-mono text-gray-400">#{order.orderCode}</td>
                  <td className="px-4 py-4 font-medium text-gray-200">{order.user?.name || order.user?.email || order.shippingName || "Guest"}</td>
                  <td className="px-4 py-4 text-gray-500">{format(new Date(order.createdAt), "MMM dd, yyyy")}</td>
                  <td className="px-4 py-4">
                    <span className={`flex items-center gap-1.5 text-xs font-medium ${
                      order.status === 'COMPLETED' ? 'text-emerald-400' :
                      order.status === 'PENDING' ? 'text-amber-400' :
                      order.status === 'SHIPPING' ? 'text-blue-400' :
                      'text-red-400'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        order.status === 'COMPLETED' ? 'bg-emerald-400' :
                        order.status === 'PENDING' ? 'bg-amber-400' :
                        order.status === 'SHIPPING' ? 'bg-blue-400' :
                        'bg-red-400'
                      }`}></div>
                      {statusMap[order.status as keyof typeof statusMap]}
                    </span>
                  </td>
                  <td className="px-4 py-4 font-semibold text-white">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalAmount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredOrders.length === 0 && (
            <p className="text-center py-6 text-gray-500 text-sm">Không có giao dịch nào phù hợp.</p>
          )}
        </div>
      </div>
    </div>
  );
}
