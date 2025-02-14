import { Paw } from '@/app/_types';
import { useMutation } from '@tanstack/react-query';

const useWritePaw = () => {
  return useMutation({
    mutationFn: ({ paw }: { paw: Paw }) =>
      fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/paws`, {
        method: 'POST',
        body: JSON.stringify(paw),
      }),
  });
};

export { useWritePaw };
