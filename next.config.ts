import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    testProxy: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'lightningcss': false,
      };
    }

    config.resolve.fallback = {
      ...config.resolve.fallback,
      'lightningcss': false,
    };

    return config;
  },
};

export default nextConfig;
