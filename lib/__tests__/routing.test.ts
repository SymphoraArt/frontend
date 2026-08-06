import { describe, it, expect } from "vitest";
import { matchesConditions, eligibleRoutes, pickRoute, type RouteLink } from "@/lib/generation/routing";

/**
 * These encode Kev's routing policy (2026-08-07) cell by cell, against the
 * prices measured on 2026-08-06. Each assertion is a euro amount: pick the
 * wrong host at 4K low and every generation costs 2.9x what it should, and
 * nothing in a type check or a code review would notice.
 */

const prov = (key: string, extra: Record<string, unknown> = {}) => ({
  id: `p-${key}`,
  key,
  audience: "public",
  active: true,
  ...extra,
});

/** Exactly the rows migrations/2026-08-07-route-priority-acedata.sql writes. */
const NANO: RouteLink[] = [
  { id: "n-ace", role: "normal", priority: 10, provider_model: "nano-banana-pro:official", providers: prov("acedata"), active: true },
  { id: "n-wave", role: "normal", priority: 20, provider_model: "google/nano-banana-pro/text-to-image", providers: prov("wavespeed"), active: true },
  { id: "n-gem", role: "normal", priority: 30, provider_model: "gemini-3-pro-image-preview", providers: prov("gemini"), active: true },
  { id: "n-boost", role: "boost", priority: 10, provider_model: "gemini-3-pro-image-preview", providers: prov("gemini"), active: true },
];

const GPT: RouteLink[] = [
  {
    id: "g-ace", role: "normal", priority: 10, provider_model: "gpt-image-2",
    applies_when: { quality: ["low"], resolution: ["2K", "4K"] },
    providers: prov("acedata"), active: true,
  },
  { id: "g-wave", role: "normal", priority: 20, provider_model: "openai/gpt-image-2/text-to-image", providers: prov("wavespeed"), active: true },
  { id: "g-openai", role: "normal", priority: 30, provider_model: "gpt-image-2", providers: prov("openai"), active: true },
  { id: "g-boost", role: "boost", priority: 10, provider_model: "gpt-image-2", providers: prov("openai"), active: true },
];

const first = (links: RouteLink[], settings: object, role = "normal") =>
  eligibleRoutes(links, settings, role)[0]?.providerKey ?? null;

describe("Nano Banana Pro — acedata, then wavespeed, then gemini", () => {
  it("prefers acedata at every resolution", () => {
    for (const resolution of ["1K", "2K", "4K"]) {
      expect(first(NANO, { resolution }), resolution).toBe("acedata");
    }
  });

  it("orders the fallbacks behind it", () => {
    expect(eligibleRoutes(NANO, { resolution: "2K" }, "normal").map((r) => r.providerKey)).toEqual([
      "acedata",
      "wavespeed",
      "gemini",
    ]);
  });

  it("boosts to gemini — the only one of the three that is actually faster", () => {
    // WaveSpeed is slower AND dearer than acedata, so it cannot be a boost.
    expect(first(NANO, {}, "boost")).toBe("gemini");
    expect(eligibleRoutes(NANO, {}, "boost")).toHaveLength(1);
  });
});

describe("GPT-Image-2 — the cheapest host changes with the settings", () => {
  it("sends 1K low to wavespeed, where it is genuinely cheaper", () => {
    // $0.010 on WaveSpeed against AceData's flat $0.0105.
    expect(first(GPT, { quality: "low", resolution: "1K" })).toBe("wavespeed");
  });

  it("sends 2K and 4K low to acedata, where the flat price wins", () => {
    // $0.0105 flat against $0.020 and $0.030.
    expect(first(GPT, { quality: "low", resolution: "2K" })).toBe("acedata");
    expect(first(GPT, { quality: "low", resolution: "4K" })).toBe("acedata");
  });

  it("keeps medium and high away from acedata at every resolution", () => {
    // `quality` provably does nothing there, so selling it as medium or high
    // would be selling a control that is not connected.
    for (const quality of ["medium", "high"]) {
      for (const resolution of ["1K", "2K", "4K"]) {
        expect(first(GPT, { quality, resolution }), `${quality}/${resolution}`).toBe("wavespeed");
      }
    }
  });

  it("falls through to openai and boosts there", () => {
    expect(eligibleRoutes(GPT, { quality: "high", resolution: "2K" }, "normal").map((r) => r.providerKey))
      .toEqual(["wavespeed", "openai"]);
    expect(first(GPT, {}, "boost")).toBe("openai");
  });

  it("does not guess when the quality was never stated", () => {
    // An unstated quality is the model's default, which is not "low". Routing
    // on the guess would sell a tier nobody asked for.
    expect(first(GPT, { resolution: "2K" })).toBe("wavespeed");
    expect(first(GPT, { resolution: "4K", quality: null })).toBe("wavespeed");
    expect(first(GPT, { resolution: "4K", quality: "" })).toBe("wavespeed");
  });

  it("is not fooled by casing", () => {
    // "2k" from one caller and "2K" in the row must not silently cost 2.9x.
    expect(first(GPT, { quality: "LOW", resolution: "2k" })).toBe("acedata");
  });
});

