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
    ],
  },
};

module.exports = nextConfig;
