import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

const DUPLICATE_ERROR_CODE = '23505';

export async function POST(request: NextRequest) {
  const paw = await request.json();
  const supabase = await createClient();

  const { error } = await supabase.from('paw').insert([paw]);

  if (error) {
    if (error.code === DUPLICATE_ERROR_CODE) {
      await supabase.from('paw').update([paw]);
      return NextResponse.json({
        result: 'ok',
        message: 'upserted',
        data: paw,
      });
    }

    console.log('error ', JSON.stringify(error));
    return NextResponse.json(
      { result: 'error', error },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json({ result: 'ok' });
}
