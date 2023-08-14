import { Suspense } from 'react';
import Cities from './_components/Cities';
import FullCities from './_components/FullCities';
import { City, FullCity, Paw, PawQuery, ResponseType } from './_types';
import Paws from './_components/Paws';
import SearchBox from './_components/SearchBox';

const SERVICE_KEY = process.env.SERVICE_KEY;
const ENDPOINT = 'http://apis.data.go.kr/1543061/abandonmentPublicSrvc';

const getCities = async (): Promise<ResponseType<City>> => {
  const res = await fetch(
    `${ENDPOINT}/sido?serviceKey=${SERVICE_KEY}&numOfRows=17&_type=json`
  );

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
};

export const getFullCities = async (
  cityCode?: string
): Promise<ResponseType<FullCity>> => {
  if (!cityCode) {
    throw new Error('시도코드 미제공');
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

export const getPaws = async (pawQuery: PawQuery) => {
  const searchParams = new URLSearchParams();
  searchParams.set(
    'serviceKey',
    SERVICE_KEY
      ? SERVICE_KEY
      : '7PUJX40QgG/FDFVkVp5TeWjSPuAlnZqYj0qil5RGdQonw5vEQ0cSxywJSMJX9Q6eGjx5/i+rAScbcwVNN5X49A=='
  );
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
  const cities = (await getCities())?.response?.body?.items?.item;
  const orgCd = cities?.[0]?.orgCd;
  const fullCities = (
    await getFullCities(orgCd)
  )?.response?.body?.items?.item?.filter((city) => city.orgCd !== '6119999');
  const fullCityCode = fullCities?.[0]?.orgCd;
  // const shelters = await getShelters(orgCd, fullCityCode);

  // console.log(JSON.stringify(shelters));

  const pawsResponseBody = (await getPaws({ pageNo: 1, numOfRows: 48 }))
    ?.response?.body;

  const paws = pawsResponseBody?.items?.item as Paw[];
  const numOfRows = pawsResponseBody?.numOfRows;
  const pageNo = pawsResponseBody?.pageNo;
  const totalCount = pawsResponseBody?.totalCount;

  console.log(paws);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className='flex min-h-screen flex-col items-center justify-between p-24 gap-4'>
        {/* <div className={'flex gap-4'}>
          <Cities cities={cities} />
          <FullCities fullCitiesParam={fullCities} />
        </div> */}
        <SearchBox />
        <Paws
          pawsParam={paws}
          numOfRowsParam={numOfRows}
          pageNoParam={pageNo}
          totalCountParam={totalCount}
        />
      </main>
    </Suspense>
  );
}
