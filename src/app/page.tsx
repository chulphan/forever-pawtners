import { Suspense } from 'react';
import Paws from './_components/Paws';
import SearchBox from './_components/SearchBox';
import { pawsQueryOptions } from './_lib/hooks/react-query/usePaws';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from './_lib/util/get-query-client';
import { sidoQueryOptions } from './_lib/hooks/react-query/useSido';
import LoadingPawListItem from './_components/paws/LoadingPawListItem';

export default async function Home() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(sidoQueryOptions);
  await queryClient.prefetchInfiniteQuery(pawsQueryOptions()());

  return (
    <main className="flex min-h-screen flex-col items-center p-6 gap-4">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SearchBox />
        <Suspense
          fallback={
            <ul
              className={
                'grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full'
              }
            >
              {Array.from({ length: 12 }).map((_, idx) => (
                <li key={`loading-${idx}`}>
                  <LoadingPawListItem />
                </li>
              ))}
            </ul>
          }
        >
          <Paws />
        </Suspense>
      </HydrationBoundary>
    </main>
  );
}
