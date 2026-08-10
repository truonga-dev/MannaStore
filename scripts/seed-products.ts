import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SAMPLE_PRODUCTS = [
  {
    name: 'Ly Sứ Shalom',
    slug: 'ly-su-shalom',
    description: 'Ly sứ cao cấp với dòng chữ Shalom (Bình an). Thiết kế tối giản, phù hợp để uống trà hoặc cà phê mỗi sáng.',
    price: 120000,
    imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=800&auto=format&fit=crop',
    categoryId: 'ly-coc'
  },
  {
    name: 'Áo Hoodie "Grace"',
    slug: 'ao-hoodie-grace',
    description: 'Áo hoodie form rộng thoải mái với thông điệp "Grace" được thêu tỉ mỉ trước ngực. Chất nỉ bông dày dặn ấm áp.',
    price: 350000,
    imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop',
    categoryId: 'thoi-trang'
  },
  {
    name: 'Túi Tote "Faith Can Move Mountains"',
    slug: 'tui-tote-faith',
    description: 'Túi vải Canvas thân thiện với môi trường, in thông điệp khích lệ. Kích thước lớn đựng vừa laptop 14 inch.',
    price: 150000,
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop',
    categoryId: 'phu-kien'
  },
  {
    name: 'Sổ Tay Cầu Nguyện',
    slug: 'so-tay-cau-nguyen',
    description: 'Sổ tay thiết kế riêng để ghi chú bài giảng và lời cầu nguyện. Bìa da PU cao cấp.',
    price: 95000,
    imageUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=800&auto=format&fit=crop',
    categoryId: 'sach'
  },
  {
    name: 'Móc Khóa Gỗ Olive',
    slug: 'moc-khoa-go-olive',
    description: 'Móc khóa làm từ gỗ Olive thật, khắc hình cây thánh giá. Một món quà nhỏ đầy ý nghĩa.',
    price: 45000,
    imageUrl: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=800&auto=format&fit=crop',
    categoryId: 'moc-khoa'
  },
  {
    name: 'Áo Thun "Salt & Light"',
    slug: 'ao-thun-salt-light',
    description: 'Áo thun cotton 100% 2 chiều thoáng mát. Thiết kế chữ Salt & Light tối giản ở mặt sau.',
    price: 220000,
    imageUrl: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=800&auto=format&fit=crop',
    categoryId: 'thoi-trang'
  },
  {
    name: 'Khung Tranh Châm Ngôn',
    slug: 'khung-tranh-cham-ngon',
    description: 'Khung tranh để bàn gỗ sồi với câu Kinh Thánh khích lệ, phù hợp để trang trí góc làm việc.',
    price: 180000,
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop',
    categoryId: 'qua-tang'
  },
  {
    name: 'Mũ Lưỡi Trai "Chosen"',
    slug: 'mu-luoi-trai-chosen',
    description: 'Mũ lưỡi trai phong cách dad hat với chữ "Chosen" thêu 3D nổi bật.',
    price: 130000,
    imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop',
    categoryId: 'phu-kien'
  }
];

async function main() {
  console.log('Clearing old products...');
  await prisma.productVariant.deleteMany({});
  await prisma.product.deleteMany({});

  console.log('Seeding new sample products...');
  for (const prod of SAMPLE_PRODUCTS) {
    await prisma.product.create({
      data: {
        name: prod.name,
        slug: prod.slug,
        description: prod.description,
        categoryId: prod.categoryId,
        imageUrl: prod.imageUrl,
        variants: {
          create: [
            {
              size: 'Freesize',
              color: 'Mặc định',
              price: prod.price,
              stockQuantity: 100,
            }
          ]
        }
      }
    });
    console.log(`Created: ${prod.name}`);
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
