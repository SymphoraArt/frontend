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
  /**
   * Icons only, no word, for footers where width is the scarce resource.
   * The clock and the bolt stay together — the pair is the claim — and the
   * title and aria-label keep carrying the full sentence.
   */
  compact?: boolean;
  className?: string;
}

export default function BoostToggle({
  boost,
  onChange,
  available = true,
  disabled = false,
  compact = false,
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
      className={`enki-boost${boost ? " enki-boost--on" : ""}${compact ? " enki-boost--compact" : ""} ${className}`.trim()}
      title={
        boost
          ? `Boost on — a priority provider runs this, roughly 3x faster. ${BOOST_MULTIPLIER}x the price, same model, same image.`
          : "Boost — pay more to run on a priority provider, roughly 3x faster. Same model, same image."
      }
    >
      {/* Clock + bolt: the promise is time, not quality. Both survive the
          compact variant; only the word is dropped. */}
      <Clock size={12} strokeWidth={2.2} aria-hidden />
      <Zap size={12} strokeWidth={2.6} aria-hidden />
      {!compact && <span>Boost</span>}
    </button>
  );
}
