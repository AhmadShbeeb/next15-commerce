import { Order, OrderItem, Product } from '@prisma/client';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';

interface ExtendedOrderItem extends OrderItem {
  product: Product;
}

interface ExtendedOrder extends Order {
  items: ExtendedOrderItem[];
}

interface OrderHistoryProps {
  orders: ExtendedOrder[];
}

export function OrderHistory({ orders }: OrderHistoryProps) {
  if (orders.length === 0) {
    return (
      <div className='bg-white shadow rounded-lg p-6'>
        <h2 className='text-xl font-semibold mb-4'>Order History</h2>
        <p className='text-gray-600'>You haven&apos;t placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className='bg-white shadow rounded-lg p-6'>
      <h2 className='text-xl font-semibold mb-4'>Order History</h2>
      <div className='space-y-6'>
        {orders.map(order => (
          <div key={order.id} className='border rounded-lg p-4 hover:border-blue-500 transition-colors'>
            <div className='flex justify-between items-start mb-4'>
              <div>
                <p className='text-sm text-gray-600'>Order #{order.id}</p>
                <p className='text-sm text-gray-600'>{formatDate(order.createdAt)}</p>
              </div>
              <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-blue-100 text-blue-800'>
                {order.status.toLowerCase()}
              </span>
            </div>

            <div className='space-y-4'>
              {order.items.map(item => (
                <div key={item.id} className='flex items-center space-x-4'>
                  <div className='relative w-16 h-16 flex-shrink-0'>
                    <Image
                      src={item.product.images?.[0] || '/placeholder.jpg'}
                      alt={item.product.name}
                      fill
                      className='object-cover rounded'
                    />
                  </div>
                  <div className='flex-1'>
                    <h3 className='font-medium'>{item.product.name}</h3>
                    <p className='text-sm text-gray-600'>Quantity: {item.quantity}</p>
                  </div>
                  <p className='font-medium'>${Number(item.price).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className='mt-4 pt-4 border-t flex justify-between items-center'>
              <span className='font-bold'>Total</span>
              <span className='font-bold'>${Number(order.total).toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
