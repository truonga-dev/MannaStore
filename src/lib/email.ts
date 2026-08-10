import nodemailer from "nodemailer";

// Create reusable transporter
// If you have SMTP credentials, set them in .env:
//   EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS
// Otherwise, this will use Ethereal (a fake SMTP for development)
async function getTransporter() {
  if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  // Development fallback: log email to console, do not throw
  return null;
}

export interface OrderConfirmationData {
  to: string;
  customerName: string;
  orderCode: string;
  totalAmount: number;
  items: {
    name: string;
    quantity: number;
    price: number;
    size?: string | null;
    color?: string | null;
  }[];
  shippingAddress: string;
  paymentMethod: string;
}

const PAYMENT_LABELS: Record<string, string> = {
  MANUAL: "Chuyển khoản ngân hàng",
  COD: "Thanh toán khi nhận hàng",
  VNPAY: "VNPay",
  MOMO: "MoMo",
};

function buildEmailHtml(data: OrderConfirmationData): string {
  const itemsHtml = data.items
    .map(
      (item) => `
    <tr>
      <td style="padding:10px;border-bottom:1px solid #f0f0f0;">
        <strong>${item.name}</strong>
        ${item.size ? `<br/><span style="color:#888;font-size:12px;">Size: ${item.size}</span>` : ""}
        ${item.color ? `<br/><span style="color:#888;font-size:12px;">Màu: ${item.color}</span>` : ""}
      </td>
      <td style="padding:10px;border-bottom:1px solid #f0f0f0;text-align:center;">x${item.quantity}</td>
      <td style="padding:10px;border-bottom:1px solid #f0f0f0;text-align:right;font-weight:600;">
        ${(item.price * item.quantity).toLocaleString("vi-VN")}đ
      </td>
    </tr>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Xác nhận đơn hàng</title></head>
<body style="margin:0;padding:0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;background:#f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.1);">
        
        <!-- HEADER -->
        <tr>
          <td style="background:#0B1B3D;padding:32px;text-align:center;">
            <h1 style="color:#ffffff;font-family:Georgia,serif;font-size:28px;margin:0;letter-spacing:4px;">MANNA</h1>
            <p style="color:rgba(255,255,255,0.6);font-size:11px;letter-spacing:3px;margin:4px 0 0;">STORE</p>
          </td>
        </tr>

        <!-- CONFIRMATION BADGE -->
        <tr>
          <td style="padding:32px;text-align:center;border-bottom:1px solid #f0f0f0;">
            <div style="display:inline-block;background:#f0fdf4;border:2px solid #22c55e;border-radius:50%;width:64px;height:64px;line-height:64px;font-size:28px;margin-bottom:16px;">✓</div>
            <h2 style="color:#111;font-size:22px;margin:0 0 8px;">Đặt hàng thành công!</h2>
            <p style="color:#666;margin:0;font-size:15px;">Xin chào <strong>${data.customerName}</strong>, cảm ơn bạn đã đặt hàng tại Manna Store.</p>
          </td>
        </tr>

        <!-- ORDER INFO -->
        <tr>
          <td style="padding:24px 32px;background:#fafafa;border-bottom:1px solid #f0f0f0;">
            <table width="100%">
              <tr>
                <td>
                  <p style="margin:0;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;">Mã đơn hàng</p>
                  <p style="margin:4px 0 0;font-size:18px;font-weight:700;color:#0B1B3D;letter-spacing:1px;">#${data.orderCode}</p>
                </td>
                <td align="right">
                  <p style="margin:0;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;">Phương thức thanh toán</p>
                  <p style="margin:4px 0 0;font-size:14px;font-weight:600;color:#111;">${PAYMENT_LABELS[data.paymentMethod] || data.paymentMethod}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ORDER ITEMS -->
        <tr>
          <td style="padding:24px 32px;">
            <p style="font-weight:700;font-size:14px;text-transform:uppercase;letter-spacing:1px;color:#888;margin:0 0 16px;">Sản phẩm đã đặt</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              ${itemsHtml}
            </table>
            <table width="100%" style="margin-top:16px;">
              <tr>
                <td style="padding:12px 0;font-weight:700;font-size:16px;">Tổng thanh toán</td>
                <td style="padding:12px 0;font-weight:700;font-size:20px;text-align:right;color:#0B1B3D;">
                  ${data.totalAmount.toLocaleString("vi-VN")}đ
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- SHIPPING ADDRESS -->
        <tr>
          <td style="padding:16px 32px;background:#fafafa;border-top:1px solid #f0f0f0;">
            <p style="font-weight:700;font-size:14px;text-transform:uppercase;letter-spacing:1px;color:#888;margin:0 0 8px;">Địa chỉ giao hàng</p>
            <p style="margin:0;color:#444;line-height:1.6;">${data.shippingAddress}</p>
          </td>
        </tr>

        <!-- MANUAL PAYMENT INSTRUCTIONS -->
        ${data.paymentMethod === "MANUAL" ? `
        <tr>
          <td style="padding:24px 32px;background:#fffbeb;border-top:2px solid #f59e0b;">
            <p style="font-weight:700;font-size:14px;color:#92400e;margin:0 0 12px;">⚠️ Hướng dẫn chuyển khoản</p>
            <p style="margin:0 0 6px;color:#444;font-size:14px;">Ngân hàng: <strong>MB Bank</strong></p>
            <p style="margin:0 0 6px;color:#444;font-size:14px;">Số tài khoản: <strong>${process.env.SEPAY_ACCOUNT_NO || "0123456789"}</strong></p>
            <p style="margin:0 0 6px;color:#444;font-size:14px;">Nội dung CK: <strong>#${data.orderCode}</strong></p>
            <p style="margin:0;color:#444;font-size:14px;">Số tiền: <strong>${data.totalAmount.toLocaleString("vi-VN")}đ</strong></p>
          </td>
        </tr>` : ""}

        <!-- FOOTER -->
        <tr>
          <td style="padding:24px 32px;text-align:center;border-top:1px solid #f0f0f0;">
            <p style="color:#aaa;font-size:12px;margin:0;">Nếu bạn có thắc mắc, hãy liên hệ với chúng tôi.</p>
            <p style="color:#aaa;font-size:12px;margin:8px 0 0;">© 2026 Manna Store — Trang bị đời sống tâm linh.</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function sendOrderConfirmationEmail(data: OrderConfirmationData) {
  try {
    const transporter = await getTransporter();

    if (!transporter) {
      // Development mode: log to console
      console.log("[EMAIL - DEV MODE] Order confirmation would be sent to:", data.to);
      console.log("  Order:", data.orderCode, "| Total:", data.totalAmount);
      return { success: true, dev: true };
    }

    const fromName = "Manna Store";
    const fromEmail = process.env.EMAIL_USER;

    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: data.to,
      subject: `✅ Xác nhận đơn hàng #${data.orderCode} — Manna Store`,
      html: buildEmailHtml(data),
    });

    return { success: true };
  } catch (error) {
    console.error("[EMAIL ERROR]", error);
    // Do NOT throw — email failure should not block order creation
    return { success: false, error: String(error) };
  }
}

