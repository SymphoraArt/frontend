/**
 * Map AI "defaults" JSON to our variable names (exact + case-insensitive keys).
 * Shared by /api/variable-defaults and PromptEditor apply step.
 */

function coerceToDefaultString(v: unknown): string {
  if (typeof v === "string") return v.trim();
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  if (v === null || v === undefined) return "";
  return String(v);
}

/** Prefer nested `defaults`; else use top-level entries (excluding `defaults` key). */
export function extractDefaultsRecord(
  parsed: Record<string, unknown> | null
): Record<string, unknown> {
  if (!parsed) return {};
  const inner = parsed.defaults;
  if (inner && typeof inner === "object" && !Array.isArray(inner)) {
    return inner as Record<string, unknown>;
  }
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(parsed)) {
    if (k === "defaults") continue;
    out[k] = v;
  }
  return out;
}

/**
 * Build canonical defaults keyed by each `variableNames` entry (trimmed),
 * matching AI keys case-insensitively when needed.
 */
export function mapAiDefaultsToVariableNames(
  raw: Record<string, unknown>,
  variableNames: string[]
): Record<string, string> {
  const byLower = new Map<string, { canonicalKey: string; value: string }>();
  for (const [k, v] of Object.entries(raw)) {
    const s = coerceToDefaultString(v);
    if (!s) continue;
    const key = k.trim();
    if (!key) continue;
    byLower.set(key.toLowerCase(), { canonicalKey: key, value: s });
  }

  const out: Record<string, string> = {};
  for (const name of variableNames) {
    const n = name.trim();
    if (!n) continue;
    const exact = raw[n];
    const fromExact = coerceToDefaultString(exact);
    if (fromExact) {
      out[n] = fromExact;
      continue;
    }
    const hit = byLower.get(n.toLowerCase());
    if (hit) out[n] = hit.value;
  }
  return out;
}

export function pickDefaultForVariable(
  defaults: Record<string, string>,
  v: { name: string; id: string }
): string | undefined {
  const keys = [v.name?.trim(), v.id?.trim()].filter(
    (x): x is string => Boolean(x)
  );
  for (const k of keys) {
    if (defaults[k] !== undefined && defaults[k] !== "") return defaults[k];
  }
  const target = (v.name || v.id || "").trim().toLowerCase();
  if (!target) return undefined;
  for (const [dk, val] of Object.entries(defaults)) {
    if (dk.trim().toLowerCase() === target) return val;
  }
  return undefined;
}
