"use client";

import { useState } from "react";
import { Plus, Minus, X, Star } from "lucide-react";
import { addPoints, updateUserRole } from "@/app/actions/user";
import toast from "react-hot-toast";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function CustomerClient({ initialUsers }: { initialUsers: any[] }) {
  const { data: session } = useSession();
  const currentUserRole = (session?.user as any)?.role || "USER";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  
  const [pointsAmount, setPointsAmount] = useState<string>("");
  const [pointsDescription, setPointsDescription] = useState<string>("");
  const [actionType, setActionType] = useState<"add" | "deduct">("add");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openPointsModal = (user: any, type: "add" | "deduct") => {
    setSelectedUser(user);
    setActionType(type);
    setPointsAmount("");
    setPointsDescription(type === "add" ? "Tặng điểm từ Admin" : "Trừ điểm từ Admin");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || !pointsAmount) return;
    
    setIsSubmitting(true);
    try {
      const amount = actionType === "add" ? Number(pointsAmount) : -Number(pointsAmount);
      
      const res = await addPoints(selectedUser.id, amount, pointsDescription);
      if (res.success) {
        toast.success(actionType === "add" ? "Tặng điểm thành công" : "Trừ điểm thành công");
        closeModal();
      } else {
        toast.error("Lỗi: " + res.error);
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pb-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium text-gray-100">Khách Hàng & Điểm Thưởng</h1>
      </div>

      <div className="bg-[#1E1E1E] border border-gray-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="p-4 font-semibold uppercase tracking-wider text-xs text-gray-500">Khách hàng</th>
                <th className="p-4 font-semibold uppercase tracking-wider text-xs text-gray-500">Liên hệ</th>
                <th className="p-4 font-semibold uppercase tracking-wider text-xs text-gray-500">IP Gần Nhất</th>
                <th className="p-4 font-semibold uppercase tracking-wider text-xs text-gray-500">Điểm hiện tại</th>
                <th className="p-4 font-semibold uppercase tracking-wider text-xs text-gray-500">Quyền</th>
                <th className="p-4 font-semibold uppercase tracking-wider text-xs text-gray-500 text-right">Hành động điểm</th>
              </tr>
            </thead>
            <tbody>
              {initialUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    Chưa có khách hàng nào.
                  </td>
                </tr>
              ) : (
                initialUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-800/50 hover:bg-[#2A2A2A]/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 overflow-hidden relative">
                          {user.image ? (
                            <Image src={user.image} alt={user.name || "User"} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-blue-600 text-white font-medium text-sm">
                              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-200">{user.name || "Chưa cập nhật"}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-400">
                      <div>{user.email || "---"}</div>
                      <div className="text-xs mt-1 text-gray-500">{user.phone || "Chưa có SĐT"}</div>
                    </td>
                    <td className="p-4 text-sm text-gray-400">
                      {user.lastIp || "Không xác định"}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 font-medium text-orange-400 bg-orange-400/10 border border-orange-400/20 px-3 py-1 rounded-full w-max">
                        <Star size={14} className="fill-orange-400" />
                        {user.points.toLocaleString()} pts
                      </div>
                    </td>
                    <td className="p-4">
                      {currentUserRole === 'ADMIN' ? (
                        <select
                          className={`px-2 py-1 text-xs font-medium uppercase rounded-full cursor-pointer outline-none ${
                            user.role === 'ADMIN' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 
                            user.role === 'STAFF' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 
                            'bg-gray-800 text-gray-400 border border-gray-700'
                          }`}
                          value={user.role}
                          onChange={async (e) => {
                            const newRole = e.target.value;
                            const res = await updateUserRole(user.id, newRole);
                            if (res.success) {
                              toast.success(`Cập nhật quyền thành ${newRole}`);
                            } else {
                              toast.error("Lỗi: " + res.error);
                            }
                          }}
                        >
                          <option value="USER">USER</option>
                          <option value="STAFF">STAFF</option>
                          <option value="ADMIN">ADMIN</option>
                        </select>
                      ) : (
                        <span className={`px-2 py-1 text-xs font-medium uppercase rounded-full ${
                          user.role === 'ADMIN' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 
                          user.role === 'STAFF' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 
                          'bg-gray-800 text-gray-400 border border-gray-700'
                        }`}>
                          {user.role}
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openPointsModal(user, "add")} className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-lg transition-colors text-sm font-medium" title="Tặng điểm">
                          <Plus size={14} /> Tặng
                        </button>
                        <button onClick={() => openPointsModal(user, "deduct")} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg transition-colors text-sm font-medium" title="Trừ điểm">
                          <Minus size={14} /> Trừ
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#1E1E1E] border border-gray-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
              <h2 className="font-semibold text-gray-100">
                {actionType === "add" ? "Tặng điểm thưởng" : "Trừ điểm thưởng"}
              </h2>
              <button onClick={closeModal} className="text-gray-500 hover:bg-gray-800 hover:text-white p-1 rounded-lg transition-colors">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              
              <div className="bg-[#121212] border border-gray-800 p-4 rounded-xl mb-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 overflow-hidden relative">
                  {selectedUser.image ? (
                    <Image src={selectedUser.image} alt={selectedUser.name || "User"} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-600 text-white font-medium text-sm">
                      {selectedUser.name ? selectedUser.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}
                </div>
                <div>
                  <div className="font-medium text-gray-200">{selectedUser.name}</div>
                  <div className="text-sm text-gray-500">Đang có: <span className="text-orange-400 font-medium">{selectedUser.points.toLocaleString()} pts</span></div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-400">
                  Số điểm {actionType === "add" ? "tặng" : "trừ"} *
                </label>
                <input required type="number" min="1" value={pointsAmount} onChange={e => setPointsAmount(e.target.value)} className="w-full border border-gray-700 p-2.5 rounded-xl bg-[#121212] focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-200" placeholder="VD: 1000" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-400">Lý do</label>
                <input required type="text" value={pointsDescription} onChange={e => setPointsDescription(e.target.value)} className="w-full border border-gray-700 p-2.5 rounded-xl bg-[#2A2A2A] focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-200" placeholder="VD: Quà tặng sinh nhật" />
              </div>
              
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-800 mt-6">
                <button type="button" onClick={closeModal} className="px-5 py-2.5 text-sm font-bold text-gray-400 bg-[#2A2A2A] hover:bg-[#333] hover:text-white rounded-full transition-all">
                  Hủy
                </button>
                <button type="submit" disabled={isSubmitting} className={`px-6 py-2.5 rounded-full text-sm font-bold shadow-md hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 transition-all text-white ${actionType === "add" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-red-600 hover:bg-red-700"}`}>
                  {isSubmitting ? "Đang xử lý..." : "Xác nhận"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
