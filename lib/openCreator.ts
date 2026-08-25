/**
 * Open a creator's profile the shell way: inside the right-side panel, the
 * left menu staying put (Kev, 2026-08-24). The cancelable event asks the
 * shell first — EnkiHome consumes it and opens the "creator" panel. Only
 * when nobody listens (standalone pages outside the shell) does the call
 * fall back to the /creators route, which itself redirects into the shell.
 */
export function openCreator(handle: string, router?: { push: (url: string) => void }): void {
  const notConsumed = window.dispatchEvent(
    new CustomEvent("enki:open-creator", { cancelable: true, detail: { handle } }),
  );
  if (notConsumed) {
    const url = `/creators/${encodeURIComponent(handle)}`;
    if (router) router.push(url);
    else window.location.assign(url);
  }
}
