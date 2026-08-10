import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'page.widget.zalo.me',
      },
      {
        protocol: 'https',
        hostname: 'qr.sepay.vn',
      },
    ],
  },
};

export default nextConfig;
