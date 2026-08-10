import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json({ message: "Token và mật khẩu mới là bắt buộc." }, { status: 400 });
    }

    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!verificationToken) {
      return NextResponse.json({ message: "Liên kết không hợp lệ hoặc đã được sử dụng." }, { status: 400 });
    }

    if (new Date() > new Date(verificationToken.expires)) {
      return NextResponse.json({ message: "Liên kết đã hết hạn." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user's password
    await prisma.user.update({
      where: { email: verificationToken.identifier },
      data: { passwordHash: hashedPassword },
    });

    // Delete the token
    await prisma.verificationToken.delete({
      where: { token },
    });

    return NextResponse.json({ message: "Đặt lại mật khẩu thành công." });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json({ message: "Có lỗi xảy ra, vui lòng thử lại sau." }, { status: 500 });
  }
}
