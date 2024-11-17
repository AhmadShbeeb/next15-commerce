'use client';

import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addItem } from '@/lib/store/features/cartSlice';
import { SerializedProduct } from '@/types/serialized-types';

interface ProductCardProps {
  product: SerializedProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0],
        quantity: 1,
      })
    );
  };

  return (
    <div className='border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow'>
      <div className='relative h-48'>
        <Image src={product.images?.[0] || '/placeholder.jpg'} alt={product.name} fill className='object-cover' />
      </div>
      <div className='p-4'>
        <h3 className='text-lg font-semibold'>{product.name}</h3>
        <p className='text-gray-600 text-sm mt-1'>{product.description}</p>
        <div className='mt-4 flex items-center justify-between'>
          <span className='text-lg font-bold'>${product.price}</span>
          <button
            onClick={handleAddToCart}
            className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors'
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
