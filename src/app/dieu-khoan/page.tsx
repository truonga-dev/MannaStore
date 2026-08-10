import { Metadata } from 'next';
import { Scale, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Điều Khoản Sử Dụng | Manna Store',
  description:
    'Điều khoản sử dụng dịch vụ của Manna Store. Vui lòng đọc kỹ trước khi sử dụng website và mua sắm.',
};

const Section = ({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section id={`section-${number}`} className="mb-10 scroll-mt-8">
    <div className="flex items-start gap-4 mb-4">
      <span className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-bold">
        {number}
      </span>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 pt-1">{title}</h2>
    </div>
    <div className="ml-12 text-gray-600 dark:text-gray-400 text-sm leading-7 space-y-3">
      {children}
    </div>
  </section>
);

const Divider = () => (
  <div className="border-t border-gray-100 dark:border-gray-800 mb-10" />
);

export default function DieuKhoanPage() {
  return (
    <div className="min-h-screen bg-[#F8F7F4] dark:bg-[#0C0C0C] py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 mb-5">
            <Scale className="w-8 h-8 text-gray-700 dark:text-gray-300" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Điều Khoản Sử Dụng
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-base max-w-xl mx-auto">
            Vui lòng đọc kỹ các điều khoản sau trước khi sử dụng website và dịch vụ của Manna Store.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-400 dark:text-gray-500">
            <Clock className="w-4 h-4" />
            <span>Có hiệu lực từ: 01/01/2025 — Cập nhật: 01/08/2026</span>
          </div>
        </div>

        {/* Table of contents */}
        <nav className="mb-10 bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-2xl p-5">
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
            Mục lục
          </p>
          <ol className="space-y-1.5">
            {[
              { n: '1', title: 'Giới Thiệu' },
              { n: '2', title: 'Tài Khoản Người Dùng' },
              { n: '3', title: 'Quyền Sở Hữu Trí Tuệ' },
              { n: '4', title: 'Hành Vi Bị Cấm' },
              { n: '5', title: 'Giới Hạn Trách Nhiệm' },
              { n: '6', title: 'Thay Đổi Điều Khoản' },
            ].map((item) => (
              <li key={item.n}>
                <a
                  href={`#section-${item.n}`}
                  className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors group"
                >
                  <span className="w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs flex items-center justify-center font-semibold text-gray-500 dark:text-gray-400 group-hover:bg-amber-100 group-hover:text-amber-700 dark:group-hover:bg-amber-900/30 dark:group-hover:text-amber-400 transition-colors flex-shrink-0">
                    {item.n}
                  </span>
                  {item.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <Divider />

        {/* Section 1 */}
        <Section number="1" title="Giới Thiệu">
          <p>
            Chào mừng bạn đến với <strong className="text-gray-800 dark:text-gray-200">Manna Store</strong> — thương hiệu thời trang và quà tặng Cơ Đốc giáo. Khi truy cập và sử dụng website mannastore.vn, bạn đồng ý bị ràng buộc bởi các điều khoản và điều kiện được nêu dưới đây.
          </p>
          <p>
            Nếu bạn không đồng ý với bất kỳ điều khoản nào, vui lòng không sử dụng dịch vụ của chúng tôi. Manna Store có quyền thay đổi, chỉnh sửa, thêm hoặc xóa các phần của Điều khoản này vào bất kỳ lúc nào.
          </p>
          <p>
            Các điều khoản này áp dụng cho tất cả người dùng, bao gồm khách vãng lai, người dùng đã đăng ký, và đối tác kinh doanh.
          </p>
        </Section>

        <Divider />

        {/* Section 2 */}
        <Section number="2" title="Tài Khoản Người Dùng">
          <p>
            Để thực hiện một số tính năng trên website, bạn cần tạo tài khoản. Khi đăng ký, bạn đồng ý:
          </p>
          <ul className="list-none space-y-2">
            {[
              'Cung cấp thông tin chính xác, đầy đủ và cập nhật.',
              'Tự chịu trách nhiệm về việc bảo mật tên đăng nhập và mật khẩu của mình.',
              'Thông báo ngay cho chúng tôi nếu phát hiện truy cập trái phép vào tài khoản.',
              'Không tạo tài khoản với thông tin giả mạo hoặc mạo danh người khác.',
              'Không chia sẻ tài khoản cho người khác sử dụng.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <p>
            Manna Store có quyền tạm ngưng hoặc chấm dứt tài khoản của bạn nếu phát hiện vi phạm các điều khoản này mà không cần thông báo trước.
          </p>
        </Section>

        <Divider />

        {/* Section 3 */}
        <Section number="3" title="Quyền Sở Hữu Trí Tuệ">
          <p>
            Toàn bộ nội dung trên website Manna Store — bao gồm nhưng không giới hạn ở: hình ảnh, thiết kế, văn bản, logo, đồ họa, âm thanh, và phần mềm — đều là tài sản độc quyền của Manna Store hoặc các đối tác cấp phép.
          </p>
          <div className="bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-2">
            <p className="font-medium text-gray-800 dark:text-gray-200 text-sm">
              🎨 Về thiết kế sản phẩm
            </p>
            <p>
              Tất cả thiết kế in ấn trên sản phẩm quần áo, phụ kiện và quà tặng của Manna Store đều là bản quyền độc quyền. Mọi hành vi sao chép, tái sản xuất, phân phối hoặc tạo ra các sản phẩm phái sinh mà không có sự cho phép bằng văn bản đều bị nghiêm cấm và có thể bị xử lý theo quy định pháp luật.
            </p>
          </div>
          <p>
            Bạn được phép xem và in các trang của website chỉ cho mục đích cá nhân, phi thương mại, với điều kiện giữ nguyên thông tin bản quyền.
          </p>
        </Section>

        <Divider />

        {/* Section 4 */}
        <Section number="4" title="Hành Vi Bị Cấm">
          <p>Khi sử dụng dịch vụ của Manna Store, bạn tuyệt đối không được:</p>
          <div className="space-y-2">
            {[
              'Sử dụng website cho bất kỳ mục đích bất hợp pháp nào.',
              'Đăng tải, truyền tải nội dung phỉ báng, thù ghét, khiêu dâm hoặc vi phạm quyền của người khác.',
              'Cố gắng hack, tấn công hoặc xâm phạm bảo mật hệ thống của chúng tôi.',
              'Dùng bot, scraper hoặc phần mềm tự động để truy cập dữ liệu mà không có sự cho phép.',
              'Giả mạo danh tính của Manna Store hay bất kỳ nhân viên nào.',
              'Cạnh tranh không lành mạnh bằng cách sao chép sản phẩm hoặc nội dung marketing.',
              'Đăng đánh giá giả mạo hoặc gây hiểu lầm về sản phẩm.',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 bg-red-50/60 dark:bg-red-900/10 rounded-lg px-3 py-2">
                <span className="text-red-500 mt-0.5 flex-shrink-0 text-xs font-bold">✕</span>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </Section>

        <Divider />

        {/* Section 5 */}
        <Section number="5" title="Giới Hạn Trách Nhiệm">
          <p>
            Manna Store cung cấp dịch vụ &quot;như hiện có&quot; và không bảo đảm rằng dịch vụ sẽ luôn sẵn sàng, không bị gián đoạn, không có lỗi hay virus.
          </p>
          <p>
            Trong phạm vi tối đa được pháp luật cho phép, Manna Store không chịu trách nhiệm cho bất kỳ thiệt hại gián tiếp, ngẫu nhiên, đặc biệt hoặc hậu quả nào phát sinh từ việc sử dụng hoặc không thể sử dụng dịch vụ của chúng tôi.
          </p>
          <p>
            Tổng trách nhiệm của Manna Store đối với bạn trong mọi trường hợp không vượt quá số tiền bạn đã thanh toán cho đơn hàng liên quan trong vòng 12 tháng trước đó.
          </p>
          <p>
            Các liên kết đến website của bên thứ ba được cung cấp chỉ nhằm mục đích tiện lợi. Manna Store không kiểm soát và không chịu trách nhiệm về nội dung hay chính sách của các website đó.
          </p>
        </Section>

        <Divider />

        {/* Section 6 */}
        <Section number="6" title="Thay Đổi Điều Khoản">
          <p>
            Manna Store có quyền cập nhật, sửa đổi các Điều khoản Sử dụng này bất kỳ lúc nào. Khi có thay đổi quan trọng, chúng tôi sẽ:
          </p>
          <ul className="list-none space-y-2">
            {[
              'Cập nhật ngày "Cập nhật lần cuối" ở đầu trang.',
              'Thông báo qua email (nếu bạn có tài khoản đã đăng ký).',
              'Hiển thị thông báo nổi bật trên trang chủ trong ít nhất 7 ngày.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <p>
            Việc tiếp tục sử dụng dịch vụ sau khi thay đổi được thông báo đồng nghĩa với việc bạn chấp nhận các điều khoản mới. Nếu không đồng ý, bạn có quyền ngừng sử dụng dịch vụ và yêu cầu xóa tài khoản.
          </p>
          <p>
            Để biết thêm thông tin hoặc có thắc mắc về Điều khoản Sử dụng, vui lòng liên hệ:{' '}
            <a
              href="mailto:hello@mannastore.vn"
              className="font-semibold text-amber-700 dark:text-amber-400 hover:underline"
            >
              hello@mannastore.vn
            </a>
          </p>
        </Section>

        {/* Footer note */}
        <div className="mt-2 p-5 rounded-2xl bg-gray-100 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2025–2026 Manna Store. Mọi quyền được bảo lưu. Điều khoản này được điều chỉnh bởi pháp luật Việt Nam.
          </p>
        </div>
      </div>
    </div>
  );
}
