"use client";

import { useEffect, useState } from "react";
import { Activity, Users, MousePointerClick, Eye, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

interface AnalyticsData {
  activeUsers: number;
  todayVisits: number;
  todayUniqueVisitors: number;
  todayClicks: number;
  topPages: { path: string; count: number }[];
  topActions: { element: string; count: number }[];
}

export default function AnalyticsClient() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/analytics");
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      setData(json);
    } catch (error) {
      toast.error("Không thể tải dữ liệu thống kê");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pb-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium text-gray-100">Thống Kê Truy Cập</h1>
        <button 
          onClick={fetchData}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-[#2A2A2A] hover:bg-[#333] text-gray-200 rounded-xl transition-colors text-sm font-medium border border-gray-800 disabled:opacity-50"
        >
          <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
          Làm mới
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#1E1E1E] p-6 rounded-2xl border border-gray-800 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Activity size={64} className="text-blue-500" />
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-blue-500/10 text-blue-500 rounded-xl">
              <Activity size={20} />
            </div>
            <h3 className="font-medium text-gray-400">Đang Online</h3>
          </div>
          <p className="text-3xl font-bold text-gray-100">{data?.activeUsers || 0}</p>
          <p className="text-xs text-gray-500 mt-2">Khách trong 5 phút qua</p>
        </div>

        <div className="bg-[#1E1E1E] p-6 rounded-2xl border border-gray-800 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Users size={64} className="text-emerald-500" />
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-xl">
              <Users size={20} />
            </div>
            <h3 className="font-medium text-gray-400">Khách Hôm Nay</h3>
          </div>
          <p className="text-3xl font-bold text-gray-100">{data?.todayUniqueVisitors || 0}</p>
          <p className="text-xs text-gray-500 mt-2">Dựa trên IP (hôm nay)</p>
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
          <p className="text-3xl font-bold text-gray-100">{data?.todayVisits || 0}</p>
          <p className="text-xs text-gray-500 mt-2">Tổng lượt tải trang (hôm nay)</p>
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
          <p className="text-3xl font-bold text-gray-100">{data?.todayClicks || 0}</p>
          <p className="text-xs text-gray-500 mt-2">Tổng lượt click (hôm nay)</p>
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
            {!data || data.topPages.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Chưa có dữ liệu hôm nay</p>
            ) : (
              <div className="space-y-4">
                {data.topPages.map((page, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-sm text-gray-300 font-mono truncate mr-4">{page.path}</span>
                    <span className="text-sm font-medium text-gray-100 bg-gray-800 px-2.5 py-1 rounded-lg">
                      {page.count} view
                    </span>
                  </div>
                ))}
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
            {!data || data.topActions.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Chưa có dữ liệu click hôm nay</p>
            ) : (
              <div className="space-y-4">
                {data.topActions.map((action, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-sm text-gray-300 truncate mr-4">{action.element}</span>
                    <span className="text-sm font-medium text-gray-100 bg-gray-800 px-2.5 py-1 rounded-lg">
                      {action.count} click
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
