import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * /api/prompt must write the columns the live prompts table actually has.
 *
 * The route was written against a schema that no longer exists: user_id,
 * price, iv, auth_tag, uploaded_photos, downloads, rating. Every one of them
 * is a PostgREST 400 on the live table (probed 2026-08-11), which made every
 * save from the editor fail with PGRST204 — and the ownership filter
 * .in("user_id", ...) on the update branch matched nothing, so re-saves
 * 404'd silently. The bare `variables` table is a 404 too; the live one is
 * prompt_variables.
 *
 * This scans the route source the same way content-routes-moderated.test.ts
 * does: the dead column names must never come back as prompts-write keys,
 * and the live ones (creator_id, price_usd_cents, encrypted_content_kid)
 * must be present. A revert of the retarget turns this file red.
 */

const ROOT = join(__dirname, "..", "..");
const ROUTE = join(ROOT, "app", "api", "prompt", "route.ts");

const src = readFileSync(ROUTE, "utf8");

/** The one object literal both branches write to prompts. */
function promptRowBlock(): string {
  const m = src.match(/const promptRow = \{([\s\S]*?)\n\s*\};/);
  expect(m, "promptRow literal not found — the scan has nothing to check").not.toBeNull();
  return m![1];
}

/** The insert-branch payload spread on top of promptRow. */
function insertBlock(): string {
  const m = src.match(/\.from\("prompts"\)\s*\.insert\(\{([\s\S]*?)\}\)/);
  expect(m, "prompts insert payload not found").not.toBeNull();
  return m![1];
}

/** The column list GET selects from prompts. */
function promptSelect(): string {
  const m = src.match(/\.from\("prompts"\)\s*\.select\(\s*"([^"]+)"/);
  expect(m, "prompts select list not found").not.toBeNull();
  return m![1];
}

/** The rows written to prompt_variables. */
function variableRowsBlock(): string {
  const m = src.match(/const variableRows = vars\.map\(([\s\S]*?)\n\s*\}\);/);
  expect(m, "variableRows literal not found").not.toBeNull();
  return m![1];
}

describe("/api/prompt writes only live prompts columns", () => {
  it("never uses a dead column as a prompts-write key", () => {
    const written = promptRowBlock() + insertBlock();
    // Anchored as object keys: `price:` must not match `price_usd_cents:`,
    // `iv:` must not match `encrypted_content_iv:`.
    for (const dead of ["user_id", "price", "iv", "auth_tag", "uploaded_photos", "downloads", "rating"]) {
      expect(written, `dead column '${dead}' is written to prompts again`).not.toMatch(
        new RegExp(`^\\s*${dead}:`, "m")
      );
    }
  });

  it("writes the live creator/price/kid columns", () => {
    const written = promptRowBlock() + insertBlock();
    expect(written).toMatch(/^\s*price_usd_cents:/m);
    expect(written).toMatch(/^\s*encrypted_content_kid:/m);
    expect(written).toMatch(/^\s*encrypted_content_iv:/m);
    expect(written).toMatch(/^\s*encrypted_content_tag:/m);
    expect(written).toMatch(/^\s*showcase_images:/m);
    expect(insertBlock()).toMatch(/^\s*creator_id:/m);
  });

  it("converts the body's dollars to integer cents at the boundary", () => {
    expect(src).toMatch(/Math\.round\(body\.price \* 100\)/);
  });

  it("scopes the ownership filter to creator_id, never the dead user_id", () => {
    // An UPDATE keyed on a column that does not exist matches nothing and
    // reports "not found" for every prompt, including your own.
    expect(src).toMatch(/\.in\("creator_id"/);
    expect(src).not.toMatch(/\.in\("user_id"/);
  });

  it("selects live columns on GET", () => {
    const sel = promptSelect();
    for (const col of ["creator_id", "price_usd_cents", "encrypted_content_kid", "showcase_images"]) {
      expect(sel, `GET no longer selects '${col}'`).toContain(col);
    }
    // \bprice\b cannot match inside price_usd_cents (underscore is a word
    // character), so this catches only the dead bare column.
    for (const dead of [/\buser_id\b/, /\bprice\b(?!_usd)/, /\biv\b/, /\bauth_tag\b/, /\buploaded_photos\b/]) {
      expect(sel, `GET selects a dead column: ${dead}`).not.toMatch(dead);
    }
  });

  it("uses lib/crypto's keyring, not hand-rolled cipher calls", () => {
    expect(src).toMatch(/from "@\/lib\/crypto"/);
    expect(src, "route rolls its own cipher again").not.toMatch(/createCipheriv|createDecipheriv/);
  });
});

describe("/api/prompt writes only live prompt_variables columns", () => {
  it("targets prompt_variables, never the nonexistent variables table", () => {
    expect(src).toMatch(/\.from\("prompt_variables"\)/);
    expect(src, "the bare `variables` table is a PostgREST 404").not.toMatch(/\.from\("variables"\)/);
  });

  it("writes the live enum/constraint columns, not the client field names", () => {
    const rows = variableRowsBlock();
    expect(rows).toMatch(/^\s*data_type:/m);
    expect(rows).toMatch(/^\s*is_required:/m);
    expect(rows).toMatch(/^\s*min_value:/m);
    expect(rows).toMatch(/^\s*max_value:/m);
    for (const dead of ["type", "required", "min", "max"]) {
      expect(rows, `client-shaped key '${dead}:' written to prompt_variables`).not.toMatch(
        new RegExp(`^\\s*${dead}:`, "m")
      );
    }
  });

  it("maps the client variable types onto the live enum labels", () => {
    // variable_data_type has no 'image'/'multi-select'/'single-select'
    // labels; unmapped they are enum errors that fail the whole save.
    expect(src).toContain('"reference_image"');
    expect(src).toContain('"multi_select"');
    expect(src).toContain('"single_select"');
  });
});
