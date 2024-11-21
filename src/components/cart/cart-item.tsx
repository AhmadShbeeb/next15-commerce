'use client';

import { useDispatch } from 'react-redux';
import { removeItem, updateQuantity, updateItemOptions } from '@/lib/store/features/cartSlice';
import Image from 'next/image';
import type { CartItem } from '@/lib/store/features/cartSlice';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
    <div className="flex items-center gap-4 rounded-lg border p-3">
      <div className="relative aspect-square h-20 w-20 overflow-hidden rounded-md">
        <Image src={item.image || '/placeholder.jpg'} alt={item.name} fill className="object-cover" sizes="80px" />
      </div>
      <div className="flex w-3/4 flex-col">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-medium">{item.name}</h3>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive/90"
            onClick={() => dispatch(removeItem(item.productId))}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-2 space-y-2">
          <div className="flex gap-2">
            {item.availableSizes && (
              <Select
                value={item.size?.id}
                onValueChange={(sizeId) => {
                  const size = item.availableSizes?.find((s) => s.id === sizeId);
                  dispatch(updateItemOptions({ productId: item.productId, size }));
                }}
              >
                <SelectTrigger className="w-[80px]">
                  <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                  {item.availableSizes.map((size) => (
                    <SelectItem key={size.id} value={size.id}>
                      {size.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {item.availableColors && (
              <Select
                value={item.color?.id}
                onValueChange={(colorId) => {
                  const color = item.availableColors?.find((c) => c.id === colorId);
                  dispatch(updateItemOptions({ productId: item.productId, color }));
                }}
              >
                <SelectTrigger className="w-[80px]">
                  <SelectValue placeholder="Color" />
                </SelectTrigger>
                <SelectContent>
                  {item.availableColors.map((color) => (
                    <SelectItem key={color.id} value={color.id}>
                      {color.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center">
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
                disabled={item.quantity === item.maxQuantity}
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleQuantityChange(item.quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
