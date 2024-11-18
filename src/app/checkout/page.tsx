'use client';

import { useSelector } from '@/lib/store/store';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { CheckoutForm } from './_components/checkout-form';
import { useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '@/lib/store/features/cartSlice';

export default function CheckoutPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!session) {
      router.push('/');
    }
  }, [session, router]);

  const { items, total } = useSelector((state) => state.cart);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-4 text-2xl font-bold">Your cart is empty</h1>
        <button onClick={() => router.push('/')} className="text-blue-600 hover:text-blue-800">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold">Checkout</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.productId} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <span className="font-medium">{item.name}</span>
                    <div className="ml-4 flex items-center gap-2">
                      <button
                        disabled={item.quantity === 1}
                        onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                        className="flex h-8 w-8 items-center justify-center rounded border"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        // TODO: Add max quantity
                        onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded border"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                  <button
                    onClick={() => dispatch(removeItem(item.productId))}
                    className="text-red-500 hover:text-red-700"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-between font-bold">
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
