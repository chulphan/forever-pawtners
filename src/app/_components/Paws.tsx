'use client';
import React, { useMemo, useRef } from 'react';
import Image from 'next/image';
import { Paw, ResponseBodyType } from '../_types';
import Modal from './Modal';
import useIntersectionObserver from '../_lib/hooks/useIntersectionObserver';
import { getPaws } from '../_lib/api';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/shadcn/components/Dialog';
import { useInfiniteQuery } from '@tanstack/react-query';
import { usePawQueryStore, usePawStore } from '../_lib/stores';

const labelColorVariants = {
  protect: 'bg-protect',
  end: 'bg-end',
  notice: 'bg-notice',
};

export default function Paws({
  pawsParam,
  numOfRowsParam,
  pageNoParam,
  totalCountParam,
}: {
  pawsParam: Paw[];
  numOfRowsParam: number;
  pageNoParam: number;
  totalCountParam: number;
}) {
  const pawQuery = usePawQueryStore((state) => state.query);
  const selectedPaw = usePawStore((state) => state.paw);
  const setSelectedPaw = usePawStore((state) => state.setPaw);
  const resetPawState = usePawStore((state) => state.reset);
  const loadMoreRef = useRef<HTMLLIElement>(null);

  const {
    data,
    isFetching: isFetchingPaws,
    fetchNextPage,
    hasNextPage: hasPawsNextPage,
    dataUpdatedAt,
  } = useInfiniteQuery({
    queryKey: ['pawList', pawQuery],
    queryFn: async ({ pageParam }: { pageParam: ResponseBodyType<Paw> }) => {
      console.log('pageParam ', pageParam);
      const { numOfRows, pageNo, totalCount } = pageParam;
      return await getPaws({
        ...pawQuery,
        numOfRows,
        pageNo,
        totalCount,
      });
    },
    initialPageParam: {
      items: {
        item: pawsParam,
      },
      numOfRows: numOfRowsParam,
      pageNo: pageNoParam,
      totalCount: totalCountParam,
    },
    getNextPageParam: (lastPage) => {
      const totalPage =
        (lastPage.totalCount ?? 0 % (lastPage.numOfRows ?? 48) === 0)
          ? Math.floor((lastPage.totalCount ?? 0) / (lastPage.numOfRows ?? 48))
          : Math.floor(
              (lastPage.totalCount ?? 0) / (lastPage.numOfRows ?? 48)
            ) + 1;

      const hasNextPage = (lastPage.pageNo ?? 1) <= totalPage;
      if (hasNextPage) {
        return {
          ...lastPage,
          pageNo: (lastPage.pageNo ?? 1) + 1,
        };
      }

      return undefined;
    },
    initialData: () => {
      const initialData = {
        items: {
          item: pawsParam,
        },
        numOfRows: numOfRowsParam,
        pageNo: pageNoParam,
        totalCount: totalCountParam,
      };

      return {
        pages: [initialData],
        pageParams: [initialData],
      };
    },
  });

  const pawListItem = useMemo(
    () =>
      data?.pages
        .map((page) => page.items)
        .flatMap((item) => item.item)
        .filter((item) => item),
    [dataUpdatedAt]
  );

  useIntersectionObserver({
    // root: rootRef,
    target: loadMoreRef,
    threshold: 1,
    onIntersect: async () => {
      if (!isFetchingPaws) {
        await fetchNextPage();
      }
    },
    enabled: !!hasPawsNextPage,
  });

  const onPawClick = (paw: Paw) => {
    setSelectedPaw(paw);
  };

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

  const onOpenChange = (open: boolean) => {
    if (!open) {
      resetPawState();
    }
  };

  const renderPawsConditionally = () => {
    if (pawListItem && pawListItem.length > 0) {
      return (
        <ul
          className={
            'grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full'
          }>
          {pawListItem.map((paw) => (
            <Dialog key={paw.desertionNo} onOpenChange={onOpenChange}>
              <DialogTrigger asChild onClick={() => onPawClick(paw)}>
                <li
                  className={
                    'flex flex-col gap-4 bg-[#F2F2F2] p-4 rounded cursor-pointer'
                  }>
                  <div
                    className={`flex justify-between font-bold text-md ${getColorBy(
                      paw.processState
                    )} text-white p-2`}>
                    <span>
                      {paw.kindCd} / {paw.processState}
                    </span>
                    <span className={'font-bold text-md'}>
                      {paw.sexCd === 'F' ? '♀' : '♂'}
                    </span>
                  </div>

                  <div
                    className={'h-[200px] rounded'}
                    style={{ position: 'relative' }}>
                    <Image
                      src={paw.popfile}
                      alt={`${paw.kindCd} 이미지`}
                      className={'w-full h-full rounded'}
                      fill
                      priority
                      sizes={
                        '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                      }
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
                </li>
              </DialogTrigger>
              <DialogContent className='sm:max-w-lg overflow-y-auto max-h-[550px] bg-white'>
                {selectedPaw && <Modal />}
              </DialogContent>
            </Dialog>
          ))}
          <li ref={loadMoreRef} className={!hasPawsNextPage ? 'hidden' : ''} />
        </ul>
      );
    }

    return (
      <div className={'flex justify-center items-center w-full min-h-[300px]'}>
        <span className={'font-bold text-5xl'}>
          찾으시는 유기동물이 없어요ㅠㅠ
        </span>
      </div>
    );
  };

  return <>{renderPawsConditionally()}</>;
}
