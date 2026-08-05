import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // CDP hooks only work inside CDPHooksProvider, which mounts lazily and only
  // for signed-in users. Called anywhere else they throw at runtime and take
  // the whole page down (this cost us the editor once). TypeScript cannot catch
  // it — the hook's signature is identical whether or not a provider exists —
  // so the boundary is enforced here. Everything outside the provider tree goes
  // through lib/cdp-bridge.
  {
    files: ["**/*.{ts,tsx}"],
    ignores: ["providers/CdpProvider.tsx", "components/CdpWalletBridge.tsx"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@coinbase/cdp-hooks",
              message:
                "CDP hooks throw outside CdpProvider. Use lib/cdp-bridge instead (useCdpAddress / requestCdpSign / requestCdpKeyExport).",
            },
          ],
        },
      ],
    },
  },
]);

export default eslintConfig;
