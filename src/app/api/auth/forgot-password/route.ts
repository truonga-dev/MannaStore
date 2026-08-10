import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import { sendPasswordResetEmail } from "@/lib/email";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ message: "Vui lòng cung cấp email." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Don't leak if the user exists or not, but return success anyway to prevent enumeration
      return NextResponse.json({ message: "Nếu email tồn tại trong hệ thống, chúng tôi đã gửi hướng dẫn đặt lại mật khẩu." });
    }

    // Generate a unique token
    const token = crypto.randomBytes(32).toString("hex");
    
    // Expires in 1 hour
    const expires = new Date(Date.now() + 60 * 60 * 1000);

    // Save token to database
    await prisma.verificationToken.deleteMany({
      where: { identifier: email }
    });

    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires,
      },
    });

    // Send the email
    const emailResult = await sendPasswordResetEmail(email, token);

    if (!emailResult.success) {
      console.error("Failed to send email:", emailResult.error);
    }

    return NextResponse.json({ message: "Nếu email tồn tại trong hệ thống, chúng tôi đã gửi hướng dẫn đặt lại mật khẩu." });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ message: "Có lỗi xảy ra, vui lòng thử lại sau." }, { status: 500 });
  }
}
