'use server';

import { getBaseUrl } from '@/app/_lib/api';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function loginWithKakao() {
  const supabase = await createClient();

  const url = process.env.VERCEL_URL ? process.env.VERCEL_URL : 'http://localhost:3000';

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'kakao',
    options: {
      redirectTo: `${url}/auth/callback`,
    },
  });

  console.log('dta.url ', data.url);

  if (data.url) {
    redirect(data.url);
  }
}

export async function logoutWithKakao() {
  const supabase = await createClient();

  await supabase.auth.signOut();
}
