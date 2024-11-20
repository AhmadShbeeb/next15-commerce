'use client';

import { SerializedProductPaginated } from '@/types/serialized-types';
import { ProductCard } from './product-card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

interface ProductGridProps {
  products: SerializedProductPaginated;
}

export function ProductGrid({ products }: ProductGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (params: Record<string, string | null>) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      Object.entries(params).forEach(([key, value]) => {
        if (value === null) {
          current.delete(key);
        } else {
          current.set(key, value);
        }
      });

      return current.toString();
    },
    [searchParams],
  );

  const currentPage = products.currentPage;
  const totalPages = products.totalPages;

  const handlePageChange = (newPage: number) => {
    const queryString = createQueryString({ page: newPage.toString() });
    router.push(`/products?${queryString}`);
  };

  const handlePageSizeChange = (newSize: string) => {
    const queryString = createQueryString({
      limit: newSize,
      page: '1', // Reset to first page when changing page size
    });
    router.push(`/products?${queryString}`);
  };

  return (
    <div className="flex-1">
      {products.total > 0 && <p className="mb-2 text-gray-600">{products.total} results found</p>}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {products.items.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No products found matching your filters.</p>
        </div>
      )}

      {products.total > 0 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <Button
            variant="ghost"
            className="rounded border p-1"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            type="button"
          >
            {'<<'}
          </Button>
          <Button
            variant="ghost"
            className="rounded border p-1"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            type="button"
          >
            {'<'}
          </Button>
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {currentPage} of {totalPages}
            </strong>
          </span>
          <Button
            variant="ghost"
            className="rounded border p-1"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            type="button"
          >
            {'>'}
          </Button>
          <Button
            variant="ghost"
            className="rounded border p-1"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            type="button"
          >
            {'>>'}
          </Button>

          <Select defaultValue={products.pageSize.toString()} onValueChange={handlePageSizeChange}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Page Size" />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 30, 40].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  Show {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
