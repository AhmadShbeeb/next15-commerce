'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectItem, SelectContent, SelectValue, SelectTrigger } from '@/components/ui/select';
import { removeItem, updateItemOptions, updateQuantity } from '@/lib/store/features/cartSlice';
import { useSelector } from '@/lib/store/store';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/dist/client/router';
import { useDispatch } from 'react-redux';

export function OrderSummary() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.cart);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    if (newQuantity > (items.find((item) => item.productId === productId)?.maxQuantity ?? -1)) return;
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-4 text-2xl font-bold">Your cart is empty</h1>
        <Button variant="link" onClick={() => router.push('/')}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <div key={item.productId} className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <span className="font-medium">{item.name}</span>
                <div className="ml-4 flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={item.quantity === 1}
                    onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    disabled={item.quantity === item.maxQuantity}
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <div className="flex gap-2">
                    {item.availableSizes && (
                      <Select
                        value={item.size?.id}
                        onValueChange={(sizeId) => {
                          const size = item.availableSizes?.find((s) => s.id === sizeId);
                          dispatch(updateItemOptions({ productId: item.productId, size }));
                        }}
                      >
                        <SelectTrigger className="w-[100px]">
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
                        <SelectTrigger className="w-[100px]">
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
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span>${(item.price * item.quantity).toFixed(2)}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => dispatch(removeItem(item.productId))}
                className="text-destructive hover:text-destructive/90"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
