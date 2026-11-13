import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        as: "*.css",
        loaders: ["@tailwindcss/turbopack"],
      },
    },
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "newsmaker.id" },
      { protocol: "https", hostname: "**.newsmaker.id" },
      { protocol: "https", hostname: "equityworld-futures.com" },
      { protocol: "https", hostname: "**.equityworld-futures.com" },
    ],
  },
};

export default nextConfig;