import MapDialog from '@/app/_components/MapDialog';
import { Paw } from '@/app/_types';
import { createClient } from '@/lib/supabase/server';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function PawsPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const id = (await params).id;
  console.log('id', id);
  const supabase = await createClient();
  const result = await supabase.from('paw').select(`*`).eq('desertionNo', id);

  if (!result) {
    notFound();
  }

  if (!result.data) {
    notFound();
  }

  const paw = result.data[0] as Paw;

  return (
    <div className='flex flex-col p-6 w-full items-center'>
      <div className='grid lg:grid-cols-2 gap-2 lg:max-w-[900px]'>
        <div className='relative aspect-video w-full'>
          <Image
            src={paw.popfile}
            width={900}
            height={400}
            className='object-fit aspect-video lg:h-[400px] lg:w-full'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            alt={`${paw?.kindCd} 이미지`}
          />
        </div>
        <div>
          <h2 className='text-lg font-semibold leading-6 text-gray-900 self-start'>
            {paw.kindCd}
          </h2>
          <div>
            <span className='font-bold'>상태: </span>
            <span>{paw.processState}</span>
          </div>
          <div>
            <span className='font-bold'>발견장소: </span>
            <span>
              {paw.orgNm} {paw.happenPlace}
            </span>
            <MapDialog address={`${paw.orgNm} ${paw.happenPlace}`} />
          </div>
          <div>
            <span className='font-bold'>접수일자: </span>
            <span>{paw.happenDt}</span>
          </div>
          <div>
            <span className='font-bold'>나이: </span>
            <span>{paw.age}</span>
          </div>
          <div>
            <span className='font-bold'>색상: </span>
            <span>{paw.colorCd}</span>
          </div>
          <div>
            <span className='font-bold'>체중: </span>
            <span>{paw.weight}</span>
          </div>
          <div>
            <span className='font-bold'>공고번호: </span>
            <span>{paw.noticeNo}</span>
          </div>
          <div>
            <span className='font-bold'>공고 시작일: </span>
            <span>{paw.noticeSdt}</span>
          </div>
          <div>
            <span className='font-bold'>공고 종료일: </span>
            <span>{paw.noticeEdt}</span>
          </div>
          <div>
            <span className='font-bold'>특징: </span>
            <span>{paw.specialMark}</span>
          </div>
          <div>
            <span className='font-bold'>보호소 이름: </span>
            <span>{paw.careNm}</span>
          </div>
          <div>
            <span className='font-bold'>보호소 전화번호: </span>
            <span>{paw.careTel}</span>
          </div>
          <div>
            <span className='font-bold'>보호 장소: </span>
            <span>{paw.careAddr}</span>
            <MapDialog address={paw.careAddr} />
          </div>
          <div>
            <span className='font-bold'>담당자: </span>
            <span>{paw.chargeNm}</span>
          </div>
          <div>
            <span className='font-bold'>담당자 연락처: </span>
            <span>{paw.officetel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
