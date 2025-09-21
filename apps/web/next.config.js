/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['@star-agendado/ui', '@star-agendado/lib'],
  experimental: {
    typedRoutes: true,
  },
}

module.exports = nextConfig