'use client';

import { CartItem } from './cart-item';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useSelector } from '@/lib/store/store';
import { toast } from 'sonner';

export function Cart() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const { items, total } = useSelector((state) => state.cart);

  const handleCheckout = () => {
    if (!session) {
      toast.error('Please sign in to proceed with checkout');
      return;
    }
    setIsOpen(false);
    router.push('/checkout');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 rounded-full bg-blue-600 p-2 text-white shadow-lg transition-colors hover:bg-blue-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        {items.length > 0 && (
          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {items.length}
          </span>
        )}
      </button>

      {isOpen && <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setIsOpen(false)} />}

      <div
        className={`fixed right-0 top-0 z-50 h-full w-full transform bg-white shadow-xl transition-transform duration-300 ease-in-out sm:w-96 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-lg font-semibold">Shopping Cart</h2>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <p className="text-center text-gray-500">Your cart is empty</p>
            ) : (
              items.map((item) => <CartItem key={item.productId} item={item} />)
            )}
          </div>

          <div className="border-t p-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-semibold">Total:</span>
              <span className="font-bold">${total.toFixed(2)}</span>
            </div>
            <button
              className="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400"
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
