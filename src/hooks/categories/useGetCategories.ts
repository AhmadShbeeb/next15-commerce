import { SerializedCategory } from '@/types/serialized-types';
import { useQuery } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@/lib/constants';
import { paginationSearchParams } from '@/lib/utils';

export const useGetCategories = () => {
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.CATEGORIES],
    queryFn: async () => {
      const searchParams = paginationSearchParams({
        page: 1,
        limit: -1,
      });

      const response = await fetch(`/api/categories?${searchParams}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json() as Promise<SerializedCategory[]>;
    },
  });
};
