import DOMPurify from "isomorphic-dompurify";

/**
 * Làm sạch HTML content để ngăn chặn XSS attacks.
 * Chỉ giữ lại các tag HTML an toàn cho nội dung bài viết.
 */
export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br', 'hr',
      'ul', 'ol', 'li',
      'strong', 'em', 'b', 'i', 'u', 's', 'del', 'ins',
      'a', 'img',
      'blockquote', 'pre', 'code',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'div', 'span',
      'figure', 'figcaption',
      'sub', 'sup',
    ],
    ALLOWED_ATTR: [
      'href', 'target', 'rel',
      'src', 'alt', 'width', 'height',
      'class', 'id', 'style',
      'colspan', 'rowspan',
    ],
    ALLOW_DATA_ATTR: false,
  });
}
