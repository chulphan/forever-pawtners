import MapDialog from '@/app/_components/MapDialog';
import { fetchPawById } from '@/app/_lib/hooks/usePaw';
import { Paw } from '@/app/_types';
import { createClient } from '@/lib/supabase/server';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import Image from 'next/image';
import { notFound } from 'next/navigation';
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
