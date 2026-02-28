import type { NextConfig } from "next";

const API_BACKEND = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/backend/:path*",
          destination: `${API_BACKEND}/:path*/`,
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
