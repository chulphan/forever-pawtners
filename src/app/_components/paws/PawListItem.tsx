import React from 'react';
import Image from 'next/image';
import type { Paw } from '../../_types';

const labelColorVariants: Record<string, string> = {
  protect: 'bg-protect',
  end: 'bg-end',
  notice: 'bg-notice',
};

function getColorBy(processState: string) {
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
}

interface PawListItemProps {
  paw: Paw;
  onClick: () => void;
}

function PawListItem({ paw, onClick }: PawListItemProps) {
  return (
    <div
      onClick={onClick}
      className={'flex flex-col gap-4 bg-[#F2F2F2] p-4 rounded-lg cursor-pointer'}
    >
      <div
        className={`flex justify-between font-bold text-md rounded-lg ${getColorBy(
          paw.processState,
        )} text-white p-2`}
      >
        <span>
          {paw.kindFullNm} / {paw.processState}
        </span>
        <span className={'font-bold text-md'}>{paw.sexCd === 'F' ? '♀' : '♂'}</span>
      </div>
      <div className={'h-[200px] rounded-lg'} style={{ position: 'relative' }}>
        <Image
          src={`/api/image-proxy?url=${paw.popfile1}`}
          alt={`${paw.kindCd} 이미지`}
          className={'w-full h-full rounded-lg'}
          fill
          sizes={'(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
          unoptimized
          loading="lazy"
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
    </div>
  );
}

export default PawListItem;
