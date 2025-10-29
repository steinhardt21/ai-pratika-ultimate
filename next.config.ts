import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['a0.muscache.com', '5vqemjchww.ufs.sh'],
  },
  experimental: {
    viewTransition: true,
  }
};

export default nextConfig;
