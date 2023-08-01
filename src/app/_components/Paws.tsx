'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { Paw } from '../_types';
import Modal from './Modal';
import { useRecoilState } from 'recoil';
import { modalState, pawState } from '../_lib/recoil/atom';

export default function Paws({ paws }: { paws: Paw[] }) {
  const [selectedPaw, setSelectedPaw] = useRecoilState(pawState);
  const [isPawModalOpen, setIsPawModalOpen] = useRecoilState(modalState);

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
              // width={500}
              // height={500}
              className={'w-full h-full rounded'}
              fill
              style={{
                objectFit: 'cover',
              }}
            />
          </div>
          <div className={'flex flex-col gap-2 font-normal text-sm'}>
            <p>{paw.specialMark}</p>
            <p>{paw.careNm}</p>
            <p>{paw.careAddr}</p>
          </div>
        </li>
      ))}
      {isPawModalOpen && <Modal />}
    </ul>
  );
}
