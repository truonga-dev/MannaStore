import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  const passwordHash = await bcrypt.hash('123456', 10)

  await prisma.user.upsert({
    where: { email: 'admin@mannastore.vn' },
    update: {},
    create: {
      email: 'admin@mannastore.vn',
      name: 'Admin Manna',
      passwordHash: passwordHash,
      role: 'ADMIN',
    },
  })

  // Create Categories
  const apparel = await prisma.category.upsert({
    where: { slug: 'thoi-trang' },
    update: {},
    create: {
      name: 'Thời Trang',
      slug: 'thoi-trang',
    },
  })

  const gifts = await prisma.category.upsert({
    where: { slug: 'qua-tang' },
    update: {},
    create: {
      name: 'Quà Tặng',
      slug: 'qua-tang',
    },
  })

  // Create Products
  const shirt = await prisma.product.upsert({
    where: { slug: 'ao-thun-grace' },
    update: {},
    create: {
      name: 'Áo Thun Grace',
      slug: 'ao-thun-grace',
      description: 'Áo thun cotton cao cấp in chữ Grace tối giản. Phù hợp mặc hàng ngày.',
      categoryId: apparel.id,
      imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
      variants: {
        create: [
          { size: 'M', color: 'White', price: 250000, stockQuantity: 50 },
          { size: 'L', color: 'White', price: 250000, stockQuantity: 50 },
        ]
      }
    },
  })

  const mug = await prisma.product.upsert({
    where: { slug: 'ly-su-shalom' },
    update: {},
    create: {
      name: 'Ly Sứ Shalom',
      slug: 'ly-su-shalom',
      description: 'Ly sứ tráng men cao cấp, in chữ Shalom mang ý nghĩa bình an.',
      categoryId: gifts.id,
      imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=800',
      variants: {
        create: [
          { price: 120000, stockQuantity: 100 },
        ]
      }
    },
  })
  
  const bible = await prisma.product.upsert({
    where: { slug: 'kinh-thanh-btt' },
    update: {},
    create: {
      name: 'Kinh Thánh Bản Truyền Thống',
      slug: 'kinh-thanh-btt',
      description: 'Kinh Thánh bìa da cao cấp, chữ to, có dây khóa.',
      categoryId: gifts.id,
      imageUrl: 'https://images.unsplash.com/photo-1502444330042-d1a1ddf971ba?auto=format&fit=crop&q=80&w=800',
      variants: {
        create: [
          { size: 'Nhỏ', color: 'Đen', price: 180000, stockQuantity: 30 },
          { size: 'To', color: 'Đen', price: 350000, stockQuantity: 20 },
        ]
      }
    },
  })

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
