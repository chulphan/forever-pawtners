import { httpGet } from '@/app/_lib/util/http';
import { City, ResponseBodyType } from '@/app/_types';
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const supabase = await createClient();

  const { data } = await supabase.from('sido').select();

  if (!data || data?.length === 0) {
    const sidoResponse = (await httpGet<City>('sido', {
      numOfRows: 17,
    })) as ResponseBodyType<City>;

    const sidoList = sidoResponse.items.item;

    await supabase.from('sido').upsert(sidoList);

    return NextResponse.json(sidoList);
  }

  return NextResponse.json(data);
};
