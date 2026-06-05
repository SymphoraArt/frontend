/**
 * Build a fully self-contained, standalone HTML export of the /editor.
 *
 * It inlines the real editor stylesheet (app/editor/algency-editor.css)
 * into scripts/editor-export.template.html (at the /*__EDITOR_CSS__*\/
 * placeholder) and writes the result to public/editor-export.html.
 *
 * Run:  node scripts/export-editor.mjs
 *
 * The exported file reproduces the editor layout, CSS, and core client-side
 * behaviors. Image generation calls /api/generate-free on the configurable
 * "API base" — so it fully functions when opened against the running app
 * (e.g. http://localhost:3000) or served from the same origin.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const cssPath = join(root, "app", "editor", "algency-editor.css");
const templatePath = join(__dirname, "editor-export.template.html");
const outPath = join(root, "public", "editor-export.html");

const css = readFileSync(cssPath, "utf8");
const template = readFileSync(templatePath, "utf8");

const placeholder = "/*__EDITOR_CSS__*/";
if (!template.includes(placeholder)) {
  console.error(`Placeholder ${placeholder} not found in template.`);
  process.exit(1);
}

// Guard against accidentally breaking out of the <style> block.
const safeCss = css.replace(/<\/style>/gi, "<\\/style>");
const html = template.replace(placeholder, safeCss);

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, html, "utf8");

const kb = (Buffer.byteLength(html, "utf8") / 1024).toFixed(1);
console.log(`✓ Exported standalone editor → public/editor-export.html (${kb} KB)`);
console.log(`  Inlined CSS: ${(Buffer.byteLength(css, "utf8") / 1024).toFixed(1)} KB from algency-editor.css`);
