import prisma from "@/lib/prisma";
import HomeClient from "./HomeClient";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [products, banners, categories] = await Promise.all([
    prisma.product.findMany({
      take: 8,
      include: { variants: true },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.banner.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    }),
    prisma.category.findMany()
  ]);

  return <HomeClient products={products as any} banners={banners} categories={categories} />;
}
