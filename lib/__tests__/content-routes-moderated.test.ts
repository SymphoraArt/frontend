import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

/**
 * Every route that accepts user content into the gallery must moderate it.
 *
 * gallery/upload did not, for its whole life. generate-image and generate-free
 * both gated on the filter, so uploading was the one way in that nothing
 * watched — and the easier one, because the uploader brings their own image
 * and only has to get the text past us.
 *
 * A test naming the routes we know about would not have caught it, because
 * nobody would have added the missing one to the list. So this SCANS instead:
 * anything that writes user text into generated_images or prompts has to show
 * a moderate() call, and a route added next year is covered without anyone
 * remembering this file exists.
 */

const ROOT = join(__dirname, "..", "..");
const API = join(ROOT, "app", "api");

function routeFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...routeFiles(p));
    else if (entry === "route.ts") out.push(p);
  }
  return out;
}

/**
 * Writes user-authored text into a table the gallery or marketplace reads.
 *
 * Direct chain only. A window of a few hundred characters between .from() and
 * .insert() also matches two unrelated statements that happen to sit near each
 * other — app/api/admin/route.ts reads `prompts` in one place and inserts into
 * `bans` in another, and a loose pattern called that an unmoderated content
 * route.
 */
const WRITES_USER_TEXT = /\.from\(\s*["'](generated_images|prompts)["']\s*\)\s*\.(insert|upsert)\(/;

const rel = (p: string) => p.slice(ROOT.length + 1).replace(/\\/g, "/");

describe("no unmoderated way into the gallery", () => {
  const routes = routeFiles(API).map((p) => ({ path: p, src: readFileSync(p, "utf8") }));

  it("finds routes to check at all, so the scan cannot pass vacuously", () => {
    expect(routes.length).toBeGreaterThan(10);
    expect(routes.some((r) => rel(r.path).includes("gallery/upload"))).toBe(true);
  });

  it("moderates every route that writes user text into the gallery", () => {
    const unguarded = routes
      .filter((r) => WRITES_USER_TEXT.test(r.src))
      .filter((r) => !/\bmoderate\s*\(/.test(r.src))
      .map((r) => rel(r.path));

    expect(unguarded, `these accept user content with no moderation call:\n${unguarded.join("\n")}`).toEqual([]);
  });

  it("moderates the upload BEFORE storing the file, not after", () => {
    // A refusal that lands after the upload means deleting something already
    // written — and paying for the storage of content we just rejected.
    const src = readFileSync(join(API, "gallery", "upload", "route.ts"), "utf8");
    const moderatedAt = src.search(/\bawait moderate\s*\(/);
    const uploadedAt = src.search(/\bawait uploadToBlob\s*\(/);
    expect(moderatedAt, "no await moderate() in the upload route").toBeGreaterThan(-1);
    expect(uploadedAt, "no await uploadToBlob() in the upload route").toBeGreaterThan(-1);
    expect(moderatedAt).toBeLessThan(uploadedAt);
  });

  it("refuses a blocked upload with the generic client message", () => {
    // The client learns only that it was refused. Category, tier and rule ids
    // stay server-side, or the endpoint becomes an oracle for mapping the
    // filter.
    const src = readFileSync(join(API, "gallery", "upload", "route.ts"), "utf8");
    expect(src).toMatch(/if\s*\(\s*!verdict\.allowed\s*\)/);
    expect(src).toContain("CLIENT_BLOCK_MESSAGE");
  });

  it("moderates the title as well as the caption", () => {
    // Both are displayed in the same places; filtering one just moves the
    // payload one field across.
    const src = readFileSync(join(API, "gallery", "upload", "route.ts"), "utf8");
    const call = src.match(/const moderatedText = ([^;]+);/);
    expect(call, "moderatedText is not assembled in one place any more").not.toBeNull();
    expect(call![1]).toContain("sanitizedPrompt");
    expect(call![1]).toContain("title");
  });

  it("records the verdict so the evidence trail covers uploads too", () => {
    const src = readFileSync(join(API, "gallery", "upload", "route.ts"), "utf8");
    expect(src).toMatch(/recordModerationEvent\(/);
    // after(), not a bare promise: a block returns immediately and the lambda
    // can be frozen before the insert lands.
    expect(src).toMatch(/after\(\s*recordModerationEvent\(/);
  });
});
