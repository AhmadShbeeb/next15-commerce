import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { OrderHistory } from '@/components/profile/order-history';
import { UserProfile } from '@/components/profile/user-profile';

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) {
    redirect('/');
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-2xl font-bold mb-8'>My Account</h1>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='md:col-span-1'>
            <UserProfile user={session.user} />
          </div>
          <div className='md:col-span-2'>
            <OrderHistory orders={orders} />
          </div>
        </div>
      </div>
    </div>
  );
}
