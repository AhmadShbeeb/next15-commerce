import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { CheckoutForm } from './_components/checkout-form';
import { OrderSummary } from './_components/order-summary';

export default async function CheckoutPage() {
  const session = await auth();

  if (!session) {
    return redirect('/sign-in');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold">Checkout</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <OrderSummary />
        <CheckoutForm />
      </div>
    </div>
  );
}
