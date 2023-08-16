'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Paw } from '../_types';
import Modal from './Modal';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { modalState, pawState } from '../_lib/recoil/atom';
import useIntersectionObserver from '../_lib/util/useIntersectionObserver';
import { getPaws } from '../page';

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
  const [paws, setPaws] = useState(pawsParam || []);
  const setSelectedPaw = useSetRecoilState(pawState);
  const [isPawModalOpen, setIsPawModalOpen] = useRecoilState(modalState);
  const [pagingInfo, setPagingInfo] = useState({
    numOfRows: numOfRowsParam,
    pageNo: pageNoParam,
    totalCount: totalCountParam,
  });
  const loadMoreRef = useRef<HTMLLIElement>(null);

  const totalPage =
    pagingInfo.totalCount % pagingInfo.numOfRows === 0
      ? Math.floor(pagingInfo.totalCount / pagingInfo.numOfRows)
      : Math.floor(pagingInfo.totalCount / pagingInfo.numOfRows) + 1;

  const hasNextPage = pagingInfo.pageNo < totalPage;

  useIntersectionObserver({
    // root: rootRef,
    target: loadMoreRef,
    threshold: 0.9,
    onIntersect: async () => {
      const nextPagingState = {
        ...pagingInfo,
        pageNo: pagingInfo.pageNo + 1,
      };

      const pawsResponseBody = await getPaws(nextPagingState);
      const newPaws = pawsResponseBody?.items?.item;
      const numOfRows = pawsResponseBody?.numOfRows ?? 0;
      const pageNo = pawsResponseBody?.pageNo ?? 0;
      const totalCount = pawsResponseBody?.totalCount ?? 0;

      setPagingInfo((prevState) => ({
        ...prevState,
        numOfRows,
        pageNo,
        totalCount,
      }));
      setPaws((prevState) => [...prevState, ...newPaws]);
    },
    enabled: hasNextPage,
  });

  const onPawClick = (paw: Paw) => {
    setIsPawModalOpen(true);
    setSelectedPaw(paw);
  };

  return (
    <ul
      className={
        'grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full'
      }>
      {paws?.map((paw) => (
        <li
          key={paw.desertionNo}
          className={
            'flex flex-col gap-4 bg-white p-4 border rounded border-gray-400 cursor-pointer'
          }
          onClick={() => onPawClick(paw)}>
          <div className={'flex flex-col gap-2 font-normal text-sm'}>
            <span>{paw.kindCd}</span>
            <span>
              ({paw.sexCd} / {paw.age} / {paw.weight})
            </span>
            <span>{paw.noticeNo}</span>
            <span>{paw.processState}</span>
          </div>
          <div className={'h-[200px] rounded'} style={{ position: 'relative' }}>
            <Image
              src={paw.popfile}
              alt={`${paw.kindCd} 이미지`}
              className={'w-full h-full rounded'}
              fill
              objectFit='cover'
              priority
              sizes={'100vw'}
            />
          </div>
          <div className={'flex flex-col gap-2 font-normal text-sm'}>
            <p>{paw.specialMark}</p>
            <p>{paw.careNm}</p>
            <p>{paw.careAddr}</p>
          </div>
        </li>
      ))}
      <li ref={loadMoreRef} className={!hasNextPage ? 'hidden' : ''}></li>
      {isPawModalOpen && <Modal />}
    </ul>
  );
}
