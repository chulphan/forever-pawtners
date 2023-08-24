import './globals.css';
import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import RecoilProvider from './_lib/Provider';
import Script from 'next/script';

const notoSans = Noto_Sans({ weight: '400', preload: false });

export const metadata: Metadata = {
  title: '유기동물, 내 평생 파트너',
  description: '유기견/유기묘, 사지말고 입양하세요',
};

declare global {
  interface Window {
    kakao: any;
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body className={notoSans.className}>
        <RecoilProvider>{children}</RecoilProvider>
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_KAKAO_APP_KEY}&libraries=services,clusterer&autoload=false`}
        />
      </body>
    </html>
  );
}
