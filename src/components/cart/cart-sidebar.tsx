'use client';

import { CartItem } from './cart-item';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { useSelector } from '@/lib/store/store';
import { useRef } from 'react';

export function CartSidebar() {
  const { items, total } = useSelector((state) => state.cart);
  const sheetButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative" ref={sheetButtonRef}>
          <ShoppingCart className="h-5 w-5" />
          {items.length > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <SheetDescription />
        {items.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center space-y-4">
            <p className="text-muted-foreground">Your cart is empty</p>
            <Button asChild variant="outline">
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="h-[calc(100vh-12rem)]">
              <div className="space-y-4 pr-4">
                {items.map((item) => (
                  <CartItem key={item.productId} item={item} />
                ))}
              </div>
            </ScrollArea>
            <div className="space-y-4 pt-6">
              <Separator />
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Button asChild className="w-full">
                <Link href="/checkout" onClick={() => sheetButtonRef.current?.click()}>
                  Checkout
                </Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
