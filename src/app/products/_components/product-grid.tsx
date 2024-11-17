'use client';

import { SerializedProduct } from '@/types/serialized-types';
import { ProductCard } from './product-card';

interface ProductGridProps {
  products: SerializedProduct[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
