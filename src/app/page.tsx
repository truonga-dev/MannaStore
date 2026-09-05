import prisma from "@/lib/prisma";
import HomeClient from "./HomeClient";

export const dynamic = 'force-dynamic';

export default async function Home() {
  try {
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
  } catch (error) {
    console.error("Database connection error:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F7F4] dark:bg-[#0C0C0C] px-4">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold font-serif text-gray-900 dark:text-white mb-4">
            Hệ thống đang bảo trì
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Xin lỗi, chúng tôi đang gặp sự cố kết nối. Vui lòng thử lại sau ít phút.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Thử lại
          </a>
        </div>
      </div>
    );
  }
}
