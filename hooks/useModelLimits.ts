"use client";

/**
 * Per-model generation limits from the models table (max reference images +
 * allowed file types), fetched once via /api/models and cached module-wide.
 *
 * UI model ids are slugs ("nano-banana-pro") while the DB stores display
 * names ("Nano Banana Pro") — matching is slug-normalized both ways.
 * Fail-open to sane defaults so the UIs work before the migration ran.
 */
import { useEffect, useState } from "react";

export interface ModelLimits {
  maxRefs: number;
  filetypes: string[];
  /** value for <input accept> */
  accept: string;
  /**
   * Ratios this generator actually accepts. Every generator takes a different
   * set, so the list belongs in the database next to the model, not in a
   * constant in the UI — offering a ratio the provider rejects fails the call
   * AFTER the payment has settled.
   */
  ratios: string[];
}

/**
 * The intersection every current provider supports — offered only while a
 * model has no list of its own. Deliberately narrow: a ratio offered here and
 * rejected by the provider fails the call after the payment has settled.
 */
export const FALLBACK_RATIOS = ["1:1", "16:9", "9:16"];

const DEFAULTS: ModelLimits = {
  maxRefs: 14,
  filetypes: ["image/png", "image/jpeg", "image/webp"],
  accept: "image/png,image/jpeg,image/webp",
  ratios: FALLBACK_RATIOS,
};

interface ModelRow {
  id?: string;
  price?: number;
  name?: string;
  max_reference_images?: number;
  allowed_filetypes?: string[];
  allowed_ratios?: string[];
  /** Resolved server-side by /api/models via withCapabilities(). */
  maxResolution?: string;
  supportsQuality?: boolean;
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

let cache: { rows: ModelRow[]; at: number } | null = null;
let inflight: Promise<ModelRow[]> | null = null;

async function loadModels(): Promise<ModelRow[]> {
  if (cache && Date.now() - cache.at < 5 * 60_000) return cache.rows;
  if (!inflight) {
    inflight = fetch("/api/models")
      .then((r) => (r.ok ? r.json() : []))
      .then((rows: ModelRow[]) => {
        cache = { rows: Array.isArray(rows) ? rows : [], at: Date.now() };
        return cache.rows;
      })
      .catch(() => cache?.rows ?? [])
      .finally(() => { inflight = null; });
  }
  return inflight;
}

export function limitsFor(rows: ModelRow[], model: string | null | undefined): ModelLimits {
  if (!model) return DEFAULTS;
  const wanted = slug(model);
  const row = rows.find((r) => r.name && slug(r.name) === wanted);
  if (!row) return DEFAULTS;
  const filetypes =
    Array.isArray(row.allowed_filetypes) && row.allowed_filetypes.length > 0
      ? row.allowed_filetypes
      : DEFAULTS.filetypes;
  return {
    maxRefs: typeof row.max_reference_images === "number" ? row.max_reference_images : DEFAULTS.maxRefs,
    filetypes,
    accept: filetypes.join(","),
    ratios:
      Array.isArray(row.allowed_ratios) && row.allowed_ratios.length > 0
        ? row.allowed_ratios
        : DEFAULTS.ratios,
  };
}

export function useModelLimits(model: string | null | undefined): ModelLimits {
  const [limits, setLimits] = useState<ModelLimits>(() => (cache ? limitsFor(cache.rows, model) : DEFAULTS));
  useEffect(() => {
    let dead = false;
    loadModels().then((rows) => { if (!dead) setLimits(limitsFor(rows, model)); });
    return () => { dead = true; };
  }, [model]);
  return limits;
}

/**
 * The generator catalogue, as the database describes it.
 *
 * Shares the module-level cache above, so a page that already asked for limits
 * pays nothing for this. The node editor used to carry its own hardcoded
 * NC_MODELS with invented prices and a "Seedance 2" that exists in no table —
 * which is how a user could pick a model, see a price, and get something else
 * for free.
 */
export interface CatalogueEntry {
  id: string;
  name: string;
  /** USD per image. 0 is the free tier. */
  price: number;
  /**
   * Whether the model takes a low|medium|high quality tier of its own. Only
   * the gpt-image family does — offering the control anywhere else would put a
   * setting in front of the user that changes nothing.
   */
  supportsQuality: boolean;
  /**
   * The largest resolution tier this model genuinely renders, resolved
   * SERVER-SIDE from its provider route — the same answer the generation
   * enforces. The pickers used to hardcode their tier lists instead, which is
   * how "2K/4K" appeared for models that cannot do either (Kev, 2026-08-19:
   * "das soll doch eher derived from the database sein").
   */
  maxResolution: "1K" | "2K" | "4K";
}

/** Kept for the window before /api/models answers, and if it never does. */
export const FALLBACK_CATALOGUE: CatalogueEntry[] = [
  { id: "nano-banana-pro", name: "Nano Banana Pro", price: 0.04, supportsQuality: false, maxResolution: "4K" },
];

export function useModelCatalogue(): CatalogueEntry[] {
  const [rows, setRows] = useState<CatalogueEntry[]>(() =>
    cache ? toCatalogue(cache.rows) : FALLBACK_CATALOGUE,
  );
  useEffect(() => {
    let dead = false;
    loadModels().then((r) => { if (!dead) setRows(toCatalogue(r)); });
    return () => { dead = true; };
  }, []);
  return rows;
}

function toCatalogue(rows: ModelRow[]): CatalogueEntry[] {
  const out = rows
    .filter((r) => r.id && r.name)
    .map((r) => ({
      id: String(r.id),
      name: String(r.name),
      // A missing price is 0 and therefore free — never a guessed number,
      // because a guessed price is one a user might be charged.
      price: typeof r.price === "number" ? r.price : 0,
      /* Server-resolved when present (/api/models runs withCapabilities, the
         same code the generation enforces); the old client-side derivations
         only cover the window where a cached pre-upgrade response is still in
         flight. A name regex and a hardcoded tier list are exactly the
         split-brain that put "2K/4K" in front of models that can do neither. */
      supportsQuality:
        typeof r.supportsQuality === "boolean" ? r.supportsQuality : /gpt.?image/i.test(String(r.name)),
      maxResolution: (r.maxResolution === "1K" || r.maxResolution === "2K" || r.maxResolution === "4K"
        ? r.maxResolution
        : "2K") as CatalogueEntry["maxResolution"],
    }));
  return out.length ? out : FALLBACK_CATALOGUE;
}
