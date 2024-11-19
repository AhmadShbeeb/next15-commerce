'use client';

import { SerializedCategory } from '@/types/serialized-types';
import { Columns } from './columns';
import { DataTable } from '@/components/DataTable';
import { useState } from 'react';
import { useDebounce } from '@/hooks/common/useDebounce';
import { useGetPaginatedCategories } from '@/hooks/categories/useGetPaginatedCategories';
import { PaginationState, SortingState } from '@tanstack/react-table';

export function CategoriesTable() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchTerm = useDebounce(searchQuery, 300);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([{ id: 'name' as keyof SerializedCategory, desc: false }]);

  const { data: categories, isFetching, refetch } = useGetPaginatedCategories(debouncedSearchTerm, pagination, sorting);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  return (
    <div className="overflow-x-auto">
      <DataTable
        columns={Columns}
        data={categories?.items ?? []}
        total={categories?.total ?? 0}
        isFetching={isFetching}
        pageCount={categories?.totalPages ?? 0}
        pageIndex={pagination.pageIndex}
        pageSize={pagination.pageSize}
        searchPlaceholder="Search categories..."
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
