import Image from "next/image";
import Link from "next/link";
import { Heart, Star, Users, Package } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Câu Chuyện Của Chúng Tôi | Manna Store",
  description: "Khám phá câu chuyện đằng sau Manna Store — thương hiệu thời trang và quà tặng Cơ Đốc, mang thông điệp yêu thương và hy vọng vào cuộc sống hàng ngày.",
};

const VALUES = [
  {
    icon: <Heart className="w-7 h-7 text-red-400" />,
    title: "Tình yêu thương",
    desc: "Mỗi sản phẩm được tạo ra với tình yêu thương chân thành, mong muốn mang niềm vui đến cho người tặng và người nhận.",
  },
  {
    icon: <Star className="w-7 h-7 text-yellow-400" />,
    title: "Chất lượng",
    desc: "Chúng tôi cam kết chỉ chọn lọc và cung cấp những sản phẩm có chất lượng tốt nhất, từ chất liệu vải đến từng nét in.",
  },
  {
    icon: <Users className="w-7 h-7 text-blue-400" />,
    title: "Cộng đồng",
    desc: "Manna Store là nơi kết nối những người Cơ Đốc trẻ, cùng nhau sống và thể hiện đức tin qua phong cách hàng ngày.",
  },
  {
    icon: <Package className="w-7 h-7 text-green-400" />,
    title: "Sáng tạo",
    desc: "Thiết kế độc quyền, sáng tạo và tinh tế — phản ánh thông điệp Phúc Âm qua ngôn ngữ thị giác hiện đại.",
  },
];

const MILESTONES = [
  { year: "2023", event: "Manna Store ra đời từ một nhóm bạn trẻ Cơ Đốc với ước mơ mang thông điệp yêu thương vào cuộc sống hàng ngày." },
  { year: "2024", event: "Ra mắt bộ sưu tập áo hoodie và áo thun đầu tiên, được cộng đồng đón nhận nồng nhiệt với hàng trăm đơn hàng." },
  { year: "2025", event: "Mở rộng danh mục sang quà tặng, sách, móc khóa và các phụ kiện thờ phượng. Tổng cộng 1.000+ khách hàng thân thiết." },
  { year: "2026", event: "Ra mắt website bán hàng chính thức, đưa Manna Store lên một tầm vóc mới — phục vụ cộng đồng Cơ Đốc trên toàn quốc." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=2000"
            alt="Manna Store - Câu chuyện của chúng tôi"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto">
          <p className="text-sm uppercase tracking-[0.4em] mb-4 text-white/60 font-medium">Câu Chuyện</p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Manna Store
          </h1>
          <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed">
            Trang bị đời sống tâm linh — mang thông điệp bình an và hy vọng vào từng sản phẩm.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-semibold mb-4">Nguồn gốc</p>
            <h2 className="font-serif text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Tất cả bắt đầu từ một ước mơ nhỏ
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              <p>
                Manna Store được sinh ra từ một ước mơ cá nhân của tôi — một người trẻ Cơ Đốc với khao khát mang đức tin vào cuộc sống thường ngày, không chỉ giới hạn trong nhà thờ mà còn qua từng chiếc áo bạn mặc, từng món quà bạn tặng, từng cuốn sách bạn đọc. Hành trình này được tôi bắt đầu nhen nhóm từ ngày 8/8/2026 và dự kiến sẽ chính thức ra mắt vào năm 2027.
              </p>
              <p>
                Tên <strong className="text-gray-900 dark:text-white">Manna</strong> được lấy từ câu chuyện trong Kinh Thánh — bánh từ trời rơi xuống nuôi dưỡng dân Y-sơ-ra-ên trong hoang mạc. Đó cũng chính là điều tôi mong muốn thực hiện: mang những điều nuôi dưỡng tâm linh vào đời sống mỗi ngày của bạn.
              </p>
              <p>
                Mỗi thiết kế là một câu chuyện, mỗi sản phẩm là một lời nhắc nhở nhẹ nhàng rằng — Đức Chúa Trời luôn tốt lành.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 items-center md:items-start">
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-900 shadow-xl">
              <Image
                src="/founder.jpg"
                alt="Người sáng lập Manna Store"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-sm italic text-gray-500 dark:text-gray-400 text-center w-full">Người sáng lập</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 dark:bg-gray-900 py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-semibold mb-3">Giá trị cốt lõi</p>
            <h2 className="font-serif text-3xl font-bold text-gray-900 dark:text-white">Điều chúng tôi tin tưởng</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-gray-50 dark:bg-gray-700 rounded-xl flex items-center justify-center mb-4">
                  {v.icon}
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{v.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-3xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-primary font-semibold mb-3">Hành trình</p>
          <h2 className="font-serif text-3xl font-bold text-gray-900 dark:text-white">Những cột mốc đáng nhớ</h2>
        </div>
        <div className="relative border-l-2 border-primary/20 ml-6 space-y-8">
          {MILESTONES.map((m, i) => (
            <div key={i} className="relative pl-8">
              <div className="absolute -left-[11px] top-1 w-5 h-5 bg-primary rounded-full border-4 border-white dark:border-gray-950 shadow"></div>
              <span className="text-xs font-bold tracking-widest text-primary uppercase">{m.year}</span>
              <p className="mt-1 text-gray-700 dark:text-gray-300 leading-relaxed">{m.event}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 text-white py-20 text-center px-4">
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Trở thành một phần của câu chuyện</h2>
        <p className="text-white/70 mb-8 max-w-xl mx-auto">Mỗi đơn hàng bạn đặt không chỉ là mua sản phẩm — mà là ủng hộ một ước mơ và một sứ mệnh.</p>
        <Link
          href="/san-pham"
          className="inline-block bg-white text-gray-900 font-bold uppercase tracking-wider px-10 py-4 rounded-full hover:scale-105 transition-transform"
        >
          Khám phá sản phẩm
        </Link>
      </section>

    </div>
  );
}
