"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcrypt";

export async function addPoints(userId: string, amount: number, description: string) {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("User not found");

    const newPoints = user.points + amount;

    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: { points: newPoints, pointsUpdatedAt: new Date() },
      }),
      prisma.pointTransaction.create({
        data: {
          userId,
          amount,
          type: amount > 0 ? "EARN" : "SPEND",
          description,
        }
      })
    ]);

    revalidatePath("/admin/customers");
    return { success: true };
  } catch (error) {
    console.error("Error modifying points:", error);
    return { success: false, error: "Failed to modify points" };
  }
}

export async function updateUserRole(userId: string, newRole: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
      throw new Error("Unauthorized: Only Admin can change roles");
    }
    
    // Only allow setting to USER, STAFF, ADMIN
    if (!["USER", "STAFF", "ADMIN"].includes(newRole)) {
      throw new Error("Invalid role");
    }

    await prisma.user.update({
      where: { id: userId },
      data: { role: newRole }
    });

    revalidatePath("/admin/customers");
    return { success: true };
  } catch (error: any) {
    console.error("Error updating role:", error);
    return { success: false, error: error.message || "Failed to update role" };
  }
}

export async function updateProfile(data: { name?: string; phone?: string; address?: string; image?: string }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      throw new Error("Unauthorized");
    }

    await prisma.user.update({
      where: { email: session.user.email },
      data,
    });

    revalidatePath("/thong-tin");
    return { success: true };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, error: "Failed to update profile" };
  }
}

export async function changePassword(currentPassword: string, newPassword: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return { success: false, error: "Vui lòng đăng nhập" };
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user || !user.passwordHash) {
      return { success: false, error: "Tài khoản không tồn tại hoặc đăng nhập bằng mạng xã hội" };
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isPasswordValid) {
      return { success: false, error: "Mật khẩu hiện tại không đúng" };
    }

    if (newPassword.length < 6) {
      return { success: false, error: "Mật khẩu mới phải có ít nhất 6 ký tự" };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { email: session.user.email },
      data: { passwordHash: hashedPassword },
    });

    return { success: true };
  } catch (error) {
    console.error("Error changing password:", error);
    return { success: false, error: "Đã xảy ra lỗi hệ thống" };
  }
}
