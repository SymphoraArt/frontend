import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";

/**
 * A route handler must not import a "use client" module, at any depth.
 *
 * Next compiles app-router routes in the React Server Components layer, where
 * an imported client module is replaced by a client-reference proxy. Calling a
 * function on that proxy throws — at runtime, on the server, in production.
 * The build does not complain and neither does tsc.
 *
 * This is not hypothetical. The model-family check added to
 * app/api/generate-image imported toModelFamily from lib/generation-checkout,
 * which begins with "use client" and pulls in lib/cdp-bridge. The call sat
 * AFTER claimForGeneration had consumed the intent and after the heartbeat had
 * started, so every paid generation would have thrown there — with the buyer's
 * authorisation already claimed. A pure string function had no business being
 * behind that boundary; it now lives in lib/generation/model-family.ts.
 */

const ROOT = join(__dirname, "..", "..");
const read = (p: string) => readFileSync(p, "utf8").split("\r\n").join("\n");

function walk(dir: string, match: (f: string) => boolean): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...walk(p, match));
    else if (match(entry)) out.push(p);
  }
  return out;
}

/** Resolve a "@/..." or relative import to a real file, or null for a package. */
function resolveLocal(from: string, spec: string): string | null {
  const base = spec.startsWith("@/")
    ? join(ROOT, spec.slice(2))
    : spec.startsWith(".")
      ? resolve(dirname(from), spec)
      : null;
  if (!base) return null;
  for (const c of [base, `${base}.ts`, `${base}.tsx`, join(base, "index.ts"), join(base, "index.tsx")]) {
    if (existsSync(c) && statSync(c).isFile()) return c;
  }
  return null;
}

const isClientModule = (file: string) =>
  /^\s*("use client"|'use client')/.test(read(file).trimStart());

/** Every local module a route pulls in, transitively, with the path that got there. */
function reachableFrom(entry: string): Map<string, string[]> {
  const seen = new Map<string, string[]>();
  const queue: { file: string; path: string[] }[] = [{ file: entry, path: [entry] }];
  while (queue.length) {
    const { file, path } = queue.shift()!;
    if (seen.has(file)) continue;
    seen.set(file, path);
    for (const m of read(file).matchAll(/(?:^|\n)\s*(?:import|export)[\s\S]*?from\s+["']([^"']+)["']/g)) {
      const dep = resolveLocal(file, m[1]);
      if (dep && !seen.has(dep)) queue.push({ file: dep, path: [...path, dep] });
    }
  }
  return seen;
}

describe("no route handler reaches a client module", () => {
  const routes = walk(join(ROOT, "app", "api"), (f) => f === "route.ts");

  it("finds the routes at all — a silent zero here would prove nothing", () => {
    expect(routes.length).toBeGreaterThan(10);
  });

  it("proves the detector works on a module that really is client-only", () => {
    // If this stops being a client module the test above becomes vacuous.
    expect(isClientModule(join(ROOT, "lib", "generation-checkout.ts"))).toBe(true);
    expect(isClientModule(join(ROOT, "lib", "generation", "model-family.ts"))).toBe(false);
  });

  it.each(routes.map((r) => [r.slice(ROOT.length + 1).split("\\").join("/"), r]))(
    "%s",
    (_label, route) => {
      const offenders: string[] = [];
      for (const [file, path] of reachableFrom(route as string)) {
        if (file !== route && isClientModule(file)) {
          offenders.push(path.map((p) => p.slice(ROOT.length + 1).split("\\").join("/")).join(" -> "));
        }
      }
      expect(offenders, `client module reached from a route handler:\n${offenders.join("\n")}`).toEqual([]);
    },
  );
});
