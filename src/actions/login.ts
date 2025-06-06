'use server';

import { getBaseUrl } from '@/app/_lib/api';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function loginWithKakao() {
  const supabase = await createClient();

  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/';
  // Make sure to include `https://` when not localhost.
  url = url.startsWith('http') ? url : `https://${url}`;
  // Make sure to include a trailing `/`.
  url = url.endsWith('/') ? url : `${url}/`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'kakao',
    options: {
      redirectTo: `${url}auth/callback`,
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
