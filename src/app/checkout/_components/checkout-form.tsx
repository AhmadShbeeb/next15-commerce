'use client';

import { clearCart } from '@/lib/store/features/cartSlice';
import { useSelector } from '@/lib/store/store';
import { createOrder } from '@/server/order/actions';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

export function CheckoutForm() {
  const router = useRouter();
  const { data: session } = useSession();

  const dispatch = useDispatch();
  const { items, total } = useSelector(state => state.cart);

  const [formState, createOrderAction, isPending] = useActionState(createOrder, null);

  useEffect(() => {
    if (formState?.success) {
      router.push(`/order-confirmation/${formState.data}`);
      dispatch(clearCart());
    }
  }, [formState?.success, formState?.data, dispatch, router]);

  return (
    <div>
      <h2 className='text-xl font-semibold mb-4'>Payment Details</h2>
      <form action={createOrderAction} className='space-y-4'>
        <input type='hidden' name='userId' defaultValue={session?.user?.id} />
        <input type='hidden' name='total' defaultValue={total} />
        {items.map(item => (
          <input key={item.productId} type='hidden' name='items' defaultValue={JSON.stringify(item)} />
        ))}
        <div>
          <label className='block text-sm font-medium mb-1'>Card Number</label>
          <input type='text' className='w-full p-2 border rounded' placeholder='4242 4242 4242 4242' required />
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium mb-1'>Expiry Date</label>
            <input type='text' className='w-full p-2 border rounded' placeholder='MM/YY' required />
          </div>
          <div>
            <label className='block text-sm font-medium mb-1'>CVC</label>
            <input type='text' className='w-full p-2 border rounded' placeholder='123' required />
          </div>
        </div>
        <button
          type='submit'
          disabled={isPending}
          className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400'
        >
          {isPending ? 'Processing...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
}
