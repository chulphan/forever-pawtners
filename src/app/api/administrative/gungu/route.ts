import { httpGet } from '@/app/_lib/util/http';
import { FullCity, ResponseBodyType } from '@/app/_types';
import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const sidoCode = searchParams.get('sidoCode');

  const supabase = await createClient();
  const { data } = await supabase.from('gungu').select().eq('uprCd', sidoCode);

  if (!data || data?.length === 0) {
    const gunguResponse = (await httpGet<FullCity>('sigungu', {
      upr_cd: sidoCode,
    })) as ResponseBodyType<FullCity>;

    const gunguList = gunguResponse.items.item;

    const { error } = await supabase.from('gungu').upsert(gunguList);

    console.log('error ', error);

    return NextResponse.json(gunguList);
  }

  return NextResponse.json(data);
};
