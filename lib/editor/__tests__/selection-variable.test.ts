import { describe, it, expect } from "vitest";
import { variableRange } from "../selection-variable";

const BODY = "a castle at [time of day] under heavy rain";

describe("variableRange", () => {
  it("accepts a plain word selection and reports its trimmed range", () => {
    const s = BODY.indexOf("castle"), e = s + "castle".length;
    expect(variableRange(BODY, s, e)).toEqual({ start: s, end: e, name: "castle" });
  });

  it("trims boundary whitespace out of the name", () => {
    const s = BODY.indexOf(" castle"), e = BODY.indexOf("at ") + 3;
    const r = variableRange(BODY, s, e);
    expect(r?.name).toBe("castle at");
    expect(BODY.slice(r!.start, r!.end)).toBe("castle at");
  });

  it("refuses whitespace-only, collapsed and inverted selections", () => {
    expect(variableRange(BODY, 1, 2)).toBeNull(); // the space after "a"
    expect(variableRange("a  b", 1, 3)).toBeNull();
    expect(variableRange(BODY, 5, 5)).toBeNull();
    expect(variableRange(BODY, 8, 5)).toBeNull();
    expect(variableRange(BODY, -1, 4)).toBeNull();
    expect(variableRange("abcd", -5, -1)).toBeNull(); // negative pair slices to "abc" — only the bounds check refuses it
    expect(variableRange(BODY, 0, BODY.length + 1)).toBeNull();
  });

  it("refuses any overlap with an existing [token]", () => {
    const tokStart = BODY.indexOf("["), tokEnd = BODY.indexOf("]") + 1;
    expect(variableRange(BODY, tokStart + 1, tokEnd - 1)).toBeNull(); // inside
    expect(variableRange(BODY, 2, tokStart + 3)).toBeNull(); // straddles the [
    expect(variableRange(BODY, tokEnd - 2, tokEnd + 6)).toBeNull(); // straddles the ]
    expect(variableRange(BODY, tokStart, tokEnd)).toBeNull(); // the whole token
  });

  it("refuses selections containing brackets or newlines", () => {
    expect(variableRange("pick ] this", 3, 8)).toBeNull();
    expect(variableRange("pick [ this", 3, 8)).toBeNull();
    expect(variableRange("one\ntwo", 1, 6)).toBeNull();
  });

  it("still accepts text right next to a token", () => {
    const s = BODY.indexOf("under"), e = s + "under".length;
    expect(variableRange(BODY, s, e)?.name).toBe("under");
  });
});
