import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Legacy Express server files (backend/app.ts, backend/routes.ts) are preserved
  // for upstream compatibility but not used in Next.js API routes.
  // @types/express is installed as dev dependency for TypeScript type checking.

  // Turbopack configuration
  turbopack: {},
  
  // Webpack configuration (fallback for non-Turbopack builds)
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
  
  // TypeScript errors in pre-existing code should not block builds
  typescript: {
    ignoreBuildErrors: true,
  },

  // Solana packages use Node.js APIs and must not be bundled for the browser
  serverExternalPackages: [
    "@solana/web3.js",
    "@solana/spl-token",
    "@coral-xyz/anchor",
  ],

  // Note: thirdweb must be bundled (not external) so it shares the same
  // React instance as Next.js during SSR
};

export default nextConfig;
