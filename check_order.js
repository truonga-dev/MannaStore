const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const o = await prisma.order.findUnique({where: {orderCode: 'MN260811006'}, include: {items: true}});
  console.log(JSON.stringify(o, null, 2));
}
main().catch(console.error).finally(()=>prisma.$disconnect());
