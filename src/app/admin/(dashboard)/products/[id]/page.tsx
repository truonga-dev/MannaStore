import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditProductForm from "./EditProductForm";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      variants: true,
    }
  });

  if (!product) {
    notFound();
  }

  const categories = await prisma.category.findMany();

  return <EditProductForm product={product} categories={categories} />;
}
