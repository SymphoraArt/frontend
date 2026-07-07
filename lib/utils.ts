import React from "react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Renders a dialog message so each sentence sits on its own line.
 *
 * Only applies when the message is a plain string (the common case for our
 * confirmation dialogs). Sentences are split on end punctuation followed by
 * whitespace and a capital letter / digit, so decimals ("$0.10") and inline
 * abbreviations aren't broken apart. Non-string children (JSX) pass through
 * untouched.
 */
export function renderSentencesPerLine(
  children: React.ReactNode
): React.ReactNode {
  if (typeof children !== "string") return children
  const sentences = children
    .trim()
    .split(/(?<=[.!?])\s+(?=[A-Z0-9])/)
    .filter(Boolean)
  if (sentences.length <= 1) return children
  return sentences.map((sentence, i) =>
    React.createElement("span", { key: i, className: "block" }, sentence)
  )
}
