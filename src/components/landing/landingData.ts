export interface LandingProduct {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  tag: string;
  verse: string;
  verseRef: string;
  description: string;
  highlights: string[];
  slug: string;
}

export interface LandingCategory {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  slug: string;
  itemCount: string;
  accent: string;
}

export const HERO_TAGS = [
  {
    title: "FAITH",
    subtitle: "Hê-bơ-rơ 11:1",
    desc: "Đức tin là sự bảo đảm",
    color: "from-amber-200/20 to-amber-400/10",
    border: "border-amber-200/40",
    offset: { x: -60, y: -70, z: 45 }
  },
  {
    title: "HOPE",
    subtitle: "Rô-ma 5:5",
    desc: "Hy vọng không hổ thẹn",
    color: "from-emerald-200/20 to-emerald-400/10",
    border: "border-emerald-200/40",
    offset: { x: 70, y: 80, z: 35 }
  },
  {
    title: "LOVE",
    subtitle: "1 Cô-rinh-tô 13:8",
    desc: "Tình yêu không hư mất",
    color: "from-rose-200/20 to-rose-400/10",
    border: "border-rose-200/40",
    offset: { x: 80, y: -50, z: 55 }
  }
];

export const CATEGORIES_DATA: LandingCategory[] = [
  {
    id: "ao-thun",
    title: "Áo Thun",
    tagline: "Wear your faith.",
    description: "Chất liệu cotton 2 chiều dệt dày 250gsm, in lụa thủ công với typography tối giản mang Lời Sự Sống vào trang phục hằng ngày.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop",
    slug: "/san-pham?category=ao-thun",
    itemCount: "12 Thiết kế",
    accent: "from-stone-900/60 to-stone-900/90"
  },
  {
    id: "hoodie",
    title: "Hoodie & Áo Khoác",
    tagline: "Carry your purpose.",
    description: "Nỉ chân cua cotton 100% giữ ấm, đường thêu 3D nổi 'Grace' và 'Immanuel' tinh xảo trên ngực áo.",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop",
    slug: "/san-pham?category=ao-hoodie",
    itemCount: "8 Mẫu mới",
    accent: "from-[#17202A]/70 to-[#0F141A]/90"
  },
  {
    id: "phu-kien",
    title: "Phụ Kiện",
    tagline: "Little details. Meaningful stories.",
    description: "Mũ dad-hat 'Chosen', túi tote vải mộc bền bỉ và móc khóa gỗ Olive nhập khẩu từ Israel.",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop",
    slug: "/san-pham?category=phu-kien",
    itemCount: "15 Vật phẩm",
    accent: "from-[#2A3428]/60 to-[#1B221A]/90"
  },
  {
    id: "sach-so",
    title: "Sách & Sổ Tay",
    tagline: "Grow in faith.",
    description: "Sổ tĩnh nguyện da mềm định lượng 100gsm chống thấm nhòe, kèm các bản Kinh Thánh Truyền Thống bìa da dập chìm.",
    image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=1000&auto=format&fit=crop",
    slug: "/san-pham?category=sach",
    itemCount: "6 Ấn phẩm",
    accent: "from-[#3D2F23]/60 to-[#291F17]/90"
  },
  {
    id: "qua-tang",
    title: "Quà Tặng",
    tagline: "Give meaning.",
    description: "Set quà tặng đóng hộp thủ công nơ gai, thiệp viết tay cá nhân hóa và thông điệp ban phước trao gửi người thân yêu.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000&auto=format&fit=crop",
    slug: "/san-pham?category=qua-tang",
    itemCount: "Bộ sưu tập quà",
    accent: "from-[#38262E]/60 to-[#22161C]/90"
  }
];

