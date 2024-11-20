'use client';

import { useDebounce } from '@/hooks/common/useDebounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const pathname = usePathname();

  // useLayoutEffect(() => {
  //   if (debouncedSearchTerm) {
  //     router.push(`/search?q=${encodeURIComponent(debouncedSearchTerm)}`);
  //   } else if (searchTerm === '' && pathname.includes('/search')) {
  //     router.push('/');
  //   }
  // }, [debouncedSearchTerm, searchTerm, router, pathname]);

  const handleSearch = useCallback(() => {
    if (searchTerm === '' && pathname.includes('/search')) {
      router.push('/');
    } else if (debouncedSearchTerm) {
      router.push(`/search?q=${encodeURIComponent(debouncedSearchTerm)}`);
    }
  }, [searchTerm, debouncedSearchTerm, router, pathname]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch();
  };

  // useLayoutEffect(() => {
  //   handleSearch();
  // }, [handleSearch]);

  return (
    <div className="relative">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="w-full pr-10"
          />
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
        </div>
      </form>
    </div>
  );
}
