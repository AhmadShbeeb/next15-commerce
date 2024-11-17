'use client';

import { SerializedProduct, SerializedProductPaginated } from '@/types/serialized-types';
import { Columns } from './columns';
import { DataTable } from '@/components/DataTable';
import { useState } from 'react';
import { useDebounce } from '@/lib/hooks/useDebounce';
import { useGetPaginatedProducts } from '@/hooks/products/useGetPaginatedProducts';
import { PaginationState, SortingState } from '@tanstack/react-table';

interface ProductsTableProps {
  products: SerializedProductPaginated;
}

export function ProductsTable({ products: initialProducts }: ProductsTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchTerm = useDebounce(searchQuery, 300);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: initialProducts.currentPage - 1,
    pageSize: initialProducts.pageSize,
  });
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'name' as keyof SerializedProduct, desc: false }, // set default sorting
  ]);
  const {
    data: products,
    isFetching,
    refetch,
  } = useGetPaginatedProducts(debouncedSearchTerm, pagination, sorting, initialProducts);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Reset to first page when searching
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  return (
    <div className="overflow-x-auto">
      <DataTable
        columns={Columns}
        data={products.items}
        total={products.total}
        isFetching={isFetching}
        pageCount={products.totalPages}
        pageIndex={pagination.pageIndex}
        pageSize={pagination.pageSize}
        searchPlaceholder="Search products..."
        handleSearch={handleSearch}
        searchQuery={searchQuery}
        setPagination={setPagination}
        handleRefresh={refetch}
        sorting={sorting}
        setSorting={setSorting}
      />
    </div>
  );
}
