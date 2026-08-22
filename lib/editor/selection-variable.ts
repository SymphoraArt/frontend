/**
 * Can this text selection become a [variable], and over which exact range?
 *
 * The "+ Variable" pill has a bug history (Kev, 2026-08-22: "in der
 * vergangenheit sehr verbuggt"): phantom pills on clicks into an existing
 * selection, brackets spliced into the middle of other tokens, and
 * whitespace swallowed into the variable name. The TIMING half of the cure
 * (defer 80ms, re-verify) lives with each editor's DOM; the VALIDATION half
 * is pure and lives here, shared by every prompt editor so their rules
 * cannot drift.
 */
export type VariableRange = { start: number; end: number; name: string };

/** Source of the [token] pattern — NodeCreator's TOKEN_RE is built on it. */
export const TOKEN_SRC = "\\[[^\\]\\n]+\\]";

export function variableRange(value: string, start: number, end: number): VariableRange | null {
  if (start < 0 || end > value.length || end <= start) return null;
  const raw = value.slice(start, end);
  // Nothing but whitespace, spanning lines, or touching bracket characters —
  // wrapping any of those writes a token that does not parse.
  if (!raw.trim() || /[[\]\n]/.test(raw)) return null;
  // A selection overlapping an EXISTING token must never become a variable:
  // splicing brackets into a token corrupts the rename heuristic.
  const re = new RegExp(TOKEN_SRC, "g");
  let m: RegExpExecArray | null;
  while ((m = re.exec(value)) !== null) {
    if (start < m.index + m[0].length && end > m.index) return null;
  }
  // Boundary whitespace stays in the text, not in the variable name.
  const lead = raw.length - raw.trimStart().length;
  const trail = raw.length - raw.trimEnd().length;
  const s2 = start + lead, e2 = end - trail;
  const name = value.slice(s2, e2);
  return name ? { start: s2, end: e2, name } : null;
}
