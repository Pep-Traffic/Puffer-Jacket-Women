import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: the store builds to plain files that deploy to any host.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
