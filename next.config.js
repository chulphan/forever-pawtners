/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    // domains: ['www.animal.go.kr'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'www.animal.go.kr',
        port: '',
      },
      {
        protocol: 'http',
        hostname: 'openapi.animal.go.kr',
        pathname: '/openapi/service/rest/fileDownloadSrvc/files/**',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;
