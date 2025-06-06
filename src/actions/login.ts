'use server';

import { getBaseUrl } from '@/app/_lib/api';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function loginWithKakao() {
  try {
    console.log('?????zzzzz');
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${getBaseUrl()}/auth/callback?next=${getBaseUrl()}/`,
      },
    });

    if (data.url) {
      await fetch(data.url);
    }

    console.log('data ', data);
    console.log('error ', error);
  } catch (e) {
    console.error('kakao error ', e);
  }
}
