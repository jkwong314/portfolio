import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizeCss: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