export async function sendPasswordResetEmail(email: string, token: string) {
  try {
    const transporter = await getTransporter();
    
    // Default to localhost in dev, or your production URL
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const resetLink = `${baseUrl}/dat-lai-mat-khau?token=${token}`;
    
    if (!transporter) {
      console.log("[EMAIL - DEV MODE] Password reset link for", email, ":");
      console.log(resetLink);
      return { success: true, dev: true };
    }
    
    const fromName = "Manna Store";
    const fromEmail = process.env.EMAIL_USER;
    
    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: email,
      subject: "Yêu cầu đặt lại mật khẩu — Manna Store",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0B1B3D;">Đặt lại mật khẩu của bạn</h2>
          <p>Xin chào,</p>
          <p>Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản liên kết với email này.</p>
          <p>Vui lòng click vào nút bên dưới để tiến hành đặt lại mật khẩu. Liên kết này sẽ hết hạn sau 1 giờ.</p>
          <div style="margin: 30px 0;">
            <a href="${resetLink}" style="background-color: #0B1B3D; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Đặt lại mật khẩu</a>
          </div>
          <p>Nếu nút bấm không hoạt động, bạn có thể copy và dán đường link sau vào trình duyệt:</p>
          <p style="word-break: break-all; color: #666;">${resetLink}</p>
          <p>Nếu bạn không yêu cầu đặt lại mật khẩu, xin vui lòng bỏ qua email này.</p>
          <br/>
          <p>Trân trọng,</p>
          <p><strong>Đội ngũ Manna Store</strong></p>
        </div>
      `
    });
    return { success: true };
  } catch (error) {
    console.error("[EMAIL ERROR]", error);
    return { success: false, error: String(error) };
  }
}
