'use client';

import { clearCart } from '@/lib/store/features/cartSlice';
import { useSelector } from '@/lib/store/store';
import { createOrder } from '@/server/order/actions';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export function CheckoutForm() {
  const router = useRouter();
  const { data: session } = useSession();

  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.cart);

  const [formState, createOrderAction, isPending] = useActionState(createOrder, null);

  useEffect(() => {
    if (formState?.success) {
      router.replace(`/order-confirmation/${formState.data}`);
    }

    if (formState?.error) {
      // @ts-expect-error TODO: better error handling
      formState.error?.forEach((error: string) => {
        console.log(error);
        toast.error(error);
      });
    }

    return () => {
      if (formState?.success) {
        dispatch(clearCart());
      }
    };
  }, [formState?.success, formState?.data, dispatch, router, formState?.error]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={createOrderAction} className="space-y-6">
          <input type="hidden" name="userId" defaultValue={session?.user?.id} />
          <input type="hidden" name="total" defaultValue={total} />
          {items.map((item) => (
            <input key={item.productId} type="hidden" name="items" defaultValue={JSON.stringify(item)} />
          ))}

          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input id="cardNumber" type="text" placeholder="4242 4242 4242 4242" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input id="expiryDate" type="text" placeholder="MM/YY" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input id="cvc" type="text" placeholder="123" required />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Processing...' : 'Place Order'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
