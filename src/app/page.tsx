import { Suspense } from 'react';
import {
  City,
  FullCity,
  Paw,
  PawQuery,
  ResponseBodyType,
  ResponseType,
  Shelter,
} from './_types';
import Paws from './_components/Paws';
import SearchBox from './_components/SearchBox';
import { httpGet } from './_lib/util/http';

const SERVICE_KEY = process.env.SERVICE_KEY
  ? process.env.SERVICE_KEY
  : '7PUJX40QgG%2FFDFVkVp5TeWjSPuAlnZqYj0qil5RGdQonw5vEQ0cSxywJSMJX9Q6eGjx5%2Fi%2BrAScbcwVNN5X49A%3D%3D';
const ENDPOINT = 'http://apis.data.go.kr/1543061/abandonmentPublicSrvc';

const getCities = async (): Promise<City[]> => {
  const response = (await httpGet('sido', {
    numOfRows: 17,
  })) as ResponseBodyType<City>;

  return response.items.item;
};

export const getFullCities = async (cityCode?: string): Promise<FullCity[]> => {
  if (!cityCode) {
    throw new Error('시도코드 미제공');
  }

  const response = (await httpGet('sigungu', {
    upr_cd: cityCode,
  })) as ResponseBodyType<FullCity>;

  return response.items.item.filter((fullCity) => fullCity.orgCd !== '6119999');
};

const getShelters = async (
  cityCode: string,
  fullCityCode: string
): Promise<Shelter[]> => {
  if (!cityCode || !fullCityCode) {
    throw new Error('시도군구 코드 미제공');
  }

  const response = (await httpGet('shelter', {
    upr_cd: cityCode,
    org_cd: fullCityCode,
  })) as ResponseBodyType<Shelter>;

  return response.items.item;
};

export const getPaws = async (
  pawQuery: PawQuery
): Promise<ResponseBodyType<Paw>> => {
  const response = (await httpGet(
    'abandonmentPublic',
    pawQuery
  )) as ResponseBodyType<Paw>;

  return response;
};

export default async function Home() {
  const cities = (await getCities()) ?? [];
  const orgCd = cities?.[0]?.orgCd;
  const fullCities = (await getFullCities(orgCd)) ?? [];
  const pawsResponseBody = await getPaws({ pageNo: 1, numOfRows: 48 });

  const paws = pawsResponseBody.items.item;
  const numOfRows = pawsResponseBody.numOfRows ?? 0;
  const pageNo = pawsResponseBody.pageNo ?? 0;
  const totalCount = pawsResponseBody.totalCount ?? 0;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className='flex min-h-screen flex-col items-center justify-between p-24 gap-4'>
        <SearchBox citiesParam={cities} fullCitiesParam={fullCities} />
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
