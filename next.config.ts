import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Legacy Express server files (backend/app.ts, backend/routes.ts) are preserved
  // for upstream compatibility but not used in Next.js API routes.
  // @types/express is installed as dev dependency for TypeScript type checking.

  // Empty turbopack config to silence Turbopack/webpack warning
  turbopack: {},
  
  // Exclude test scripts and other non-production files from TypeScript checking
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
