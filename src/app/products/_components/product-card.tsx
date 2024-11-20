'use client';

import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addItem } from '@/lib/store/features/cartSlice';
import { SerializedProduct } from '@/types/serialized-types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
    <Card className="overflow-hidden">
      <div className="relative aspect-square">
        <Image
          src={product.images?.[0] || '/placeholder.jpg'}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{product.name}</h3>
          {product.category?.name && <Badge variant="secondary">{product.category.name}</Badge>}
        </div>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <span className="text-lg font-bold">${product.price}</span>
        <Button onClick={handleAddToCart}>Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}
