'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <aside className='min-w-52 bg-slate-700 text-white min-h-screen p-4'>
      <h1 className='text-xl font-bold mb-8'>Admin Dashboard</h1>
      <nav className='space-y-2'>
        <Link
          href='/admin/products'
          className={`block p-2 rounded ${isActive('/admin/products') ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
        >
          Products
        </Link>
        <Link
          href='/admin/orders'
          className={`block p-2 rounded ${isActive('/admin/orders') ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
        >
          Orders
        </Link>
      </nav>
    </aside>
  );
}
