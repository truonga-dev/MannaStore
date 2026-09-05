"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { ChevronDown, Plus, Tag, ShoppingBag, Package, Star, MessageSquare } from "lucide-react";
import { RevenueChart, OrderStatusChart } from "@/components/admin/dashboard/DashboardCharts";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import Image from "next/image";

type Order = any; 
type RevenueData = any[];
type PieData = any[];

interface DashboardClientProps {
  adminName: string;
  kpis: { title: string; value: string; suffix: string; increase: string }[];
  initialRevenueData: RevenueData;
  pieData: PieData;
  recentOrders: Order[];
  totalRevenue: number;
  lowStockVariants: any[];
  recentActivities: { id: string, type: string, user: string, content: string, date: Date }[];
}

// Dummy data for sparklines
const generateSparklineData = () => Array.from({ length: 7 }, () => ({ value: Math.floor(Math.random() * 100) }));

export default function DashboardClient({
  adminName,
  kpis,
  initialRevenueData,
  pieData,
  recentOrders,
  totalRevenue,
  lowStockVariants = [],
  recentActivities = []
}: DashboardClientProps) {
  const [revenueFilter, setRevenueFilter] = useState("week");
  const [orderStatusFilter, setOrderStatusFilter] = useState("ALL");

  const statusMap = {
    PENDING: "Chờ xử lý",
    SHIPPING: "Đang giao",
    COMPLETED: "Hoàn thành",
    CANCELLED: "Đã hủy"
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'PENDING': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'SHIPPING': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      default: return 'bg-red-500/10 text-red-400 border-red-500/20';
    }
  };

  const filteredOrders = orderStatusFilter === "ALL" 
    ? recentOrders 
    : recentOrders.filter(order => order.status === orderStatusFilter);
  
  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-medium text-gray-100">Chào mừng trở lại, {adminName}</h1>
        
        {/* Quick Actions */}
        <div className="flex gap-2">
          <Link href="/admin/products/new" className="flex items-center gap-2 px-3 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors text-sm font-medium">
            <Plus size={16} /> Thêm Sản Phẩm
          </Link>
          <Link href="/admin/coupons" className="flex items-center gap-2 px-3 py-2 bg-[#2A2A2A] hover:bg-[#333] text-gray-200 rounded-lg transition-colors text-sm font-medium border border-gray-800">
            <Tag size={16} /> Mã Giảm Giá
          </Link>
        </div>
      </div>
      
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpis.map((kpi, i) => {
           const sparklineData = generateSparklineData();
           const isPositive = kpi.increase.startsWith('+');
           return (
            <div key={i} className="bg-[#1E1E1E] p-6 rounded-2xl border border-gray-800 shadow-sm flex flex-col justify-between hover:border-gray-700 transition-colors relative overflow-hidden group">
              <div className="flex justify-between items-start relative z-10">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{kpi.title}</p>
              </div>
              <div className="mt-4 flex items-baseline gap-2 relative z-10">
                <h3 className="text-3xl font-semibold text-white">{kpi.value}</h3>
                {kpi.suffix && <span className="text-sm text-gray-500 font-medium">{kpi.suffix}</span>}
              </div>
              <div className="mt-6 flex justify-between items-center text-xs relative z-10">
                <span className="text-gray-500">So với tháng trước</span>
                <span className={`font-medium ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>{kpi.increase}</span>
              </div>
              
              {/* Sparkline background */}
              <div className="absolute bottom-0 left-0 w-full h-1/2 opacity-20 pointer-events-none">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sparklineData}>
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke={isPositive ? "#10b981" : "#ef4444"} 
                      strokeWidth={2} 
                      dot={false} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Doanh Thu */}
        <div className="lg:col-span-2 bg-[#1E1E1E] border border-gray-800 rounded-2xl p-6 shadow-sm flex flex-col">
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
          <div className="flex-1 min-h-[250px] relative">
             <RevenueChart data={initialRevenueData} filter={revenueFilter} />
          </div>
        </div>

        {/* Cảnh Báo Tồn Kho */}
        <div className="bg-[#1E1E1E] border border-gray-800 rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">CẢNH BÁO TỒN KHO</h2>
            <Link href="/admin/products" className="text-blue-500 text-xs font-medium hover:underline">Xem kho</Link>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
            {lowStockVariants.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-2 py-10">
                <Package size={32} className="opacity-20" />
                <p className="text-sm">Mọi sản phẩm đều đủ kho</p>
              </div>
            ) : (
              lowStockVariants.map(variant => (
                <div key={variant.id} className="flex gap-3 p-3 bg-[#2A2A2A]/50 rounded-xl border border-gray-800/50">
                  <div className="w-12 h-12 bg-gray-800 rounded-lg flex-shrink-0 relative overflow-hidden border border-gray-700">
                    {variant.product.imageUrl ? (
                       <Image src={variant.product.imageUrl} alt={variant.product.name} fill className="object-cover" />
                    ) : (
                       <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">No img</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-200 truncate">{variant.product.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">Phân loại: <span className="text-gray-300">{variant.color || 'Mặc định'} - {variant.size || 'Mặc định'}</span></span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2 py-1 bg-red-500/10 text-red-500 border border-red-500/20 text-xs font-medium rounded-lg">
                      Còn {variant.stockQuantity}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Bảng Giao Dịch */}
        <div className="lg:col-span-2 bg-[#1E1E1E] border border-gray-800 rounded-2xl p-6 shadow-sm">
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
                  <th className="px-4 py-4 font-medium">Khách Hàng</th>
                  <th className="px-4 py-4 font-medium">Mã Đơn</th>
                  <th className="px-4 py-4 font-medium">Ngày Đặt</th>
                  <th className="px-4 py-4 font-medium text-right">Tổng Tiền</th>
                  <th className="px-4 py-4 font-medium text-right">Trạng Thái</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order: any) => (
                  <tr key={order.id} className="border-b border-gray-800/50 last:border-0 hover:bg-[#2A2A2A]/30 transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                          {(order.user?.name || order.shippingName || "G")[0].toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-200">{order.user?.name || order.shippingName || "Khách vãng lai"}</span>
                          <span className="text-xs text-gray-500">{order.user?.email || order.shippingPhone || "Không có email"}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 font-mono text-gray-400">#{order.orderCode}</td>
                    <td className="px-4 py-4 text-gray-500">{format(new Date(order.createdAt), "dd/MM/yyyy HH:mm")}</td>
                    <td className="px-4 py-4 font-semibold text-white text-right">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalAmount)}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium border rounded-md ${statusBadge(order.status)}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${order.status === 'COMPLETED' ? 'bg-emerald-400' : order.status === 'PENDING' ? 'bg-amber-400' : order.status === 'SHIPPING' ? 'bg-blue-400' : 'bg-red-400'}`}></div>
                        {statusMap[order.status as keyof typeof statusMap]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredOrders.length === 0 && (
              <p className="text-center py-8 text-gray-500 text-sm">Không có giao dịch nào phù hợp.</p>
            )}
          </div>
        </div>

        {/* Hoạt động gần đây */}
        <div className="bg-[#1E1E1E] border border-gray-800 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-6">HOẠT ĐỘNG MỚI</h2>
          <div className="space-y-6">
            {recentActivities.length === 0 ? (
              <div className="text-center py-10 text-gray-500 text-sm">Chưa có hoạt động nào</div>
            ) : (
              recentActivities.map((act, i) => (
                <div key={i} className="flex gap-4 relative">
                  {i !== recentActivities.length - 1 && (
                    <div className="absolute left-[19px] top-10 bottom-[-24px] w-px bg-gray-800"></div>
                  )}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 border ${
                    act.type === 'REVIEW' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                  }`}>
                    {act.type === 'REVIEW' ? <Star size={18} /> : <MessageSquare size={18} />}
                  </div>
                  <div>
                    <p className="text-sm text-gray-200">
                      <span className="font-medium text-white">{act.user}</span> {act.content}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{format(new Date(act.date), "dd/MM/yyyy HH:mm")}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
