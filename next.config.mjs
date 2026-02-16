import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack: lock root; do not use absolute Windows paths in resolveAlias ("windows imports are not implemented yet")
  turbopack: {
    root: __dirname,
    resolveAlias: {
      tailwindcss: path.join(__dirname, "node_modules", "tailwindcss"),
      "@tailwindcss/postcss": path.join(__dirname, "node_modules", "@tailwindcss/postcss"),
    },
  },

  webpack: (config, { isServer }) => {
    config.resolve ??= {};
    config.resolve.modules = [
      path.join(__dirname, "node_modules"),
      ...(Array.isArray(config.resolve.modules) ? config.resolve.modules : ["node_modules"]),
    ];
    const projectNodeModules = path.join(__dirname, "node_modules");
    config.resolve.alias = {
      ...config.resolve.alias,
      tailwindcss: path.join(projectNodeModules, "tailwindcss"),
      "@tailwindcss/postcss": path.join(projectNodeModules, "@tailwindcss/postcss"),
      react: path.join(projectNodeModules, "react"),
      "react-dom": path.join(projectNodeModules, "react-dom"),
    };

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

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

  typescript: {
    ignoreBuildErrors: false,
  },

  serverExternalPackages: ["thirdweb"],
};

export default nextConfig;
