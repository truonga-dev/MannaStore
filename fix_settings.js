const fs = require("fs");
const file = "src/app/admin/(dashboard)/settings/SettingsClient.tsx";
let content = fs.readFileSync(file, "utf8");

content = content.replace(/C?a hàng s?n ph?m Co Ð c - M?c  ?c tin vào cu"c s ng\./g, "C?a hàng s?n ph?m Co Ð?c - M?c d?c tin vào cu?c s?ng.");
content = content.replace(/Cài  ?t H! th ng/g, "Cài d?t H? th?ng");
content = content.replace(/Ði?m thuxng/g, "Ði?m thu?ng");
content = content.replace(/Chuy?n kho?n QR \(SePay\)/g, "Chuy?n kho?n QR (SePay)");
content = content.replace(/T?  "ng xác nh?n thanh toán qua SePay Webhook b?ng mã QR  "ng\./g, "T? d?ng xác nh?n thanh toán qua SePay Webhook b?ng mã QR d?ng.");
content = content.replace(/Dùng  ? k?t n i v:i tài kho?n SePay c?a b?n  ? l?y l9ch s? giao d9ch\./g, "Dùng d? k?t n?i v?i tài kho?n SePay c?a b?n d? l?y l?ch s? giao d?ch.");
content = content.replace(/Giao hàng & V?n chuy?n/g, "Giao hàng & V?n chuy?n");
content = content.replace(/Phí v?n chuy?n m?c  9nh áp d?ng cho t?t c?  on hàng n?u không tích h?p hãng v?n chuy?n\./g, "Phí v?n chuy?n m?c d?nh áp d?ng cho t?t c? don hàng n?u không tích h?p hãng v?n chuy?n.");
content = content.replace(/Ngu?ng mi&n phí v?n chuy?n \(VND\)/g, "Ngu?ng mi?n phí v?n chuy?n (VND)");
content = content.replace(/Ðon hàng có t"ng tr9 giá trên m?c này s?  u?c mi&n phí v?n chuy?n\. Ð?t 0  ? t?t\./g, "Ðon hàng có t?ng tr? giá trên m?c này s? du?c mi?n phí v?n chuy?n. Ð?t 0 d? t?t.");
content = content.replace(/G?i email thông báo cho Admin khi có khách  ?t hàng m:i\./g, "G?i email thông báo cho Admin khi có khách d?t hàng m?i.");
content = content.replace(/G?i email nh?c nhx khi s?n ph?m có t n kho du:i 10\./g, "G?i email nh?c nh? khi s?n ph?m có t?n kho du?i 10.");
content = content.replace(/Khách hàng thân thi?t & Ði?m thuxng/g, "Khách hàng thân thi?t & Ði?m thu?ng");
content = content.replace(/Kích ho?t tích  i?m/g, "Kích ho?t tích di?m");
content = content.replace(/Cho phép khách hàng tích luy và s? d?ng  i?m thuxng khi mua s?m\./g, "Cho phép khách hàng tích luy và s? d?ng di?m thu?ng khi mua s?m.");
content = content.replace(/Tích luy \(VND = 1 Ði?m\)/g, "Tích luy (VND = 1 Ði?m)");
content = content.replace(/Ví d?: 100,000 VND = 1 Ði?m/g, "Ví d?: 100,000 VND = 1 Ði?m");
content = content.replace(/Quy  "i \(1 Ði?m = VND\)/g, "Quy d?i (1 Ði?m = VND)");
content = content.replace(/Ví d?: 1 Ði?m = 1,000 VND gi?m giá/g, "Ví d?: 1 Ði?m = 1,000 VND gi?m giá");
content = content.replace(/Dùng  ? theo dõi chuy?n  "i qu?ng cáo t? Facebook\/Instagram\./g, "Dùng d? theo dõi chuy?n d?i qu?ng cáo t? Facebook/Instagram.");
content = content.replace(/Dùng  ? theo dõi chuy?n  "i qu?ng cáo t? TikTok\./g, "Dùng d? theo dõi chuy?n d?i qu?ng cáo t? TikTok.");
content = content.replace(/Các tính nEng SEO & Chia s? t?  "ng/g, "Các tính nang SEO & Chia s? t? d?ng");
content = content.replace(/OpenGraph & Twitter Cards  ã  u?c b?t m?c  9nh\./g, "OpenGraph & Twitter Cards dã du?c b?t m?c d?nh.");
content = content.replace(/Nút chia s? m?ng xã h"i \(Facebook, Zalo\)  ã tích h?p trong trang S?n ph?m\./g, "Nút chia s? m?ng xã h?i (Facebook, Zalo) dã tích h?p trong trang S?n ph?m.");

fs.writeFileSync(file, content, "utf8");

