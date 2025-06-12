import { Paw } from '@/app/_types';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';

const useWritePaw = () => {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: ({ paw }: { paw: Paw }) =>
      fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/paws`, {
        method: 'POST',
        body: JSON.stringify(paw),
      }),
    onSuccess: async (response, variable) => {
      const result = await response.json();

      if (result.message === 'updated') {
        queryClient.setQueryData(['paw', variable.paw.desertionNo], variable.paw);
      }
    },
  });
};

const fetchPawById = async (id: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/paws/${id}`);

  if (!response.ok) {
    return null;
  }

  const result = await response.json();

  if (result.error) {
    console.error('error ', JSON.stringify(result));
    return null;
  }

  return result.data;
};

const useFetchPawById = (id: string) => {
  return useQuery({
    queryKey: ['paw', id],
    queryFn: () => fetchPawById(id),
  });
};

export { useWritePaw, fetchPawById, useFetchPawById };
