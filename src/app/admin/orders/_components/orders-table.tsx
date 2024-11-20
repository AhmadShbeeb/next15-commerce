'use client';

import { SerializedOrder } from '@/types/serialized-types';
import { Columns } from './columns';
import { DataTable } from '@/components/table/table';
import { useState } from 'react';
import { useDebounce } from '@/hooks/common/useDebounce';
import { useGetPaginatedOrders } from '@/hooks/orders/useGetPaginatedOrders';
import { PaginationState, SortingState } from '@tanstack/react-table';

export function OrdersTable() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchTerm = useDebounce(searchQuery, 300);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'createdAt' as keyof SerializedOrder, desc: true }, // set default sorting
  ]);

  const { data: orders, isFetching, refetch } = useGetPaginatedOrders(debouncedSearchTerm, pagination, sorting);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Reset to first page when searching
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  return (
    <div className="overflow-x-auto">
      <DataTable
        columns={Columns}
        data={orders?.items ?? []}
        total={orders?.total ?? 0}
        isFetching={isFetching}
        pageCount={orders?.totalPages ?? 0}
        pageIndex={pagination.pageIndex}
        pageSize={pagination.pageSize}
        searchPlaceholder="Search orders..."
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
