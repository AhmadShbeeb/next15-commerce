'use client';

import { OrderStatus } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface OrderStatusSelectProps {
  orderId: string;
  initialStatus: OrderStatus;
}

export function OrderStatusSelect({ orderId, initialStatus }: OrderStatusSelectProps) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);

  const handleStatusUpdate = async (newStatus: OrderStatus) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update order status');

      setStatus(newStatus);
      router.refresh();
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status');
    }
  };

  return (
    <select
      value={status}
      onChange={e => handleStatusUpdate(e.target.value as OrderStatus)}
      className='text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
    >
      {Object.values(OrderStatus).map(status => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
}
