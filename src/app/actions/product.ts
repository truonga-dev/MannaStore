"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createProduct(data: {
  name: string;
  slug: string;
  description?: string;
  categoryId?: string;
  imageUrl?: string;
  images?: string[];
  variants: {
    size?: string;
    color?: string;
    price: number;
    stockQuantity: number;
  }[];
}) {
  try {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        categoryId: data.categoryId,
        imageUrl: data.imageUrl,
        images: data.images || [],
        isActive: true,
        variants: {
          create: data.variants.map((v) => ({
            size: v.size || null,
            color: v.color || null,
            price: v.price,
            stockQuantity: v.stockQuantity,
          })),
        },
      },
    });

    revalidatePath("/admin/products");
    revalidatePath("/");
    revalidatePath("/san-pham");
    return { success: true, product };
  } catch (error) {
    console.error("Error creating product:", error);
    return { success: false, error: "Failed to create product" };
  }
}

export async function updateProduct(id: string, data: {
  name: string;
  slug: string;
  description?: string;
  categoryId?: string;
  imageUrl?: string;
  images?: string[];
  isActive: boolean;
  variants: {
    id?: string;
    size?: string;
    color?: string;
    price: number;
    stockQuantity: number;
  }[];
}) {
  try {
    // Delete variants that are not in the new list
    const existingVariants = await prisma.productVariant.findMany({ where: { productId: id } });
    const newVariantIds = data.variants.map(v => v.id).filter(Boolean);
    const variantsToDelete = existingVariants.filter(v => !newVariantIds.includes(v.id));

    if (variantsToDelete.length > 0) {
      await prisma.productVariant.deleteMany({
        where: { id: { in: variantsToDelete.map(v => v.id) } }
      });
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        categoryId: data.categoryId,
        imageUrl: data.imageUrl,
        images: data.images || [],
        isActive: data.isActive,
        variants: {
          upsert: data.variants.map((v) => ({
            where: { id: v.id || "new" }, // "new" is just a dummy id to force create if missing
            create: {
              size: v.size || null,
              color: v.color || null,
              price: v.price,
              stockQuantity: v.stockQuantity,
            },
            update: {
              size: v.size || null,
              color: v.color || null,
              price: v.price,
              stockQuantity: v.stockQuantity,
            }
          })),
        },
      },
    });

    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/${id}`);
    revalidatePath("/");
    revalidatePath("/san-pham");
    return { success: true, product };
  } catch (error) {
    console.error("Error updating product:", error);
    return { success: false, error: "Failed to update product" };
  }
}
