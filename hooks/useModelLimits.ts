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
}

const DEFAULTS: ModelLimits = {
  maxRefs: 14,
  filetypes: ["image/png", "image/jpeg", "image/webp"],
  accept: "image/png,image/jpeg,image/webp",
};

interface ModelRow {
  name?: string;
  max_reference_images?: number;
  allowed_filetypes?: string[];
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
