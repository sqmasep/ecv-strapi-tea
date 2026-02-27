import type { NextConfig } from "next";

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
const strapiHost = new URL(strapiUrl).hostname;
const strapiPort = new URL(strapiUrl).port;

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: strapiUrl.startsWith("https") ? "https" : "http",
        hostname: strapiHost,
        port: strapiPort,
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
