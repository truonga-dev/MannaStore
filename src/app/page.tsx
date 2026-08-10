import prisma from "@/lib/prisma";
import HomeClient from "./HomeClient";

export default async function Home() {
  let products = await prisma.product.findMany({
    take: 8,
    include: { variants: true },
    orderBy: { createdAt: 'desc' }
  });

  return <HomeClient products={products as any} />;
}
