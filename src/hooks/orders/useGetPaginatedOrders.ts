import { REACT_QUERY_KEYS } from '@/lib/constants';
import { SerializedOrderPaginated } from '@/types/serialized-types';
import { useQuery } from '@tanstack/react-query';
import { PaginationState, SortingState } from '@tanstack/react-table';

export const useGetPaginatedOrders = (
  debouncedSearchTerm: string,
  pagination: PaginationState,
  sorting: SortingState,
) => {
  const ordersQuery = useQuery({
    queryKey: [
      REACT_QUERY_KEYS.PAGINATED_ORDERS,
      debouncedSearchTerm,
      pagination.pageIndex,
      pagination.pageSize,
      sorting,
      sorting[0]?.id,
      sorting[0]?.desc,
    ],
    queryFn: async () => {
      const searchParams = new URLSearchParams({
        query: debouncedSearchTerm,
        page: String(pagination.pageIndex + 1),
        limit: String(pagination.pageSize),
        orderBy: sorting[0]?.id,
        orderDirection: sorting[0]?.desc ? 'desc' : 'asc',
      });

      const response = await fetch(`/api/orders?${searchParams}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json() as Promise<SerializedOrderPaginated>;
    },
  });

  return ordersQuery;
};
