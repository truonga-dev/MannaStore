import prisma from "@/lib/prisma";
import CouponClient from "./CouponClient";

export default async function AdminCouponsPage() {
  const coupons = await prisma.coupon.findMany({
    orderBy: { code: 'asc' }
  });

  return <CouponClient initialCoupons={coupons} />;
}
