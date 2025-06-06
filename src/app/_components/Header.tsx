import Link from 'next/Link';
import { Button } from '@/shadcn/components/Button';
import { loginWithKakao } from '@/actions/login';

export default function Header() {
  return (
    <form className="p-6 flex justify-between">
      <Link href="/" className="flex items-center">
        <span className="text-2xl font-bold">Forever Pawtners</span>
      </Link>
      <Button className="bg-yellow-400 font-bold" formAction={loginWithKakao}>
        카카오 로그인
      </Button>
    </form>
  );
}
