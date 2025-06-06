'use server';

import { getBaseUrl } from '@/app/_lib/api';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function loginWithKakao() {
  const supabase = await createClient();

  console.log('base url ', getBaseUrl());

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'kakao',
    options: {
      redirectTo: `${getBaseUrl()}/auth/callback`,
    },
  });

  if (data.url) {
    redirect(data.url);
  }
}

export async function logoutWithKakao() {
  const supabase = await createClient();

  await supabase.auth.signOut();
}
