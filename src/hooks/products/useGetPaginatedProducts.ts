import { SerializedProductPaginated } from '@/types/serialized-types';
import { useQuery } from '@tanstack/react-query';
import { PaginationState, SortingState } from '@tanstack/react-table';

export const useGetPaginatedProducts = (
  debouncedSearchTerm: string,
  pagination: PaginationState,
  sorting: SortingState,
  initialProducts: SerializedProductPaginated,
) => {
  const productsQuery = useQuery({
    queryKey: ['products', debouncedSearchTerm, pagination.pageIndex, pagination.pageSize, sorting],
    queryFn: async () => {
      const searchParams = new URLSearchParams({
        query: debouncedSearchTerm,
        page: String(pagination.pageIndex + 1),
        limit: String(pagination.pageSize),
        orderBy: sorting[0]?.id,
        orderDirection: sorting[0]?.desc ? 'desc' : 'asc',
      });

      const response = await fetch(`/api/products?${searchParams}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json() as Promise<SerializedProductPaginated>;
    },
    // staleTime: 1000 * 60, // Consider data fresh for 1 minute
    // placeholderData: keepPreviousData,
    initialData: initialProducts,
  });

  return productsQuery;
};
