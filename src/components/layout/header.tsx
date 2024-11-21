import Link from 'next/link';
import { SearchBar } from './search-bar';
import { auth } from '@/auth';
import { SignOutButton } from '../../app/sign-in/_components/sign-out-button';
import { Button } from '@/components/ui/button';
import { CartSidebar } from '../cart/cart-sidebar';

export async function Header() {
  const session = await auth();

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            Store
          </Link>

          <div className="mx-8 max-w-xl flex-1">
            <SearchBar />
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/products">Products</Link>
            </Button>
            <CartSidebar />
            {session ? (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/profile">Profile</Link>
                </Button>
                {session.user?.role === 'SUPER_ADMIN' && (
                  <Button variant="ghost" asChild>
                    <Link href="/admin/products">Admin</Link>
                  </Button>
                )}
                <SignOutButton />
              </>
            ) : (
              <Button variant="outline" asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
