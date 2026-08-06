import { describe, it, expect } from "vitest";
import { __testing__, routeFor, DEFAULT_MODEL } from "@/lib/generation/models";

const { fromRow } = __testing__;

const link = (role: string, key: string, model: string, extra: Record<string, unknown> = {}) => ({
  role,
  provider_model: model,
  active: true,
  providers: { key, audience: "public", active: true, ...extra },
});

const NANO = { id: "m1", name: "Nano Banana Pro", allowed_ratios: ["1:1"], max_reference_images: 18 };

describe("model → route resolution", () => {
  it("uses the database links when they exist", () => {
    const m = fromRow(
      {
        ...NANO,
        model_providers: [
          link("normal", "wavespeed", "google/nano-banana-pro/text-to-image"),
          link("boost", "gemini", "gemini-3-pro-image-preview"),
        ],
      },
      "public",
    );
    expect(m.normal).toEqual({ provider: "wavespeed", providerModel: "google/nano-banana-pro/text-to-image" });
    expect(m.boost).toEqual({ provider: "gemini", providerModel: "gemini-3-pro-image-preview" });
    expect(routeFor(m, true)).toEqual(m.boost);
    expect(routeFor(m, false)).toEqual(m.normal);
    expect(routeFor(m, undefined)).toEqual(m.normal);
  });

  it("falls back to the slug bridge when the migration has not run", () => {
    const m = fromRow(NANO, "public");
    expect(m.normal.provider).toBe("wavespeed");
    expect(m.boost.provider).toBe("gemini");
  });

  it("makes boost a no-op — never a wrong host — when no boost row exists", () => {
    const m = fromRow({ ...NANO, model_providers: [link("normal", "openai", "gpt-image-2")] }, "public");
    expect(m.normal.providerModel).toBe("gpt-image-2");
    // Must equal normal, NOT the bridge's gemini route: the row said openai.
    expect(m.boost).toEqual(m.normal);
    expect(routeFor(m, true).provider).toBe("openai");
  });

  it("hides an enterprise-only provider from a public caller", () => {
    const row = {
      ...NANO,
      model_providers: [
        link("normal", "wavespeed", "google/nano-banana-pro/text-to-image"),
        link("boost", "gemini", "secret-enterprise-model", { audience: "enterprise" }),
      ],
    };

    const pub = fromRow(row, "public");
    expect(pub.boost.providerModel).not.toBe("secret-enterprise-model");
    expect(pub.boost).toEqual(pub.normal); // degrades, does not leak

    const ent = fromRow(row, "enterprise");
    expect(ent.boost.providerModel).toBe("secret-enterprise-model");
  });

  it("ignores a deactivated link or a deactivated provider", () => {
    const deadLink = fromRow(
      { ...NANO, model_providers: [{ ...link("normal", "wavespeed", "x"), active: false }] },
      "public",
    );
    expect(deadLink.normal.providerModel).not.toBe("x");

    const deadProvider = fromRow(
      { ...NANO, model_providers: [link("normal", "wavespeed", "y", { active: false })] },
      "public",
    );
    expect(deadProvider.normal.providerModel).not.toBe("y");
  });

  it("never charges by resolution for a model that ignores it", () => {
    // gemini-2.5-flash-image always returns 1024x1024 — measured, not assumed.
    expect(fromRow({ id: "m2", name: "Nano Banana" }, "public").supportsResolution).toBe(false);
    expect(fromRow(NANO, "public").supportsResolution).toBe(true);
  });

  it("keeps per-model limits from the row, not the defaults", () => {
    const m = fromRow(NANO, "public");
    expect(m.maxRefs).toBe(18);
    expect(m.maxRefs).not.toBe(DEFAULT_MODEL.maxRefs);
    expect(m.allowedRatios).toEqual(["1:1"]);
  });
});
