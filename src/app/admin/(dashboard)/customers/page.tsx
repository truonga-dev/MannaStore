import prisma from "@/lib/prisma";
import CustomerClient from "./CustomerClient";

export default async function AdminCustomersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return <CustomerClient initialUsers={users} />;
}
