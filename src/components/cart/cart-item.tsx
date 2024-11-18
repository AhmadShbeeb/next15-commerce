'use client';

import { useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '@/lib/store/features/cartSlice';
import Image from 'next/image';
import type { CartItem } from '@/lib/store/features/cartSlice';

interface CartItemProps {
  item: CartItem;
}

export function CartItem({ item }: CartItemProps) {
  const dispatch = useDispatch();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ productId: item.productId, quantity: newQuantity }));
  };

  return (
    <div className="flex gap-4 border-b py-4">
      <div className="relative h-20 w-20 flex-shrink-0">
        <Image src={item.image || '/placeholder.jpg'} alt={item.name} fill className="rounded object-cover" />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-gray-600">${item.price.toFixed(2)}</p>
        <div className="mt-2 flex items-center gap-2">
          <button
            disabled={item.quantity === 1}
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="flex h-8 w-8 items-center justify-center rounded border"
          >
            -
          </button>
          <span className="w-8 text-center">{item.quantity}</span>
          <button
            // TODO: Add max quantity
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="flex h-8 w-8 items-center justify-center rounded border"
          >
            +
          </button>
          <button
            onClick={() => dispatch(removeItem(item.productId))}
            className="ml-auto text-red-500 hover:text-red-700"
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
    </div>
  );
}
