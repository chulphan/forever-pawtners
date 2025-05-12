import { httpGet } from '@/app/_lib/util/http';
import { City, ResponseBodyType } from '@/app/_types';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const sidoResponse = (await httpGet<City>('sido', {
    numOfRows: 17,
  })) as ResponseBodyType<City>;

  const sidoList = sidoResponse.items.item;

  return NextResponse.json(sidoList);
};
