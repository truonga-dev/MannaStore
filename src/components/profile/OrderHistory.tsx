'use client';

import { Calendar, Package, CreditCard, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import Pagination from '../ui/Pagination';

export default function OrderHistory({ orders }: { orders: any[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <Package className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-6" />
        <h3 className="text-xl font-bold font-serif text-gray-900 dark:text-white mb-2">Chưa có đơn hàng nào</h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">Bạn chưa thực hiện bất kỳ giao dịch nào tại Manna Store. Hãy khám phá các sản phẩm của chúng tôi nhé.</p>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'COMPLETED':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 tracking-wider">HOÀN THÀNH</span>;
      case 'PENDING':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 tracking-wider">ĐANG CHỜ</span>;
      case 'SHIPPING':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 tracking-wider">ĐANG GIAO</span>;
      case 'CANCELLED':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 tracking-wider">ĐÃ HỦY</span>;
      default:
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 tracking-wider">{status}</span>;
    }
  }

  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const paginatedOrders = orders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-8">
      {paginatedOrders.map((order) => (
        <div key={order.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-8">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold mb-1">Mã đơn hàng</p>
                <p className="font-bold text-gray-900 dark:text-white">#{order.orderCode || order.id.slice(-8).toUpperCase()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold flex items-center gap-1 mb-1">
                  <Calendar className="w-3 h-3" /> Ngày đặt
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold flex items-center gap-1 mb-1">
                  <CreditCard className="w-3 h-3" /> Tổng tiền
                </p>
                <p className="font-bold text-primary dark:text-white">
                  {order.totalAmount.toLocaleString('vi-VN')}đ
                </p>
              </div>
            </div>
            <div>
              {getStatusBadge(order.status)}
            </div>
          </div>
          
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {order.items.map((item: any) => (
              <li key={item.id} className="p-6 flex items-center">
                <div className="h-20 w-16 flex-shrink-0 bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
                  {item.variant?.product?.imageUrl && (
                    <Image src={item.variant.product.imageUrl} alt={item.variant.product.name} fill className="object-cover" />
                  )}
                </div>
                <div className="ml-6 flex-1 flex flex-col justify-center">
                  <div className="flex justify-between">
                    <h4 className="text-base font-bold text-gray-900 dark:text-white">
                      {item.variant?.product?.name || 'Sản phẩm'}
                    </h4>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {item.priceAtTime.toLocaleString('vi-VN')}đ
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {item.variant?.size && <span>Size: {item.variant.size} </span>}
                    {item.variant?.color && <span> | Màu: {item.variant.color}</span>}
                  </p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 font-medium">Số lượng: {item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
          
          {/* <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex justify-end">
            <button className="text-sm font-bold uppercase tracking-wider text-primary dark:text-white hover:opacity-70 transition-opacity flex items-center">
              Xem chi tiết <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div> */}
        </div>
      ))}
      
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
