import { describe, it, expect } from "vitest";
import { moveToken } from "../move-token";

const TOKENS = /\[[^\]\n]+\]/g;
const BODY = "[var_1] [var_2] hello [Reference Image 1]";
const V1 = { start: 0, end: 7 };

describe("moveToken", () => {
  it("moves a token to the very end", () => {
    const r = moveToken(BODY, V1.start, V1.end, BODY.length);
    expect(r?.body).toBe(" [var_2] hello [Reference Image 1] [var_1]");
  });

  it("separates the token from the chip it lands behind", () => {
    // Without the separator this reads "…Image 1][var_1]" — one run of text.
    const r = moveToken(BODY, V1.start, V1.end, BODY.length);
    expect(r?.body.endsWith("] [var_1]")).toBe(true);
  });

  it("never fuses two tokens, wherever it lands", () => {
    for (let target = 0; target <= BODY.length; target++) {
      const r = moveToken(BODY, V1.start, V1.end, target);
      if (!r) continue;
      expect(r.body, "target " + target).not.toMatch(/\]\[/);
    }
  });

  it("leaves every other token intact at every drop position", () => {
    const kept = ["[var_2]", "[Reference Image 1]"];
    for (let target = 0; target <= BODY.length; target++) {
      const r = moveToken(BODY, V1.start, V1.end, target);
      if (!r) continue;
      const found = r.body.match(TOKENS) ?? [];
      expect(found, "target " + target).toHaveLength(3);
      for (const k of kept) expect(r.body, "target " + target).toContain(k);
      expect(r.body).toContain("[var_1]");
    }
  });

  it("puts the caret just after the moved token", () => {
    for (let target = 0; target <= BODY.length; target++) {
      const r = moveToken(BODY, V1.start, V1.end, target);
      if (!r) continue;
      expect(r.body.slice(r.caret - 7, r.caret), "target " + target).toBe("[var_1]");
    }
  });

  it("moves a token to the very start", () => {
    const start = BODY.indexOf("[Reference Image 1]");
    const r = moveToken(BODY, start, start + "[Reference Image 1]".length, 0);
    expect(r?.body).toBe("[Reference Image 1] [var_1] [var_2] hello ");
  });

  it("refuses a drop onto the token itself", () => {
    for (let target = V1.start; target <= V1.end; target++) {
      expect(moveToken(BODY, V1.start, V1.end, target)).toBeNull();
    }
  });

  it("refuses indices that do not describe a token", () => {
    expect(moveToken(BODY, 1, 6, 30)).toBeNull();          // inside the brackets
    expect(moveToken(BODY, -1, 7, 30)).toBeNull();
    expect(moveToken(BODY, 0, BODY.length + 1, 3)).toBeNull();
    expect(moveToken(BODY, 5, 5, 3)).toBeNull();
    expect(moveToken(BODY, V1.start, V1.end, BODY.length + 1)).toBeNull();
  });

  it("does not add spacing where whitespace already exists", () => {
    const b = "[a] one two";
    const r = moveToken(b, 0, 3, b.length);
    expect(r?.body).toBe(" one two [a]");
    const r2 = moveToken("one [a] two", 4, 7, 0);
    expect(r2?.body).toBe("[a] one  two");
  });
});
