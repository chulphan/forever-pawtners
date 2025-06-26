'use client';

import React, { useMemo, useRef } from 'react';
import useIntersectionObserver from '../_lib/hooks/useIntersectionObserver';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { usePawQueryStore, usePawStore } from '../_lib/stores';
import { useShallow } from 'zustand/shallow';
import { useRouter } from 'next/navigation';
import { useWritePaw } from '../_lib/hooks/usePaw';
import { pawsQueryOptions } from '../_lib/hooks/react-query/usePaws';
import PawList from './paws/PawList';
import EmptyState from './paws/EmptyState';

export default function Paws() {
  const router = useRouter();
  const pawQuery = usePawQueryStore(useShallow((state) => state.query));
  const setSelectedPaw = usePawStore((state) => state.setPaw);
  const loadMoreRef = useRef<HTMLLIElement>(null);
  const { mutate } = useWritePaw();
  const {
    data,
    isPending: isPendingPaws,
    isFetching: isFetchingPaws,
    fetchNextPage,
    hasNextPage: hasPawsNextPage,
  } = useSuspenseInfiniteQuery(pawsQueryOptions()(pawQuery));

  const pawListItem = useMemo(
    () =>
      (data?.pages || [])
        .map((page) => page.items)
        .flatMap((item) => item.item)
        .filter((item) => item),
    [data],
  );

  useIntersectionObserver({
    target: loadMoreRef,
    threshold: 1,
    onIntersect: async () => {
      if (!isPendingPaws) {
        await fetchNextPage();
      }
    },
    enabled: !!hasPawsNextPage,
  });

  if (!pawListItem || pawListItem.length === 0) {
    return <EmptyState />;
  }

  return (
    <PawList
      pawListItem={pawListItem}
      loadMoreRef={loadMoreRef}
      hasPawsNextPage={hasPawsNextPage}
      isFetchingPaws={isFetchingPaws}
      onPawClick={(paw) => {
        setSelectedPaw(paw);
        mutate({ paw });
        router.push(`/paws/${paw.desertionNo}`);
      }}
    />
  );
}
