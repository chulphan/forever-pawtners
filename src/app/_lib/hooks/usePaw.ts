import { Paw } from '@/app/_types';
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

const fetchPawById = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/paws/${id}`
  );

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
