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
      }),
    );
  };

  return (
    <div className="overflow-hidden rounded-lg border shadow-sm transition-shadow hover:shadow-md">
      <div className="relative h-48">
        <Image src={product.images?.[0] || '/placeholder.jpg'} alt={product.name} fill className="object-cover" />
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <span className="text-sm text-gray-500">{product.category?.name}</span>
        </div>
        <p className="mt-1 text-sm text-gray-600">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold">${product.price}</span>
          <button
            onClick={handleAddToCart}
            className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
