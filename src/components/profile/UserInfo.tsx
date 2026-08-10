'use client';

import { useState, useRef } from 'react';
import { Camera, Save, KeyRound, Mail, User, Phone, MapPin } from 'lucide-react';
import { updateProfile, changePassword } from '@/app/actions/user';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

export default function UserInfo({ user, showSecurity = false }: { user: any, showSecurity?: boolean }) {
  const { update } = useSession();
  const [name, setName] = useState(user.name || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [address, setAddress] = useState(user.address || '');
  const [avatar, setAvatar] = useState(user.image || '');
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const toastId = toast.loading('Đang tải ảnh lên...');
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setAvatar(data.url);
        await updateProfile({ image: data.url });
        await update({ image: data.url }); // Update NextAuth session
        toast.success('Cập nhật ảnh đại diện thành công!', { id: toastId });
      } else {
        toast.error('Lỗi khi tải ảnh lên.', { id: toastId });
      }
    } catch (error) {
      console.error('Upload failed', error);
      toast.error('Lỗi hệ thống khi tải ảnh.', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading('Đang cập nhật...');
    await updateProfile({ name, phone, address, image: avatar });
    await update({ name }); // Update NextAuth session with new name
    setLoading(false);
    setIsEditing(false);
    toast.success('Đã lưu thông tin cá nhân!', { id: toastId });
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading('Đang đổi mật khẩu...');
    const result = await changePassword(currentPassword, newPassword);
    setLoading(false);
    
    if (result.success) {
      toast.success('Đổi mật khẩu thành công!', { id: toastId });
      setCurrentPassword('');
      setNewPassword('');
    } else {
      toast.error(result.error || 'Lỗi', { id: toastId });
    }
  };

  if (showSecurity) {
    return (
      <div className="max-w-md">
        <form onSubmit={handleChangePassword} className="space-y-6">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/50 p-4 rounded-xl flex gap-3 mb-6">
            <KeyRound className="w-5 h-5 text-yellow-600 dark:text-yellow-500 shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-800 dark:text-yellow-400">
              Nên đổi mật khẩu định kỳ và sử dụng mật khẩu mạnh để bảo vệ tài khoản của bạn an toàn hơn.
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Mật khẩu hiện tại</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="block w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 text-gray-900 dark:text-white px-4 py-3 focus:bg-white dark:focus:bg-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Mật khẩu mới</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
                className="block w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 text-gray-900 dark:text-white px-4 py-3 focus:bg-white dark:focus:bg-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              />
              <p className="text-xs text-gray-500 mt-2">Mật khẩu phải dài tối thiểu 6 ký tự.</p>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center w-full px-4 py-3.5 rounded-xl shadow-sm text-sm font-bold text-primary-foreground bg-primary hover:opacity-90 focus:outline-none disabled:opacity-50 transition-opacity"
          >
            Đổi mật khẩu
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <form onSubmit={handleUpdateProfile} className="space-y-8">
        
        {/* Avatar Section */}
        <div className="bg-gray-50 dark:bg-gray-900/40 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center gap-6">
          <div className="relative shrink-0">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 bg-gray-100 shadow-md">
              <Image
                src={avatar || '/placeholder-avatar.png'}
                alt="Avatar"
                width={112}
                height={112}
                className="object-cover w-full h-full"
              />
            </div>
            {isEditing && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2.5 rounded-full hover:scale-105 transition-transform shadow-lg ring-4 ring-white dark:ring-gray-800"
                disabled={loading}
                title="Đổi ảnh đại diện"
              >
                <Camera className="w-4 h-4" />
              </button>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarUpload}
              className="hidden"
              accept="image/*"
            />
          </div>
          <div className="text-center sm:text-left">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">Ảnh đại diện</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 max-w-sm">
              Nên sử dụng ảnh định dạng vuông. Hỗ trợ định dạng JPG, PNG hoặc GIF (tối đa 2MB).
            </p>
            {isEditing && (
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 dark:text-white dark:bg-gray-800 dark:hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
              >
                Tải ảnh lên
              </button>
            )}
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2 relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Email (Đăng nhập)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                value={user.email}
                disabled
                className="block w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800/80 text-gray-500 dark:text-gray-400 pl-11 pr-4 py-3.5 shadow-sm focus:outline-none cursor-not-allowed opacity-70"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1.5 ml-1">Email được liên kết với tài khoản và không thể thay đổi.</p>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Họ và tên</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!isEditing}
                placeholder="Nhập tên hiển thị"
                className={`block w-full rounded-xl border pl-11 pr-4 py-3.5 shadow-sm outline-none transition-all ${
                  isEditing 
                    ? 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary' 
                    : 'border-transparent bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 cursor-default'
                }`}
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Số điện thoại</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={!isEditing}
                placeholder="VD: 0912345678"
                className={`block w-full rounded-xl border pl-11 pr-4 py-3.5 shadow-sm outline-none transition-all ${
                  isEditing 
                    ? 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary' 
                    : 'border-transparent bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 cursor-default'
                }`}
              />
            </div>
          </div>

          <div className="md:col-span-2 relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Địa chỉ giao hàng mặc định</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={!isEditing}
                placeholder="Nhập địa chỉ nhận hàng của bạn"
                className={`block w-full rounded-xl border pl-11 pr-4 py-3.5 shadow-sm outline-none transition-all ${
                  isEditing 
                    ? 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary' 
                    : 'border-transparent bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 cursor-default'
                }`}
              />
            </div>
          </div>
        </div>

        <div className="pt-6 flex justify-end gap-3">
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="flex items-center justify-center px-8 py-3.5 rounded-full shadow-sm text-sm font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700 transition-all"
            >
              Chỉnh sửa thông tin
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  // Reset fields back to original
                  setName(user.name || '');
                  setPhone(user.phone || '');
                  setAddress(user.address || '');
                  setAvatar(user.image || '');
                }}
                className="flex items-center justify-center px-6 py-3.5 rounded-full text-sm font-bold text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-all"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center px-8 py-3.5 rounded-full shadow-md text-sm font-bold text-primary-foreground bg-primary hover:opacity-90 hover:-translate-y-0.5 focus:outline-none disabled:opacity-50 disabled:hover:translate-y-0 transition-all"
              >
                <Save className="w-4 h-4 mr-2" /> Lưu thay đổi
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
