const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function main() {
  const order = await prisma.order.findUnique({where: {id: "cmsnlq3fa000gfmx2g24idu2q"}});
  console.log(JSON.stringify(order, null, 2));
}
main().then(() => prisma.$disconnect());
