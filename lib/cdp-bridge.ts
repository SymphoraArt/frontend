/**
 * Tiny bridge between the standalone CDP runtime tree (CdpWalletBridge, which
 * owns the @coinbase/cdp-hooks context) and the rest of the app, which mounts
 * outside that provider. Address flows out via a module store + event; key
 * export is request/response over window events — the private key itself only
 * ever passes through the promise below, nothing is stored.
 */

export const CDP_ADDRESS_EVENT = "enki-cdp-address";
export const CDP_EXPORT_REQUEST = "enki-cdp-export-request";
export const CDP_EXPORT_RESULT = "enki-cdp-export-result";

let solanaAddress: string | null = null;

export function setCdpSolanaAddress(addr: string | null) {
  solanaAddress = addr;
  if (typeof window !== "undefined") window.dispatchEvent(new Event(CDP_ADDRESS_EVENT));
}

export function getCdpSolanaAddress(): string | null {
  return solanaAddress;
}

/** Ask the CDP runtime to export the Solana private key (resolves with it). */
export function requestCdpKeyExport(timeoutMs = 30_000): Promise<string> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      cleanup();
      reject(new Error("The wallet didn't answer. Reload and try again."));
    }, timeoutMs);
    const onResult = (e: Event) => {
      cleanup();
      const d = (e as CustomEvent).detail as { privateKey?: string; error?: string } | undefined;
      if (d?.privateKey) resolve(d.privateKey);
      else reject(new Error(d?.error || "Export failed"));
    };
    const cleanup = () => {
      clearTimeout(timer);
      window.removeEventListener(CDP_EXPORT_RESULT, onResult);
    };
    window.addEventListener(CDP_EXPORT_RESULT, onResult);
    window.dispatchEvent(new Event(CDP_EXPORT_REQUEST));
  });
}
