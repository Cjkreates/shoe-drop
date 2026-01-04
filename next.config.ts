import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  experimental: {
    turbopack: {
      resolveAlias: {
        // Ensure we resolve from the correct directory
      },
    },
  },
};

export default nextConfig;
