import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { getUserOrders } from '@/server/order/queries';
import { OrderHistory } from '@/app/profile/_components/order-history';
import { UserProfile } from '@/app/profile/_components/user-profile';

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) {
    redirect('/');
  }

  const orders = await getUserOrders(session.user.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-2xl font-bold">My Account</h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <UserProfile user={session.user} />
          </div>
          <div className="md:col-span-2">
            <OrderHistory orders={orders} />
          </div>
        </div>
      </div>
    </div>
  );
}
