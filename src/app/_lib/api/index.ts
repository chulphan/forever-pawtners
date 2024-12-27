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

/**
 * 서버사이드는 호출이 잘 되는데 클라이언트 사이드에서 호출이 안된다..
 * url/undefined/api..
 * 왜지??
 */
const baseUrl = `${
  typeof window === undefined
    ? '/api'
    : `${process.env.NEXT_PUBLIC_SITE_URL}/api`
}`;

export const getCities = async (): Promise<City[]> => {
  try {
    const response = (await (
      await fetch(baseUrl, {
        method: 'POST',
        body: JSON.stringify({
          endpoint: 'sido',
          queryParam: { numOfRows: 17 },
        }),
      })
    ).json()) as ResponseBodyType<City>;

    return response.items.item;
  } catch (e) {
    console.log('getCities ', e);
  } finally {
    return [];
  }
};

export const getFullCities = async (cityCode?: string): Promise<FullCity[]> => {
  if (!cityCode) {
    throw new Error('시도코드 미제공');
  }
  const response = (await (
    await fetch(baseUrl, {
      method: 'POST',
      body: JSON.stringify({
        endpoint: 'sigungu',
        queryParam: {
          upr_cd: cityCode,
        },
      }),
    })
  ).json()) as ResponseBodyType<FullCity>;

  return response.items.item.filter((fullCity) => fullCity.orgCd !== '6119999');
};

export const getShelters = async (
  cityCode: string,
  fullCityCode: string
): Promise<Shelter[]> => {
  if (!cityCode || !fullCityCode) {
    throw new Error('시도군구 코드 미제공');
  }

  const response = (await (
    await fetch(baseUrl, {
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
  pawQuery: Omit<PawQuery, 'items'>
): Promise<ResponseBodyType<Paw>> => {
  const response = (await (
    await fetch(baseUrl, {
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
    await fetch(baseUrl, {
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
