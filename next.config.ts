import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  basePath: "/Demo2AISupChn",
  trailingSlash: true,
};

export default nextConfig;
