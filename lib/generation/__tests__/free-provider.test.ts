import { describe, expect, it, vi } from "vitest";
import { generateImageWithPollinations } from "@/backend/services/pollinations-image-generation";

/*
 * The module under test lives in backend/services/, but vitest only collects
 * lib/ ** /__tests__ — so the test lives here rather than next to its subject.
 * Widening the include pattern to reach backend/ would sweep in every file
 * under it, including ones that talk to paid providers; the naming rules alone
 * are not worth betting the billing on. The import path is explicit, so the
 * coupling is visible.
 *
 * What this pins is the two things measured against the live free provider on
 * 2026-08-12, both of which were user-visible and neither of which any type
 * would have caught:
 *
 *   - a 429 read as a permanent failure, so a burst showed "generation failed"
 *   - "4K" asking for 1024px, which the provider caps to the same 686x858 it
 *     returns for 768px, at roughly twice the wait
 */

type FetchArgs = { url: string };

function mockFetch(response: Response): FetchArgs {
  const seen: FetchArgs = { url: "" };
  vi.stubGlobal("fetch", async (input: RequestInfo | URL) => {
    seen.url = String(input);
    return response;
  });
  return seen;
}

function imageResponse(): Response {
  // A JPEG SOI is enough — the adapter only forwards the bytes.
  return new Response(new Uint8Array([0xff, 0xd8, 0xff, 0xe0]), { status: 200 });
}

function errorResponse(status: number, statusText: string): Response {
  return new Response(null, { status, statusText });
}

function dimensionsOf(url: string): { width: number; height: number } {
  const params = new URL(url).searchParams;
  return {
    width: Number(params.get("width")),
    height: Number(params.get("height")),
  };
}

describe("free provider: failure classification", () => {
  it("treats a rate limit as retryable, because it is", async () => {
    mockFetch(errorResponse(429, "Too Many Requests"));

    const result = await generateImageWithPollinations("a teapot", "1:1", "2K");

    expect(result.success).toBe(false);
    expect(result.retryable).toBe(true);
    vi.unstubAllGlobals();
  });

  it("says the generator is busy rather than quoting a status code at the user", async () => {
    mockFetch(errorResponse(429, "Too Many Requests"));

    const result = await generateImageWithPollinations("a teapot", "1:1", "2K");

    // The route forwards this string straight to the buyer, so it has to read
    // as a temporary condition and must not carry the raw protocol detail.
    expect(result.error).toMatch(/busy/i);
    expect(result.error).not.toMatch(/429/);
    vi.unstubAllGlobals();
  });

  it("keeps server errors retryable", async () => {
    mockFetch(errorResponse(503, "Service Unavailable"));

    const result = await generateImageWithPollinations("a teapot", "1:1", "2K");

    expect(result.retryable).toBe(true);
    vi.unstubAllGlobals();
  });

  it("does not retry a request the provider rejected on its merits", async () => {
    // A 400 means the request itself is wrong; sending it again produces the
    // same 400 and burns the user's wait twice.
    mockFetch(errorResponse(400, "Bad Request"));

    const result = await generateImageWithPollinations("a teapot", "1:1", "2K");

    expect(result.retryable).toBe(false);
    vi.unstubAllGlobals();
  });
});

describe("free provider: requested size", () => {
  it("never asks for more than the provider can return", async () => {
    for (const resolution of ["1K", "2K", "4K"]) {
      const seen = mockFetch(imageResponse());
      await generateImageWithPollinations("a teapot", "1:1", resolution);
      const { width, height } = dimensionsOf(seen.url);

      // 768 is the measured ceiling below which the provider stops padding the
      // wait for pixels it will not deliver.
      expect(Math.max(width, height)).toBeLessThanOrEqual(768);
      vi.unstubAllGlobals();
    }
  });

  it("asks for the same size at 4K as at 2K, since the provider returns the same image", async () => {
    const at2K = mockFetch(imageResponse());
    await generateImageWithPollinations("a teapot", "4:5", "2K");
    const twoK = dimensionsOf(at2K.url);
    vi.unstubAllGlobals();

    const at4K = mockFetch(imageResponse());
    await generateImageWithPollinations("a teapot", "4:5", "4K");
    const fourK = dimensionsOf(at4K.url);
    vi.unstubAllGlobals();

    expect(fourK).toEqual(twoK);
  });

  it("still lets 1K ask for less", async () => {
    // The cap must not flatten every choice into one — 1K is a real, cheaper
    // request and stays distinct.
    const at1K = mockFetch(imageResponse());
    await generateImageWithPollinations("a teapot", "4:5", "1K");
    const oneK = dimensionsOf(at1K.url);
    vi.unstubAllGlobals();

    const at2K = mockFetch(imageResponse());
    await generateImageWithPollinations("a teapot", "4:5", "2K");
    const twoK = dimensionsOf(at2K.url);
    vi.unstubAllGlobals();

    expect(oneK.width).toBeLessThan(twoK.width);
  });

  it("keeps the aspect ratio the user chose", async () => {
    const seen = mockFetch(imageResponse());
    await generateImageWithPollinations("a teapot", "16:9", "2K");
    const { width, height } = dimensionsOf(seen.url);
    vi.unstubAllGlobals();

    expect(width).toBeGreaterThan(height);
    expect(width / height).toBeCloseTo(16 / 9, 1);
  });
});
