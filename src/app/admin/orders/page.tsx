import { getOrders } from '@/server/order/queries';
import { OrderList } from './_components/order-list';
export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-6'>Orders</h1>
      <OrderList orders={orders} />
    </div>
  );
}
