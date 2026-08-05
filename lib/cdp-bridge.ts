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
export const CDP_SIGN_REQUEST = "enki-cdp-sign-request";
export const CDP_SIGN_RESULT = "enki-cdp-sign-result";

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

let signSeq = 0;

/**
 * Ask the CDP runtime to sign a serialized Solana transaction (base64 in,
 * base64 out). Same request/response shape as the export above, for the same
 * reason: the signing hook only exists inside the lazily-mounted provider.
 */
export function requestCdpSign(transaction: string, timeoutMs = 60_000): Promise<string> {
  const id = String(++signSeq);
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      cleanup();
      reject(new Error("The wallet didn't answer. Reload and try again."));
    }, timeoutMs);
    const onResult = (e: Event) => {
      const d = (e as CustomEvent).detail as
        | { id?: string; signedTransaction?: string; error?: string }
        | undefined;
      // Two signings can overlap (a payment while another is still open).
      // Ignore answers meant for a different request rather than settling one
      // payment with the other's signature.
      if (!d || d.id !== id) return;
      cleanup();
      if (d.signedTransaction) resolve(d.signedTransaction);
      else reject(new Error(d.error || "Signing failed"));
    };
    const cleanup = () => {
      clearTimeout(timer);
      window.removeEventListener(CDP_SIGN_RESULT, onResult);
    };
    window.addEventListener(CDP_SIGN_RESULT, onResult);
    window.dispatchEvent(new CustomEvent(CDP_SIGN_REQUEST, { detail: { id, transaction } }));
  });
}
