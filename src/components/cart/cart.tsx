'use client';

import { CartItem } from './cart-item';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useSelector } from '@/lib/store/store';

export function Cart() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const { items, total } = useSelector(state => state.cart);

  const handleCheckout = () => {
    if (!session) {
      alert('Please sign in to proceed with checkout');
      return;
    }
    setIsOpen(false);
    router.push('/checkout');
  };

  return (
    <div className='relative'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
          />
        </svg>
        {items.length > 0 && (
          <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center'>
            {items.length}
          </span>
        )}
      </button>

      {isOpen && <div className='fixed inset-0 bg-black bg-opacity-50 z-40' onClick={() => setIsOpen(false)} />}

      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='flex flex-col h-full'>
          <div className='flex justify-between items-center p-4 border-b'>
            <h2 className='text-lg font-semibold'>Shopping Cart</h2>
            <button onClick={() => setIsOpen(false)} className='text-gray-500 hover:text-gray-700'>
              <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>

          <div className='flex-1 overflow-y-auto p-4'>
            {items.length === 0 ? (
              <p className='text-center text-gray-500'>Your cart is empty</p>
            ) : (
              items.map(item => <CartItem key={item.productId} item={item} />)
            )}
          </div>

          <div className='border-t p-4'>
            <div className='flex justify-between items-center mb-4'>
              <span className='font-semibold'>Total:</span>
              <span className='font-bold'>${total.toFixed(2)}</span>
            </div>
            <button
              className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400'
              disabled={items.length === 0}
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
