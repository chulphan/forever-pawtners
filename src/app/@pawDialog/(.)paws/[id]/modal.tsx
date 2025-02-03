'use client';

import Image from 'next/image';
import MapDialog from '@/app/_components/MapDialog';
import { usePawStore } from '@/app/_lib/stores';
import { Button } from '@/shadcn/components/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/shadcn/components/Dialog';
import { useRouter } from 'next/navigation';

export default function Modal() {
  const { back } = useRouter();
  const paw = usePawStore((state) => state.paw);
  const reset = usePawStore((state) => state.reset);

  const convertDate = (dateStr: string) => {
    const years = dateStr.slice(0, 4);
    const month = dateStr.slice(4, 6);
    const days = dateStr.slice(6);

    return `${years}.${month}.${days}`;
  };

  return (
    <Dialog
      defaultOpen={true}
      onOpenChange={(open) => {
        if (!open) {
          reset();
          back();
        }
      }}>
      {paw && (
        <DialogContent className='sm:max-w-[70%] xl:max-w-[60%] overflow-y-auto max-h-[550px] bg-white'>
          <div className='flex justify-center'>
            <div className='flex flex-col w-full mt-3 text-left overflow-y-auto'>
              <DialogTitle className='text-base font-semibold leading-6 text-gray-900'>
                {paw?.kindCd}{' '}
                <span className='font-bold'>
                  {paw?.sexCd === 'F' ? '♀' : '♂'}
                </span>
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
                  <MapDialog address={`${paw?.orgNm} ${paw?.happenPlace}`} />
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
                <span>{convertDate(paw?.noticeSdt!)}</span>
              </div>
              <div className='mt-2'>
                <span className='font-bold'>공고 종료일</span>:
                <span>{convertDate(paw?.noticeEdt!)}</span>
              </div>
              <div className='flex mt-2'>
                <span className='font-bold'>특징: </span>
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
                <MapDialog address={paw?.careAddr!} />
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
      )}
    </Dialog>
  );
}
