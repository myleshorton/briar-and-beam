/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // Legacy numeric product URLs → new slug-based URLs (301 permanent)
      { source: '/products/1', destination: '/products/the-eloise', permanent: true },
      { source: '/products/2', destination: '/products/the-livia', permanent: true },
      { source: '/products/3', destination: '/products/the-alexia', permanent: true },
      { source: '/products/4', destination: '/products/the-jack', permanent: true },
      { source: '/products/5', destination: '/products/the-josephine', permanent: true },
      { source: '/products/6', destination: '/products/the-noemmie', permanent: true },
      { source: '/products/7', destination: '/products/the-kate', permanent: true },
      { source: '/products/8', destination: '/products/cutting-boards', permanent: true },
      // Renamed journal post
      { source: '/journal/walnut-white-oak-or-beech', destination: '/journal/walnut-or-white-oak', permanent: true },
    ];
  },
}

module.exports = nextConfig
