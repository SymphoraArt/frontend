import { describe, it, expect } from "vitest";
import {
  cellMatches,
  cheapestFor,
  findDisagreements,
  combinationsIn,
  type PriceCell,
} from "@/lib/generation/price-matrix";

/**
 * The matrix exists to catch a silent failure: prices move, a hand-written
 * priority does not, and every generation on the affected cell quietly
 * overpays until someone compares two web pages by eye.
 *
 * So the load-bearing test is not "the function works" — it is "with today's
 * real prices the policy is optimal, and the moment one moves we are told".
 */

const cell = (o: Partial<PriceCell> & Pick<PriceCell, "providerKey" | "priority">): PriceCell => ({
  modelProviderId: `${o.modelName ?? "m"}-${o.providerKey}-${o.quality ?? "*"}-${o.resolution ?? "*"}`,
  modelName: "Nano Banana Pro",
  role: "normal",
  quality: null,
  resolution: null,
  priceMicro: null,
  source: "quoted",
  observedAt: null,
  appliesWhen: null,
  routeActive: true,
  ...o,
});

/** Measured 2026-08-06, micro-USD. bench-output/ has the images. */
const NANO: PriceCell[] = [
  cell({ providerKey: "acedata", priority: 10, resolution: "1K", priceMicro: 49_054, modelProviderId: "n-ace-1k" }),
  cell({ providerKey: "acedata", priority: 10, resolution: "2K", priceMicro: 49_054, modelProviderId: "n-ace-2k" }),
  cell({ providerKey: "acedata", priority: 10, resolution: "4K", priceMicro: 73_572, modelProviderId: "n-ace-4k" }),
  cell({ providerKey: "wavespeed", priority: 20, resolution: "1K", priceMicro: 140_000, modelProviderId: "n-wave-1k" }),
  cell({ providerKey: "wavespeed", priority: 20, resolution: "2K", priceMicro: 140_000, modelProviderId: "n-wave-2k" }),
  cell({ providerKey: "wavespeed", priority: 20, resolution: "4K", priceMicro: 240_000, modelProviderId: "n-wave-4k" }),
  // Gemini is the boost route and has never been priced here — it must be
  // ignored, not treated as free.
  cell({ providerKey: "gemini", priority: 30, priceMicro: null, modelProviderId: "n-gem" }),
];

const WAVE_GPT: [string, string, number][] = [
  ["low", "1K", 10_000], ["low", "2K", 20_000], ["low", "4K", 30_000],
  ["medium", "1K", 60_000], ["medium", "2K", 100_000], ["medium", "4K", 180_000],
  ["high", "1K", 220_000], ["high", "2K", 400_000], ["high", "4K", 720_000],
];

const GPT: PriceCell[] = [
  // Flat rate, restricted to the cells where it actually wins.
  cell({
    modelName: "GPT-Image-2", providerKey: "acedata", priority: 10, priceMicro: 10_473,
    appliesWhen: { quality: ["low"], resolution: ["2K", "4K"] }, modelProviderId: "g-ace",
  }),
  ...WAVE_GPT.map(([quality, resolution, priceMicro]) =>
    cell({
      modelName: "GPT-Image-2", providerKey: "wavespeed", priority: 20,
      quality, resolution, priceMicro, modelProviderId: `g-wave-${quality}-${resolution}`,
    }),
  ),
  cell({ modelName: "GPT-Image-2", providerKey: "openai", priority: 30, priceMicro: null, modelProviderId: "g-openai" }),
];

describe("today's policy against today's prices", () => {
  it("routes every Nano Banana Pro cell to the cheapest host", () => {
    expect(findDisagreements(NANO)).toEqual([]);
    for (const resolution of ["1K", "2K", "4K"]) {
      expect(cheapestFor(NANO, { resolution }).byPolicy?.providerKey, resolution).toBe("acedata");
    }
  });

  it("routes every GPT-Image-2 cell to the cheapest host", () => {
    expect(findDisagreements(GPT)).toEqual([]);
  });

  it("keeps 1K low on wavespeed, where the flat rate loses", () => {
    // $0.010 against AceData's flat $0.0105 — the one low cell it does not win.
    const { byPolicy, cheapest } = cheapestFor(GPT, { quality: "low", resolution: "1K" });
    expect(byPolicy?.providerKey).toBe("wavespeed");
    expect(cheapest?.priceMicro).toBe(10_000);
  });

  it("does not compare against a route that is not allowed to run", () => {
    // AceData is priced for every cell but permitted only at low 2K/4K. Its
    // price must not appear as a "cheaper option" where routing would never
    // send the request.
    const { cheapest } = cheapestFor(GPT, { quality: "high", resolution: "4K" });
    expect(cheapest?.providerKey).toBe("wavespeed");
    expect(cheapest?.priceMicro).toBe(720_000);
  });
});

