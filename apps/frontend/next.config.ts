/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
  transpilePackages: ['@penshop/database'],
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/public/uploads/**',
      },
    ],
  },
}

export default nextConfig
