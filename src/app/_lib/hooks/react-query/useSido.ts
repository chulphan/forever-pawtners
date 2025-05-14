import { queryOptions, useQuery } from '@tanstack/react-query';
import { getCities } from '../../api';

export const sidoQueryOptions = queryOptions({
  queryKey: ['sido'],
  queryFn: () => getCities(),
  staleTime: Infinity,
});

export const useSido = () => {
  return useQuery(sidoQueryOptions);
};
