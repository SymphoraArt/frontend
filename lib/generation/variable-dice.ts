/**
 * The dice: invent ONE coherent set of values for a prompt's variables.
 *
 * Kev, 2026-08-07: "damit man den workflow analysiert und dann zufällige
 * inputs sich ausdenkt die sinn machen." The operative word is COHERENT — a
 * workflow with "season" and "clothing" must not roll "winter" plus
 * "swimsuit", so all variables go to the model in ONE call and come back as
 * one set. Per-variable calls would be cheaper to retry but independent, and
 * independent is exactly the failure Kev named.
 *
 * This file is the pure core: building the request and validating the answer.
 * The route stays thin, and everything that can lie — the model inventing
 * options, numbers out of range, values for variables we never asked about —
 * is caught HERE, where a test can reach it without a network.
 */

/** The shape every gen UI can map its own variable state onto. */
export interface DiceVariable {
  /** Stable client-side key the values come back under. */
  id: string;
  name: string;
  label?: string;
  description?: string;
  type: "text" | "checkbox" | "slider" | "single-select" | "multi-select" | "image";
  /** For selects: the only values the dice may pick from. */
  options?: { label?: string; visibleName?: string; promptValue: string }[];
  min?: number;
  max?: number;
}

export type DiceValue = string | number | boolean | string[];

/** Caps that keep the endpoint useless as a free LLM proxy. */
export const DICE_LIMITS = {
  maxVariables: 24,
  maxTextLen: 120, // per generated text value
  maxFieldLen: 200, // per incoming name/label/description
  maxContextLen: 1200,
  maxTokens: 900,
} as const;

/**
 * Only what the model needs, capped. The context is the PUBLIC prompt text or
 * the artist's own draft — never a decrypted marketplace prompt on a buyer's
 * behalf: the values leak intent by design (that is their job), but the
 * artist's full text must not ride along to a third party for a buyer's
 * convenience feature.
 */
/** A live prompt_variables row, as the dice needs it. */
export interface PromptVariableRow {
  name: string;
  label?: string | null;
  description?: string | null;
  data_type: string;
  min_value?: number | null;
  max_value?: number | null;
  options?: unknown;
}

/**
 * Map a stored prompt_variables row onto the dice's wire shape.
 *
 * The id is the NAME, not the row uuid: names are unique per prompt (the
 * table enforces it), and every generation surface keys its filled-in values
 * by name first — a roll keyed by row uuids would come back unappliable.
 *
 * The db's enum is richer than the dice's vocabulary, so this is where it
 * narrows: number behaves as a slider (a clamped range is the only honest way
 * to validate a model-invented number), color rolls as text (a short phrase
 * like "burnt sienna" is exactly what a prompt wants), radio is a
 * single-select by another UI name, and reference_image maps to image so the
 * existing filter drops it before the model can invent a URL.
 */
export function rowToDiceVariable(row: PromptVariableRow): DiceVariable {
  const type: DiceVariable["type"] =
    row.data_type === "checkbox" || row.data_type === "boolean" ? "checkbox"
    : row.data_type === "number" || row.data_type === "slider" ? "slider"
    : row.data_type === "single_select" || row.data_type === "radio" ? "single-select"
    : row.data_type === "multi_select" ? "multi-select"
    : row.data_type === "reference_image" ? "image"
    : "text"; // text, long_text, color — and any enum value added after this was written

  const options = Array.isArray(row.options)
    ? (row.options as { promptValue?: unknown; label?: unknown; visibleName?: unknown }[])
        .filter((o) => typeof o?.promptValue === "string")
        .map((o) => ({
          promptValue: o.promptValue as string,
          label:
            typeof o.label === "string" ? o.label
            : typeof o.visibleName === "string" ? o.visibleName
            : undefined,
        }))
    : undefined;

  return {
    id: row.name,
    name: row.name,
    label: row.label ?? undefined,
    description: row.description ?? undefined,
    type,
    options,
    min: typeof row.min_value === "number" ? row.min_value : undefined,
    max: typeof row.max_value === "number" ? row.max_value : undefined,
  };
}

