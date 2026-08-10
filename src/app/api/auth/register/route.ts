import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { headers } from "next/headers";
import dns from "dns/promises";

// Danh sách domain rác phổ biến
const BLOCKED_DOMAINS = [
  "tempmail.com", "10minutemail.com", "guerrillamail.com", "yopmail.com", 
  "mailinator.com", "getnada.com", "dropmail.me", "maildrop.cc", "dispostable.com"
];

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Vui lòng điền đầy đủ thông tin." },
        { status: 400 }
      );
    }

    // --- 1. RATE LIMITING ---
    const ip = (await headers()).get("x-forwarded-for") || "unknown";
    if (ip !== "unknown") {
      const tenMinsAgo = new Date(Date.now() - 10 * 60 * 1000);
      const recentRegisters = await prisma.rateLimit.count({
        where: { ip, action: "REGISTER", createdAt: { gte: tenMinsAgo } }
      });
      if (recentRegisters >= 3) {
        return NextResponse.json(
          { message: "Bạn đã đăng ký quá nhiều lần. Vui lòng thử lại sau 10 phút." },
          { status: 429 }
        );
      }
    }
    // -----------------------

    // --- 2. THROWAWAY EMAIL CHECK ---
    const domain = email.split("@")[1]?.toLowerCase();
    if (!domain) {
      return NextResponse.json({ message: "Email không hợp lệ." }, { status: 400 });
    }

    if (BLOCKED_DOMAINS.includes(domain)) {
      return NextResponse.json(
        { message: "Email ảo không được chấp nhận. Vui lòng dùng email thật." },
        { status: 400 }
      );
    }
    // -----------------------

    // --- 3. DNS MX RECORD CHECK ---
    try {
      const mxRecords = await dns.resolveMx(domain);
      if (!mxRecords || mxRecords.length === 0) {
        return NextResponse.json(
          { message: "Tên miền email không tồn tại hoặc không thể nhận thư." },
          { status: 400 }
        );
      }
    } catch (dnsError) {
      return NextResponse.json(
        { message: "Không thể xác minh email. Vui lòng kiểm tra lại." },
        { status: 400 }
      );
    }
    // -----------------------

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email này đã được sử dụng." },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
    });

    if (ip !== "unknown") {
      await prisma.rateLimit.create({ data: { ip, action: "REGISTER" } });
    }

    return NextResponse.json(
      { message: "Đăng ký thành công!", user: { id: user.id, email: user.email } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Lỗi khi đăng ký:", error);
    return NextResponse.json(
      { message: "Đã có lỗi xảy ra. Vui lòng thử lại." },
      { status: 500 }
    );
  }
}
