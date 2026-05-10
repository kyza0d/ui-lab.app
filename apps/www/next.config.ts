import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  transpilePackages: ['beautiful-mermaid'],
  productionBrowserSourceMaps: false,
};

export default nextConfig;
