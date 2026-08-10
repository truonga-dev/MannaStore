# ManaStore Web - E-Commerce Platform

Một nền tảng thương mại điện tử hiện đại, toàn diện được xây dựng bằng **Next.js (App Router)**, **TypeScript**, **Prisma**, và **Tailwind CSS**. Dự án cung cấp đầy đủ các tính năng cho cả người dùng mua sắm và quản trị viên, bao gồm quản lý sản phẩm, giỏ hàng, thanh toán, quản lý đơn hàng, đánh giá, mã giảm giá và hệ thống tích điểm.

---

## 🚀 Tính Năng Nổi Bật

### 🛒 Dành Cho Khách Hàng (Customer)
- **Xác thực người dùng:** Đăng nhập, đăng ký an toàn qua `NextAuth.js`.
- **Duyệt sản phẩm:** Xem danh sách sản phẩm, danh mục, lọc và tìm kiếm.
- **Biến thể sản phẩm:** Hỗ trợ sản phẩm có nhiều biến thể (Kích thước, Màu sắc, Giá tiền khác nhau).
- **Giỏ hàng & Thanh toán:** Quản lý giỏ hàng mượt mà, hỗ trợ nhiều phương thức thanh toán (Thủ công, VNPay, MoMo).
- **Mã giảm giá (Coupon):** Áp dụng mã giảm giá khi thanh toán.
- **Hệ thống tích điểm (Reward Points):** Tích điểm sau khi mua hàng và sử dụng điểm để thanh toán.
- **Quản lý đơn hàng:** Theo dõi trạng thái đơn hàng (Chờ xử lý, Đang chuẩn bị hàng, Đang giao hàng, Hoàn thành, Đã hủy).
- **Đánh giá & Yêu thích:** Đánh giá sản phẩm và lưu sản phẩm vào danh sách yêu thích.
- **Blog/Bài viết:** Đọc tin tức, bài viết được cập nhật từ quản trị viên.

### 🛡️ Dành Cho Quản Trị Viên (Admin Dashboard)
- **Bảng điều khiển (Dashboard):** Xem tổng quan thống kê biểu đồ doanh thu và hoạt động.
- **Quản lý sản phẩm:** Thêm, sửa, xóa sản phẩm và biến thể; tải ảnh lên Cloudinary qua trình soạn thảo Rich Text (Tiptap).
- **Quản lý danh mục:** Tổ chức sản phẩm theo danh mục.
- **Quản lý đơn hàng:** Cập nhật trạng thái đơn hàng, theo dõi chi tiết giao dịch.
- **Quản lý mã giảm giá (Coupon):** Tạo và cấu hình các loại mã giảm giá.
- **Quản lý người dùng:** Xem thông tin, phân quyền, quản lý khách hàng.
- **Quản lý bài viết (Blog):** Trình soạn thảo mạnh mẽ, xuất bản tin tức, cập nhật.

---

## 🛠️ Công Nghệ Sử Dụng

**Frontend:**
- [Next.js](https://nextjs.org/) (App Router, React 19)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://zustand-demo.pmnd.rs/) (Quản lý state)
- [Framer Motion](https://www.framer.com/motion/) (Hiệu ứng animation)
- [Recharts](https://recharts.org/) (Biểu đồ)
- [Tiptap](https://tiptap.dev/) (Rich Text Editor)
- [Lucide React](https://lucide.dev/) (Icons)

**Backend & Database:**
- [Next.js API Routes / Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Prisma](https://www.prisma.io/) (ORM)
- [PostgreSQL](https://www.postgresql.org/) (Cơ sở dữ liệu)
- [NextAuth.js](https://next-auth.js.org/) (Xác thực)
- [Cloudinary](https://cloudinary.com/) (Lưu trữ hình ảnh)
- [Nodemailer](https://nodemailer.com/) (Gửi email)

---

## ⚙️ Hướng Dẫn Cài Đặt

### 1. Yêu cầu hệ thống
- Node.js (phiên bản 18.x trở lên)
- PostgreSQL Database
- Tài khoản Cloudinary (để upload ảnh)

### 2. Cài đặt các gói phụ thuộc
Clone repo và cài đặt thư viện:
```bash
git clone <repository-url>
cd ManaStore_Web
npm install
```

### 3. Cấu hình biến môi trường
Tạo file `.env` ở thư mục gốc của dự án và thêm các biến môi trường sau:
```env
# Database configuration
DATABASE_URL="postgresql://user:password@localhost:5432/manastore"
DIRECT_URL="postgresql://user:password@localhost:5432/manastore"

# NextAuth configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key"

# Cloudinary configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# (Optional) Email configuration for Nodemailer
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
```

### 4. Thiết lập Database
Chạy các lệnh sau để đồng bộ schema database của Prisma và tạo database:
```bash
npx prisma generate
npx prisma db push
```

*(Tùy chọn)* Nếu bạn có dữ liệu mẫu (seed) để tạo tài khoản admin:
```bash
npx prisma db seed
# Hoặc chạy script riêng (vd: npx ts-node scripts/make_admin.ts)
```

### 5. Khởi chạy Server
Khởi động ứng dụng trong môi trường phát triển:
```bash
npm run dev
```
Mở trình duyệt và truy cập [http://localhost:3000](http://localhost:3000).

---

## 📂 Cấu Trúc Thư Mục Chính

```text
ManaStore_Web/
├── prisma/             # Schema của cơ sở dữ liệu Prisma
├── public/             # Tài nguyên tĩnh (ảnh, icon...)
├── scripts/            # Script tiện ích (vd: tạo admin)
├── src/
│   ├── app/            # Next.js App Router (pages, api, actions)
│   │   ├── (store)/    # Giao diện cho khách hàng
│   │   ├── admin/      # Bảng điều khiển Quản trị viên (Dashboard)
│   │   ├── api/        # Các endpoints API
│   │   └── actions/    # Các Next.js Server Actions
│   ├── components/     # Các UI Component tái sử dụng
│   └── lib/            # Các module tiện ích (prisma client, auth, config...)
└── package.json
```

---

## 📜 Các Lệnh Scripts
- `npm run dev`: Chạy server trong môi trường phát triển (development mode)
- `npm run build`: Đóng gói dự án cho môi trường production
- `npm run start`: Chạy server production sau khi đã build xong
- `npm run lint`: Chạy ESLint để kiểm tra lỗi code

---

## 🤝 Đóng Góp (Contributing)
Mọi ý kiến đóng góp, báo lỗi (issues) hoặc pull requests để cải thiện dự án ManaStore đều được hoan nghênh.

## 📄 Giấy Phép (License)
Dự án được bảo vệ dưới giấy phép MIT License.
