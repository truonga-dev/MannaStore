"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createCategory(data: { name: string; slug: string }) {
  try {
    const category = await prisma.category.create({
      data,
    });
    revalidatePath("/admin/categories");
    revalidatePath("/");
    revalidatePath("/san-pham");
    return { success: true, category };
  } catch (error) {
    console.error("Error creating category:", error);
    return { success: false, error: "Failed to create category" };
  }
}

export async function updateCategory(id: string, data: { name: string; slug: string }) {
  try {
    const category = await prisma.category.update({
      where: { id },
      data,
    });
    revalidatePath("/admin/categories");
    revalidatePath("/");
    revalidatePath("/san-pham");
    return { success: true, category };
  } catch (error) {
    console.error("Error updating category:", error);
    return { success: false, error: "Failed to update category" };
  }
}

export async function deleteCategory(id: string) {
  try {
    await prisma.category.delete({
      where: { id },
    });
    revalidatePath("/admin/categories");
    revalidatePath("/");
    revalidatePath("/san-pham");
    return { success: true };
  } catch (error) {
    console.error("Error deleting category:", error);
    return { success: false, error: "Failed to delete category (might be in use)" };
  }
}
