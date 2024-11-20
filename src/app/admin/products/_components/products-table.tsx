'use client';

import { SerializedProduct } from '@/types/serialized-types';
import { Columns } from './columns';
import { DataTable } from '@/components/table/table';
import { useState } from 'react';
import { useDebounce } from '@/hooks/common/useDebounce';
import { useGetPaginatedProducts } from '@/hooks/products/useGetPaginatedProducts';
import { PaginationState, SortingState } from '@tanstack/react-table';

export function ProductsTable() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchTerm = useDebounce(searchQuery, 300);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'name' as keyof SerializedProduct, desc: false }, // set default sorting
  ]);
  const { data: products, isFetching, refetch } = useGetPaginatedProducts(debouncedSearchTerm, pagination, sorting);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Reset to first page when searching
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  return (
    <div className="overflow-x-auto">
      <DataTable
        columns={Columns}
        data={products?.items ?? []}
        total={products?.total ?? 0}
        isFetching={isFetching}
        pageCount={products?.totalPages ?? 0}
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
