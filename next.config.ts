import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['a0.muscache.com'],
  },
  experimental: {
    viewTransition: true,
  }
};

export default nextConfig;
