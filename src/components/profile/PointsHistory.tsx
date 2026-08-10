'use client';

import { ArrowDownRight, ArrowUpRight, Clock, ShieldAlert } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

export default function PointsHistory({ pointTransactions }: { pointTransactions: any[] }) {
  if (!pointTransactions || pointTransactions.length === 0) {
    return (
      <div className="text-center py-12">
        <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Chưa có lịch sử điểm thưởng</h3>
        <p className="text-gray-500 mt-2">Khi bạn mua hàng hoặc tham gia hoạt động, lịch sử điểm sẽ hiển thị tại đây.</p>
      </div>
    );
  }

  const getTransactionIcon = (type: string, amount: number) => {
    if (type === 'EARN' || (type === 'REFUND' && amount > 0)) {
      return <ArrowUpRight className="w-5 h-5 text-green-500" />;
    }
    if (type === 'EXPIRE') {
      return <ShieldAlert className="w-5 h-5 text-orange-500" />;
    }
    return <ArrowDownRight className="w-5 h-5 text-red-500" />;
  };

  const getTransactionColor = (type: string, amount: number) => {
    if (type === 'EARN' || (type === 'REFUND' && amount > 0)) {
      return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800';
    }
    if (type === 'EXPIRE') {
      return 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-800';
    }
    return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800';
  };

  const getTransactionLabel = (type: string) => {
    switch (type) {
      case 'EARN': return 'Nhận điểm';
      case 'SPEND': return 'Tiêu điểm';
      case 'REFUND': return 'Hoàn điểm';
      case 'EXPIRE': return 'Hết hạn';
      default: return 'Giao dịch';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="text-sm font-bold text-orange-800 dark:text-orange-300">Chính sách điểm thưởng</h4>
          <p className="text-sm text-orange-700 dark:text-orange-400 mt-1">
            Điểm thưởng tích lũy sẽ tự động hết hạn sau 1 năm kể từ ngày nhận. Hãy sử dụng điểm của bạn cho các đơn hàng tiếp theo để không bị lãng phí nhé.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400">
              <tr>
                <th className="px-6 py-4 font-medium">Thời gian</th>
                <th className="px-6 py-4 font-medium">Loại giao dịch</th>
                <th className="px-6 py-4 font-medium">Nội dung</th>
                <th className="px-6 py-4 font-medium text-right">Số điểm</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {pointTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">
                    {format(new Date(tx.createdAt), 'dd/MM/yyyy HH:mm', { locale: vi })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${getTransactionColor(tx.type, tx.amount).split(' ').slice(1).join(' ')}`}>
                        {getTransactionIcon(tx.type, tx.amount)}
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {getTransactionLabel(tx.type)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400 min-w-[200px]">
                    {tx.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className={`font-bold text-lg ${getTransactionColor(tx.type, tx.amount).split(' ')[0]}`}>
                      {tx.amount > 0 ? '+' : ''}{tx.amount}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
