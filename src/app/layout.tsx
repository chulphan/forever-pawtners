import './globals.css';
import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import localFont from 'next/font/local';
import Script from 'next/script';
import ReactQueryProvider from './_lib/providers/ReactQueryProvider';
import Link from 'next/link';

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

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
  pawDialog,
}: {
  children: React.ReactNode;
  pawDialog: React.ReactNode;
}) {
  return (
    <html lang='ko' className={pretendard.variable}>
      <body className={pretendard.className}>
        <ReactQueryProvider>
          <Link href='/' className='p-6 w-fit flex items-center'>
            <span className='text-2xl font-bold'>Forever Pawtners</span>
          </Link>
          {children}
          {pawDialog}
        </ReactQueryProvider>
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_KAKAO_APP_KEY}&libraries=services,clusterer&autoload=false`}
        />
      </body>
      <GoogleAnalytics gaId='G-GY6905JE57' />
    </html>
  );
}
