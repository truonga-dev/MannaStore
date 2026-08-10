"use client";

import { useState, useRef } from "react";
import { Printer, Edit, X } from "lucide-react";
import { updateOrderStatus } from "@/app/actions/order";
import toast from "react-hot-toast";
import Pagination from "@/components/ui/Pagination";

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'PENDING': return <span className="flex items-center gap-1.5 text-xs font-medium text-amber-400"><div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>Chờ xử lý</span>;
    case 'UNPAID': return <span className="flex items-center gap-1.5 text-xs font-medium text-amber-400"><div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>Đang chuẩn bị hàng</span>;
    case 'SHIPPING': return <span className="flex items-center gap-1.5 text-xs font-medium text-blue-400"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>Đang giao hàng</span>;
    case 'COMPLETED': return <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>Hoàn thành</span>;
    case 'CANCELLED': return <span className="flex items-center gap-1.5 text-xs font-medium text-red-400"><div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>Đã hủy</span>;
    default: return <span className="flex items-center gap-1.5 text-xs font-medium text-gray-400"><div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>{status}</span>;
  }
};

export default function OrderClient({ initialOrders }: { initialOrders: any[] }) {
  const [orders, setOrders] = useState(initialOrders);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [newStatus, setNewStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredOrders = filterStatus === "ALL" ? orders : orders.filter(o => o.status === filterStatus);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const openStatusModal = (order: any) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleStatusSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await updateOrderStatus(selectedOrder.id, newStatus);
      if (res.success) {
        toast.success("Cập nhật trạng thái thành công");
        setOrders(orders.map(o => o.id === selectedOrder.id ? { ...o, status: newStatus } : o));
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

  const handlePrint = (order: any) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    const rows = order.items.map((item: any) =>
      '<tr><td>' + item.variant.product.name + '</td><td>' + (item.variant.color || '') + ' ' + (item.variant.size || '') + '</td><td>' + item.priceAtTime.toLocaleString('vi-VN') + 'đ</td><td>' + item.quantity + '</td><td>' + (item.priceAtTime * item.quantity).toLocaleString('vi-VN') + 'đ</td></tr>'
    ).join('');
    const htmlContent = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Hóa đơn - ' + order.orderCode + '</title><style>body{font-family:sans-serif;padding:20px;max-width:800px;margin:0 auto}.header{text-align:center;margin-bottom:30px;border-bottom:2px solid #000;padding-bottom:10px}table{border-collapse:collapse;width:100%;margin-top:20px}th,td{border:1px solid #ddd;padding:8px;text-align:left}th{background:#f9f9f9}.total{font-weight:bold;font-size:1.2em;text-align:right;margin-top:20px;border-top:2px solid #000;padding-top:10px}.footer{text-align:center;margin-top:50px;font-style:italic}</style></head><body><div class="header"><h1>HÓA ĐƠN MUA HÀNG</h1><h2>MANA STORE</h2><p>Mã: ' + order.orderCode + '</p><p>Ngày: ' + new Date(order.createdAt).toLocaleString('vi-VN') + '</p></div><div><p><b>Khách hàng:</b> ' + order.shippingName + '</p><p><b>SĐT:</b> ' + order.shippingPhone + '</p><p><b>Địa chỉ:</b> ' + order.shippingAddress + '</p></div><table><thead><tr><th>Sản phẩm</th><th>Phân loại</th><th>Đơn giá</th><th>SL</th><th>Thành tiền</th></tr></thead><tbody>' + rows + '</tbody></table><div class="total">TỔNG CỘNG: ' + order.totalAmount.toLocaleString('vi-VN') + 'đ</div><div class="footer">Cảm ơn quý khách đã tin tưởng Mana Store!</div></body></html>';
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    setTimeout(() => { printWindow.print(); printWindow.close(); }, 250);
  };

  const filters = [
    { key: "ALL", label: "Tất cả", activeClass: "bg-gray-700 text-white border-gray-600" },
    { key: "PENDING", label: "Chờ xử lý", activeClass: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
    { key: "UNPAID", label: "Đang chuẩn bị hàng", activeClass: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
    { key: "SHIPPING", label: "Đang giao", activeClass: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
    { key: "COMPLETED", label: "Hoàn thành", activeClass: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
    { key: "CANCELLED", label: "Đã hủy", activeClass: "bg-red-500/20 text-red-400 border-red-500/30" },
  ];

  return (
    <div className="pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-medium text-gray-100">Quản lý Đơn Hàng</h1>
        <div className="flex items-center gap-2 flex-wrap">
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => { setFilterStatus(f.key); setCurrentPage(1); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${filterStatus === f.key
                  ? f.activeClass
                  : 'bg-[#1E1E1E] text-gray-400 border-gray-800 hover:border-gray-600 hover:text-gray-200'
                }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#1E1E1E] border border-gray-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="p-4 font-semibold uppercase tracking-wider text-xs text-gray-500">Mã đơn</th>
                <th className="p-4 font-semibold uppercase tracking-wider text-xs text-gray-500">Khách hàng</th>
                <th className="p-4 font-semibold uppercase tracking-wider text-xs text-gray-500">Ngày đặt</th>
                <th className="p-4 font-semibold uppercase tracking-wider text-xs text-gray-500">Tổng tiền</th>
                <th className="p-4 font-semibold uppercase tracking-wider text-xs text-gray-500">Trạng thái</th>
                <th className="p-4 font-semibold uppercase tracking-wider text-xs text-gray-500 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    Chưa có đơn hàng nào phù hợp.
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-800/50 hover:bg-[#2A2A2A]/50 transition-colors">
                    <td className="p-4 font-mono text-gray-400">#{order.orderCode}</td>
                    <td className="p-4">
                      <div className="font-medium text-gray-200">{order.shippingName}</div>
                      <div className="text-xs text-gray-500">{order.shippingPhone}</div>
                    </td>
                    <td className="p-4 text-sm text-gray-500" suppressHydrationWarning>
                      {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="p-4 font-semibold text-white" suppressHydrationWarning>
                      {order.totalAmount.toLocaleString('vi-VN')}đ
                    </td>
                    <td className="p-4">{getStatusBadge(order.status)}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openStatusModal(order)}
                          className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors"
                          title="Cập nhật trạng thái"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handlePrint(order)}
                          className="p-2 text-gray-400 hover:bg-gray-800 rounded-lg transition-colors"
                          title="In hóa đơn"
                        >
                          <Printer size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-800">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      </div>

      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#1E1E1E] border border-gray-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
              <h2 className="font-semibold text-gray-100">Cập nhật đơn hàng #{selectedOrder.orderCode}</h2>
              <button onClick={closeModal} className="text-gray-500 hover:bg-gray-800 hover:text-white p-1 rounded-lg transition-colors">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleStatusSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-400">Trạng thái mới</label>
                <select
                  value={newStatus}
                  onChange={e => setNewStatus(e.target.value)}
                  className="w-full border border-gray-700 p-2.5 rounded-xl bg-[#121212] focus:ring-1 focus:ring-blue-500 outline-none font-medium text-gray-200"
                >
                  <option value="PENDING">Chờ xử lý</option>
                  <option value="UNPAID">Đang chuẩn bị hàng</option>
                  <option value="SHIPPING">Đang giao hàng</option>
                  <option value="COMPLETED">Hoàn thành</option>
                  <option value="CANCELLED">Đã hủy</option>
                </select>
                <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                  Lưu ý: Chuyển sang &quot;Hoàn thành&quot; sẽ cộng điểm thưởng cho khách.
                  Chuyển sang &quot;Đã hủy&quot; sẽ hoàn lại điểm khách đã sử dụng (nếu có).
                </p>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2.5 text-sm font-bold text-gray-400 bg-[#2A2A2A] hover:bg-[#333] hover:text-white rounded-full transition-all"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-red-600 hover:bg-red-700 hover:-translate-y-0.5 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md disabled:opacity-50 disabled:hover:translate-y-0 transition-all"
                >
                  {isSubmitting ? "Đang xử lý..." : "Cập nhật"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
