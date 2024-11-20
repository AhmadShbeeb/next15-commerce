'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Package2, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname.startsWith(path);

  const navItems = [
    {
      href: '/admin/products',
      label: 'Products',
      icon: Package2,
    },
    {
      href: '/admin/orders',
      label: 'Orders',
      icon: ShoppingCart,
    },
  ];

  return (
    <aside className="flex h-screen min-w-52 flex-col bg-muted p-4">
      <h1 className="mb-8 text-xl font-bold">Admin Dashboard</h1>
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.href}
              asChild
              variant={isActive(item.href) ? 'secondary' : 'ghost'}
              className={cn('w-full justify-start gap-2', isActive(item.href) && 'bg-blue-200 hover:bg-blue-300')}
            >
              <Link href={item.href}>
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            </Button>
          );
        })}
      </nav>
    </aside>
  );
}
