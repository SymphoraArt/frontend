import { readFileSync } from "node:fs";

/**
 * Source as the COMPILER sees it — comments removed.
 *
 * Several tests here assert on a route's source because the wiring is the
 * thing under test: "does anyone actually call this" was the entire bug in
 * both the heartbeat and the model-family cases. Matching the raw file made
 * those assertions weaker than they read: commenting a call out
 * (`// heartbeat = startHeartbeat(...)`) left every regex satisfied while the
 * bug was fully restored. An adversarial review pointed that out and it was
 * right — the mutation probes that "proved" those tests had only ever DELETED
 * the lines.
 *
 * Stripping comments is not a parser and does not pretend to be one; it is the
 * difference between "the text appears somewhere" and "the text appears in
 * code". String literals containing // or /* are the known blind spot, and
 * none of the call sites these tests guard is inside one.
 */
export function readSource(path: string): string {
  const raw = readFileSync(path, "utf8").split("\r\n").join("\n");
  let out = "";
  let i = 0;
  type Mode = "code" | "line" | "block" | "sq" | "dq" | "tpl";
  let mode: Mode = "code";
  while (i < raw.length) {
    const c = raw[i];
    const next = raw[i + 1];
    if (mode === "code") {
      if (c === "/" && next === "/") { mode = "line"; i += 2; continue; }
      if (c === "/" && next === "*") { mode = "block"; i += 2; continue; }
      if (c === "'") mode = "sq";
      else if (c === '"') mode = "dq";
      else if (c === "`") mode = "tpl";
      out += c; i++; continue;
    }
    if (mode === "line") {
      if (c === "\n") { mode = "code"; out += c; }
      i++; continue;
    }
    if (mode === "block") {
      if (c === "*" && next === "/") { mode = "code"; i += 2; continue; }
      if (c === "\n") out += c;   // keep line numbers roughly honest
      i++; continue;
    }
    // inside a string: copy through, honouring escapes
    if (c === "\\") { out += c + (next ?? ""); i += 2; continue; }
    if ((mode === "sq" && c === "'") || (mode === "dq" && c === '"') || (mode === "tpl" && c === "`")) mode = "code";
    out += c; i++;
  }
  return out;
}
