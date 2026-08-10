export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "goi-y-qua-tang-le-bap-tem",
    title: "Gợi ý 5 món quà tặng Lễ Báp-têm ý nghĩa và thiết thực nhất",
    excerpt: "Lễ Báp-têm là một cột mốc đức tin quan trọng. Chọn một món quà ý nghĩa không chỉ là lời chúc phước mà còn là sự đồng hành trên linh trình của người nhận.",
    coverImage: "https://images.unsplash.com/photo-1544413660-299165566b1d?q=80&w=800&auto=format&fit=crop", // Phong cách aesthetic giống Pinterest
    author: "Manna Team",
    publishedAt: "2024-03-15T08:00:00Z",
    tags: ["Quà tặng", "Lễ Báp-têm", "Đức tin"],
    content: `
      <p class="lead">Lễ Báp-têm (Chịu phép tem) là một trong những cột mốc thiêng liêng và quan trọng nhất trong cuộc đời của một Cơ Đốc nhân. Việc chọn lựa một món quà để chúc mừng sự kiện này đôi khi khiến nhiều người băn khoăn. Món quà không chỉ cần đẹp mà còn phải mang giá trị thuộc linh sâu sắc.</p>
      
      <h2>1. Kinh Thánh bọc da cao cấp</h2>
      <img src="https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=800&auto=format&fit=crop" alt="Kinh Thánh" class="rounded-xl w-1/3 md:w-1/4 float-right ml-6 mb-4 object-cover aspect-square shadow-sm" />
      <p>Không có món quà nào ý nghĩa hơn Lời Chúa. Một cuốn Kinh Thánh bọc da thật, được khắc tên người nhận cùng ngày làm Báp-têm sẽ là món quà vô giá đồng hành cùng họ suốt cuộc đời. Bạn có thể chọn các bản dịch hiện đại, dễ hiểu hoặc Kinh Thánh học tập (Study Bible) để giúp họ đào sâu Lời Chúa.</p>

      <h2>2. Sổ tay ghi chép bài giảng (Sermon Notes)</h2>
      <p>Một cuốn sổ tay được thiết kế chuyên biệt để ghi chép bài giảng Chúa Nhật, với các câu gốc khích lệ ở mỗi trang. Đây là công cụ đắc lực giúp tín hữu mới hình thành thói quen kỷ luật thuộc linh và ghi nhớ Lời Chúa mỗi ngày.</p>

      <h2>3. Dây chuyền Thánh giá bạc hoặc vàng</h2>
      <p>Thập tự giá là biểu tượng của tình yêu thương và sự cứu rỗi. Một sợi dây chuyền Thánh giá thiết kế tinh tế không chỉ là trang sức mà còn là lời nhắc nhở hằng ngày về ân điển cứu rỗi của Chúa Giê-xu.</p>

      <h2>4. Tranh treo tường Câu gốc</h2>
      <p>Những bức tranh canvas in các câu Kinh Thánh khích lệ (như Giê-rê-mi 29:11 hoặc Thi Thiên 23) sẽ giúp trang trí không gian sống và mang lại sự bình an cho ngôi nhà. Mỗi khi nhìn lên, họ sẽ được nhắc nhở về sự tể trị của Chúa.</p>

      <h2>5. Ly sứ in thông điệp Cơ Đốc</h2>
      <p>Một món quà thiết thực mỗi ngày! Chiếc ly sứ in câu Kinh Thánh hoặc thông điệp ý nghĩa sẽ là lời chào buổi sáng tràn đầy năng lượng và bình an từ Chúa trước khi họ bắt đầu một ngày làm việc học tập.</p>

      <p><strong>Lời kết:</strong> Dù bạn chọn món quà nào, hãy đính kèm một tấm thiệp viết tay với những lời cầu nguyện chân thành nhất của bạn dành cho họ. Sự hiện diện và lời cầu thay của bạn mới chính là món quà quý giá nhất trong ngày lễ đặc biệt này.</p>
    `
  },
  {
    id: "2",
    slug: "top-5-sach-boi-linh-nen-doc-nam-2024",
    title: "Top 5 sách bồi linh Cơ Đốc nên đọc năm 2024 để vững vàng Đức Tin",
    excerpt: "Giữa nhịp sống hối hả, việc dành thời gian tĩnh nguyện và đọc sách bồi linh là cách tốt nhất để nuôi dưỡng tâm linh. Cùng Manna Store điểm qua 5 tựa sách đáng đọc nhất.",
    coverImage: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=800&auto=format&fit=crop",
    author: "Manna Team",
    publishedAt: "2024-04-02T10:30:00Z",
    tags: ["Sách", "Bồi linh", "Phát triển bản thân"],
    content: `
      <p class="lead">C.S. Lewis từng nói: "Chúng ta đọc để biết rằng mình không cô đơn". Đối với Cơ Đốc nhân, việc đọc sách bồi linh không chỉ mở mang tri thức mà còn giúp tâm linh được lớn lên, sâu nhiệm hơn trong mối tương giao với Chúa.</p>
      
      <h2>1. Biết Chúa (Knowing God) - J.I. Packer</h2>
      <img src="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=800&auto=format&fit=crop" alt="Sách Biết Chúa" class="rounded-xl w-1/3 md:w-1/4 float-right ml-6 mb-4 object-cover aspect-square shadow-sm" />
      <p>Được đánh giá là một trong những cuốn sách Cơ Đốc vĩ đại nhất thế kỷ 20, "Biết Chúa" đưa người đọc vào một hành trình khám phá bản tính, thuộc tính và ân điển của Đức Chúa Trời. Cuốn sách không chỉ cung cấp kiến thức thần học mà còn thôi thúc lòng khao khát được thờ phượng Ngài.</p>

      <h2>2. Theo Dấu Chân Chúa (In His Steps) - Charles Sheldon</h2>
      <p>Mặc dù là một tác phẩm kinh điển, thông điệp của cuốn sách vẫn còn nguyên giá trị. Câu hỏi "Chúa Giê-xu sẽ làm gì?" (WWJD) vang vọng qua từng trang sách, thách thức mỗi chúng ta sống một đời sống dấn thân thực sự giữa thế giới hiện đại.</p>

      <h2>3. Khám Phá Mục Đích Sống (The Purpose Driven Life) - Rick Warren</h2>
      <p>Cuốn sách bán chạy nhất mọi thời đại này giúp bạn trả lời câu hỏi cốt lõi: "Tôi có mặt trên đời này để làm gì?". Hành trình 40 ngày trong sách sẽ giúp bạn căn chỉnh lại cuộc đời mình theo đúng kế hoạch yêu thương của Đức Chúa Trời.</p>

      <h2>4. Cơ Đốc Giáo Đơn Thuần (Mere Christianity) - C.S. Lewis</h2>
      <p>Một kiệt tác hộ giáo giải thích những chân lý cốt lõi của niềm tin Cơ Đốc một cách logic, sâu sắc nhưng lại rất dễ hiểu. Đây là cuốn sách tuyệt vời để củng cố nền tảng đức tin của chính bạn hoặc làm quà tặng cho những người đang tìm hiểu về Chúa.</p>

      <h2>5. Bước Đi Trong Sự Bình An (Walking in Peace)</h2>
      <p>Cuốn sách tĩnh nguyện tập trung vào việc tìm kiếm sự bình an của Chúa giữa một thế giới đầy biến động, lo âu và căng thẳng. Những bài học ngắn gọn nhưng thấm thía sẽ là "bánh ma-na" nuôi dưỡng tâm linh bạn mỗi buổi sáng.</p>

      <p><strong>Manna Store</strong> tự hào cung cấp nhiều đầu sách bồi linh chất lượng. Đừng để năm 2024 trôi qua mà không có thêm một người "bạn tâm giao" trên kệ sách của bạn nhé!</p>
    `
  },
  {
    id: "3",
    slug: "y-nghia-cac-bieu-tuong-co-doc",
    title: "Giải mã ý nghĩa sâu sắc của 5 Biểu tượng Cơ Đốc giáo phổ biến",
    excerpt: "Bạn thường thấy hình ảnh con cá, thập tự giá hay mỏ neo trên các món đồ Cơ Đốc, nhưng bạn đã hiểu hết ý nghĩa thần học sâu xa ẩn sau những biểu tượng này chưa?",
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop", // Sách bồi linh
    author: "Manna Team",
    publishedAt: "2024-04-18T14:15:00Z",
    tags: ["Kiến thức", "Biểu tượng", "Văn hóa"],
    content: `
      <p class="lead">Từ những thế kỷ đầu tiên, khi Hội Thánh còn bị bắt bớ, các tín hữu Cơ Đốc đã sử dụng các biểu tượng bí mật để nhận diện nhau và truyền đạt thông điệp Phúc Âm. Ngày nay, những biểu tượng này đã trở thành một phần không thể thiếu trong nghệ thuật, kiến trúc và các sản phẩm quà tặng Cơ Đốc.</p>
      
      <h2>1. Thập Tự Giá (The Cross)</h2>
      <img src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=800&auto=format&fit=crop" alt="Thập Tự Giá" class="rounded-xl w-1/3 md:w-1/4 float-right ml-6 mb-4 object-cover aspect-square shadow-sm" />
      <p>Đây là biểu tượng trung tâm và được biết đến nhiều nhất. Thời La Mã, thập tự giá là công cụ tử hình nhục nhã, nhưng qua sự chết và phục sinh của Chúa Giê-xu, nó đã biến thành biểu tượng của sự hy sinh tối thượng, tình yêu thương vô điều kiện và sự đắc thắng sự chết. Thập tự giá trống (không có tượng Chúa) nhấn mạnh việc Chúa đã sống lại.</p>

      <h2>2. Con Cá (Ichthys)</h2>
      <p>Chữ "Ichthys" trong tiếng Hy Lạp nghĩa là "Con Cá". Đặc biệt, các chữ cái của từ này là cụm từ viết tắt của: "Iēsous Christos, Theou Yios, Sōtēr" (Chúa Giê-xu Christ, Con Đức Chúa Trời, Đấng Cứu Thế). Trong thời kỳ đầu, vẽ một hình vòng cung trên cát và người kia vẽ một đường vòng cung cắt ngang tạo thành hình con cá là cách để các tín hữu bí mật nhận ra nhau.</p>

      <h2>3. Chim Bồ Câu (The Dove)</h2>
      <p>Chim bồ câu xuất hiện nhiều lần trong Kinh Thánh. Nổi bật nhất là hình ảnh bồ câu ngậm nhành ô-liu mang tin bình an cho Nô-ê sau cơn đại hồng thủy, và hình ảnh Đức Thánh Linh ngự xuống như chim bồ câu khi Chúa Giê-xu chịu phép báp-têm. Bồ câu tượng trưng cho Đức Thánh Linh, sự bình an, thanh sạch và hy vọng mới.</p>

      <h2>4. Mỏ Neo (The Anchor)</h2>
      <p>Theo Hê-bơ-rơ 6:19, <em>"Chúng ta giữ niềm hy vọng nầy như cái neo của linh hồn, vững vàng và chắc chắn"</em>. Mỏ neo là biểu tượng của sự vững chãi, an toàn và niềm hy vọng không lay chuyển của Cơ Đốc nhân vào lời hứa của Chúa, dù phải đối mặt với "sóng to gió lớn" của cuộc đời.</p>

      <h2>5. Con Chiên (The Lamb)</h2>
      <p>Chúa Giê-xu được Giăng Báp-tít xưng nhận là <em>"Chiên Con của Đức Chúa Trời, là Đấng cất tội lỗi thế gian đi"</em> (Giăng 1:29). Biểu tượng Chiên Con (thường cầm một lá cờ chiến thắng) nhắc nhở chúng ta về sự hy sinh chuộc tội trọn vẹn của Chúa và sự đắc thắng khải hoàn của Ngài.</p>

      <p>Hiểu rõ ý nghĩa của các biểu tượng giúp chúng ta càng trân trọng hơn đức tin của mình. Khi bạn mang một chiếc vòng cổ hình cá Ichthys hay tặng một bức tranh có hình mỏ neo, bạn đang trao đi một thông điệp vô cùng mạnh mẽ.</p>
    `
  }
];
