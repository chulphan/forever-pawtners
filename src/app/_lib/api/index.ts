import {
  City,
  ResponseBodyType,
  FullCity,
  Shelter,
  PawQuery,
  Paw,
} from '@/app/_types';
import { httpGet } from '../util/http';

export const getCities = async (): Promise<City[]> => {
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

export const getShelters = async (
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
