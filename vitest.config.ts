import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Root config for the Next-app side (lib/**). The backend keeps its own
// config in backend/vitest.config.ts; its suites join the CI gate when
// PR #54 lands them.
export default defineConfig({
  test: {
    environment: "node",
    include: ["lib/**/__tests__/**/*.test.ts"],
    // A test that calls a paid provider must never join the suite: `npm test`
    // and CI would then bill real money on every run, silently. One such file
    // reached a commit on 2026-08-06 because nothing stopped it. Live probes
    // are written as *.live.test.ts, __live-* or __bench-*, gitignored, and run
    // by name. The names are the first line; vitest.setup.ts is the second, for
    // the paid call that arrives under an innocent filename.
    exclude: [
      "**/node_modules/**",
      "**/*.live.test.ts",
      "**/__live-*",
      "**/__bench-*",
    ],
    setupFiles: ["./vitest.setup.ts"],
  },
  resolve: {
    alias: { "@": fileURLToPath(new URL(".", import.meta.url)) },
  },
});
