import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { getFullCities } from '../../api';

export const useSigungu = (uprCd?: string) => {
  return useSuspenseQuery({
    queryKey: ['sigugu', uprCd],
    queryFn: () => (uprCd ? getFullCities(uprCd) : null),
    staleTime: Infinity,
  });
};
