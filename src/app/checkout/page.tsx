'use client';

import { useSelector } from '@/lib/store/store';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { CheckoutForm } from './_components/checkout-form';

export default function CheckoutPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/');
    }
  }, [session, router]);

  const { items, total } = useSelector(state => state.cart);

  if (items.length === 0) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-2xl font-bold mb-4'>Your cart is empty</h1>
        <button onClick={() => router.push('/')} className='text-blue-600 hover:text-blue-800'>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-8'>Checkout</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div>
          <h2 className='text-xl font-semibold mb-4'>Order Summary</h2>
          <div className='space-y-4'>
            {items.map(item => (
              <div key={item.productId} className='flex items-center justify-between border-b pb-4'>
                <div className='flex items-center'>
                  <span className='font-medium'>{item.name}</span>
                  <span className='text-gray-500 ml-2'>x{item.quantity}</span>
                </div>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className='flex justify-between font-bold'>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <CheckoutForm />
      </div>
    </div>
  );
}
