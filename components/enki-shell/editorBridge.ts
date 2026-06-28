/**
 * Tiny bridge so a prompt card anywhere (e.g. the profile's "Released" list) can
 * ask the shell to open Create Prompt 2 (the node editor) loaded with that prompt.
 * The card calls requestPromptEdit(prompt); EnkiHome listens for the event,
 * consumes the prompt, and opens the node creator in edit mode.
 */
export const EDIT_PROMPT_EVENT = "enki:edit-prompt";

let pending: unknown = null;

export function requestPromptEdit(prompt: unknown) {
  pending = prompt;
  if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent(EDIT_PROMPT_EVENT));
}

export function consumePromptEdit(): unknown {
  const p = pending;
  pending = null;
  return p;
}
