import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getOrder } from '@/server/order/queries';

interface OrderConfirmationPageProps {
  params: Promise<{
    orderId: string;
  }>;
}

export default async function OrderConfirmationPage({ params }: OrderConfirmationPageProps) {
  const { orderId } = await params;
  const order = await getOrder(orderId);

  if (!order) {
    notFound();
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-2xl mx-auto'>
        <div className='text-center mb-8'>
          <h1 className='text-2xl font-bold mb-2'>Order Confirmed!</h1>
          <p className='text-gray-600'>Thank you for your order. Your order number is #{order.id}</p>
        </div>

        <div className='bg-white shadow rounded-lg p-6'>
          <h2 className='text-xl font-semibold mb-4'>Order Details</h2>
          <div className='space-y-4'>
            {order.items.map(item => (
              <div key={item.id} className='flex items-center justify-between border-b pb-4'>
                <div>
                  <h3 className='font-medium'>{item.product.name}</h3>
                  <p className='text-sm text-gray-500'>Quantity: {item.quantity}</p>
                </div>
                <span>${Number(item.price).toFixed(2)}</span>
              </div>
            ))}
            <div className='flex justify-between font-bold pt-4'>
              <span>Total</span>
              <span>${Number(order.total).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className='text-center mt-8'>
          <Link href='/' className='text-blue-600 hover:text-blue-800 font-medium'>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
