import { Paw } from '@/app/_types';
import { createClient } from '@/lib/supabase/server';
import { useMutation, useQuery } from '@tanstack/react-query';

const useWritePaw = () => {
  return useMutation({
    mutationFn: ({ paw }: { paw: Paw }) =>
      fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/paws`, {
        method: 'POST',
        body: JSON.stringify(paw),
      }),
  });
};

const fetchPawById = async (id: string): Promise<Paw | null> => {
  const supabase = await createClient();
  const result = await supabase.from('paw').select(`*`).eq('desertionNo', id);

  if (!result?.data) {
    return null;
  }

  return result.data[0] as Paw;
};

const useFetchPawById = (id: string) => {
  return useQuery({
    queryKey: ['paw', id],
    queryFn: () => fetchPawById(id),
    enabled: !!id,
  });
};

export { useWritePaw, useFetchPawById };
