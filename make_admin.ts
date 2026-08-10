import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const users = await prisma.user.updateMany({
    data: {
      role: 'ADMIN',
    },
  })
  console.log(`Updated ${users.count} users to ADMIN role.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
