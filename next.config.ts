import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {}, 

  webpack: (config) => {
    config.externals = {
      ...config.externals,
      '@solana/kit': 'commonjs @solana/kit',
      '@solana-program/memo': 'commonjs @solana-program/memo',
      '@solana-program/system': 'commonjs @solana-program/system',
      '@solana-program/token': 'commonjs @solana-program/token',
    };
    return config;
  },
};

export default nextConfig;
