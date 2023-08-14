/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.prismic.io', 'aleksejdom.github.io', 'dev-kid.de'],
  },
  basePath: process.env.NODE_ENV === 'production' ? '/' : '',
}

module.exports = nextConfig