'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { modalState, pawState } from '../_lib/recoil/atom';
import Image from 'next/image';

export default function Modal(props: any) {
  const paw = useRecoilValue(pawState);
  const resetPawState = useResetRecoilState(pawState);
  const setModalOpen = useSetRecoilState(modalState);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bodyElem = document.getElementsByTagName('body')[0];

    bodyElem.style.overflow = 'hidden';

    return () => {
      bodyElem.style.overflow = 'initial';
    };
  }, []);

  useEffect(() => {
    // TODO: custom hook 으로 만들기
    if (kakao && mapContainerRef.current) {
      kakao.maps.load(() => {
        const markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);
        const map = new kakao.maps.Map(
          mapContainerRef.current as HTMLDivElement,
          {
            center: markerPosition,
            level: 3,
          }
        );

        const marker = new kakao.maps.Marker({
          position: markerPosition,
        });

        marker.setMap(map);

        const geocoder = new kakao.maps.services.Geocoder();

        geocoder.addressSearch(`${paw?.careAddr}`, (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const coords = new kakao.maps.LatLng(+result[0].y, +result[0].x);

            const marker = new kakao.maps.Marker({
              map,
              position: coords,
            });

            map.setCenter(coords);
          }
        });
      });
    }
  }, [paw]);

  return (
    <>
      <div
        className='relative z-10'
        aria-labelledby='modal-title'
        role='dialog'
        aria-modal='true'>
        {/* <!--
    Background backdrop, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0"
  --> */}
        <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center sm:p-0'>
            {/* <!--
        Modal panel, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 translate-y-0 sm:scale-100"
          To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      --> */}
            <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 lg:my-0 max-w-lg sm:w-full md:max-w-3xl lg:max-w-5xl'>
              <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                <div className='flex justify-center w-full h-[800px] lg:h-[860px]'>
                  <div className='flex flex-col w-full mt-3 text-left overflow-y-auto'>
                    <h3
                      className='text-base font-semibold leading-6 text-gray-900'
                      id='modal-title'>
                      {paw?.kindCd} {paw?.sexCd === 'F' ? '♀' : '♂'}
                    </h3>
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
                        <span className='font-bold'>나이</span>:
                        <span>{paw?.age}</span>
                      </div>
                      <div>
                        <span className='font-bold'>색상</span>:
                        <span>{paw?.colorCd}</span>
                      </div>
                      <div>
                        <span className='font-bold'>체중</span>:
                        <span>{paw?.weight}</span>
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
                      <span className='font-bold'>특징</span>:
                      <p>{paw?.specialMark}</p>
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
                <div ref={mapContainerRef} className={'w-full h-[400px]'}>
                  {/* <Map
                    center={{ lat: 33.5563, lng: 126.79581 }}
                    style={{ width: '100%', height: '360px' }}>
                    <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
                      <div style={{ color: '#000' }}>{paw?.careNm}</div>
                    </MapMarker>
                  </Map> */}
                </div>
              </div>
              <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                <button
                  type='button'
                  className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
                  onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
