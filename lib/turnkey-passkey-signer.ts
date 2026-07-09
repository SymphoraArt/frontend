"use client";

/**
 * Browser-side Turnkey passkey signing (Plan A).
 *
 * Signs a raw hex payload with the USER'S OWN passkey against their sub-org —
 * the WebAuthn prompt (Face ID / fingerprint) IS the user's approval of the
 * action. Enki's parent key is not involved and, for passkey-rooted sub-orgs,
 * structurally cannot produce this signature.
 *
 * Parameter-identical to the retired server-side signRawPayload call, so the
 * produced signature drops into the same 64-byte ed25519 slot.
 */
import { Turnkey } from "@turnkey/sdk-browser";

const TURNKEY_BASE_URL = "https://api.turnkey.com";

function getPasskeyClient() {
  const sdk = new Turnkey({
    apiBaseUrl: TURNKEY_BASE_URL,
    defaultOrganizationId: process.env.NEXT_PUBLIC_TURNKEY_ORGANIZATION_ID ?? "",
  });
  return sdk.passkeyClient({ rpId: window.location.hostname });
}

/** Returns the 128-hex-char r||s ed25519 signature over `payloadHex`. */
export async function passkeySignPayloadHex(
  subOrgId: string,
  signWith: string,
  payloadHex: string,
): Promise<string> {
  const client = getPasskeyClient();
  const signed = await client.signRawPayload({
    organizationId: subOrgId,
    signWith,
    payload: payloadHex,
    encoding: "PAYLOAD_ENCODING_HEXADECIMAL",
    // Solana / ed25519 cannot pre-hash per RFC 8032 — must be NOT_APPLICABLE.
    hashFunction: "HASH_FUNCTION_NOT_APPLICABLE",
  });
  // v6 clients return the activity result flattened; keep the nested shape as
  // a fallback across minor SDK versions.
  const result = (signed ?? {}) as {
    r?: string;
    s?: string;
    activity?: { result?: { signRawPayloadResult?: { r?: string; s?: string } } };
  };
  const r = result.r ?? result.activity?.result?.signRawPayloadResult?.r ?? "";
  const s = result.s ?? result.activity?.result?.signRawPayloadResult?.s ?? "";
  if (!/^[0-9a-fA-F]{1,64}$/.test(r) || !/^[0-9a-fA-F]{1,64}$/.test(s)) {
    throw new Error("Unexpected Turnkey signature shape");
  }
  return r.padStart(64, "0") + s.padStart(64, "0");
}
