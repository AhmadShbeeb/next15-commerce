'use client';

import { formatDate } from '@/lib/utils';
import { OrderStatusSelect } from './order-status-select';
import { SerializedOrder } from '@/types/serialized-types';

interface OrderListProps {
  orders: SerializedOrder[];
}

export function OrderList({ orders }: OrderListProps) {
  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Order ID</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Customer</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Items</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Total</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Date</th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {orders.map(order => (
            <tr key={order.id}>
              <td className='px-6 py-4 whitespace-nowrap text-sm'>{order.id}</td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <div className='text-sm font-medium text-gray-900'>{order.user.name}</div>
                <div className='text-sm text-gray-500'>{order.user.email}</div>
              </td>
              <td className='px-6 py-4'>
                <div className='text-sm text-gray-900'>
                  {order.items.map(item => (
                    <div key={item.id}>
                      {item.product.name} x{item.quantity}
                    </div>
                  ))}
                </div>
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm'>${order.total.toFixed(2)}</td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <OrderStatusSelect orderId={order.id} initialStatus={order.status} />
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm'>{formatDate(order.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
