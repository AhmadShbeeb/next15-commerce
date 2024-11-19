'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <aside className="min-h-screen min-w-52 bg-slate-700 p-4 text-white">
      <h1 className="mb-8 text-xl font-bold">Admin Dashboard</h1>
      <nav className="space-y-2">
        <Link
          href="/admin/products"
          className={`block rounded p-2 ${isActive('/admin/products') ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
        >
          Products
        </Link>
        <Link
          href="/admin/categories"
          className={`block rounded p-2 ${isActive('/admin/categories') ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
        >
          Categories
        </Link>
        <Link
          href="/admin/orders"
          className={`block rounded p-2 ${isActive('/admin/orders') ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
        >
          Orders
        </Link>
      </nav>
    </aside>
  );
}
