import { describe, it, expect } from "vitest";
import { parseImageInput } from "@/backend/services/gemini-image-generation";

/**
 * The whole reference-image feature hangs on this parser. Gemini rejects the
 * request with a 400 if `data` still carries the "data:<mime>;base64," prefix
 * — verified against the live API — so getting this wrong means every
 * generation with a reference fails, or silently drops the image.
 */
describe("parseImageInput", () => {
  it("splits a data URL into mime type and BARE base64", () => {
    expect(parseImageInput("data:image/png;base64,iVBORw0KGgo=")).toEqual({
      mimeType: "image/png",
      data: "iVBORw0KGgo=",
    });
    expect(parseImageInput("data:image/jpeg;base64,/9j/4AAQ")).toEqual({
      mimeType: "image/jpeg",
      data: "/9j/4AAQ",
    });
  });

  it("never leaves the prefix on the payload — the 400 the API returns", () => {
    const out = parseImageInput("data:image/png;base64,iVBORw0KGgo=");
    expect(out!.data).not.toContain("data:");
    expect(out!.data).not.toContain("base64,");
  });

  it("handles base64 containing newlines, which readAsDataURL can emit", () => {
    const out = parseImageInput("data:image/png;base64,iVBO\nRw0K\nGgo=");
    expect(out!.data).toBe("iVBO\nRw0K\nGgo=");
    expect(out!.mimeType).toBe("image/png");
  });

  it("treats a bare payload as PNG rather than dropping it", () => {
    expect(parseImageInput("iVBORw0KGgo=")).toEqual({ mimeType: "image/png", data: "iVBORw0KGgo=" });
  });

  it("returns null for junk instead of sending something unusable", () => {
    expect(parseImageInput("")).toBeNull();
    expect(parseImageInput("   ")).toBeNull();
    // A well-formed prefix with no payload must not become an empty part.
    expect(parseImageInput("data:image/png;base64,")).toBeNull();
    // @ts-expect-error — guarding the runtime, not the types
    expect(parseImageInput(undefined)).toBeNull();
  });

  it("is mutation-tested: a parser that returned its input would fail here", () => {
    const url = "data:image/webp;base64,UklGRg==";
    const out = parseImageInput(url)!;
    expect(out.data).not.toBe(url);
    expect(out.mimeType).toBe("image/webp");
    expect(out.data.length).toBeLessThan(url.length);
  });
});