describe("what happens when a price moves", () => {
  it("names the cell, both providers and the overpayment", () => {
    // AceData raises 4K past WaveSpeed's $0.24.
    const moved = NANO.map((c) =>
      c.modelProviderId === "n-ace-4k" ? { ...c, priceMicro: 300_000 } : c,
    );
    expect(findDisagreements(moved)).toEqual([
      {
        modelName: "Nano Banana Pro",
        quality: null,
        resolution: "4k",
        usingProvider: "acedata",
        usingMicro: 300_000,
        cheaperProvider: "wavespeed",
        cheaperMicro: 240_000,
        deltaMicro: 60_000,
      },
    ]);
  });

  it("reports the worst overpayment first", () => {
    const moved = NANO.map((c) => {
      if (c.modelProviderId === "n-ace-4k") return { ...c, priceMicro: 300_000 }; // +60_000
      if (c.modelProviderId === "n-ace-1k") return { ...c, priceMicro: 999_000 }; // +859_000
      return c;
    });
    expect(findDisagreements(moved).map((d) => d.resolution)).toEqual(["1k", "4k"]);
  });

  it("says nothing while the cheap route merely gets dearer but still wins", () => {
    const moved = NANO.map((c) =>
      c.modelProviderId === "n-ace-2k" ? { ...c, priceMicro: 139_999 } : c,
    );
    expect(findDisagreements(moved)).toEqual([]);
  });

  it("says nothing when two routes cost exactly the same", () => {
    // Equal is not cheaper. Reporting it would send Kev to switch providers
    // for nothing, and a report that cries wolf stops being read.
    const level = NANO.map((c) =>
      c.modelProviderId === "n-ace-2k" ? { ...c, priceMicro: 140_000 } : c,
    );
    expect(findDisagreements(level)).toEqual([]);
  });

  it("does not call an unpriced route cheaper than a priced one", () => {
    // Gemini has no price. "Free" is not the same as "unknown", and treating
    // it as zero would reroute everything to whatever we forgot to fill in.
    expect(findDisagreements(NANO)).toEqual([]);
    expect(cheapestFor(NANO, { resolution: "2K" }).cheapest?.providerKey).toBe("acedata");
  });

  it("ignores routes an admin switched off", () => {
    const moved = NANO.map((c) =>
      c.modelProviderId === "n-ace-4k"
        ? { ...c, priceMicro: 300_000 }
        : c.modelProviderId === "n-wave-4k"
          ? { ...c, routeActive: false }
          : c,
    );
    // The cheaper option is disabled, so there is nothing to switch to.
    expect(findDisagreements(moved)).toEqual([]);
  });
});

describe("cells and wildcards", () => {
  it("treats a null setting as covering every value", () => {
    expect(cellMatches({ quality: null, resolution: null }, { quality: "high", resolution: "4K" })).toBe(true);
    expect(cellMatches({ quality: null, resolution: "2K" }, { resolution: "2K" })).toBe(true);
  });

  it("does not match a specific cell when the setting was not given", () => {
    expect(cellMatches({ quality: "low", resolution: null }, {})).toBe(false);
  });

  it("ignores casing, so a 2k does not read the 4K price", () => {
    expect(cellMatches({ quality: null, resolution: "2K" }, { resolution: "2k" })).toBe(true);
  });

  it("enumerates combinations from conditions too, not only from price rows", () => {
    // A flat-rate provider names no resolutions at all; without reading the
    // routing conditions the combination list would be empty and every
    // disagreement would go unreported.
    const onlyFlat = [GPT[0]];
    const combos = combinationsIn(onlyFlat);
    expect(combos).toContainEqual({ quality: "low", resolution: "2k" });
    expect(combos).toContainEqual({ quality: "low", resolution: "4k" });
  });

  it("falls back to a single wildcard combination when nothing names a setting", () => {
    expect(combinationsIn([cell({ providerKey: "x", priority: 1, priceMicro: 1 })])).toEqual([
      { quality: null, resolution: null },
    ]);
  });
});
