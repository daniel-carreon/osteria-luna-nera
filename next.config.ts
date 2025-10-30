import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Enable Cache Components (Next.js 16)
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },

  // React Compiler (Next.js 16)
  reactCompiler: true,

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

export default nextConfig
