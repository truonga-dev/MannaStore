import { Metadata } from 'next';
import { Repeat, Package, Shield, CreditCard, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Chính Sách Đổi Trả | Manna Store',
  description:
    'Chính sách đổi trả sản phẩm tại Manna Store. Chúng tôi luôn mong muốn mang đến trải nghiệm tốt nhất cho bạn.',
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
      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-700 dark:text-blue-400">
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

export default function ChinhSachDoiTraPage() {
  return (
    <div className="min-h-screen bg-[#F8F7F4] dark:bg-[#0C0C0C] py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/20 mb-5">
            <Repeat className="w-8 h-8 text-blue-700 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Chính Sách Đổi Trả
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-base max-w-xl mx-auto">
            Chúng tôi cam kết chất lượng sản phẩm. Nếu bạn không hài lòng, Manna Store luôn sẵn sàng hỗ trợ đổi trả theo quy định.
          </p>
        </div>

        <Divider />

        <Section icon={<Shield className="w-5 h-5" />} title="Điều Kiện Đổi Trả">
          <p>
            Sản phẩm được chấp nhận đổi trả trong vòng <strong>7 ngày</strong> kể từ ngày nhận hàng, với các điều kiện sau:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Sản phẩm còn nguyên vẹn, chưa qua sử dụng, chưa giặt ủi.</li>
            <li>Còn đầy đủ tem, mác, túi/hộp và hóa đơn mua hàng (nếu có).</li>
            <li>Sản phẩm bị lỗi do nhà sản xuất (rách, bung chỉ, lỗi in ấn) hoặc giao sai mẫu/size.</li>
          </ul>
        </Section>

        <Divider />

        <Section icon={<Package className="w-5 h-5" />} title="Sản Phẩm Không Được Đổi Trả">
          <p>Chúng tôi rất tiếc không thể hỗ trợ đổi trả đối với:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Sản phẩm trong các chương trình khuyến mãi, giảm giá (trừ khi có lỗi từ nhà sản xuất).</li>
            <li>Sản phẩm đã qua sử dụng, có mùi lạ, bị dơ bẩn hoặc đã bị can thiệp thay đổi hình dáng.</li>
            <li>Quà tặng kèm theo đơn hàng.</li>
          </ul>
        </Section>

        <Divider />

        <Section icon={<Repeat className="w-5 h-5" />} title="Quy Trình Đổi Trả">
          <div className="space-y-4 mt-4">
            <div className="flex gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50">
              <div className="w-8 h-8 flex-shrink-0 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center font-bold text-gray-700 dark:text-gray-300">
                1
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Liên hệ hỗ trợ</h4>
                <p className="text-gray-500 dark:text-gray-400">
                  Gửi yêu cầu qua Email hoặc Zalo, cung cấp mã đơn hàng, lý do đổi trả và hình ảnh/video rõ nét về tình trạng sản phẩm.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50">
              <div className="w-8 h-8 flex-shrink-0 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center font-bold text-gray-700 dark:text-gray-300">
                2
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Gửi hàng về kho</h4>
                <p className="text-gray-500 dark:text-gray-400">
                  Sau khi yêu cầu được xác nhận, vui lòng đóng gói sản phẩm cẩn thận và gửi về địa chỉ kho của Manna Store qua đơn vị vận chuyển.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50">
              <div className="w-8 h-8 flex-shrink-0 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center font-bold text-gray-700 dark:text-gray-300">
                3
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Kiểm tra & Hoàn tất</h4>
                <p className="text-gray-500 dark:text-gray-400">
                  Chúng tôi sẽ kiểm tra sản phẩm nhận được. Nếu đạt yêu cầu, chúng tôi sẽ tiến hành đổi sản phẩm mới hoặc hoàn tiền theo chính sách.
                </p>
              </div>
            </div>
          </div>
        </Section>

        <Divider />

        <Section icon={<CreditCard className="w-5 h-5" />} title="Phí Vận Chuyển Đổi Trả & Hoàn Tiền">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Lỗi từ Manna Store:</strong> Chúng tôi chịu hoàn toàn phí vận chuyển 2 chiều.</li>
            <li><strong>Đổi size/mẫu theo yêu cầu khách:</strong> Khách hàng vui lòng thanh toán phí vận chuyển.</li>
            <li><strong>Hoàn tiền:</strong> Thời gian hoàn tiền từ 5-7 ngày làm việc (không tính T7, CN) vào tài khoản ngân hàng của bạn sau khi chúng tôi nhận và kiểm tra hàng.</li>
          </ul>
        </Section>
        
        <Divider />
        
        <div className="mt-8 p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200/60 dark:border-blue-800/30 text-center">
          <Mail className="w-6 h-6 mx-auto mb-3 text-blue-600 dark:text-blue-400" />
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Cần hỗ trợ thêm?</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Đừng ngần ngại liên hệ với chúng tôi để được giải đáp mọi thắc mắc về quá trình đổi trả.
          </p>
          <a href="mailto:hello@mannastore.vn" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors">
            hello@mannastore.vn
          </a>
        </div>
      </div>
    </div>
  );
}
