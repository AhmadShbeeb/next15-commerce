'use client';

import { useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '@/lib/store/features/cartSlice';
import Image from 'next/image';
import type { CartItem } from '@/lib/store/features/cartSlice';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface CartItemProps {
  item: CartItem;
}

export function CartItem({ item }: CartItemProps) {
  const dispatch = useDispatch();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    if (newQuantity > item.maxQuantity) return;
    dispatch(updateQuantity({ productId: item.productId, quantity: newQuantity }));
  };

  return (
    <div className="flex items-center gap-4 rounded-lg border p-4">
      <div className="relative aspect-square h-20 w-20 overflow-hidden rounded-md">
        <Image src={item.image || '/placeholder.jpg'} alt={item.name} fill className="object-cover" sizes="80px" />
      </div>
      <div className="flex flex-1 flex-col">
        <h3 className="font-medium">{item.name}</h3>
        <div className="mt-2 flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity === 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center">{item.quantity}</span>
          <Button
            // TODO: Add max quantity
            disabled={item.quantity === item.maxQuantity}
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleQuantityChange(item.quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive hover:text-destructive"
          onClick={() => dispatch(removeItem(item.productId))}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
