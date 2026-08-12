import { describe, expect, it, vi, afterEach } from "vitest";
import {
  PROVIDERS_WITH_IMAGE_INPUT,
  referenceImageCount,
  supportsReferenceImages,
} from "@/lib/generation/provider-capabilities";
import { eligibleRoutes, type RouteLink } from "@/lib/generation/routing";

/*
 * A buyer attaches reference images, pays, and receives a picture generated
 * without them. No error, no warning, and an output that looks like a perfectly
 * good answer to the prompt — so neither side can tell it happened.
 *
 * That was live on 2026-08-12: both paid models routed to WaveSpeed at priority
 * 10, and neither the WaveSpeed nor the OpenAI adapter read `referenceImages`.
 *
 * These tests exist so it cannot come back. The load-bearing assertion in the
 * adapter cases is not the error message — it is that fetch is NEVER CALLED.
 * A refusal that still contacted the provider would still have spent money.
 */

const REFS = ["data:image/png;base64,iVBORw0KGgo=", "data:image/png;base64,iVBORw0KGgo="];

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.resetModules();
});

/** A fetch that fails the test if anything reaches it. */
function forbiddenFetch() {
  const spy = vi.fn(() => {
    throw new Error("the adapter contacted the provider — that request costs money");
  });
  vi.stubGlobal("fetch", spy);
  return spy;
}

describe("paid adapters refuse reference images they cannot deliver", () => {
  it("WaveSpeed refuses, and spends nothing doing it", async () => {
    vi.stubEnv("WAVESPEED_API_KEY", "test-key-not-a-real-one");
    const spy = forbiddenFetch();
    const { generateImagesWithWaveSpeed } = await import(
      "@/backend/services/wavespeed-image-generation"
    );

    const result = await generateImagesWithWaveSpeed({ prompt: "a teapot", referenceImages: REFS });

    expect(spy).not.toHaveBeenCalled();
    expect(result.success).toBe(false);
    expect(result.imageBuffers ?? []).toHaveLength(0);
  });

  it("OpenAI refuses, and spends nothing doing it", async () => {
    vi.stubEnv("OPENAI_API_KEY", "test-key-not-a-real-one");
    const spy = forbiddenFetch();
    const { generateImagesWithOpenAI } = await import(
      "@/backend/services/openai-image-generation"
    );

    const result = await generateImagesWithOpenAI({ prompt: "a teapot", referenceImages: REFS });

    expect(spy).not.toHaveBeenCalled();
    expect(result.success).toBe(false);
    expect(result.imageBuffers ?? []).toHaveLength(0);
  });

  it("says how many images were lost and that nothing was charged", async () => {
    // The buyer has to be able to tell this apart from a provider outage:
    // one is fixed by choosing a different model, the other by waiting.
    vi.stubEnv("WAVESPEED_API_KEY", "test-key-not-a-real-one");
    forbiddenFetch();
    const { generateImagesWithWaveSpeed } = await import(
      "@/backend/services/wavespeed-image-generation"
    );

    const result = await generateImagesWithWaveSpeed({ prompt: "a teapot", referenceImages: REFS });

    expect(result.error).toMatch(/2 reference images/i);
    expect(result.error).toMatch(/nothing was charged/i);
  });

  it("does not mark the refusal retryable", async () => {
    // Retrying changes nothing — the host ignores them just as thoroughly the
    // second time — and a retryable verdict would charge the circuit breaker
    // for a fault the host never committed.
    vi.stubEnv("WAVESPEED_API_KEY", "test-key-not-a-real-one");
    forbiddenFetch();
    const { generateImagesWithWaveSpeed } = await import(
      "@/backend/services/wavespeed-image-generation"
    );

    const result = await generateImagesWithWaveSpeed({ prompt: "a teapot", referenceImages: REFS });

    expect(result.retryable).toBe(false);
  });

  it("still generates normally when nothing is attached", async () => {
    // The guard must not become a blanket refusal: an empty array and a list of
    // blank strings are both "no references", and those requests are fine.
    vi.stubEnv("WAVESPEED_API_KEY", "test-key-not-a-real-one");
    const spy = vi.fn(async () => new Response("{}", { status: 500 }));
    vi.stubGlobal("fetch", spy);
    const { generateImagesWithWaveSpeed } = await import(
      "@/backend/services/wavespeed-image-generation"
    );

    await generateImagesWithWaveSpeed({ prompt: "a teapot", referenceImages: [] });
    await generateImagesWithWaveSpeed({ prompt: "a teapot", referenceImages: ["", "   "] });
    await generateImagesWithWaveSpeed({ prompt: "a teapot" });

    expect(spy).toHaveBeenCalledTimes(3);
  });
});

