"use client";

import { Clock, Zap } from "lucide-react";

// The control carries its own appearance. These rules used to sit in
// enki.css, which /generator/[id] never loads, so the button rendered there
// with no border, no pill and no ember state at all.
import "./boost-toggle.css";

/**
 * Boost — pay more to run the SAME model on a faster host.
 *
 * Boost changes where a generation runs, never which model runs. Measured
 * 2026-08-06 on one prompt, Nano Banana Pro: WaveSpeed 73-78s against the
 * vendor directly 19-39s — a 2.0x-3.8x spread, which is why the tooltip says
 * "2-4x", not a rounded "3x". The user is buying time, and the label has to
 * say exactly that — "better quality" would be a lie the output disproves,
 * and "same image" was one too: same model and same quality, but every run
 * draws a fresh seed, so no two generations are pixel-identical.
 *
 * One component for every surface (prompt editor, quick create, node editor,
 * image UI). The three generation paths drifted apart once already; a shared
 * control is what keeps the wording, the icon and the surcharge in step.
 */

/** What boost costs on top, as a multiplier of the base price. */
export const BOOST_MULTIPLIER = 2;

export function boostedCost(base: number, boost: boolean): number {
  return boost ? base * BOOST_MULTIPLIER : base;
}

export interface BoostToggleProps {
  boost: boolean;
  onChange: (next: boolean) => void;
  /** Hidden entirely when the chosen model has no faster host. */
  available?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function BoostToggle({
  boost,
  onChange,
  available = true,
  disabled = false,
  className = "",
}: BoostToggleProps) {
  // Hidden rather than disabled: a greyed-out control invites a click and
  // then explains nothing. If a model has no faster host, boost is not a
  // choice the user has.
  if (!available) return null;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={boost}
      aria-label="Boost — run this model on its fastest host"
      disabled={disabled}
      onClick={() => onChange(!boost)}
      className={`enki-boost${boost ? " enki-boost--on" : ""} ${className}`.trim()}
      /* Short on purpose. A tooltip is read while the cursor is already moving,
         so it gets one fact: what changes and what it costs. Every claim in it
         is checkable (Kev, 2026-08-22: "it should be realistic"): "fastest
         host" is what routeFor actually does, "2-4x" is the measured spread
         above — not a rounded "3x" — and "same model & quality" replaces
         "Same image", which promised pixel-identity no two runs deliver. */
      title={
        boost
          ? `On: fastest host for this model — measured 2–4x faster, ${BOOST_MULTIPLIER}x the price. Same model & quality.`
          : `Runs this model on its fastest host — measured 2–4x faster, ${BOOST_MULTIPLIER}x the price. Same model & quality.`
      }
    >
      {/* Clock + bolt, and nothing else. The word "Boost" is gone from every
          surface: it cost width in toolbars that were already truncating their
          dropdowns, and it named the control rather than explaining it. The
          pair IS the claim — time, not quality — so neither icon survives
          alone, and the full sentence stays on aria-label for anyone who
          cannot hover. */}
      <Clock size={12} strokeWidth={2.2} aria-hidden />
      <Zap size={12} strokeWidth={2.6} aria-hidden />
    </button>
  );
}
