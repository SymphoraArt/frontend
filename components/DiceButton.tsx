"use client";

/**
 * The 🎲 next to Generate: one click, one coherent set of variable values.
 *
 * One shared component for every gen UI (Kev, 2026-08-07: "in jede prompt gen
 * UI ... beim Generate button"), because six hand-rolled copies would drift
 * exactly like the theme tokens did. Each surface passes its own variables in
 * whatever shape it holds them, mapped to DiceVariable, and applies the
 * returned values to its own state.
 *
 * Renders NOTHING when there are no rollable variables. A control that could
 * never do anything is the same lie as a quality dropdown on a host that
 * ignores it — the rule this codebase keeps relearning.
 */
import React, { useCallback, useRef, useState } from "react";
import type { DiceVariable, DiceValue } from "@/lib/generation/variable-dice";

export interface DiceButtonProps {
  variables: DiceVariable[];
  /**
   * Set for SAVED prompts: the server then loads the authoritative variable
   * definitions and the public context from the database and ignores the
   * client's copies. `variables` still controls visibility and how the
   * returned values are applied — for the promptId path, make sure their ids
   * are the variable NAMES, because that is what the server keys its reply by.
   */
  promptId?: string;
  /** Public prompt text or the artist's own draft — never a decrypted prompt. */
  context?: string;
  /** Receives ONLY validated values, keyed by variable id. */
  onValues: (values: Record<string, DiceValue>) => void;
  /** Extra headers the surface's API client already uses (session token). */
  headers?: Record<string, string>;
  disabled?: boolean;
  className?: string;
  /** Pixel size of the icon; the hit target padding stays constant. */
  size?: number;
  title?: string;
}

export function DiceButton({
  variables,
  promptId,
  context,
  onValues,
  headers,
  disabled,
  className,
  size = 16,
  title = "Roll the dice — fill the variables with a random idea",
}: DiceButtonProps) {
  const [rolling, setRolling] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  // One roll at a time; a second click while in flight is a mash, not intent.
  const inFlight = useRef(false);

  const rollable = variables.filter((v) => v.type !== "image");

  const roll = useCallback(async () => {
    if (inFlight.current || disabled || rollable.length === 0) return;
    inFlight.current = true;
    setRolling(true);
    try {
      const res = await fetch("/api/workflow/variables", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(headers ?? {}) },
        body: JSON.stringify(promptId ? { promptId } : { variables: rollable, context }),
      });
      if (res.status === 501) {
        // Not configured on this deployment — vanish rather than error on
        // every click from here on.
        setUnavailable(true);
        return;
      }
      if (!res.ok) return; // rate limit or upstream hiccup: the roll just does nothing
      const json = (await res.json()) as { values?: Record<string, DiceValue> };
      if (json.values && Object.keys(json.values).length > 0) onValues(json.values);
    } catch {
      /* a failed roll costs the user nothing — their values are untouched */
    } finally {
      inFlight.current = false;
      setRolling(false);
    }
  }, [rollable, context, headers, disabled, onValues]);

  if (rollable.length === 0 || unavailable) return null;

  return (
    <button
      type="button"
      onClick={roll}
      disabled={disabled || rolling}
      aria-label={title}
      title={title}
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 8,
        background: "transparent",
        border: "1px solid var(--enki-rule-2, rgba(127,127,127,0.35))",
        borderRadius: 8,
        color: "var(--enki-ink-2, currentColor)",
        cursor: disabled || rolling ? "default" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "transform 0.15s ease, opacity 0.2s ease",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={
          rolling
            ? { animation: "enki-dice-roll 0.8s ease-in-out infinite" }
            : undefined
        }
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="4" />
        {/* die face 5 — pips are filled, not stroked */}
        <circle cx="8" cy="8" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="16" cy="8" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="8" cy="16" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="16" cy="16" r="1.4" fill="currentColor" stroke="none" />
      </svg>
      <style>{`@keyframes enki-dice-roll { 0% { transform: rotate(0deg); } 25% { transform: rotate(-14deg); } 75% { transform: rotate(14deg); } 100% { transform: rotate(0deg); } }`}</style>
    </button>
  );
}

export default DiceButton;
