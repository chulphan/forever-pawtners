import {
  City,
  ResponseBodyType,
  FullCity,
  Shelter,
  PawQuery,
  Paw,
  ANIMAL_KIND_CODE,
  Breed,
} from '@/app/_types';
import { isServer } from '@tanstack/react-query';

export const getBaseUrl = () => {
  if (!isServer) {
    return '';
  }

  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }

  return 'http://localhost:3000';
};

const apiUrl = `${getBaseUrl()}/api`;

export const getCities = async (): Promise<City[]> => {
  try {
    const sidoList = (await (await fetch(`${apiUrl}/administrative/sido`)).json()) as City[];

    return sidoList;
  } catch (e) {
    console.log('getCities ', e);
    return [];
  }
};

export const getFullCities = async (cityCode?: string): Promise<FullCity[]> => {
  if (!cityCode) {
    throw new Error('시도코드 미제공');
  }
  const gunguList = (await (
    await fetch(`${apiUrl}/administrative/gungu?sidoCode=${cityCode}`)
  ).json()) as FullCity[];

  return gunguList.filter((fullCity) => fullCity.orgCd !== '6119999');
};

export const getShelters = async (cityCode: string, fullCityCode: string): Promise<Shelter[]> => {
  if (!cityCode || !fullCityCode) {
    throw new Error('시도군구 코드 미제공');
  }

  const response = (await (
    await fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify({
        endpoint: 'shelter',
        queryParam: {
          upr_cd: cityCode,
          org_cd: fullCityCode,
        },
      }),
    })
  ).json()) as ResponseBodyType<Shelter>;

  return response.items.item;
};

export const getPaws = async (
  pawQuery: Omit<PawQuery, 'items'>,
): Promise<ResponseBodyType<Paw>> => {
  const response = (await (
    await fetch(apiUrl, {
      cache: 'no-store',
      method: 'POST',
      body: JSON.stringify({
        endpoint: 'abandonmentPublic',
        queryParam: pawQuery,
      }),
    })
  ).json()) as ResponseBodyType<Paw>;

  return response;
};

export const getBreed = async (animalCode?: ANIMAL_KIND_CODE) => {
  const response = (await (
    await fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify({
        endpoint: 'kind',
        queryParam: {
          up_kind_cd: animalCode,
        },
      }),
    })
  ).json()) as ResponseBodyType<Breed>;

  return response;
};
