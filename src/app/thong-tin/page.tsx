import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import prisma from '@/lib/prisma';
import ProfileDashboard from '@/components/profile/ProfileDashboard';
import { authOptions } from "@/lib/auth";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tài khoản của tôi | Manna Store',
  description: 'Quản lý thông tin tài khoản và lịch sử đơn hàng tại Manna Store',
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect('/dang-nhap');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      orders: {
        include: {
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
        orderBy: {
          createdAt: 'desc'
        }
      },
      favorites: {
        include: {
          product: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      },
      pointTransactions: {
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  });

  if (!user) {
    redirect('/dang-nhap');
  }

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 dark:text-white mb-8">
          Tài khoản của tôi
        </h1>
        <ProfileDashboard user={user} orders={user.orders} />
      </div>
    </div>
  );
}
