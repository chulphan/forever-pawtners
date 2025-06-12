'use client';
import React, { useMemo, useRef } from 'react';
import Image from 'next/image';
import useIntersectionObserver from '../_lib/hooks/useIntersectionObserver';
import { getPaws } from '../_lib/api';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { usePawQueryStore, usePawStore } from '../_lib/stores';
import { useShallow } from 'zustand/shallow';
import { Loader } from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useWritePaw } from '../_lib/hooks/usePaw';
import { pawsQueryOptions } from '../_lib/hooks/react-query/usePaws';

const labelColorVariants = {
  protect: 'bg-protect',
  end: 'bg-end',
  notice: 'bg-notice',
};

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
      data?.pages
        .map((page) => page.items)
        .flatMap((item) => item.item)
        .filter((item) => item),
    [data],
  );

  useIntersectionObserver({
    // root: rootRef,
    target: loadMoreRef,
    threshold: 1,
    onIntersect: async () => {
      if (!isPendingPaws) {
        await fetchNextPage();
      }
    },
    enabled: !!hasPawsNextPage,
  });

  const getColorBy = (processState: string) => {
    if (processState.includes('종료')) {
      return labelColorVariants.end;
    }

    if (processState.includes('보호')) {
      return labelColorVariants.protect;
    }

    if (processState.includes('공고')) {
      return labelColorVariants.notice;
    }

    return '';
  };

  const renderPawsConditionally = () => {
    if (pawListItem && pawListItem.length > 0) {
      return (
        <>
          <ul
            className={'grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full'}
          >
            {pawListItem.map((paw) => (
              <motion.li
                key={paw.desertionNo}
                whileHover={{
                  y: -10,
                }}
                onClick={() => {
                  setSelectedPaw(paw);
                  mutate({ paw });
                  router.push(`/paws/${paw.desertionNo}`);
                }}
                className={'flex flex-col gap-4 bg-[#F2F2F2] p-4 rounded cursor-pointer'}
              >
                <div
                  className={`flex justify-between font-bold text-md ${getColorBy(
                    paw.processState,
                  )} text-white p-2`}
                >
                  <span>
                    {paw.kindFullNm} / {paw.processState}
                  </span>
                  <span className={'font-bold text-md'}>{paw.sexCd === 'F' ? '♀' : '♂'}</span>
                </div>

                <div className={'h-[200px] rounded'} style={{ position: 'relative' }}>
                  <Image
                    src={`/api/image-proxy?url=${paw.popfile1}`}
                    alt={`${paw.kindCd} 이미지`}
                    className={'w-full h-full rounded'}
                    fill
                    priority
                    sizes={'(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
                    unoptimized
                  />
                </div>
                <div className={'flex flex-col gap-2 font-normal text-md'}>
                  <p>
                    {paw.age} / {paw.weight}
                  </p>
                  <p>
                    {paw.orgNm} {paw.careNm}
                  </p>
                </div>
              </motion.li>
            ))}

            <li ref={loadMoreRef} className={!hasPawsNextPage ? 'hidden' : ''} />
          </ul>
          {isFetchingPaws && (
            <div className="w-full flex justify-center">
              <Loader className="animate-spin" />
            </div>
          )}
        </>
      );
    }

    return (
      <div className={'flex justify-center items-center w-full min-h-[300px]'}>
        <span className={'font-bold text-5xl'}>찾으시는 유기동물이 없어요ㅠㅠ</span>
      </div>
    );
  };

  return <>{renderPawsConditionally()}</>;
}
