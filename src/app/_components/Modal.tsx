'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/shadcn/components/Dialog';
import { Button } from '@/shadcn/components/Button';
import { usePawStore } from '../_lib/stores';

export default function Modal(props: any) {
  const paw = usePawStore((state) => state.paw);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // TODO: custom hook 으로 만들기
    if (paw && window.kakao && mapContainerRef.current) {
      console.log('paw... ', paw);
      console.log('window.kakao ', window.kakao);
      console.log('mapContainerRef ', mapContainerRef);
      window.kakao.maps.load(() => {
        const markerPosition = new window.kakao.maps.LatLng(
          33.450701,
          126.570667
        );
        const map = new window.kakao.maps.Map(
          mapContainerRef.current as HTMLDivElement,
          {
            center: markerPosition,
            level: 3,
          }
        );

        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(
          `${paw?.careAddr}`,
          (result: any, status: any) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const coords = new window.kakao.maps.LatLng(
                +result[0].y,
                +result[0].x
              );

              const marker = new window.kakao.maps.Marker({
                map,
                position: coords,
              });

              map.setCenter(coords);
              marker.setMap(map);
            }
          }
        );
      });
    }
  }, [paw]);

  return (
    <DialogContent className='xm:max-w-md overflow-y-auto max-h-[550px] bg-white'>
      <div className='flex justify-center'>
        <div className='flex flex-col w-full mt-3 text-left overflow-y-auto'>
          <DialogTitle className='text-base font-semibold leading-6 text-gray-900'>
            {paw?.kindCd} {paw?.sexCd === 'F' ? '♀' : '♂'}
          </DialogTitle>
          <DialogDescription />
          <div className='mt-2 relative h-[400px] xl:h-[500px]'>
            <Image
              src={paw?.popfile || ''}
              fill
              style={{
                objectFit: 'fill',
              }}
              className={'w-full h-full'}
              alt={`${paw?.kindCd} 이미지`}
            />
          </div>
          <div className='mt-2'>
            <span className='font-bold'>상태</span>:{' '}
            <span>{paw?.processState}</span>
          </div>
          <div className='flex gap-4 mt-2'>
            <div>
              <span className='font-bold'>발견 장소</span>:
              <span>
                {paw?.orgNm} {paw?.happenPlace}
              </span>
            </div>
          </div>
          <div className='mt-2'>
            <span className='font-bold'>접수 일자</span>:
            <span>{paw?.happenDt}</span>
          </div>
          <div className='flex gap-4 mt-2'>
            <div>
              <span className='font-bold'>나이</span>:<span>{paw?.age}</span>
            </div>
            <div>
              <span className='font-bold'>색상</span>:
              <span>{paw?.colorCd}</span>
            </div>
            <div>
              <span className='font-bold'>체중</span>:<span>{paw?.weight}</span>
            </div>
          </div>
          <div className='flex gap-4 mt-2'>
            <div>
              <span className='font-bold'>공고번호</span>:
              <span>{paw?.noticeNo}</span>
            </div>
          </div>
          <div className='mt-2'>
            <span className='font-bold'>공고 시작일</span>:
            <span>{paw?.noticeSdt}</span>
          </div>
          <div className='mt-2'>
            <span className='font-bold'>공고 종료일</span>:
            <span>{paw?.noticeEdt}</span>
          </div>
          <div className='flex mt-2'>
            <span className='font-bold'>특징</span>:<p>{paw?.specialMark}</p>
          </div>
          <div className='flex gap-4 mt-2'></div>
          <div className='mt-2'>
            <span className='font-bold'>보호소 이름</span>:
            <span>{paw?.careNm}</span>
          </div>
          <div className='mt-2'>
            <span className='font-bold'>보호소 전화번호</span>:
            <span>{paw?.careTel}</span>
          </div>
          <div className='mt-2'>
            <span className='font-bold'>보호 장소</span>:
            <span>{paw?.careAddr}</span>
          </div>
          <div className='flex gap-4 mt-2'>
            <div>
              <span className='font-bold'>담당자</span>:
              <span>{paw?.chargeNm}</span>
            </div>
            <div>
              <span className='font-bold'>담당자 연락처</span>:
              <span>{paw?.officetel}</span>
            </div>
          </div>
        </div>
      </div>
      <div ref={mapContainerRef} className={'w-full h-[400px]'} />
      <DialogFooter>
        <DialogClose asChild>
          <Button
            type='button'
            className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'>
            닫기
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
