'use client';

import { useSelector } from '@/lib/store/store';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { CheckoutForm } from './_components/checkout-form';
import { useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '@/lib/store/features/cartSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Plus, Minus } from 'lucide-react';

export default function CheckoutPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.cart);

  useEffect(() => {
    if (!session) {
      router.push('/');
    }
  }, [session, router]);

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold">Checkout</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
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
                        // TODO: Add max quantity
                        disabled={item.quantity === item.maxQuantity}
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
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

        <CheckoutForm />
      </div>
    </div>
  );
}
