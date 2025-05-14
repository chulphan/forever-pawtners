import { useQuery } from '@tanstack/react-query';
import { getFullCities } from '../../api';

export const useSigungu = (uprCd?: string) => {
  return useQuery({
    queryKey: ['sigugu', uprCd],
    queryFn: () => getFullCities(uprCd),
    enabled: !!uprCd,
    staleTime: Infinity,
  });
};
