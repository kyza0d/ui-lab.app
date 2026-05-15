import path from "path";
import type { NextConfig } from "next";

const workspaceRoot = path.resolve(__dirname, "../..");

const nextConfig: NextConfig = {
  cacheComponents: true,
  transpilePackages: ['beautiful-mermaid'],
  productionBrowserSourceMaps: false,
  outputFileTracingRoot: workspaceRoot,
  turbopack: {
    root: workspaceRoot,
  },
};

export default nextConfig;
