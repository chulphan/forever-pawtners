import './globals.css';
import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import RecoilProvider from './_lib/Provider';

const notoSans = Noto_Sans({ weight: '400', preload: false });

export const metadata: Metadata = {
  title: '유기동물, 내 평생 파트너',
  description: '유기견/유기묘, 사지말고 입양하세요',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body className={notoSans.className}>
        <RecoilProvider>{children}</RecoilProvider>
      </body>
    </html>
  );
}