export const FEATURED_PRODUCTS: LandingProduct[] = [
  {
    id: "prod-salt-light",
    name: 'Áo Thun "Salt & Light"',
    subtitle: "Heavyweight Boxy Tee · Đen Tuyển",
    category: "Áo Thun",
    price: 220000,
    originalPrice: 280000,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop",
    tag: "SIGNATURE PIECE",
    verse: "Các ngươi là muối của đất... là sự sáng của thế gian.",
    verseRef: "Ma-thi-ơ 5:13-14",
    description: "Chiếc áo thun tiêu biểu nhất của Manna Store. Sử dụng chất liệu cotton hữu cơ 2 chiều dày dặn, form dáng boxy hiện đại. Phía sau lưng là typography dập nổi thông điệp Salt & Light với phông chữ serif thanh tao.",
    highlights: ["100% Cotton 250gsm", "Form Boxy fit đứng dáng", "Hình in bền bỉ qua 100 lần giặt", "Đính nhãn dệt logo Manna độc quyền"],
    slug: "ao-thun-salt"
  },
  {
    id: "prod-grace-hoodie",
    name: 'Áo Hoodie "Grace"',
    subtitle: "Nỉ Bông Cao Cấp · Xám Melange",
    category: "Hoodie",
    price: 350000,
    originalPrice: 420000,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop",
    tag: "BESTSELLER",
    verse: "Ân điển của Ta đã đủ cho ngươi rồi.",
    verseRef: "2 Cô-rinh-tô 12:9",
    description: "Thiết kế hoodie tối giản với họa tiết thêu chỉ tơ chìm chữ 'Grace' ở ngực trái và biểu tượng chim bồ câu tượng trưng cho Đức Thánh Linh. Nón trùm 2 lớp đứng form không xẹp.",
    highlights: ["Nỉ chân cua 380gsm", "Đường may can đè 2 kim chắc chắn", "Chữ thêu vi tính 3D sắc nét", "Túi kangaroo rộng rãi"],
    slug: "ao-hoodie-grace"
  },
  {
    id: "prod-so-tay-prayer",
    name: 'Sổ Tĩnh Nguyện Da Nâu',
    subtitle: "Bìa Da PU Ý · Khổ A5 Giấy Ngà",
    category: "Sách & Sổ",
    price: 95000,
    originalPrice: 120000,
    image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=1000&auto=format&fit=crop",
    tag: "EVERYDAY COMPANION",
    verse: "Lời Chúa là ngọn đèn cho chân tôi, ánh sáng cho đường lối tôi.",
    verseRef: "Thi Thiên 119:105",
    description: "Người bạn đồng hành trong mỗi buổi sớm tĩnh nguyện cùng Lời Chúa. 200 trang giấy ngà định lượng 100gsm chống mỏi mắt và không thấm nhòe bút mực. Bìa da dập chìm họa tiết nhánh ô-liu thanh nhã.",
    highlights: ["200 trang giấy ngà vàng dịu mắt", "Dây ruy băng lụa đánh dấu", "Túi phụ cài thiệp sau bìa", "Bìa mềm da Ý cao cấp"],
    slug: "so-tay-cau-nguyen"
  },
  {
    id: "prod-ly-shalom",
    name: 'Ly Gốm Sứ "Shalom"',
    subtitle: "Tráng Men Mờ Tối Giản · 350ml",
    category: "Quà Tặng",
    price: 120000,
    originalPrice: 150000,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=1000&auto=format&fit=crop",
    tag: "PEACEFUL MORNING",
    verse: "Ta để sự bình an lại cho các ngươi; Ta ban sự bình an của Ta cho các ngươi.",
    verseRef: "Giăng 14:27",
    description: "Chế tác từ đất sét nung ở nhiệt độ cao 1280°C đảm bảo an toàn tuyệt đối. Cầm đầm tay với men mờ satin cream ấm áp, mang lời chúc bình an trọn vẹn mỗi khi thưởng thức ngụm trà sớm.",
    highlights: ["Gốm tráng men mờ thủ công", "Dung tích 350ml lý tưởng", "Chịu nhiệt lò vi sóng và máy rửa", "Hộp quà Kraft thân thiện"],
    slug: "ly-su-shalom"
  }
];

export const SHOWCASE_CARDS = [
  {
    id: "msg-1",
    label: "THÔNG ĐIỆP",
    title: "JESUS IS MY SAVIOR NOT MY RELIGION",
    scripture: "Đức Chúa Jêsus phán rằng: Ta là đường đi, chân lý và sự sống. Chẳng bởi Ta thì không ai được đến cùng Cha.",
    reference: "Giăng 14:6",
    significance: "Không phải là những nghi thức cứng nhắc, mà là một mối tương giao sống động, ấm áp và chân thật giữa mỗi chúng ta với Đấng Cứu Chuộc mỗi ngày.",
    color: "from-amber-500/10 to-transparent",
    accent: "#C5A880"
  },
  {
    id: "msg-2",
    label: "MỤC ĐÍCH",
    title: "GOD FIRST",
    scripture: "Nhưng trước hết hãy tìm kiếm nước Đức Chúa Trời và sự công bình của Ngài, thì Ngài sẽ cho thêm các ngươi mọi điều ấy nữa.",
    reference: "Ma-thi-ơ 6:33",
    significance: "Đặt Chúa lên hàng ưu tiên trong quyết định, công việc, gu thẩm mỹ và cách đối đãi với mọi người chung quanh.",
    color: "from-emerald-500/10 to-transparent",
    accent: "#5B6E57"
  },
  {
    id: "msg-3",
    label: "ĐỨC TIN",
    title: "HIS WAY IS BETTER",
    scripture: "Đức Giê-hô-va phán: Vì Ta biết ý tưởng Ta nghĩ đối cùng các ngươi, là ý tưởng bình an, không phải tai họa, để cho các ngươi được sự trông cậy trong lúc cuối cùng.",
    reference: "Giê-rê-mi 29:11",
    significance: "Dù hành trình phía trước có những khúc quanh khó hiểu, hãy vững lòng tin rằng đường lối của Chúa luôn trọn vẹn và tốt lành hơn mọi toan tính của loài người.",
    color: "from-blue-500/10 to-transparent",
    accent: "#0B1B3D"
  },
  {
    id: "msg-4",
    label: "SỨ MỆNH",
    title: "SALT & LIGHT",
    scripture: "Sự sáng các ngươi hãy soi trước mặt người ta như vậy, đặng họ thấy những việc lành của các ngươi và ngợi khen Cha các ngươi ở trên trời.",
    reference: "Ma-thi-ơ 5:16",
    significance: "Là hương vị đậm đà và ánh sáng soi rọi qua chính lối sống tử tế, phục vụ và lan tỏa tình yêu thương đến nơi mình bước đến.",
    color: "from-purple-500/10 to-transparent",
    accent: "#7C8B74"
  }
];

