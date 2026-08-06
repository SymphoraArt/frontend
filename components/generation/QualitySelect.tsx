"use client";

import { Gem } from "lucide-react";

/**
 * Quality — low | mid | high, for models that take it as their own parameter.
 *
 * Only the gpt-image family does, on both hosts. It is a real setting there,
 * and the dominant one for price: roughly $0.006 / $0.053 / $0.211 per image at
 * 1024x1024, a 35x spread — far more than the size changes. So it belongs in
 * front of the user rather than being derived from the resolution tier, which
 * is what the server did before and was a guess about intent.
 *
 * Hidden entirely for models without it. Gemini has no such concept, and a
 * control that changes nothing is exactly the kind of thing this codebase has
 * been busy removing.
 */

export type Quality = "low" | "medium" | "high";

/** What OpenAI charges per image at 1024x1024, for the hover text. */
const HINT: Record<Quality, string> = {
  low: "Fastest and cheapest. Fine for trying an idea out.",
  medium: "The middle ground — roughly 9x the price of low.",
  high: "Best detail. Roughly 35x the price of low, so use it on keepers.",
};

const LABEL: Record<Quality, string> = { low: "Low", medium: "Mid", high: "High" };

export interface QualitySelectProps {
  value: Quality;
  onChange: (next: Quality) => void;
  /** Hidden when the chosen model has no quality parameter. */
  available?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function QualitySelect({
  value,
  onChange,
  available = true,
  disabled = false,
  className = "",
}: QualitySelectProps) {
  if (!available) return null;

  return (
    <label
      className={`enki-quality ${className}`.trim()}
      title={`Quality — ${HINT[value]}`}
    >
      <Gem size={12} strokeWidth={2.2} aria-hidden />
      <select
        value={value}
        disabled={disabled}
        aria-label="Image quality"
        onChange={(e) => onChange(e.target.value as Quality)}
      >
        {(Object.keys(LABEL) as Quality[]).map((q) => (
          <option key={q} value={q}>
            {LABEL[q]}
          </option>
        ))}
      </select>
    </label>
  );
}
