import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // The repo root also has a lockfile, so Next otherwise resolves modules from there
  // and cannot see packages installed in frontend/node_modules.
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "api.vinishpurohit.in",
      },
      {
        protocol: "https",
        hostname: "portfolio-d559.onrender.com",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;

