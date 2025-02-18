import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('paw')
    .select('*')
    .eq('desertionNo', id)
    .single();

  if (error) {
    console.log('error ', JSON.stringify(error));
    return NextResponse.json({ result: 'error', error });
  }

  return NextResponse.json({ data });
}
