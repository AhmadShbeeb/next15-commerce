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
    if (newQuantity < 1) {
      dispatch(removeItem(item.productId));
    } else {
      dispatch(updateQuantity({ productId: item.productId, quantity: newQuantity }));
    }
  };

  return (
    <div className='flex gap-4 py-4 border-b'>
      <div className='relative w-20 h-20 flex-shrink-0'>
        <Image src={item.image || '/placeholder.jpg'} alt={item.name} fill className='object-cover rounded' />
      </div>
      <div className='flex-1'>
        <h3 className='font-semibold'>{item.name}</h3>
        <p className='text-gray-600'>${item.price.toFixed(2)}</p>
        <div className='flex items-center gap-2 mt-2'>
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className='w-8 h-8 flex items-center justify-center border rounded'
          >
            -
          </button>
          <span className='w-8 text-center'>{item.quantity}</span>
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className='w-8 h-8 flex items-center justify-center border rounded'
          >
            +
          </button>
          <button
            onClick={() => dispatch(removeItem(item.productId))}
            className='ml-auto text-red-500 hover:text-red-700'
          >
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
