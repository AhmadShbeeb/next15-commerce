'use client';

import { useDebounce } from '@/lib/hooks/useDebounce';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLayoutEffect, useState, useCallback } from 'react';

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // useLayoutEffect(() => {
  //   if (debouncedSearchTerm) {
  //     router.push(`/search?q=${encodeURIComponent(debouncedSearchTerm)}`);
  //   } else if (searchTerm === '' && pathname.includes('/search')) {
  //     router.push('/');
  //   }
  // }, [debouncedSearchTerm, searchTerm, router, pathname]);

  const handleSearch = useCallback(() => {
    if (searchTerm === '') {
      router.push('/');
    } else if (debouncedSearchTerm) {
      router.push(`/search?q=${encodeURIComponent(debouncedSearchTerm)}`);
    }
  }, [searchTerm, debouncedSearchTerm, router]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch();
  };

  useLayoutEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <div className='relative'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder='Search products...'
          className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <svg
          className='absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
          />
        </svg>
      </form>
    </div>
  );
}
