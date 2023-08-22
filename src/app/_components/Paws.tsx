'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Paw } from '../_types';
import Modal from './Modal';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  modalState,
  pawListState,
  pawQueryState,
  pawState,
} from '../_lib/recoil/atom';
import useIntersectionObserver from '../_lib/hooks/useIntersectionObserver';
import { getPaws } from '../_lib/api';
import usePawList from '../_lib/hooks/usePaws';

const labelColorVariants = {
  protect: 'bg-[#03A678]',
  end: 'bg-[#1E3859]',
  notice: 'bg-[#048ABF]',
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
  const [pawList, setPawList] = usePawList(pawsParam);
  const setSelectedPaw = useSetRecoilState(pawState);
  const [isPawModalOpen, setIsPawModalOpen] = useRecoilState(modalState);
  const [pawQuery, setPawQuery] = useRecoilState(pawQueryState);
  const loadMoreRef = useRef<HTMLLIElement>(null);

  const totalPage =
    pawQuery.totalCount % pawQuery.numOfRows === 0
      ? Math.floor(pawQuery.totalCount / pawQuery.numOfRows)
      : Math.floor(pawQuery.totalCount / pawQuery.numOfRows) + 1;

  const hasNextPage = pawQuery.pageNo < totalPage;

  useEffect(() => {
    setPawQuery((prevState) => ({
      ...prevState,
      numOfRows: numOfRowsParam,
      pageNo: pageNoParam,
      totalCount: totalCountParam,
    }));
  }, []);

  useIntersectionObserver({
    // root: rootRef,
    target: loadMoreRef,
    threshold: 0.9,
    onIntersect: async () => {
      const nextPagingState = {
        ...pawQuery,
        pageNo: pawQuery.pageNo + 1,
      };

      const pawsResponseBody = await getPaws(nextPagingState);
      const newPaws = pawsResponseBody?.items?.item;
      const numOfRows = pawsResponseBody?.numOfRows ?? 0;
      const pageNo = pawsResponseBody?.pageNo ?? 0;
      const totalCount = pawsResponseBody?.totalCount ?? 0;

      setPawQuery((prevState) => ({
        ...prevState,
        numOfRows,
        pageNo,
        totalCount,
      }));
      setPawList((prevState) => [...prevState, ...newPaws]);
    },
    enabled: hasNextPage,
  });

  const onPawClick = (paw: Paw) => {
    setIsPawModalOpen(true);
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

  return (
    <ul
      className={
        'grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full'
      }>
      {pawList?.map((paw) => (
        <li
          key={paw.desertionNo}
          className={
            'flex flex-col gap-4 bg-[#F2F2F2] p-4 rounded cursor-pointer'
          }
          onClick={() => onPawClick(paw)}>
          <div
            className={`flex flex-col gap-2 font-bold text-md ${getColorBy(
              paw.processState
            )} text-white p-2`}>
            <span>
              {paw.kindCd} / {paw.processState}
            </span>
          </div>
          <div className={'h-[200px] rounded'} style={{ position: 'relative' }}>
            <Image
              src={paw.popfile}
              alt={`${paw.kindCd} 이미지`}
              className={'w-full h-full rounded'}
              fill
              priority
              sizes={'(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
            />
          </div>
          <div className={'flex flex-col gap-2 font-normal text-md'}>
            <p>
              {paw.sexCd} / {paw.age} / {paw.weight}
            </p>
            <p>
              {paw.orgNm} {paw.careNm}
            </p>
          </div>
        </li>
      ))}
      <li ref={loadMoreRef} className={!hasNextPage ? 'hidden' : ''}></li>
      {isPawModalOpen && <Modal />}
    </ul>
  );
}
