# Mana Store - Nền tảng Thương Mại Điện Tử Sản Phẩm Cơ Đốc

Mana Store là một hệ thống thương mại điện tử (E-commerce) hoàn chỉnh, được xây dựng trên nền tảng công nghệ hiện đại, tập trung vào việc mang lại trải nghiệm mua sắm nhanh chóng, mượt mà và giao diện chuẩn SEO.

## 🚀 Công Nghệ Sử Dụng

- **Frontend**: Next.js 14/15 (App Router), React, Tailwind CSS
- **Backend**: Next.js API Routes, Server Actions
- **Cơ sở dữ liệu**: PostgreSQL (Supabase) kết hợp với Prisma ORM
- **Xác thực**: NextAuth.js (Hỗ trợ phân quyền RBAC: Admin, Staff, User)
- **Quản lý trạng thái**: Zustand (Giỏ hàng)
- **Thanh toán**: Tích hợp Sepay (Kiểm tra giao dịch tự động qua Webhook)
- **Email**: Nodemailer (Gửi email xác nhận tự động)
- **UI Components**: Lucide React, React Hot Toast, Tailwind Merge

## ✨ Tính Năng Nổi Bật

### 🛒 Dành Cho Khách Hàng (User)
- **Mua sắm linh hoạt**: Duyệt sản phẩm, tìm kiếm, lọc theo danh mục, thêm vào giỏ hàng.
- **Thanh toán thông minh**: Tự động tính phí vận chuyển dựa trên địa chỉ giao hàng (Tỉnh/Thành phố, Quận/Huyện, Phường/Xã).
- **Hệ thống Điểm thưởng (Points System)**: Nhận điểm thưởng khi mua hàng (100,000đ = 10 điểm), sử dụng điểm để đổi quà hoặc thanh toán.
- **Quản lý tài khoản**: Theo dõi lịch sử đơn hàng, cập nhật hồ sơ cá nhân, đổi mật khẩu.
- **Bài viết & Tin tức**: Đọc các nội dung chia sẻ, blog liên quan.

### 🛡 Dành Cho Quản Trị Viên (Admin/Staff)
- **Phân Quyền (RBAC)**:
  - `ADMIN`: Toàn quyền kiểm soát hệ thống (Sản phẩm, Đơn hàng, Khách hàng, Cài đặt, Thống kê, Bài viết, Mã giảm giá).
  - `STAFF`: Quyền hạn giới hạn (Quản lý Sản phẩm, Đơn hàng và Khách hàng).
- **Dashboard Thống Kê**: Theo dõi lượng truy cập trực tiếp (Real-time), IP khách hàng, số lượt xem trang, lượt click và doanh thu.
- **Quản lý Đơn hàng**: Chuyển trạng thái đơn (Chờ xử lý, Đang chuẩn bị hàng, Đang giao, Hoàn thành, Đã hủy). Tự động cập nhật kho hàng và hoàn trả khi hủy.
- **Quản lý Khách hàng**: Tặng/trừ điểm thưởng thủ công, thay đổi quyền hạn người dùng.
- **Quản lý Sản phẩm & Danh mục**: Thêm mới, chỉnh sửa, tải ảnh lên, định giá và kiểm soát tồn kho chi tiết theo thuộc tính.

## 🛠 Cài Đặt Và Chạy Dự Án (Local Development)

### Yêu Cầu Hệ Thống
- Node.js (phiên bản 18+ khuyến nghị)
- Npm hoặc Yarn
- PostgreSQL Database (Khuyến nghị dùng Supabase hoặc Docker)

### Các Bước Cài Đặt

1. **Clone repository về máy:**
   ```bash
   git clone https://github.com/truonga-dev/MannaStore.git
   cd MannaStore
   ```

2. **Cài đặt các gói thư viện (Dependencies):**
   ```bash
   npm install
   ```

3. **Thiết lập biến môi trường:**
   Tạo tệp `.env` tại thư mục gốc và sao chép cấu trúc từ `.env.example` (nếu có) hoặc điền các giá trị như sau:
   ```env
   DATABASE_URL="postgresql://user:password@host:port/database"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   # Các biến SMTP để gửi email
   SMTP_HOST=...
   SMTP_PORT=...
   SMTP_USER=...
   SMTP_PASS=...
   ```

4. **Khởi tạo và đồng bộ Cơ sở dữ liệu:**
   ```bash
   npx prisma generate
   npx prisma db push
   # Hoặc npx prisma migrate dev (nếu sử dụng Migration history)
   ```

5. **Chạy server phát triển:**
   ```bash
   npm run dev
   ```
   *Ứng dụng sẽ khả dụng tại địa chỉ `http://localhost:3000`*

## 📁 Cấu Trúc Thư Mục Chính

```
├── prisma/               # Chứa schema database và cấu hình Prisma ORM
├── public/               # File tĩnh (Hình ảnh, icon,...)
├── src/
│   ├── app/              # Cấu trúc Next.js App Router (Các trang, API, Actions)
│   ├── components/       # Các UI Component tái sử dụng (Layout, UI, Admin,...)
│   ├── hooks/            # Custom React Hooks (useAnalytics,...)
│   ├── lib/              # Thư viện dùng chung (Prisma client, Auth config, Utils,...)
│   └── store/            # Quản lý state toàn cục (Zustand - Giỏ hàng)
```

## 🤝 Đóng Góp (Contributing)
Vui lòng tạo Pull Request hoặc tạo Issue nếu bạn phát hiện lỗi (Bug) hay có đề xuất cải tiến tính năng.

---
*Được phát triển với ♥️ cho Mana Store.*
