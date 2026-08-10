'use client';

import { useState } from 'react';
import { User, Package, Award, Settings, Heart, Clock, LogOut, ChevronRight } from 'lucide-react';
import UserInfo from './UserInfo';
import OrderHistory from './OrderHistory';
import FavoritesList from './FavoritesList';
import PointsHistory from './PointsHistory';
import SettingsTab from './SettingsTab';
import { signOut } from 'next-auth/react';
import Image from 'next/image';

export default function ProfileDashboard({ user, orders }: { user: any, orders: any[] }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'profile' | 'orders' | 'favorites' | 'points' | 'settings'>('overview');

  const menuItems = [
    { id: 'overview', label: 'Tổng quan', icon: Award },
    { id: 'profile', label: 'Hồ sơ của tôi', icon: User },
    { id: 'orders', label: 'Lịch sử đơn hàng', icon: Package },
    { id: 'favorites', label: 'Sản phẩm yêu thích', icon: Heart },
    { id: 'points', label: 'Điểm thưởng', icon: Clock },
    { id: 'settings', label: 'Cài đặt', icon: Settings },
  ];

  // Logic tính VIP Tier
  const getVipTier = (points: number) => {
    if (points >= 5000) return { name: 'Kim Cương', color: 'from-cyan-400 to-blue-600', next: null, current: 5000 };
    if (points >= 2000) return { name: 'Vàng', color: 'from-yellow-400 to-orange-500', next: 5000, current: 2000 };
    if (points >= 500) return { name: 'Bạc', color: 'from-gray-300 to-gray-500', next: 2000, current: 500 };
    return { name: 'Thành viên', color: 'from-emerald-400 to-teal-600', next: 500, current: 0 };
  };

  const points = user.points || 0;
  const tier = getVipTier(points);
  const progressPercent = tier.next ? Math.min(100, ((points - tier.current) / (tier.next - tier.current)) * 100) : 100;

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <div className="w-full md:w-64 flex-shrink-0">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6 text-center bg-gray-50/50 dark:bg-gray-900/50">
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-md mb-4">
              <Image
                src={user.image || '/placeholder-avatar.png'}
                alt="Avatar"
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white truncate">{user.name || 'Người dùng'}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">{user.email}</p>
          </div>
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-[1.02]' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-primary-foreground' : 'text-gray-400'}`} />
                    {item.label}
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 opacity-70" />}
                </button>
              );
            })}
            
            <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-700">
              <button
                onClick={() => signOut()}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Đăng xuất
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-8 min-h-[600px]">
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white">Tổng quan tài khoản</h2>
              
              {/* VIP Card */}
              <div className={`relative overflow-hidden rounded-2xl p-8 text-white shadow-xl bg-gradient-to-br ${tier.color}`}>
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-black opacity-10 rounded-full blur-2xl"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <p className="text-sm font-medium opacity-80 uppercase tracking-wider">Hạng thành viên</p>
                      <h3 className="text-3xl font-bold mt-1">{tier.name}</h3>
                    </div>
                    <Award className="w-12 h-12 opacity-80" />
                  </div>
                  
                  <div className="flex items-end justify-between mb-2">
                    <div>
                      <p className="text-sm opacity-80 mb-1">Điểm hiện tại</p>
                      <p className="text-4xl font-bold">{points} <span className="text-lg font-normal opacity-80">điểm</span></p>
                    </div>
                  </div>

                  {tier.next && (
                    <div className="mt-6">
                      <div className="flex justify-between text-sm opacity-90 mb-2 font-medium">
                        <span>Cần thêm {tier.next - points} điểm để thăng hạng</span>
                        <span>{tier.next} điểm</span>
                      </div>
                      <div className="w-full bg-black/20 rounded-full h-2.5 backdrop-blur-sm overflow-hidden">
                        <div 
                          className="bg-white h-2.5 rounded-full transition-all duration-1000 ease-out" 
                          style={{ width: `${progressPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 flex flex-col justify-between hover:border-primary/30 transition-colors">
                  <div>
                    <Package className="w-8 h-8 text-primary dark:text-white mb-4" />
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Đơn hàng đã đặt</p>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{orders.length} <span className="text-sm font-normal text-gray-500">đơn</span></h3>
                  </div>
                  <button 
                    onClick={() => setActiveTab('orders')}
                    className="mt-6 text-sm font-bold text-primary dark:text-primary-foreground flex items-center gap-1 hover:underline"
                  >
                    Xem chi tiết <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 flex flex-col justify-between hover:border-red-500/30 transition-colors">
                  <div>
                    <Heart className="w-8 h-8 text-red-500 mb-4" />
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Sản phẩm yêu thích</p>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{user.favorites?.length || 0} <span className="text-sm font-normal text-gray-500">sản phẩm</span></h3>
                  </div>
                  <button 
                    onClick={() => setActiveTab('favorites')}
                    className="mt-6 text-sm font-bold text-red-500 flex items-center gap-1 hover:underline"
                  >
                    Xem danh sách <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-8">Hồ sơ của tôi</h2>
              <UserInfo user={user} showSecurity={false} />
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-8">Lịch sử đơn hàng</h2>
              <OrderHistory orders={orders} />
            </div>
          )}

          {activeTab === 'favorites' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-8">Sản phẩm yêu thích</h2>
              <FavoritesList favorites={user.favorites || []} />
            </div>
          )}

          {activeTab === 'points' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-8">Điểm thưởng của tôi</h2>
              <PointsHistory pointTransactions={user.pointTransactions || []} />
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-8">Cài đặt tài khoản</h2>
              <SettingsTab />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
