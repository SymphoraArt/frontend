"use client";

import { Clock, Zap } from "lucide-react";

// The control carries its own appearance. These rules used to sit in
// enki.css, which /generator/[id] never loads, so the button rendered there
// with no border, no pill and no ember state at all.
import "./boost-toggle.css";

/**
 * Boost — pay more to run the SAME model on a faster host.
 *
 * Boost changes where a generation runs, never which model runs, so the
 * picture is identical either way. Measured 2026-08-06 on one prompt, Nano
 * Banana Pro: WaveSpeed 73-78s against the vendor directly 19-39s. The user
 * is buying time, and the label has to say exactly that — anything hinting at
 * "better quality" would be a lie the output disproves.
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
      aria-label="Boost — priority provider, faster generation"
      disabled={disabled}
      onClick={() => onChange(!boost)}
      className={`enki-boost${boost ? " enki-boost--on" : ""} ${className}`.trim()}
      /* Short on purpose. A tooltip is read while the cursor is already moving,
         so it gets one fact: what changes and what it costs. The rest — same
         model, same picture — is what the icons already say by NOT being a
         quality badge. */
      title={
        boost
          ? `On: ~3x faster, ${BOOST_MULTIPLIER}x the price. Same image.`
          : `~3x faster for ${BOOST_MULTIPLIER}x the price. Same image.`
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
