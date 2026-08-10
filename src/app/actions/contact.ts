"use server";

import prisma from "@/lib/prisma";

export async function submitContactMessage(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    if (!data.name || !data.email || !data.subject || !data.message) {
      return { success: false, error: "Vui lòng điền đầy đủ thông tin" };
    }

    await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      },
    });

    return { success: true };
  } catch (error: any) {
    console.error("Error submitting contact message:", error);
    return { success: false, error: "Đã xảy ra lỗi, vui lòng thử lại sau" };
  }
}
