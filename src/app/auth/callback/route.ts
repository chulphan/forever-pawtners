import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  let next = searchParams.get('next') ?? '/';

  if (!next.startsWith('/')) {
    next = '/';
  }

  console.log('hhhh');

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    console.log('error ', error);

    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host');
      const isLocalDev = process.env.NODE_ENV === 'development';

      if (isLocalDev) {
        console.log('next ', next);
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        console.log('forwardedhost ', forwardedHost);
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-error`);
}
