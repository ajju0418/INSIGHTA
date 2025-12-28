/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' - this is for static builds only
  // Keep it commented for now, enable only when building for production
  // output: 'export',
  // trailingSlash: true,

  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  typedRoutes: true
}

module.exports = nextConfig