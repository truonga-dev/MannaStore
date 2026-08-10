import { PrismaClient } from '@prisma/client';

const CATEGORY_MAP: Record<string, string> = {
  'ao-thun': 'Áo Thun',
  'ao-hoodie': 'Hoodie',
  'moc-khoa': 'Móc Khóa',
  'sach': 'Sách',
  'ly-coc': 'Ly & Cốc',
  'dong-ho': 'Đồng hồ',
  'qua-tang': 'Quà Tặng',
  'phu-kien': 'Phụ kiện',
  'thoi-trang': 'Thời Trang'
};

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding categories from CATEGORY_MAP...');
  
  for (const [slug, name] of Object.entries(CATEGORY_MAP)) {
    // Upsert to avoid duplicates but ensure it exists
    await prisma.category.upsert({
      where: { slug },
      update: {
        name,
      },
      create: {
        id: slug, // use slug as ID to match seed-products.ts categoryId
        slug,
        name,
      }
    });
    console.log(`Synced category: ${name} (${slug})`);
  }

  console.log('Categories synced successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
