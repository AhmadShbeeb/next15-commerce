import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { SearchBar } from './search-bar';
import { ADMIN_EMAILS } from '@/lib/constants';
import { Suspense } from 'react';
import { auth } from '@/auth';

export async function Header() {
  const session = await auth();

  return (
    <header className='bg-slate-200 shadow-sm'>
      <div className='container mx-auto px-4 py-4'>
        <div className='flex items-center justify-between'>
          <Link href='/' className='text-2xl font-bold text-blue-600'>
            Store
          </Link>

          <div className='flex-1 max-w-xl mx-8'>
            <Suspense fallback={<div>Loading...</div>}>
              <SearchBar />
            </Suspense>
          </div>

          <div className='flex items-center gap-4'>
            {session ? (
              <>
                <Link href='/profile' className='text-gray-600 hover:text-gray-900'>
                  Profile
                </Link>
                {session.user?.email && ADMIN_EMAILS.includes(session.user.email) && (
                  <Link href='/admin/products' className='text-gray-600 hover:text-gray-900'>
                    Admin
                  </Link>
                )}
              </>
            ) : (
              <button onClick={() => signIn('github')} className='text-gray-600 hover:text-gray-900'>
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
