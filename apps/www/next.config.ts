import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  transpilePackages: ['beautiful-mermaid'],
  productionBrowserSourceMaps: false,
  turbopack: {
    root: path.resolve(__dirname, '../../..'),
  },
};

export default nextConfig;
