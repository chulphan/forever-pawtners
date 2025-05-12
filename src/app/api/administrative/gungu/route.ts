import { httpGet } from '@/app/_lib/util/http';
import { FullCity, ResponseBodyType } from '@/app/_types';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const sidoCode = searchParams.get('sidoCode');

  const gunguResponse = (await httpGet<FullCity>('sigungu', {
    upr_cd: sidoCode,
  })) as ResponseBodyType<FullCity>;

  const gunguList = gunguResponse.items.item;

  return NextResponse.json(gunguList);
};