export const BRAND_VALUES = [
  {
    number: "01",
    title: "FAITH",
    subtitle: "Sống với điều mình tin",
    description: "Đức tin không gói gọn trong bốn bức tường giáo đường ngày Chúa Nhật. Đó là hơi thở, là cách ta thức dậy, đối xử với tha nhân và mang chân lý vào từng giờ làm việc đời thường."
  },
  {
    number: "02",
    title: "PURPOSE",
    subtitle: "Mỗi sản phẩm đều có một câu chuyện",
    description: "Không có câu chữ hay họa tiết nào được đặt để một cách vô nghĩa. Mỗi thiết kế tại Manna đều cưu mang một đoạn Kinh Thánh, một lời chứng đức tin sâu sắc."
  },
  {
    number: "03",
    title: "QUALITY",
    subtitle: "Chú trọng trải nghiệm & từng chi tiết",
    description: "Dâng cho Chúa điều tốt nhất. Chúng tôi kỹ lưỡng từ mật độ sợi cotton, đường chỉ may cuộn mép đến chất liệu giấy ngà bảo vệ thị lực và đóng gói chống sốc an toàn."
  },
  {
    number: "04",
    title: "COMMUNITY",
    subtitle: "Kết nối những người cùng chia sẻ đức tin",
    description: "Manna là nơi các bạn trẻ Cơ Đốc tìm thấy tiếng nói thẩm mỹ đồng điệu, tự hào bày tỏ niềm tin và trở thành nguồn khích lệ lớn cho cộng đồng xung quanh."
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    quote: "Chiếc áo thun Salt & Light form dáng rất sang, chất vải dày dặn và mát mẻ. Mặc đi làm hay đi nhóm thanh niên đều nhận được rất nhiều lời khen và cơ hội chia sẻ về Chúa.",
    name: "Thảo Vy",
    location: "TP. Hồ Chí Minh",
    role: "Hội Thánh Lời Sự Sống",
    product: "Áo Thun 'Salt & Light'",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 2,
    quote: "Cuốn sổ tay bìa da nâu thật sự làm tôi xúc động khi mở hộp. Từng trang giấy ngà thơm mùi mực mới, viền dưới có in những câu Kinh Thánh giúp tôi tập trung cầu nguyện mỗi sáng.",
    name: "Quốc Tuấn",
    location: "Hà Nội",
    role: "Kiến Trúc Sư · Trưởng Ban Giới Trẻ",
    product: "Sổ Tĩnh Nguyện Da Nâu",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 3,
    quote: "Mình mua set quà ly sứ Shalom và móc khóa Olive gửi tặng bạn thân nhân ngày chịu phép Báp-têm. Bạn mình rơi nước mắt vì cách Manna đóng gói tinh tế và tấm thiệp viết tay chu đáo.",
    name: "Minh Trang",
    location: "Đà Nẵng",
    role: "Nhà Thiết Kế",
    product: "Set Quà Tặng Shalom",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
  }
];

export const LIFESTYLE_GALLERY = [
  {
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
    caption: "Bình an trong buổi tĩnh nguyện sớm",
    tag: "MORNING DEVOTION"
  },
  {
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop",
    caption: "Cùng nhau chia sẻ và hiệp một",
    tag: "COMMUNITY"
  },
  {
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=800&auto=format&fit=crop",
    caption: "Phong cách tối giản, thông điệp vĩnh cửu",
    tag: "MINIMAL APPAREL"
  },
  {
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800&auto=format&fit=crop",
    caption: "Lời Chúa soi đường cho mọi dự định",
    tag: "STUDY & REFLECT"
  }
];

export const SCRIPTURE_TABS = [
  {
    verse: "Mọi sự anh em làm, hãy làm với lòng yêu thương.",
    reference: "1 Cô-rinh-tô 16:14",
    context: "Tình yêu thương là nền tảng tối thượng cho mọi hành động, sáng tạo và đối đãi giữa người với người."
  },
  {
    verse: "Các ngươi là sự sáng của thế gian. Một cái thành ở trên núi thì không khi nào khuất được.",
    reference: "Ma-thi-ơ 5:14",
    context: "Sống tỏa sáng không phải để tôn vinh chính mình, mà để phản chiếu ánh sáng và vẻ đẹp của Đấng Tạo Hóa."
  },
  {
    verse: "Chớ lo phiền điều gì, nhưng trong mọi sự hãy dùng lời cầu nguyện, nài xin, và tạ ơn mà trình các điều cầu xin của mình cho Đức Chúa Trời.",
    reference: "Phi-líp 4:6",
    context: "Sự bình an của Đức Chúa Trời vượt quá mọi sự hiểu biết sẽ gìn giữ lòng và ý tưởng của chúng ta."
  }
];
