import { Metadata } from 'next';
import {
  ShieldCheck,
  Clock,
  Database,
  Target,
  Users,
  Lock,
  UserCog,
  Mail,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Chính Sách Bảo Mật | Manna Store',
  description:
    'Tìm hiểu cách Manna Store thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn.',
};

const Section = ({
  icon,
  number,
  title,
  children,
}: {
  icon: React.ReactNode;
  number: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section id={`privacy-section-${number}`} className="mb-10 scroll-mt-8">
    <div className="flex items-start gap-4 mb-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-700 dark:text-teal-400">
        {icon}
      </div>
      <div className="pt-1">
        <p className="text-xs font-semibold text-teal-600 dark:text-teal-500 uppercase tracking-widest mb-0.5">
          Mục {number}
        </p>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
      </div>
    </div>
    <div className="ml-14 text-gray-600 dark:text-gray-400 text-sm leading-7 space-y-3">
      {children}
    </div>
  </section>
);

const DataTag = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center px-2.5 py-0.5 mr-1.5 mb-1.5 rounded-md text-xs font-medium bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400 border border-teal-200 dark:border-teal-800/40">
    {children}
  </span>
);

const Divider = () => (
  <div className="border-t border-gray-100 dark:border-gray-800 mb-10" />
);

export default function BaoMatPage() {
  return (
    <div className="min-h-screen bg-[#F8F7F4] dark:bg-[#0C0C0C] py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-100 dark:bg-teal-900/20 mb-5">
            <ShieldCheck className="w-8 h-8 text-teal-700 dark:text-teal-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Chính Sách Bảo Mật
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-base max-w-xl mx-auto">
            Manna Store cam kết bảo vệ quyền riêng tư và dữ liệu cá nhân của bạn. Tài liệu này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ thông tin của bạn.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-400 dark:text-gray-500">
            <Clock className="w-4 h-4" />
            <span>Có hiệu lực từ: 01/01/2025 — Cập nhật: 01/08/2026</span>
          </div>
        </div>

        {/* Commitment banner */}
        <div className="mb-10 p-4 rounded-2xl bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/10 dark:to-emerald-900/10 border border-teal-200/60 dark:border-teal-800/30 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-teal-600 dark:text-teal-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-teal-800 dark:text-teal-300">
            <strong>Cam kết của chúng tôi:</strong> Manna Store không bán, cho thuê hay trao đổi thông tin cá nhân của bạn với bất kỳ bên thứ ba nào vì mục đích thương mại.
          </p>
        </div>

        <Divider />

        {/* Section 1: Thông tin thu thập */}
        <Section icon={<Database className="w-5 h-5" />} number="1" title="Thông Tin Chúng Tôi Thu Thập">
          <p>
            Khi bạn sử dụng dịch vụ của Manna Store, chúng tôi có thể thu thập các loại thông tin sau:
          </p>

          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-xl p-4">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Thông tin cá nhân (do bạn cung cấp)
              </p>
              <div className="flex flex-wrap">
                <DataTag>Họ và tên</DataTag>
                <DataTag>Địa chỉ email</DataTag>
                <DataTag>Số điện thoại</DataTag>
                <DataTag>Địa chỉ giao hàng</DataTag>
                <DataTag>Ngày sinh</DataTag>
                <DataTag>Thông tin thanh toán</DataTag>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-xl p-4">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Lịch sử mua hàng & tương tác
              </p>
              <div className="flex flex-wrap">
                <DataTag>Lịch sử đơn hàng</DataTag>
                <DataTag>Sản phẩm yêu thích</DataTag>
                <DataTag>Đánh giá sản phẩm</DataTag>
                <DataTag>Giỏ hàng</DataTag>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-xl p-4">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Dữ liệu kỹ thuật (tự động thu thập)
              </p>
              <div className="flex flex-wrap">
                <DataTag>Địa chỉ IP</DataTag>
                <DataTag>Loại trình duyệt</DataTag>
                <DataTag>Hệ điều hành</DataTag>
                <DataTag>Cookie</DataTag>
                <DataTag>Trang đã xem</DataTag>
                <DataTag>Thời gian truy cập</DataTag>
              </div>
            </div>
          </div>
        </Section>

        <Divider />

        {/* Section 2: Mục đích sử dụng */}
        <Section icon={<Target className="w-5 h-5" />} number="2" title="Mục Đích Sử Dụng Thông Tin">
          <p>
            Thông tin thu thập được sử dụng cho các mục đích sau:
          </p>
          <div className="space-y-2">
            {[
              { purpose: 'Xử lý và giao hàng đơn hàng', desc: 'Xác nhận, đóng gói và vận chuyển sản phẩm đến địa chỉ của bạn.' },
              { purpose: 'Hỗ trợ khách hàng', desc: 'Giải quyết thắc mắc, khiếu nại và yêu cầu đổi trả của bạn.' },
              { purpose: 'Cải thiện dịch vụ', desc: 'Phân tích hành vi mua sắm để cải thiện sản phẩm và trải nghiệm người dùng.' },
              { purpose: 'Thông tin khuyến mãi', desc: 'Gửi email về sản phẩm mới, ưu đãi đặc biệt (chỉ khi bạn đăng ký nhận).' },
              { purpose: 'Phòng chống gian lận', desc: 'Phát hiện và ngăn chặn các hoạt động gian lận, bảo vệ tài khoản của bạn.' },
              { purpose: 'Tuân thủ pháp luật', desc: 'Đáp ứng các yêu cầu pháp lý và quy định của cơ quan chức năng.' },
            ].map((item) => (
              <div
                key={item.purpose}
                className="flex items-start gap-3 bg-gray-50 dark:bg-gray-800/30 rounded-lg p-3"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 flex-shrink-0" />
                <div>
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {item.purpose}:{' '}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Divider />

        {/* Section 3: Chia sẻ thông tin */}
        <Section icon={<Users className="w-5 h-5" />} number="3" title="Chia Sẻ Thông Tin">
          <div className="bg-teal-50 dark:bg-teal-900/10 border border-teal-200 dark:border-teal-800/40 rounded-xl p-4 mb-4">
            <p className="text-sm font-semibold text-teal-800 dark:text-teal-300 mb-1">
              🔒 Cam kết không bán thông tin
            </p>
            <p className="text-sm text-teal-700 dark:text-teal-400">
              Manna Store cam kết không bán, cho thuê hoặc trao đổi thông tin cá nhân của bạn với bên thứ ba vì bất kỳ mục đích thương mại nào.
            </p>
          </div>
          <p>Chúng tôi chỉ chia sẻ thông tin trong các trường hợp sau:</p>
          <ul className="list-none space-y-2">
            {[
              'Đơn vị vận chuyển (GHN, GHTK) — chỉ thông tin giao hàng cần thiết.',
              'Đối tác thanh toán — được mã hóa và bảo mật theo chuẩn PCI DSS.',
              'Cơ quan nhà nước — khi có yêu cầu hợp pháp từ cơ quan có thẩm quyền.',
              'Nhà cung cấp dịch vụ kỹ thuật — email marketing, phân tích dữ liệu (đã ký cam kết bảo mật).',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <Divider />

        {/* Section 4: Bảo mật dữ liệu */}
        <Section icon={<Lock className="w-5 h-5" />} number="4" title="Bảo Mật Dữ Liệu">
          <p>
            Chúng tôi áp dụng các biện pháp bảo mật kỹ thuật và tổ chức tiên tiến để bảo vệ dữ liệu của bạn:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                icon: '🔐',
                title: 'Mã hóa SSL/TLS',
                desc: 'Mọi dữ liệu truyền tải đều được mã hóa 256-bit',
              },
              {
                icon: '🛡️',
                title: 'Bảo vệ thanh toán',
                desc: 'Tuân thủ tiêu chuẩn bảo mật PCI DSS',
              },
              {
                icon: '🔑',
                title: 'Kiểm soát truy cập',
                desc: 'Chỉ nhân viên được ủy quyền mới có thể truy cập dữ liệu',
              },
              {
                icon: '📋',
                title: 'Kiểm tra định kỳ',
                desc: 'Đánh giá bảo mật và kiểm tra lỗ hổng thường xuyên',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700/40 rounded-xl p-4"
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
                  {item.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
          <p>
            Mặc dù chúng tôi nỗ lực tối đa, không có phương thức truyền tải qua Internet nào là tuyệt đối an toàn 100%. Chúng tôi sẽ thông báo ngay cho bạn nếu xảy ra vi phạm dữ liệu ảnh hưởng đến tài khoản của bạn.
          </p>
        </Section>

        <Divider />

        {/* Section 5: Quyền của bạn */}
        <Section icon={<UserCog className="w-5 h-5" />} number="5" title="Quyền Của Bạn">
          <p>
            Với tư cách là chủ thể dữ liệu, bạn có các quyền sau đối với thông tin cá nhân của mình:
          </p>
          <div className="space-y-3">
            {[
              {
                right: 'Quyền truy cập',
                desc: 'Yêu cầu xem thông tin cá nhân mà chúng tôi lưu trữ về bạn.',
                action: 'Tài khoản → Thông tin cá nhân',
              },
              {
                right: 'Quyền chỉnh sửa',
                desc: 'Cập nhật hoặc sửa đổi thông tin không chính xác bất kỳ lúc nào.',
                action: 'Tài khoản → Chỉnh sửa hồ sơ',
              },
              {
                right: 'Quyền xóa',
                desc: 'Yêu cầu xóa tài khoản và tất cả dữ liệu liên quan (trừ dữ liệu bắt buộc giữ lại theo pháp luật).',
                action: 'Email: hello@mannastore.vn',
              },
              {
                right: 'Quyền phản đối',
                desc: 'Từ chối nhận email marketing bất kỳ lúc nào.',
                action: 'Link "Hủy đăng ký" trong email',
              },
              {
                right: 'Quyền di chuyển dữ liệu',
                desc: 'Nhận bản sao dữ liệu của bạn ở định dạng máy có thể đọc được.',
                action: 'Email: hello@mannastore.vn',
              },
            ].map((item) => (
              <div
                key={item.right}
                className="flex items-start gap-4 bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-xl p-4"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                      {item.right}
                    </span>
                    <span className="text-xs text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 px-2 py-0.5 rounded-full border border-teal-200 dark:border-teal-800/40">
                      {item.action}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Divider />

        {/* Section 6: Liên hệ */}
        <Section icon={<Mail className="w-5 h-5" />} number="6" title="Liên Hệ Về Quyền Riêng Tư">
          <p>
            Nếu bạn có bất kỳ câu hỏi nào về Chính sách Bảo mật này hoặc muốn thực hiện quyền của mình, hãy liên hệ với chúng tôi:
          </p>
          <div className="bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span className="text-gray-500 dark:text-gray-400">Email:</span>
              <a
                href="mailto:hello@mannastore.vn"
                className="font-semibold text-teal-700 dark:text-teal-400 hover:underline"
              >
                hello@mannastore.vn
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span className="text-gray-500 dark:text-gray-400">Thời gian phản hồi:</span>
              <span className="font-medium text-gray-700 dark:text-gray-300">Trong vòng 72 giờ</span>
            </div>
          </div>
          <p>
            Chúng tôi cam kết xử lý các yêu cầu liên quan đến quyền riêng tư một cách nghiêm túc và kịp thời, theo đúng quy định của Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân tại Việt Nam.
          </p>
        </Section>

        {/* Footer note */}
        <div className="mt-2 p-5 rounded-2xl bg-teal-50 dark:bg-teal-900/10 border border-teal-200/60 dark:border-teal-800/30 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2025–2026 Manna Store. Chính sách bảo mật này tuân thủ{' '}
            <span className="font-medium text-teal-700 dark:text-teal-400">
              Nghị định 13/2023/NĐ-CP
            </span>{' '}
            về bảo vệ dữ liệu cá nhân của Việt Nam.
          </p>
        </div>
      </div>
    </div>
  );
}
