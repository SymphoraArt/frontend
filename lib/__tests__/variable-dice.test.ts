import { describe, it, expect } from "vitest";
import {
  buildDiceMessages,
  diceableVariables,
  validateDiceValues,
  DICE_LIMITS,
  type DiceVariable,
} from "@/lib/generation/variable-dice";

/**
 * The dice endpoint hands model output to UI state and user text to a paid
 * third party. Both directions are places to lie: the model can invent
 * options and ranges, and a caller can try to use the endpoint as a free LLM
 * proxy. Everything here checks that what goes in is capped and what comes
 * back is disbelieved by default.
 */

const VARS: DiceVariable[] = [
  { id: "v1", name: "season", type: "single-select", options: [{ promptValue: "winter" }, { promptValue: "summer" }] },
  { id: "v2", name: "mood", type: "text", description: "overall mood of the scene" },
  { id: "v3", name: "intensity", type: "slider", min: 1, max: 10 },
  { id: "v4", name: "night", type: "checkbox" },
  { id: "v5", name: "props", type: "multi-select", options: [{ promptValue: "lantern" }, { promptValue: "umbrella" }] },
  { id: "v6", name: "reference", type: "image" },
];

describe("what reaches the model", () => {
  it("never offers an image variable — a text model would invent a URL", () => {
    const sent = diceableVariables(VARS);
    expect(sent.map((v) => v.id)).not.toContain("v6");
    expect(sent).toHaveLength(5);
  });

  it("caps count and field lengths, so the endpoint is useless as a proxy", () => {
    const many = Array.from({ length: 60 }, (_, i) => ({
      id: `x${i}`,
      name: "n".repeat(5000),
      description: "d".repeat(5000),
      type: "text" as const,
    }));
    const sent = diceableVariables(many);
    expect(sent).toHaveLength(DICE_LIMITS.maxVariables);
    expect(sent[0].name.length).toBe(DICE_LIMITS.maxFieldLen);
    expect(sent[0].description!.length).toBe(DICE_LIMITS.maxFieldLen);
  });

  it("clips the context and sends every variable in ONE request", () => {
    const messages = buildDiceMessages(diceableVariables(VARS), "c".repeat(10_000));
    expect(messages).toHaveLength(2);
    const user = messages[1].content;
    expect(user).not.toContain("c".repeat(DICE_LIMITS.maxContextLen + 1));
    // One call for all variables is what makes the values coherent — "season"
    // and "props" must be invented together, not independently.
    for (const id of ["v1", "v2", "v3", "v4", "v5"]) expect(user).toContain(`"${id}"`);
  });

  it("tells the model the allowed select values verbatim", () => {
    const user = buildDiceMessages(diceableVariables(VARS), undefined)[1].content;
    expect(user).toContain('"winter"');
    expect(user).toContain('"lantern"');
    expect(user).toContain("between 1 and 10");
  });
});

describe("what comes back is disbelieved by default", () => {
  it("keeps a fully valid, coherent set", () => {
    const out = validateDiceValues(VARS, {
      v1: "winter",
      v2: "  quiet, snowed-in stillness  ",
      v3: 7,
      v4: true,
      v5: ["lantern"],
    });
    expect(out).toEqual({
      v1: "winter",
      v2: "quiet, snowed-in stillness",
      v3: 7,
      v4: true,
      v5: ["lantern"],
    });
  });

  it("drops an invented select option instead of passing it to the UI", () => {
    expect(validateDiceValues(VARS, { v1: "monsoon" })).toEqual({});
  });

  it("clamps a number into its declared range", () => {
    expect(validateDiceValues(VARS, { v3: 9999 })).toEqual({ v3: 10 });
    expect(validateDiceValues(VARS, { v3: -5 })).toEqual({ v3: 1 });
  });

  it("drops keys for variables that were never asked about", () => {
    // "winter" would VALIDATE under v1's rules — the key must be dropped
    // because it is unknown, not because its value happens to look wrong. A
    // validator that resolves unknown ids to some variable passes the sloppy
    // version of this test.
    expect(validateDiceValues(VARS, { ghost: "winter", v4: false })).toEqual({ v4: false });
  });

  it("drops a value for the image variable even if the model invents one", () => {
    expect(validateDiceValues(VARS, { v6: "https://evil.example/x.png" })).toEqual({});
  });

  it("filters a multi-select down to the allowed values and dedupes", () => {
    expect(validateDiceValues(VARS, { v5: ["lantern", "sword", "lantern", "umbrella"] })).toEqual({
      v5: ["lantern", "umbrella"],
    });
  });

  it("truncates runaway free text to the cap", () => {
    const out = validateDiceValues(VARS, { v2: "a".repeat(10_000) });
    expect((out.v2 as string).length).toBe(DICE_LIMITS.maxTextLen);
  });

  it("rejects non-object replies outright", () => {
    expect(validateDiceValues(VARS, null)).toEqual({});
    expect(validateDiceValues(VARS, "winter")).toEqual({});
    expect(validateDiceValues(VARS, ["winter"])).toEqual({});
  });

  it("coerces a stringified number for a slider but not a boolean for a checkbox", () => {
    // "7" for a slider is the model being sloppy about types; "true" for a
    // checkbox is ambiguous ("true" the word could be a text answer) — one is
    // recoverable, the other is dropped.
    expect(validateDiceValues(VARS, { v3: "7" })).toEqual({ v3: 7 });
    expect(validateDiceValues(VARS, { v4: "true" })).toEqual({});
  });
});
