"use client";

import { useEffect, useState } from "react";
import { Activity, Users, MousePointerClick, Eye, RefreshCw, DollarSign, ShoppingCart, TrendingUp, MonitorPlay } from "lucide-react";
import toast from "react-hot-toast";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend, AreaChart, Area } from "recharts";
import Image from "next/image";

interface TrafficData {
  activeUsers: number;
  totalVisits: number;
  uniqueVisitors: number;
  totalClicks: number;
  topPages: { path: string; count: number }[];
  topActions: { element: string; count: number }[];
  dailyTraffic: {
    date: string;
    visits: number;
    uniqueVisitors: number;
  }[];
}

interface RevenueData {
  summary: {
    totalRevenue: number;
    totalOrders: number;
    aov: number;
  };
  dailyRevenue: {
    date: string;
    revenue: number;
    orders: number;
  }[];
  topProducts: {
    name: string;
    quantity: number;
    revenue: number;
    imageUrl: string | null;
  }[];
}

// Dummy data for sparklines
const generateSparklineData = () => Array.from({ length: 20 }, () => ({ value: 20 + Math.floor(Math.random() * 40) }));

export default function AnalyticsClient() {
  const [activeTab, setActiveTab] = useState<'revenue' | 'traffic'>('revenue');
  const [days, setDays] = useState(30);

  const [trafficData, setTrafficData] = useState<TrafficData | null>(null);
  const [revenueData, setRevenueData] = useState<RevenueData | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [trafficRes, revenueRes] = await Promise.all([
        fetch(`/api/admin/analytics?days=${days}`),
        fetch(`/api/admin/revenue?days=${days}`)
      ]);
      
      if (trafficRes.ok) setTrafficData(await trafficRes.json());
      if (revenueRes.ok) setRevenueData(await revenueRes.json());
      
    } catch (error) {
      toast.error("Không thể tải dữ liệu thống kê");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [days]);

  // Traffic refresh for active users
  useEffect(() => {
    if (activeTab === 'traffic') {
      const interval = setInterval(async () => {
        try {
          const res = await fetch(`/api/admin/analytics?days=${days}`);
          if (res.ok) setTrafficData(await res.json());
        } catch (e) {}
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [activeTab, days]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const getMaxCount = (items: {count: number}[]) => {
    if (!items || items.length === 0) return 1;
    return Math.max(...items.map(i => i.count));
  };

  return (
    <div className="pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-medium text-gray-100">Thống Kê</h1>
        <div className="flex items-center gap-2">
          <select 
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="bg-[#1E1E1E] text-sm text-gray-200 border border-gray-800 rounded-xl px-3 py-2 outline-none focus:border-primary"
          >
            <option value={1}>Hôm nay</option>
            <option value={7}>7 ngày qua</option>
            <option value={30}>30 ngày qua</option>
          </select>
          <button 
            onClick={fetchData}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-[#2A2A2A] hover:bg-[#333] text-gray-200 rounded-xl transition-colors text-sm font-medium border border-gray-800 disabled:opacity-50"
          >
            <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
            Làm mới
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-8 border-b border-gray-800 pb-px">
        <button
          onClick={() => setActiveTab('revenue')}
          className={`px-4 py-2 text-sm font-medium transition-colors relative ${activeTab === 'revenue' ? 'text-primary' : 'text-gray-400 hover:text-gray-200'}`}
        >
          Doanh thu & Bán hàng
          {activeTab === 'revenue' && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('traffic')}
          className={`px-4 py-2 text-sm font-medium transition-colors relative ${activeTab === 'traffic' ? 'text-primary' : 'text-gray-400 hover:text-gray-200'}`}
        >
          Truy cập Web
          {activeTab === 'traffic' && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />
          )}
        </button>
      </div>

      {activeTab === 'revenue' && (
        <div className="animate-in fade-in duration-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-[#1E1E1E] p-6 rounded-2xl border border-gray-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <DollarSign size={64} className="text-green-500" />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-green-500/10 text-green-500 rounded-xl">
                  <DollarSign size={20} />
                </div>
                <h3 className="font-medium text-gray-400">Tổng Doanh Thu</h3>
              </div>
              <p className="text-3xl font-bold text-gray-100">{formatCurrency(revenueData?.summary.totalRevenue || 0)}</p>
              <p className="text-xs text-gray-500 mt-2">Trong {days} ngày qua</p>
            </div>

            <div className="bg-[#1E1E1E] p-6 rounded-2xl border border-gray-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <ShoppingCart size={64} className="text-blue-500" />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-blue-500/10 text-blue-500 rounded-xl">
                  <ShoppingCart size={20} />
                </div>
                <h3 className="font-medium text-gray-400">Tổng Đơn Hàng</h3>
              </div>
              <p className="text-3xl font-bold text-gray-100">{revenueData?.summary.totalOrders || 0}</p>
              <p className="text-xs text-gray-500 mt-2">Đơn hàng thành công/đang xử lý</p>
            </div>

            <div className="bg-[#1E1E1E] p-6 rounded-2xl border border-gray-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <TrendingUp size={64} className="text-purple-500" />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-purple-500/10 text-purple-500 rounded-xl">
                  <TrendingUp size={20} />
                </div>
                <h3 className="font-medium text-gray-400">Giá Trị Đơn Trung Bình (AOV)</h3>
              </div>
              <p className="text-3xl font-bold text-gray-100">{formatCurrency(revenueData?.summary.aov || 0)}</p>
              <p className="text-xs text-gray-500 mt-2">Trung bình trên mỗi đơn hàng</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#1E1E1E] border border-gray-800 rounded-2xl p-6 lg:col-span-2">
              <h3 className="font-medium text-gray-200 mb-6 flex items-center gap-2">
                <Activity size={18} className="text-primary" />
                Biểu đồ Doanh Thu ({days} ngày)
              </h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData?.dailyRevenue || []} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis 
                      dataKey="date" 
                      stroke="#888" 
                      fontSize={12} 
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="#888" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                    />
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: '#1E1E1E', borderColor: '#333', borderRadius: '8px' }}
                      itemStyle={{ color: '#E5E7EB' }}
                      formatter={(value: any) => [formatCurrency(value as number), 'Doanh thu']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#ef4444" 
                      strokeWidth={3}
                      dot={false}
                      activeDot={{ r: 6, fill: '#ef4444', stroke: '#1E1E1E', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-[#1E1E1E] border border-gray-800 rounded-2xl p-6">
              <h3 className="font-medium text-gray-200 mb-6 flex items-center gap-2">
                <ShoppingCart size={18} className="text-blue-500" />
                Biểu đồ Đơn Hàng ({days} ngày)
              </h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData?.dailyRevenue || []} margin={{ top: 5, right: 0, bottom: 5, left: -20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis 
                      dataKey="date" 
                      stroke="#888" 
                      fontSize={12} 
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="#888" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: '#1E1E1E', borderColor: '#333', borderRadius: '8px' }}
                      cursor={{ fill: '#2A2A2A' }}
                    />
                    <Bar dataKey="orders" name="Đơn hàng" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-[#1E1E1E] border border-gray-800 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-5 border-b border-gray-800">
              <h3 className="font-medium text-gray-200 flex items-center gap-2">
                <TrendingUp size={18} className="text-green-500" />
                Sản Phẩm Bán Chạy Nhất ({days} ngày)
              </h3>
            </div>
            <div className="p-0">
              {!revenueData || revenueData.topProducts.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Chưa có dữ liệu bán hàng</p>
              ) : (
                <div className="divide-y divide-gray-800">
                  {revenueData.topProducts.map((product, i) => (
                    <div key={i} className="flex items-center justify-between p-5 hover:bg-[#2A2A2A] transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-gray-800 flex-shrink-0 border border-gray-700">
                          {product.imageUrl ? (
                            <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">No img</div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-200 line-clamp-1">{product.name}</p>
                          <p className="text-sm text-gray-500">Đã bán: <span className="text-gray-300 font-medium">{product.quantity}</span></p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-500">{formatCurrency(product.revenue)}</p>
                        <p className="text-xs text-gray-500">Doanh thu</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'traffic' && (
        <div className="animate-in fade-in duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#1E1E1E] p-6 rounded-2xl border border-gray-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Activity size={64} className="text-blue-500" />
              </div>
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <div className="p-2.5 bg-blue-500/10 text-blue-500 rounded-xl">
                  <Activity size={20} />
                </div>
                <h3 className="font-medium text-gray-400">Đang Online</h3>
              </div>
              <p className="text-3xl font-bold text-gray-100 relative z-10">{trafficData?.activeUsers || 0}</p>
              <p className="text-xs text-gray-500 mt-2 relative z-10">Khách trong 5 phút qua</p>
              
              <div className="absolute bottom-0 left-0 w-full h-1/2 opacity-20 pointer-events-none">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={generateSparklineData()}>
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3b82f6" 
                      strokeWidth={2} 
                      dot={false} 
                      isAnimationActive={true}
                      animationDuration={3000}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-[#1E1E1E] p-6 rounded-2xl border border-gray-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Users size={64} className="text-emerald-500" />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-xl">
                  <Users size={20} />
                </div>
                <h3 className="font-medium text-gray-400">Khách Truy Cập</h3>
              </div>
              <p className="text-3xl font-bold text-gray-100">{trafficData?.uniqueVisitors || 0}</p>
              <p className="text-xs text-gray-500 mt-2">IP duy nhất (trong {days} ngày)</p>
            </div>

            <div className="bg-[#1E1E1E] p-6 rounded-2xl border border-gray-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Eye size={64} className="text-purple-500" />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-purple-500/10 text-purple-500 rounded-xl">
                  <Eye size={20} />
                </div>
                <h3 className="font-medium text-gray-400">Lượt Xem Trang</h3>
              </div>
              <p className="text-3xl font-bold text-gray-100">{trafficData?.totalVisits || 0}</p>
              <p className="text-xs text-gray-500 mt-2">Tổng lượt tải trang (trong {days} ngày)</p>
            </div>

            <div className="bg-[#1E1E1E] p-6 rounded-2xl border border-gray-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <MousePointerClick size={64} className="text-orange-500" />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-orange-500/10 text-orange-500 rounded-xl">
                  <MousePointerClick size={20} />
                </div>
                <h3 className="font-medium text-gray-400">Lượt Tương Tác</h3>
              </div>
              <p className="text-3xl font-bold text-gray-100">{trafficData?.totalClicks || 0}</p>
              <p className="text-xs text-gray-500 mt-2">Tổng lượt click (trong {days} ngày)</p>
            </div>
          </div>

          <div className="bg-[#1E1E1E] border border-gray-800 rounded-2xl p-6 mb-8 shadow-sm">
            <h3 className="font-medium text-gray-200 mb-6 flex items-center gap-2">
              <MonitorPlay size={18} className="text-primary" />
              Lưu Lượng Truy Cập ({days} ngày)
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trafficData?.dailyTraffic || []} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <defs>
                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorUniques" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    stroke="#888" 
                    fontSize={12} 
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#888" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#1E1E1E', borderColor: '#333', borderRadius: '8px' }}
                    itemStyle={{ color: '#E5E7EB' }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="visits" name="Lượt xem" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorVisits)" />
                  <Area type="monotone" dataKey="uniqueVisitors" name="Khách duy nhất" stroke="#10b981" fillOpacity={1} fill="url(#colorUniques)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#1E1E1E] border border-gray-800 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-5 border-b border-gray-800">
                <h3 className="font-medium text-gray-200 flex items-center gap-2">
                  <Eye size={18} className="text-purple-500" />
                  Top Trang Truy Cập
                </h3>
              </div>
              <div className="p-5">
                {!trafficData || trafficData.topPages.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">Chưa có dữ liệu</p>
                ) : (
                  <div className="space-y-4">
                    {trafficData.topPages.map((page, i) => {
                      const max = getMaxCount(trafficData.topPages);
                      const percent = Math.max(5, (page.count / max) * 100);
                      return (
                        <div key={i} className="relative">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-gray-300 font-mono truncate mr-4 relative z-10">{page.path}</span>
                            <span className="text-xs font-medium text-gray-300 relative z-10">
                              {page.count} view
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500/50 rounded-full" style={{ width: `${percent}%` }}></div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-[#1E1E1E] border border-gray-800 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-5 border-b border-gray-800">
                <h3 className="font-medium text-gray-200 flex items-center gap-2">
                  <MousePointerClick size={18} className="text-orange-500" />
                  Top Click Element
                </h3>
              </div>
              <div className="p-5">
                {!trafficData || trafficData.topActions.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">Chưa có dữ liệu click</p>
                ) : (
                  <div className="space-y-4">
                    {trafficData.topActions.map((action, i) => {
                       const max = getMaxCount(trafficData.topActions);
                       const percent = Math.max(5, (action.count / max) * 100);
                       return (
                        <div key={i} className="relative">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-gray-300 truncate mr-4 relative z-10">{action.element}</span>
                            <span className="text-xs font-medium text-gray-300 relative z-10">
                              {action.count} click
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-orange-500/50 rounded-full" style={{ width: `${percent}%` }}></div>
                          </div>
                        </div>
                       )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
