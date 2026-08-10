import { Metadata } from 'next';
import { Truck, Map, Clock, HelpCircle, PackageSearch } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Vận Chuyển & Giao Hàng | Manna Store',
  description: 'Thông tin về chính sách vận chuyển, phí giao hàng và thời gian nhận hàng tại Manna Store.',
};

const Section = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <section className="mb-10">
    <div className="flex items-start gap-4 mb-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-700 dark:text-orange-400">
        {icon}
      </div>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 pt-1.5">{title}</h2>
    </div>
    <div className="ml-14 text-gray-600 dark:text-gray-400 text-sm leading-7 space-y-3">
      {children}
    </div>
  </section>
);

const Divider = () => (
  <div className="border-t border-gray-100 dark:border-gray-800 mb-10" />
);

export default function GiaoHangPage() {
  return (
    <div className="min-h-screen bg-[#F8F7F4] dark:bg-[#0C0C0C] py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-100 dark:bg-orange-900/20 mb-5">
            <Truck className="w-8 h-8 text-orange-700 dark:text-orange-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Vận Chuyển & Giao Hàng
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-base max-w-xl mx-auto">
            Manna Store mong muốn mang sản phẩm đến tay bạn một cách nhanh chóng và an toàn nhất.
          </p>
        </div>

        <Divider />

        <Section icon={<Map className="w-5 h-5" />} title="Phạm Vi & Đơn Vị Vận Chuyển">
          <p>
            Chúng tôi tự hào phục vụ khách hàng trên <strong>toàn lãnh thổ Việt Nam</strong>. 
          </p>
          <p>
            Manna Store hiện đang hợp tác với các đơn vị vận chuyển uy tín như Giao Hàng Nhanh (GHN) và Giao Hàng Tiết Kiệm (GHTK) để đảm bảo đơn hàng của bạn được giao đúng hẹn và an toàn.
          </p>
        </Section>

        <Divider />

        <Section icon={<Clock className="w-5 h-5" />} title="Thời Gian Giao Hàng">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="bg-white dark:bg-gray-900/50 p-5 rounded-xl border border-gray-200 dark:border-gray-800">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">TP. Hồ Chí Minh</h4>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">1 - 2 ngày</p>
              <p className="text-xs text-gray-500">Kể từ khi đơn hàng được xác nhận</p>
            </div>
            <div className="bg-white dark:bg-gray-900/50 p-5 rounded-xl border border-gray-200 dark:border-gray-800">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Các Tỉnh Thành Khác</h4>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">3 - 5 ngày</p>
              <p className="text-xs text-gray-500">Tùy thuộc vào khu vực cụ thể</p>
            </div>
          </div>
          <p className="text-xs text-gray-400 italic mt-2">
            * Thời gian trên không tính Chủ nhật và các ngày Lễ, Tết. Đối với các vùng sâu vùng xa, thời gian giao hàng có thể kéo dài thêm 1-2 ngày.
          </p>
        </Section>

        <Divider />

        <Section icon={<Truck className="w-5 h-5" />} title="Phí Vận Chuyển">
          <div className="space-y-4 mt-2">
            <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">Phí giao hàng toàn quốc</h4>
                <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">Đồng giá cho mọi khu vực</p>
              </div>
              <span className="font-bold text-lg text-gray-900 dark:text-white">30.000đ</span>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-xl border-2 border-orange-200 dark:border-orange-800/50 bg-orange-50/50 dark:bg-orange-900/10">
              <div>
                <h4 className="font-semibold text-orange-800 dark:text-orange-300">Miễn phí vận chuyển</h4>
                <p className="text-orange-600/80 dark:text-orange-400/80 text-xs mt-1">Áp dụng cho đơn hàng từ</p>
              </div>
              <span className="font-bold text-lg text-orange-600 dark:text-orange-400">500.000đ</span>
            </div>
          </div>
        </Section>
        
        <Divider />

        <Section icon={<PackageSearch className="w-5 h-5" />} title="Theo Dõi Đơn Hàng">
          <p>
            Ngay khi đơn hàng được giao cho đơn vị vận chuyển, bạn sẽ nhận được một email chứa thông báo vận đơn và liên kết theo dõi.
          </p>
          <p>
            Ngoài ra, bạn có thể chủ động kiểm tra trạng thái đơn hàng của mình bất kỳ lúc nào bằng cách sử dụng công cụ tra cứu của chúng tôi.
          </p>
          <div className="mt-4">
            <Link 
              href="/thong-tin" 
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Kiểm tra đơn hàng <PackageSearch className="w-4 h-4" />
            </Link>
          </div>
        </Section>
      </div>
    </div>
  );
}
