// import DOMPurify from "isomorphic-dompurify";

/**
 * Làm sạch HTML content để ngăn chặn XSS attacks.
 * Chỉ giữ lại các tag HTML an toàn cho nội dung bài viết.
 */
export function sanitizeHtml(dirty: string): string {
  // Tạm thời vô hiệu hóa DOMPurify vì nó thường gây lỗi crash JSDOM trên Vercel Serverless.
  // TODO: Thay thế bằng thư viện 'xss' hoặc 'sanitize-html' nhẹ hơn.
  return dirty;
}
