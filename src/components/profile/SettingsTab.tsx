'use client';

import { useState, useEffect } from 'react';
import { Bell, Moon, Sun, Monitor, Shield, Mail, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SettingsTab() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [promoNotifs, setPromoNotifs] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Here we would typically read current theme from localStorage/next-themes
  }, []);

  const handleSave = () => {
    setSaving(true);
    const toastId = toast.loading('Đang lưu cài đặt...');
    setTimeout(() => {
      setSaving(false);
      toast.success('Đã lưu các cài đặt!', { id: toastId });
    }, 800);
  };

  if (!mounted) return null;

  return (
    <div className="max-w-2xl space-y-8">
      {/* Theme Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Monitor className="w-5 h-5 text-primary dark:text-white" />
          Giao diện hiển thị
        </h3>
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => setTheme('light')}
            className={`flex flex-col items-center justify-center py-4 rounded-xl border-2 transition-all ${
              theme === 'light' 
                ? 'border-primary bg-primary/5 text-primary dark:border-white dark:bg-white/10 dark:text-white' 
                : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:border-primary/50'
            }`}
          >
            <Sun className="w-6 h-6 mb-2" />
            <span className="text-sm font-medium">Sáng</span>
          </button>
          
          <button
            onClick={() => setTheme('dark')}
            className={`flex flex-col items-center justify-center py-4 rounded-xl border-2 transition-all ${
              theme === 'dark' 
                ? 'border-primary bg-primary/5 text-primary dark:border-white dark:bg-white/10 dark:text-white' 
                : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:border-primary/50'
            }`}
          >
            <Moon className="w-6 h-6 mb-2" />
            <span className="text-sm font-medium">Tối</span>
          </button>
          
          <button
            onClick={() => setTheme('system')}
            className={`flex flex-col items-center justify-center py-4 rounded-xl border-2 transition-all ${
              theme === 'system' 
                ? 'border-primary bg-primary/5 text-primary dark:border-white dark:bg-white/10 dark:text-white' 
                : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:border-primary/50'
            }`}
          >
            <Monitor className="w-6 h-6 mb-2" />
            <span className="text-sm font-medium">Hệ thống</span>
          </button>
        </div>
      </div>

      <hr className="border-gray-200 dark:border-gray-700" />

      {/* Notification Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary dark:text-white" />
          Thông báo
        </h3>
        
        <div className="space-y-3">
          <label className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                <Bell className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Cập nhật đơn hàng</div>
                <div className="text-xs text-gray-500 mt-0.5">Nhận email khi đơn hàng thay đổi trạng thái</div>
              </div>
            </div>
            <div className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors">
              <input 
                type="checkbox" 
                className="sr-only" 
                checked={emailNotifs} 
                onChange={(e) => setEmailNotifs(e.target.checked)} 
              />
              <span className={`block w-11 h-6 rounded-full transition-colors ${emailNotifs ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}></span>
              <span className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform ${emailNotifs ? 'translate-x-5 bg-primary-foreground' : 'translate-x-0 bg-white'}`}></span>
            </div>
          </label>

          <label className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                <Mail className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Khuyến mãi & Tin tức</div>
                <div className="text-xs text-gray-500 mt-0.5">Nhận mã giảm giá và tin tức mới nhất</div>
              </div>
            </div>
            <div className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors">
              <input 
                type="checkbox" 
                className="sr-only" 
                checked={promoNotifs} 
                onChange={(e) => setPromoNotifs(e.target.checked)} 
              />
              <span className={`block w-11 h-6 rounded-full transition-colors ${promoNotifs ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}></span>
              <span className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform ${promoNotifs ? 'translate-x-5 bg-primary-foreground' : 'translate-x-0 bg-white'}`}></span>
            </div>
          </label>
        </div>
      </div>

      <div className="pt-6 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center justify-center px-8 py-3.5 rounded-full shadow-md text-sm font-bold text-primary-foreground bg-primary hover:opacity-90 hover:-translate-y-0.5 focus:outline-none disabled:opacity-50 disabled:hover:translate-y-0 transition-all"
        >
          <Save className="w-4 h-4 mr-2" /> {saving ? 'Đang lưu...' : 'Lưu cài đặt'}
        </button>
      </div>
    </div>
  );
}
