import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Root config for the Next-app side (lib/**). The backend keeps its own
// config in backend/vitest.config.ts; its suites join the CI gate when
// PR #54 lands them.
export default defineConfig({
  test: {
    environment: "node",
    include: ["lib/**/__tests__/**/*.test.ts"],
  },
  resolve: {
    alias: { "@": fileURLToPath(new URL(".", import.meta.url)) },
  },
});
