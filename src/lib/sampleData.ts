export const SAMPLE_PRODUCTS = [
  {
    id: "prod-1",
    name: 'Ly Sứ "Shalom"',
    slug: 'ly-su-shalom',
    description: 'Ly sứ tráng men mờ cao cấp với dòng chữ Shalom (Bình an). Thiết kế tối giản tinh tế mang lại cảm giác thư thái cho mỗi buổi sáng.\n\n• Chất liệu: Sứ cao cấp chịu nhiệt tốt.\n• Dung tích: 350ml, hoàn hảo cho cà phê hoặc trà.\n• An toàn khi dùng với lò vi sóng và máy rửa chén.\n\nHãy để sự bình an của Chúa ở cùng bạn trong từng khoảnh khắc nhỏ nhất.',
    imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=800&auto=format&fit=crop',
    categoryId: 'ly-coc',
    categoryName: 'Ly & Cốc',
    variants: [{ id: "var-1", price: 120000, size: "Freesize", color: "Trắng" }],
    createdAt: new Date().toISOString()
  },
  {
    id: "prod-2",
    name: 'Áo Hoodie "Grace"',
    slug: 'ao-hoodie-grace',
    description: 'Áo hoodie form rộng thoải mái với thông điệp "Grace" (Ân Điển) được thêu 3D tỉ mỉ. Phù hợp cho những ngày se lạnh hoặc phong cách streetwear hàng ngày.\n\n• Chất liệu: Nỉ bông cotton 100% dày dặn, không xù lông.\n• Form dáng: Oversize thời thượng, nam nữ đều mặc đẹp.\n• Chi tiết: Túi bụng rộng rãi, nón chần 2 lớp đứng form.\n\nMột lời nhắc nhở nhẹ nhàng về ân điển luôn dư dật mỗi ngày.',
    imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop',
    categoryId: 'ao-hoodie',
    categoryName: 'Hoodie',
    variants: [{ id: "var-2", price: 350000, size: "Freesize", color: "Đen" }],
    createdAt: new Date().toISOString()
  },
  {
    id: "prod-3",
    name: 'Túi Tote "Faith"',
    slug: 'tui-tote-faith',
    description: 'Túi vải Canvas thân thiện với môi trường, thiết kế quai xách chắc chắn, tiện lợi để mang theo Kinh Thánh, sổ tay hay laptop đi học, đi làm.\n\n• Chất liệu: Canvas mộc tự nhiên, độ bền cao.\n• Kích thước: 35x40cm, vừa vặn laptop 14 inch.\n• Khóa kéo an toàn và túi con tiện lợi bên trong.\n\nMang theo đức tin (Faith) của bạn đi muôn nơi cùng chiếc túi phong cách này.',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop',
    categoryId: 'phu-kien',
    categoryName: 'Phụ kiện',
    variants: [{ id: "var-3", price: 150000, size: "Freesize", color: "Kem" }],
    createdAt: new Date().toISOString()
  },
  {
    id: "prod-4",
    name: 'Sổ Tay Cầu Nguyện',
    slug: 'so-tay-cau-nguyen',
    description: 'Sổ tay bìa da PU cao cấp thiết kế riêng để ghi chú bài giảng, lời chứng và những lời cầu nguyện cá nhân.\n\n• Kích thước: A5 (14.8 x 21 cm) nhỏ gọn.\n• Chất giấy: Định lượng 100gsm chống thấm mực, màu ngà bảo vệ mắt.\n• Bao gồm 200 trang có in sẵn các câu Kinh Thánh khích lệ ở viền dưới.\n\nNgười bạn đồng hành không thể thiếu trong giờ tĩnh nguyện mỗi ngày.',
    imageUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=800&auto=format&fit=crop',
    categoryId: 'sach',
    categoryName: 'Sách',
    variants: [{ id: "var-4", price: 95000, size: "Freesize", color: "Nâu" }],
    createdAt: new Date().toISOString()
  },
  {
    id: "prod-5",
    name: 'Áo Thun "Salt & Light"',
    slug: 'ao-thun-salt',
    description: 'Áo thun cotton 100% thoáng mát với thiết kế Typography hiện đại lấy cảm hứng từ câu Kinh Thánh Ma-thi-ơ 5:13-14.\n\n• Chất liệu: Cotton 2 chiều co giãn, thấm hút mồ hôi cực tốt.\n• Công nghệ in: In lụa sắc nét, không bong tróc sau nhiều lần giặt.\n• Màu sắc: Basic dễ phối đồ.\n\nHãy là muối và ánh sáng cho thế gian qua chính phong cách sống và gu thời trang của bạn.',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop',
    categoryId: 'ao-thun',
    categoryName: 'Áo Thun',
    variants: [{ id: "var-5", price: 220000, size: "L", color: "Trắng" }],
    createdAt: new Date().toISOString()
  },
  {
    id: "prod-6",
    name: 'Khung Tranh Châm Ngôn',
    slug: 'khung-tranh-cham-ngon',
    description: 'Khung tranh để bàn gỗ sồi trang trí góc làm việc, mang đến nguồn cảm hứng và sức mạnh từ Lời Chúa mỗi khi bạn cảm thấy mệt mỏi.\n\n• Chất liệu: Gỗ sồi tự nhiên, mặt kính mica trong suốt an toàn.\n• Hình ảnh: In canvas chất lượng cao, chống phai màu.\n• Phù hợp trang trí bàn làm việc, kệ sách hoặc làm quà tặng ý nghĩa.\n\nLời Chúa là ngọn đèn cho chân tôi, ánh sáng cho đường lối tôi.',
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop',
    categoryId: 'qua-tang',
    categoryName: 'Quà Tặng',
    variants: [{ id: "var-6", price: 180000, size: "A5", color: "Gỗ" }],
    createdAt: new Date().toISOString()
  },
  {
    id: "prod-7",
    name: 'Mũ Lưỡi Trai "Chosen"',
    slug: 'mu-chosen',
    description: 'Mũ lưỡi trai phong cách dad hat năng động với chữ "Chosen" (Được Chọn) thêu 3D nổi bật. Phụ kiện không thể thiếu cho những buổi dã ngoại, cắm trại.\n\n• Chất liệu: Vải kaki đũi mềm mại, đứng form.\n• Khóa dán/khóa đồng phía sau dễ dàng điều chỉnh kích thước.\n• Thiết kế unisex phù hợp cho cả nam và nữ.\n\nBạn là dòng giống được lựa chọn, là chức thầy tế lễ nhà vua.',
    imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop',
    categoryId: 'phu-kien',
    categoryName: 'Phụ kiện',
    variants: [{ id: "var-7", price: 130000, size: "Freesize", color: "Xám" }],
    createdAt: new Date().toISOString()
  },
  {
    id: "prod-8",
    name: 'Móc Khóa Gỗ Olive',
    slug: 'moc-khoa-olive',
    description: 'Móc khóa thủ công làm từ gỗ cây Olive thật mang về từ vùng Đất Thánh Israel. Biểu tượng Thánh giá được khắc laser sắc nét.\n\n• Sản phẩm handmade 100%, mỗi chiếc có vân gỗ độc nhất.\n• Móc kim loại không gỉ cao cấp.\n• Món quà nhỏ gọn mang ý nghĩa tâm linh sâu sắc dành tặng bạn bè, người thân hoặc ban ngành trong Hội Thánh.',
    imageUrl: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=800&auto=format&fit=crop',
    categoryId: 'moc-khoa',
    categoryName: 'Móc Khóa',
    variants: [{ id: "var-8", price: 45000, size: "Nhỏ", color: "Nâu" }],
    createdAt: new Date().toISOString()
  },
  {
    id: "prod-9",
    name: 'Đồng Hồ Gỗ Minimalist',
    slug: 'dong-ho-minimalist',
    description: 'Đồng hồ để bàn phong cách tối giản Bắc Âu, chế tác từ gỗ sồi tự nhiên. Mặt đồng hồ không số, nổi bật với biểu tượng Thánh giá tinh tế.\n\n• Kim trôi tĩnh âm, hoàn toàn không gây tiếng ồn.\n• Sử dụng 1 pin AA phổ thông.\n• Điểm nhấn tuyệt vời cho không gian phòng khách hoặc góc tĩnh nguyện.\n\nMọi sự đều có thì giờ, mọi việc dưới trời đều có định kỳ.',
    imageUrl: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?q=80&w=800&auto=format&fit=crop',
    categoryId: 'dong-ho',
    categoryName: 'Đồng hồ',
    variants: [{ id: "var-9", price: 290000, size: "Tiêu chuẩn", color: "Gỗ sồi" }],
    createdAt: new Date().toISOString()
  },
  {
    id: "prod-10",
    name: 'Kinh Thánh Bìa Da',
    slug: 'kinh-thanh-bia-da',
    description: 'Kinh Thánh trọn bộ Cựu & Tân Ước (Bản Truyền Thống) với thiết kế bìa da PU cao cấp. Chữ lớn, rõ nét giúp việc đọc Lời Chúa dễ dàng hơn cho mọi lứa tuổi.\n\n• Bìa da PU mềm mại, sang trọng, dập chìm họa tiết.\n• Viền giấy mạ nhũ vàng/bạc chống ẩm mốc.\n• Kèm dây lụa đánh dấu trang tiện dụng.\n\nMón quà vô giá để trang bị thuộc linh cho chính bạn hoặc người thân.',
    imageUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=800&auto=format&fit=crop',
    categoryId: 'sach',
    categoryName: 'Sách',
    variants: [{ id: "var-10", price: 450000, size: "Lớn", color: "Đen" }],
    createdAt: new Date().toISOString()
  }
];

export const CATEGORY_MAP: Record<string, string> = {
  'ao-thun': 'Áo Thun',
  'ao-hoodie': 'Hoodie',
  'moc-khoa': 'Móc Khóa',
  'sach': 'Sách',
  'ly-coc': 'Ly & Cốc',
  'dong-ho': 'Đồng hồ',
  'qua-tang': 'Quà Tặng',
  'phu-kien': 'Phụ kiện',
  'thoi-trang': 'Thời Trang'
};
