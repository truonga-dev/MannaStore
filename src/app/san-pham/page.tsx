import prisma from "@/lib/prisma";
import ProductsClient from "./ProductsClient";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    include: {
      variants: true
    },
    orderBy: { createdAt: 'desc' }
  });

  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' }
  });

  return <ProductsClient initialProducts={products as any} dbCategories={categories as any} />;
}
