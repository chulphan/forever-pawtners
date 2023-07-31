import { Suspense } from 'react';
import Cities from './_components/Cities';
import FullCities from './_components/FullCities';
import { Paw, PawQuery } from './_types';
import Image from 'next/image';

const SERVICE_KEY = process.env.SERVICE_KEY;
const ENDPOINT = 'http://apis.data.go.kr/1543061/abandonmentPublicSrvc';

const getCities = async () => {
  const res = await fetch(
    `${ENDPOINT}/sido?serviceKey=${SERVICE_KEY}&numOfRows=17&_type=json`
  );

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
};

export const getFullCities = async (cityCode?: string) => {
  if (!cityCode) {
    return;
  }

  const res = await fetch(
    `${ENDPOINT}/sigungu?serviceKey=${SERVICE_KEY}&upr_cd=${cityCode}&_type=json`
  );

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
};

const getShelters = async (cityCode: string, fullCityCode: string) => {
  console.log(cityCode, fullCityCode);
  if (!cityCode || !fullCityCode) {
    return;
  }

  const res = await fetch(
    `${ENDPOINT}/shelter?serviceKey=${SERVICE_KEY}&upr_cd=${cityCode}&org_cd=${fullCityCode}&_type=json`
  );

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
};

const getPaws = async (pawQuery: PawQuery) => {
  const searchParams = new URLSearchParams();
  searchParams.set('serviceKey', SERVICE_KEY);
  searchParams.set('_type', 'json');

  Object.entries(pawQuery).forEach(([key, val]) =>
    searchParams.set(key, val as any)
  );

  console.log(searchParams.toString());
  const res = await fetch(
    `${ENDPOINT}/abandonmentPublic?${searchParams.toString()}`
  );

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  console.log(res);

  return res.json();
};

export default async function Home() {
  // const cities = (await getCities())?.response?.body?.items?.item;
  // const orgCd = cities?.[0]?.orgCd;
  // const fullCities = (
  //   await getFullCities(orgCd)
  // )?.response?.body?.items?.item?.filter((city) => city.orgCd !== '6119999');
  // const fullCityCode = fullCities[0]?.orgCd;
  // const shelters = await getShelters(orgCd, fullCityCode);

  // console.log(JSON.stringify(shelters));

  const paws = (await getPaws({ pageNo: 1, numOfRows: 48 }))?.response?.body
    ?.items?.item as Paw[];

  console.log(paws);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className='flex min-h-screen flex-col items-center justify-between p-24'>
        {/* <div className={'flex gap-4'}>
          <Cities cities={cities} />
          <FullCities fullCitiesParam={fullCities} />
        </div> */}
        <ul
          className={
            'grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full'
          }>
          {paws?.map((paw) => (
            <li
              key={paw.desertionNo}
              className={
                'flex flex-col gap-4 bg-white p-4 border rounded border-gray-400 cursor-pointer'
              }>
              <div className={'flex flex-col gap-2 font-normal text-sm'}>
                <span>{paw.kindCd}</span>
                <span>
                  ({paw.sexCd} / {paw.age} / {paw.weight})
                </span>
                <span>{paw.noticeNo}</span>
                <span>{paw.processState}</span>
              </div>
              <div
                className={'h-[240px] rounded'}
                style={{ position: 'relative' }}>
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
        </ul>
      </main>
    </Suspense>
  );
}
