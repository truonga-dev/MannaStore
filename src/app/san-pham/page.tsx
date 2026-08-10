import prisma from "@/lib/prisma";
import ProductsClient from "./ProductsClient";

export default async function ProductsPage() {
  let products = await prisma.product.findMany({
    where: { isActive: true },
    include: {
      variants: true
    },
    orderBy: { createdAt: 'desc' }
  });

  return <ProductsClient initialProducts={products as any} />;
}
