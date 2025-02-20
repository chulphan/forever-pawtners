import { fetchPawById } from '@/app/_lib/hooks/usePaw';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import PawComponent from './_components/pawComponent';

export default async function PawsPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const queryClient = new QueryClient();
  const id = (await params).id;

  await queryClient.prefetchQuery({
    queryKey: ['paw', id],
    queryFn: () => fetchPawById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PawComponent id={id} />
    </HydrationBoundary>
  );
}
