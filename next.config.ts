import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.resolve(__dirname),

  // Legacy Express server file (backend/app.ts) is preserved for upstream
  // compatibility but not used in Next.js API routes.
  // @types/express is installed as dev dependency for TypeScript type checking.

  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Fix for Thirdweb ESM modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    // Handle ESM modules from Thirdweb - allow fullySpecified: false
    config.module = {
      ...config.module,
      rules: [
        ...(config.module?.rules || []),
        {
          test: /node_modules\/thirdweb\/.*\.m?js$/,
          resolve: {
            fullySpecified: false,
          },
        },
      ],
    };
    
    return config;
  },
  
  // Exclude test scripts and other non-production files from TypeScript checking
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // Note: serverExternalPackages removed for thirdweb - it must be bundled
  // so it shares the same React instance as Next.js during SSR
};

export default nextConfig;
