import { Metadata } from 'next';
import OrderLookupForm from '@/components/order/OrderLookupForm';

export const metadata: Metadata = {
  title: 'Tra cứu đơn hàng | Manna Store',
  description: 'Kiểm tra trạng thái đơn hàng của bạn tại Manna Store',
};

export default function OrderLookupPage() {
  return (
    <div className="min-h-screen bg-[#F8F7F4] dark:bg-[#0C0C0C] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <OrderLookupForm />
      </div>
    </div>
  );
}
