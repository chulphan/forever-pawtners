import { Button } from '@/shadcn/components/Button';
import { loginWithKakao, logoutWithKakao } from '@/actions/login';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <form className="p-6 flex justify-between">
      <Link href="/" className="flex items-center">
        <span className="text-2xl font-bold">Forever Pawtners</span>
      </Link>

      {!user ? (
        <Button className="bg-yellow-400 font-bold" formAction={loginWithKakao}>
          카카오 로그인
        </Button>
      ) : (
        <Button className="bg-blue-600 font-bold" formAction={logoutWithKakao}>
          로그아웃
        </Button>
      )}
    </form>
  );
}
