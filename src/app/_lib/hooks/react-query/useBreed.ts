import { useQuery } from '@tanstack/react-query';
import { getBreed } from '../../api';
import { ANIMAL_KIND_CODE } from '@/app/_types';

export const useBreed = (upKind?: ANIMAL_KIND_CODE) => {
  return useQuery({
    queryKey: ['breeds', upKind],
    queryFn: () => getBreed(upKind),
    enabled: !!upKind,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};