export function diceableVariables(vars: DiceVariable[]): DiceVariable[] {
  const clip = (s: string | undefined) => (s ?? "").slice(0, DICE_LIMITS.maxFieldLen);
  return vars
    // An image cannot be invented by a text model; offering it a slot would
    // only invite a hallucinated URL.
    .filter((v) => v.type !== "image")
    .slice(0, DICE_LIMITS.maxVariables)
    .map((v) => ({
      id: String(v.id),
      name: clip(v.name),
      label: clip(v.label) || undefined,
      description: clip(v.description) || undefined,
      type: v.type,
      options: v.options?.slice(0, 40).map((o) => ({
        promptValue: clip(o.promptValue),
        label: clip(o.label ?? o.visibleName) || undefined,
      })),
      min: typeof v.min === "number" ? v.min : undefined,
      max: typeof v.max === "number" ? v.max : undefined,
    }));
}

export function buildDiceMessages(
  vars: DiceVariable[],
  context: string | undefined,
): { role: "system" | "user"; content: string }[] {
  const lines = vars.map((v) => {
    const parts = [`- id "${v.id}" — ${v.name}${v.label && v.label !== v.name ? ` (${v.label})` : ""}`];
    if (v.description) parts.push(`  purpose: ${v.description}`);
    if (v.type === "single-select" || v.type === "multi-select") {
      parts.push(`  type: ${v.type}; allowed values: ${(v.options ?? []).map((o) => JSON.stringify(o.promptValue)).join(", ") || "(none)"}`);
    } else if (v.type === "slider") {
      parts.push(`  type: number between ${v.min ?? 0} and ${v.max ?? 100}`);
    } else if (v.type === "checkbox") {
      parts.push("  type: boolean");
    } else {
      parts.push(`  type: short free text, at most ${DICE_LIMITS.maxTextLen} characters`);
    }
    return parts.join("\n");
  });

  return [
    {
      role: "system",
      content:
        "You fill in the variables of an image-generation prompt template with one plausible, imaginative set of values. " +
        "The values MUST be coherent with each other — they describe one single scene, not independent picks. " +
        "Rules: reply with ONLY a JSON object mapping each variable id to its value; " +
        "for select variables use one of the allowed values verbatim (an array of them for multi-select); " +
        "numbers stay inside their range; booleans are true or false; free text stays short and concrete. " +
        "Never add keys that were not asked for, never explain, never refuse.",
    },
    {
      role: "user",
      content:
        (context ? `Prompt template (for context only):\n${context.slice(0, DICE_LIMITS.maxContextLen)}\n\n` : "") +
        `Variables:\n${lines.join("\n")}\n\nOne coherent set of values, as JSON.`,
    },
  ];
}

/**
 * Trust nothing that came back. Every value is checked against ITS variable's
 * declaration; anything the model invented — unknown ids, options not in the
 * list, numbers out of range — is dropped rather than passed to the UI, and
 * a dropped value simply leaves that field as the user had it.
 */
export function validateDiceValues(
  vars: DiceVariable[],
  raw: unknown,
): Record<string, DiceValue> {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) return {};
  const byId = new Map(vars.map((v) => [v.id, v]));
  const out: Record<string, DiceValue> = {};

  for (const [id, value] of Object.entries(raw as Record<string, unknown>)) {
    const v = byId.get(id);
    if (!v) continue;

    switch (v.type) {
      case "checkbox": {
        if (typeof value === "boolean") out[id] = value;
        break;
      }
      case "slider": {
        const n = typeof value === "number" ? value : Number(value);
        if (!Number.isFinite(n)) break;
        const lo = v.min ?? 0;
        const hi = v.max ?? 100;
        out[id] = Math.min(hi, Math.max(lo, n));
        break;
      }
      case "single-select": {
        const allowed = new Set((v.options ?? []).map((o) => o.promptValue));
        if (typeof value === "string" && allowed.has(value)) out[id] = value;
        break;
      }
      case "multi-select": {
        const allowed = new Set((v.options ?? []).map((o) => o.promptValue));
        const picks = (Array.isArray(value) ? value : [value]).filter(
          (x): x is string => typeof x === "string" && allowed.has(x),
        );
        if (picks.length) out[id] = [...new Set(picks)];
        break;
      }
      case "text": {
        if (typeof value === "string" && value.trim()) {
          out[id] = value.trim().slice(0, DICE_LIMITS.maxTextLen);
        }
        break;
      }
      // "image" was filtered out before the model ever saw it; a value for it
      // here is by definition invented, so it falls through and is dropped.
    }
  }
  return out;
}
