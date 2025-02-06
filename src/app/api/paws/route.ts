import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const paw = await request.json();
  const supabase = await createClient();

  const { error } = await supabase.from('paw').insert([paw]);

  if (error) {
    console.log('error ', JSON.stringify(error));
    return NextResponse.json({ result: 'error', error });
  }

  return NextResponse.json({ result: 'ok' });
}