describe("conditions", () => {
  it("treats an absent condition as always eligible", () => {
    expect(matchesConditions(null, {})).toBe(true);
    expect(matchesConditions(undefined, { quality: "high" })).toBe(true);
  });

  it("requires EVERY key to match, not just one", () => {
    const c = { quality: ["low"], resolution: ["2K", "4K"] };
    expect(matchesConditions(c, { quality: "low", resolution: "4K" })).toBe(true);
    expect(matchesConditions(c, { quality: "low", resolution: "1K" })).toBe(false);
    expect(matchesConditions(c, { quality: "high", resolution: "4K" })).toBe(false);
  });

  it("refuses an empty accepted-value list rather than matching everything", () => {
    expect(matchesConditions({ quality: [] }, { quality: "low" })).toBe(false);
  });
});

describe("who is allowed to be offered at all", () => {
  it("drops inactive routes and inactive providers", () => {
    const links: RouteLink[] = [
      { id: "a", role: "normal", priority: 10, providers: prov("acedata"), active: false, provider_model: "x" },
      { id: "b", role: "normal", priority: 20, providers: prov("wavespeed", { active: false }), provider_model: "y" },
      { id: "c", role: "normal", priority: 30, providers: prov("gemini"), active: true, provider_model: "z" },
    ];
    expect(eligibleRoutes(links, {}, "normal").map((r) => r.providerKey)).toEqual(["gemini"]);
  });

  it("hides an enterprise host from a public caller", () => {
    const links: RouteLink[] = [
      { id: "a", role: "normal", priority: 10, providers: prov("acedata", { audience: "enterprise" }), provider_model: "x", active: true },
      { id: "b", role: "normal", priority: 20, providers: prov("wavespeed"), provider_model: "y", active: true },
    ];
    expect(eligibleRoutes(links, {}, "normal", "public").map((r) => r.providerKey)).toEqual(["wavespeed"]);
    expect(eligibleRoutes(links, {}, "normal", "enterprise").map((r) => r.providerKey)).toEqual(["acedata", "wavespeed"]);
  });

  it("sorts by priority, not by whatever order the database returned", () => {
    // Deliberately shuffled: rows in priority order would pass with no sort at
    // all, and "cheapest first" would quietly become "whatever Postgres felt
    // like" the day someone reseeds the table.
    const shuffled: RouteLink[] = [
      { id: "c", role: "normal", priority: 30, providers: prov("gemini"), provider_model: "z", active: true },
      { id: "a", role: "normal", priority: 10, providers: prov("acedata"), provider_model: "x", active: true },
      { id: "b", role: "normal", priority: 20, providers: prov("wavespeed"), provider_model: "y", active: true },
    ];
    expect(eligibleRoutes(shuffled, {}, "normal").map((r) => r.providerKey)).toEqual([
      "acedata",
      "wavespeed",
      "gemini",
    ]);
  });

  it("puts a route with no priority behind the ones that have one", () => {
    const links: RouteLink[] = [
      { id: "unset", role: "normal", providers: prov("openai"), provider_model: "o", active: true },
      { id: "set", role: "normal", priority: 10, providers: prov("acedata"), provider_model: "x", active: true },
    ];
    expect(eligibleRoutes(links, {}, "normal").map((r) => r.id)).toEqual(["set", "unset"]);
  });

  it("keeps input order when priorities tie, so routing is not random", () => {
    const links: RouteLink[] = [
      { id: "a", role: "normal", priority: 50, providers: prov("wavespeed"), provider_model: "y", active: true },
      { id: "b", role: "normal", priority: 50, providers: prov("gemini"), provider_model: "z", active: true },
    ];
    expect(eligibleRoutes(links, {}, "normal").map((r) => r.id)).toEqual(["a", "b"]);
  });
});

describe("failover", () => {
  const candidates = eligibleRoutes(NANO, { resolution: "2K" }, "normal");

  it("takes the cheapest route while its breaker is closed", () => {
    const { chosen } = pickRoute(candidates, () => "use");
    expect(chosen?.providerKey).toBe("acedata");
  });

  it("steps to the next host when the cheapest is down", () => {
    const { chosen } = pickRoute(candidates, (id) => (id === "n-ace" ? "skip" : "use"));
    expect(chosen?.providerKey).toBe("wavespeed");
  });

  it("steps twice when two are down", () => {
    const { chosen } = pickRoute(candidates, (id) => (id === "n-ace" || id === "n-wave" ? "skip" : "use"));
    expect(chosen?.providerKey).toBe("gemini");
  });

  it("offers the cheap route for a free probe instead of writing it off", () => {
    const { chosen, probe } = pickRoute(candidates, (id) => (id === "n-ace" ? "probe" : "use"));
    expect(probe.map((p) => p.providerKey)).toEqual(["acedata"]);
    // Still has somewhere to go while the probe decides.
    expect(chosen?.providerKey).toBe("wavespeed");
  });

  it("never returns nothing — a route believed dead beats no image", () => {
    const { chosen, fallbacks } = pickRoute(candidates, () => "skip");
    expect(chosen).toBeNull();
    expect(fallbacks.map((f) => f.providerKey)).toEqual(["acedata", "wavespeed", "gemini"]);
  });
});
