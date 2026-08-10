'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function OrderStatusChecker({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/orders/${orderId}`);
        const data = await res.json();
        
        if (data.status === 'COMPLETED') {
          clearInterval(interval);
          setIsChecking(false);
          router.refresh();
        }
      } catch (error) {
        console.error('Lỗi khi kiểm tra trạng thái đơn hàng', error);
      }
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, [orderId, router]);

  if (!isChecking) return null;

  return (
    <div className="mt-6 flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
      <Loader2 className="w-6 h-6 text-primary animate-spin mb-2" />
      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium text-center">
        Hệ thống đang chờ thanh toán...<br/>
        Màn hình sẽ tự động chuyển khi nhận được tiền.
      </p>
    </div>
  );
}
