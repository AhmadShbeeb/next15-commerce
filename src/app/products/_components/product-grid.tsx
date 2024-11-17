'use client';

import { SerializedProductPaginated } from '@/types/serialized-types';
import { ProductCard } from './product-card';

interface ProductGridProps {
  products: SerializedProductPaginated;
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
