import { Suspense } from 'react';
import Paws from './_components/Paws';
import SearchBox from './_components/SearchBox';
import { getCities, getPaws } from './_lib/api';
import { pawsQueryOptions } from './_lib/hooks/react-query/usePaws';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from './_lib/util/get-query-client';
import { sidoQueryOptions } from './_lib/hooks/react-query/useSido';

export default async function Home() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(sidoQueryOptions);
  void queryClient.prefetchInfiniteQuery(pawsQueryOptions()());

  return (
    <main className="flex min-h-screen flex-col items-center p-6 gap-4">
      <SearchBox />
      <Suspense fallback={<div>Loading...</div>}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Paws />
        </HydrationBoundary>
      </Suspense>
    </main>
  );
}
