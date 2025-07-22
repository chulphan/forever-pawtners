'use client';

import Image from 'next/image';
import MapDialog from './MapDialog';
import WebApiShareButton from './WebApiShareButton';
import { Paw } from '@/app/_types';
import { navigateShareContentGenerator } from '@/lib/navigateShareUtil';

interface PawInfoProps {
  paw: Paw;
  variant?: 'modal' | 'page';
}

export default function PawInfo({ paw, variant = 'page' }: PawInfoProps) {
  const convertDate = (dateStr: string) => {
    const years = dateStr.slice(0, 4);
    const month = dateStr.slice(4, 6);
    const days = dateStr.slice(6);
    return `${years}.${month}.${days}`;
  };

  const { title, text, url } = navigateShareContentGenerator({
    kindCd: paw.kindCd,
    sexCd: paw.sexCd,
    orgNm: paw.orgNm,
    happenPlace: paw.happenPlace,
    desertionNo: paw.desertionNo,
  });

  const formatSpecialMark = () => {
    if (variant === 'modal') {
      return `${paw.specialMark || ''}${paw.sfeSoci || ''}${paw.sfeHealth || ''}${paw.etcBigo || ''}`;
    }
    return paw.specialMark;
  };

  const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return '';
    return variant === 'modal' ? convertDate(dateStr) : dateStr;
  };

  if (variant === 'modal') {
    return (
      <div className="flex flex-col w-full mt-3 text-left overflow-y-auto">
        <div className="flex justify-between items-center my-2">
          <h2 className="text-base font-semibold leading-6 text-gray-900">
            {paw.kindFullNm}{' '}
            <span className="font-bold">{paw.sexCd === 'F' ? '♀' : '♂'}</span>
          </h2>
          <WebApiShareButton title={title} text={text} url={url} />
        </div>
        <div className="mt-2 relative h-[400px] xl:h-[500px]">
          <Image
            src={`/api/image-proxy?url=${paw.popfile1}`}
            fill
            style={{
              objectFit: 'fill',
            }}
            className={'w-full h-full'}
            alt={`${paw.kindCd} 이미지`}
            unoptimized
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-4">
            <div>
              <span className="font-bold">상태</span>: <span>{paw.processState}</span>
            </div>
            {paw.endReason && (
              <div>
                <span className="font-bold">종료 사유</span>: <span>{paw.endReason}</span>
              </div>
            )}
          </div>
          <div className="flex gap-4">
            <div>
              <span className="font-bold">발견 장소</span>:
              <span>
                {paw.orgNm} {paw.happenPlace}
              </span>
              <MapDialog address={`${paw.orgNm} ${paw.happenPlace}`} />
            </div>
          </div>
          <div>
            <span className="font-bold">접수 일자</span>:<span>{paw.happenDt}</span>
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <span className="font-bold">나이</span>:<span>{paw.age}</span>
            </div>
            <div>
              <span className="font-bold">색상</span>:<span>{paw.colorCd}</span>
            </div>
            <div>
              <span className="font-bold">체중</span>:<span>{paw.weight}</span>
            </div>
          </div>
          <div className="flex gap-4">
            <div>
              <span className="font-bold">공고번호</span>:<span>{paw.noticeNo}</span>
            </div>
          </div>
          <div>
            <span className="font-bold">공고 시작일</span>:
            <span>{formatDate(paw.noticeSdt)}</span>
          </div>
          <div>
            <span className="font-bold">공고 종료일</span>:
            <span>{formatDate(paw.noticeEdt)}</span>
          </div>
          <div className="flex">
            <span className="font-bold">특징: </span>
            <p>{formatSpecialMark()}</p>
          </div>
          <div>
            <span className="font-bold">보호소 이름</span>:<span>{paw.careNm}</span>
          </div>
          <div>
            <span className="font-bold">보호소 전화번호</span>:<span>{paw.careTel}</span>
          </div>
          <div>
            <span className="font-bold">보호 장소</span>:<span>{paw.careAddr}</span>
            <MapDialog address={paw.careAddr!} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-6 w-full items-center">
      <div className="grid lg:grid-cols-2 gap-2 lg:max-w-[900px]">
        <div className="relative h-[250px] lg:h-full">
          <Image
            src={`/api/image-proxy?url=${paw.popfile1}`}
            fill
            className="object-fit lg:w-full relative"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt={`${paw.kindCd} 이미지`}
            unoptimized
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold leading-6 text-gray-900 self-start">
              {paw.kindFullNm}
            </h2>
            <WebApiShareButton title={title} text={text} url={url} />
          </div>
          <div className="flex gap-4">
            <div>
              <span className="font-bold">상태: </span>
              <span>{paw.processState}</span>
            </div>
            {paw.endReason && (
              <div>
                <span className="font-bold">종료 사유: </span>
                <span>{paw.endReason}</span>
              </div>
            )}
          </div>
          <div>
            <span className="font-bold">발견장소: </span>
            <span>
              {paw.orgNm} {paw.happenPlace}
            </span>
            <MapDialog address={`${paw.orgNm} ${paw.happenPlace}`} />
          </div>
          <div>
            <span className="font-bold">접수일자: </span>
            <span>{paw.happenDt}</span>
          </div>
          <div className="flex flex-col gap-2 ">
            <div>
              <span className="font-bold">나이: </span>
              <span>{paw.age}</span>
            </div>
            <div>
              <span className="font-bold">색상: </span>
              <span>{paw.colorCd}</span>
            </div>
            <div>
              <span className="font-bold">체중: </span>
              <span>{paw.weight}</span>
            </div>
          </div>
          <div>
            <span className="font-bold">공고번호: </span>
            <span>{paw.noticeNo}</span>
          </div>
          <div>
            <span className="font-bold">공고 시작일: </span>
            <span>{formatDate(paw.noticeSdt)}</span>
          </div>
          <div>
            <span className="font-bold">공고 종료일: </span>
            <span>{formatDate(paw.noticeEdt)}</span>
          </div>
          <div>
            <span className="font-bold">특징: </span>
            <span>{formatSpecialMark()}</span>
          </div>
          <div>
            <span className="font-bold">보호소 이름: </span>
            <span>{paw.careNm}</span>
          </div>
          <div>
            <span className="font-bold">보호소 전화번호: </span>
            <span>{paw.careTel}</span>
          </div>
          <div>
            <span className="font-bold">보호 장소: </span>
            <span>{paw.careAddr}</span>
            <MapDialog address={paw.careAddr} />
          </div>
        </div>
      </div>
    </div>
  );
}