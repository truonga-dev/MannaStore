"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createCoupon(data: {
  code: string;
  discountPercentage?: number | null;
  discountAmount?: number | null;
  minOrderValue?: number | null;
  maxUses?: number | null;
  isActive: boolean;
}) {
  try {
    const coupon = await prisma.coupon.create({
      data,
    });
    revalidatePath("/admin/coupons");
    return { success: true, coupon };
  } catch (error) {
    console.error("Error creating coupon:", error);
    return { success: false, error: "Failed to create coupon" };
  }
}

export async function updateCoupon(id: string, data: {
  code: string;
  discountPercentage?: number | null;
  discountAmount?: number | null;
  minOrderValue?: number | null;
  maxUses?: number | null;
  isActive: boolean;
}) {
  try {
    const coupon = await prisma.coupon.update({
      where: { id },
      data,
    });
    revalidatePath("/admin/coupons");
    return { success: true, coupon };
  } catch (error) {
    console.error("Error updating coupon:", error);
    return { success: false, error: "Failed to update coupon" };
  }
}

export async function deleteCoupon(id: string) {
  try {
    await prisma.coupon.delete({
      where: { id },
    });
    revalidatePath("/admin/coupons");
    return { success: true };
  } catch (error) {
    console.error("Error deleting coupon:", error);
    return { success: false, error: "Failed to delete coupon" };
  }
}
