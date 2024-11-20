import { SerializedSize } from '@/types/serialized-types';
import { useQuery } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@/lib/constants';
import { paginationSearchParams } from '@/lib/utils';

export const useGetSizes = () => {
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.SIZES],
    queryFn: async () => {
      const searchParams = paginationSearchParams({
        page: 1,
        limit: -1,
      });

      const response = await fetch(`/api/sizes?${searchParams}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json() as Promise<SerializedSize[]>;
    },
  });
};
