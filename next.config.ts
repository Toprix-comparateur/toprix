import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.tunisianet.com.tn' },
      { protocol: 'https', hostname: 'www.mytek.tn' },
      { protocol: 'https', hostname: 'spacenet.tn' },
      { protocol: 'https', hostname: 'api.toprix.tn' },
    ],
  },
};

export default nextConfig;
