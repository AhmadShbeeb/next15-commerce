'use client';

import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addItem } from '@/lib/store/features/cartSlice';
import { SerializedProduct } from '@/types/serialized-types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ImageIcon } from 'lucide-react';

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
        image: product.images?.[0]?.url || '',
        quantity: 1,
        maxQuantity: product.quantity,
        availableSizes: product.sizes,
        availableColors: product.colors,
      }),
    );
  };

  return (
    <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <div className="relative aspect-video">
        {product.images?.[0]?.url ? (
          <Image
            src={product.images?.[0]?.url}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <ImageIcon className="h-full w-full rounded-md bg-slate-100" />
        )}
      </div>
      <CardHeader className="flex flex-row items-center justify-between p-3">
        <h3 className="font-semibold">{product.name}</h3>
        <div className="flex items-center gap-2">
          {product.category?.name && <Badge variant="secondary">{product.category.name}</Badge>}
          {product.quantity <= 5 && <Badge variant="destructive">Low Stock</Badge>}
          {product.sizes &&
            product.sizes.map((size) => (
              <Badge variant="secondary" key={size.id}>
                {size.name}
              </Badge>
            ))}
          {product.colors &&
            product.colors.map((color) => (
              <Badge variant="secondary" key={color.id}>
                {color.name}
              </Badge>
            ))}
        </div>
      </CardHeader>
      <CardContent className="p-3">
        <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-3">
        <span className="text-lg font-bold">${product.price}</span>
        <Button onClick={handleAddToCart}>Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}
