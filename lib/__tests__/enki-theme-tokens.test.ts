import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

/* The admin panel shipped styled with `.ek-app` + --enki-* on a route that never
   loaded the stylesheet defining them. They silently resolved against the stale
   globals.css copy, which has no `.dark.theme-purple` block — so the whole panel
   stayed neutral black with an orange accent while the app went violet. Both
   halves of that failure are asserted here. */

const ROOT = fileURLToPath(new URL("../../", import.meta.url));
const SHELL_CSS = join(ROOT, "components/enki-shell/enki-shell.css");
const css = readFileSync(SHELL_CSS, "utf8");

const THEMES = {
  light: ".ek-app",
  dark: ".dark .ek-app",
  purple: ".dark.theme-purple .ek-app",
} as const;

function tokens(selector: string): Record<string, string> {
  const re = new RegExp(`(?:^|\\n)${selector.replace(/[.\\]/g, "\\$&")}\\s*\\{([\\s\\S]*?)\\n\\}`);
  const block = css.match(re);
  if (!block) throw new Error(`no rule for "${selector}" in enki-shell.css`);
  return Object.fromEntries(
    [...block[1].matchAll(/--(enki-[a-z0-9-]+):\s*(#[0-9a-fA-F]{3,8})/g)].map((m) => [m[1], m[2]]),
  );
}

function luminance(hex: string): number {
  const raw = hex.slice(1);
  const pairs = raw.length === 3 ? [...raw].map((c) => c + c) : (raw.match(/../g) as string[]);
  const [r, g, b] = pairs.map((h) => {
    const v = parseInt(h, 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

function tsxFiles(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name.startsWith(".")) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) tsxFiles(full, out);
    else if (name.endsWith(".tsx")) out.push(full);
  }
  return out;
}

describe("enki theme tokens", () => {
  it("every --enki-* token has a dark and a purple value", () => {
    const light = tokens(THEMES.light);
    // Guard the guard: a selector rename would otherwise make this vacuous.
    expect(Object.keys(light).length).toBeGreaterThanOrEqual(9);
    for (const [theme, selector] of Object.entries(THEMES)) {
      if (theme === "light") continue;
      expect(Object.keys(tokens(selector)).sort()).toEqual(Object.keys(light).sort());
    }
  });

  it.each(Object.entries(THEMES))("text tokens clear 4.5:1 in %s", (_theme, selector) => {
    const t = tokens(selector);
    for (const surface of ["enki-paper", "enki-paper-2"] as const) {
      for (const ink of ["enki-ink", "enki-ink-2"] as const) {
        expect(contrast(t[ink], t[surface])).toBeGreaterThanOrEqual(4.5);
      }
    }
    // Danger is body text (ban reasons, the quorum warning) and only ever sits
    // on --enki-paper; it is the token that replaced the #8B2E2E at 2.27:1.
    expect(contrast(t["enki-danger"], t["enki-paper"])).toBeGreaterThanOrEqual(4.5);
  });

  it.each(Object.entries(THEMES))("accent tokens clear 3:1 in %s", (_theme, selector) => {
    const t = tokens(selector);
    for (const accent of ["enki-ember", "enki-turq"] as const) {
      expect(contrast(t[accent], t["enki-paper"])).toBeGreaterThanOrEqual(3);
    }
  });

  // Walks every .tsx under app/ and components/, so it is disk-bound rather
  // than slow: measured 19s on a loaded machine against vitest's 5s default.
  // An explicit budget, and each file read ONCE instead of twice — a test that
  // goes red depending on disk contention teaches people to ignore red.
  it("every page that mounts .ek-app loads the stylesheet defining it", () => {
    // `"ek-app"` is the class literal; `".ek-app"` (querySelector) is not a mount.
    const mounts = tsxFiles(join(ROOT, "app"))
      .concat(tsxFiles(join(ROOT, "components")))
      .map((file) => ({ file, source: readFileSync(file, "utf8") }))
      .filter(({ source }) => source.includes('"ek-app"'));

    expect(mounts.length).toBeGreaterThanOrEqual(3);
    for (const { file, source } of mounts) {
      expect(source, file).toContain("enki-shell.css");
    }
  }, 60_000);
});