describe("routing will not offer a host that cannot carry the images", () => {
  // The live shape for Nano Banana Pro: cheap host first, capable host second.
  const LINKS: RouteLink[] = [
    {
      id: "ws",
      role: "normal",
      priority: 10,
      provider_model: "google/nano-banana-pro/text-to-image",
      provider_id: "p-ws",
      providers: { id: "p-ws", key: "wavespeed", active: true },
    },
    {
      id: "gem",
      role: "normal",
      priority: 20,
      provider_model: "gemini-3-pro-image-preview",
      provider_id: "p-gem",
      providers: { id: "p-gem", key: "gemini", active: true },
    },
  ];

  it("takes the cheap host when no images are attached", () => {
    const routes = eligibleRoutes(LINKS, {}, "normal", "public");
    expect(routes.map((r) => r.providerKey)).toEqual(["wavespeed", "gemini"]);
  });

  it("drops the cheap host the moment images are attached", () => {
    const routes = eligibleRoutes(LINKS, {}, "normal", "public", { needsImageInput: true });
    expect(routes.map((r) => r.providerKey)).toEqual(["gemini"]);
  });

  it("returns nothing rather than something that would discard them", () => {
    // No capable host in the table at all. An empty list is the honest answer;
    // handing back the cheap one is exactly how the silent drop happened.
    const onlyWaveSpeed = [LINKS[0]];
    const routes = eligibleRoutes(onlyWaveSpeed, {}, "normal", "public", { needsImageInput: true });
    expect(routes).toEqual([]);
  });
});

describe("the fallback route gets the same capability test as the rest", () => {
  /* The subtle hole, and the one that would have re-created the bug on its
     own: chooseRoute drops back to routeFor() whenever the ordered list cannot
     be built — no supabase, no links, nothing eligible. That fallback is a
     plain model row and used to be handed back unexamined, so a request with
     references still ended up on a host that discards them. */
  const model = {
    id: null,
    name: "Nano Banana Pro",
    normal: { provider: "wavespeed" as const, providerModel: "google/nano-banana-pro/text-to-image" },
    boost: { provider: "gemini" as const, providerModel: "gemini-3-pro-image-preview" },
    allowedRatios: ["1:1"],
    maxRefs: 18,
    supportsQuality: false,
    supportsResolution: true,
    links: [],
  };

  it("hands back nothing when the only fallback would discard the images", async () => {
    const { chooseRoute } = await import("@/lib/generation/models");
    const route = await chooseRoute(null, model as never, { needsImageInput: true });
    expect(route).toBeNull();
  });

  it("still hands back that fallback when no images are attached", async () => {
    const { chooseRoute } = await import("@/lib/generation/models");
    const route = await chooseRoute(null, model as never, {});
    expect(route?.provider).toBe("wavespeed");
  });

  it("accepts a fallback that CAN carry them", async () => {
    // Boost routes this model to Gemini, which qualifies.
    const { chooseRoute } = await import("@/lib/generation/models");
    const route = await chooseRoute(null, model as never, { boost: true, needsImageInput: true });
    expect(route?.provider).toBe("gemini");
  });
});

describe("the capability list is a promise, not a wish list", () => {
  it("names only providers whose adapter demonstrably sends the images", () => {
    /* Deliberately exact. Adding a provider here without wiring its adapter
       re-creates the original bug in one line, so the set cannot be widened
       without this test being edited — which is the moment to ask whether a
       test proving the images actually reach that provider exists yet.
       Gemini qualifies: it pushes each reference as an inlineData part. */
    expect([...PROVIDERS_WITH_IMAGE_INPUT].sort()).toEqual(["gemini"]);
  });

  it("does not claim support for the hosts that discard them", () => {
    expect(supportsReferenceImages("wavespeed")).toBe(false);
    expect(supportsReferenceImages("openai")).toBe(false);
    expect(supportsReferenceImages("pollinations")).toBe(false);
    expect(supportsReferenceImages("gemini")).toBe(true);
  });

  it("matches the provider key regardless of case, and never on nothing", () => {
    expect(supportsReferenceImages("GEMINI")).toBe(true);
    expect(supportsReferenceImages(null)).toBe(false);
    expect(supportsReferenceImages(undefined)).toBe(false);
    expect(supportsReferenceImages("")).toBe(false);
  });

  it("counts only images that are really there", () => {
    // A blank string is not an attachment; counting it would refuse a request
    // that has nothing wrong with it.
    expect(referenceImageCount(["a", "b"])).toBe(2);
    expect(referenceImageCount(["a", "", "  "])).toBe(1);
    expect(referenceImageCount([])).toBe(0);
    expect(referenceImageCount(null)).toBe(0);
    expect(referenceImageCount(undefined)).toBe(0);
  });
});
