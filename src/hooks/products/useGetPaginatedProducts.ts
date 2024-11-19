import { SerializedProductPaginated } from '@/types/serialized-types';
import { useQuery } from '@tanstack/react-query';
import { PaginationState, SortingState } from '@tanstack/react-table';
import { REACT_QUERY_KEYS } from '@/lib/constants';
import { paginationSearchParams } from '@/lib/utils';
export const useGetPaginatedProducts = (
  debouncedSearchTerm: string,
  pagination: PaginationState,
  sorting: SortingState,
) => {
  const productsQuery = useQuery({
    queryKey: [
      REACT_QUERY_KEYS.PAGINATED_PRODUCTS,
      debouncedSearchTerm,
      pagination.pageIndex,
      pagination.pageSize,
      sorting,
      sorting[0]?.id,
      sorting[0]?.desc,
    ],
    queryFn: async () => {
      const searchParams = paginationSearchParams({
        query: debouncedSearchTerm,
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        orderBy: sorting[0]?.id,
        orderDirection: sorting[0]?.desc ? 'desc' : 'asc',
      });

      const response = await fetch(`/api/products?${searchParams}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json() as Promise<SerializedProductPaginated>;
    },
  });

  return productsQuery;
};
