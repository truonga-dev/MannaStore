import prisma from "@/lib/prisma";
import OrderClient from "./OrderClient";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true,
          phone: true,
        }
      },
      items: {
        include: {
          variant: {
            include: {
              product: true
            }
          }
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return <OrderClient initialOrders={orders} />;
}
