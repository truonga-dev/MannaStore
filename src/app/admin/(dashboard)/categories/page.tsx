import prisma from "@/lib/prisma";
import CategoryClient from "./CategoryClient";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { products: true }
      }
    },
    orderBy: { name: 'asc' }
  });

  return <CategoryClient initialCategories={categories} />;
}
