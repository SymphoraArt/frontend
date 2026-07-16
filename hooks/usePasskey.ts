"use client";

import { useCallback, useState } from "react";
import { startRegistration, startAuthentication } from "@simplewebauthn/browser";
import { sessionAuthHeaders } from "@/lib/session-headers";

/**
 * App-side passkey step-up 2FA (opt-in). enroll() registers a passkey for the
 * signed-in user; stepUp(scope) runs a passkey challenge and returns a
 * short-lived token to send as X-StepUp-Token on the guarded request.
 *
 * Usage in a sensitive action:
 *   const token = await stepUp("delete-work");
 *   await fetch(url, { method: "DELETE", headers: { ...sessionAuthHeaders(),
 *     ...(token ? { "X-StepUp-Token": token } : {}) } });
 * A null token means the user has no passkey (server won't require one).
 */
async function post(path: string, body?: unknown) {
  const res = await fetch(path, {
    method: "POST",
    headers: { "content-type": "application/json", ...sessionAuthHeaders() },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

export function usePasskey() {
  const [busy, setBusy] = useState(false);

  const enroll = useCallback(async (label?: string) => {
    setBusy(true);
    try {
      const opts = await post("/api/auth/passkey/register/options");
      if (!opts.ok) throw new Error(opts.data?.error || "Could not start registration");
      const attResp = await startRegistration({ optionsJSON: opts.data });
      const verify = await post("/api/auth/passkey/register/verify", { response: attResp, label });
      if (!verify.ok || !verify.data?.verified) throw new Error(verify.data?.error || "Passkey registration failed");
      return true;
    } finally {
      setBusy(false);
    }
  }, []);

  // Returns a step-up token, or null when the user has no passkey enrolled
  // (the server treats step-up as opt-in, so the caller proceeds without one).
  const stepUp = useCallback(async (scope: string): Promise<string | null> => {
    const opts = await post("/api/auth/passkey/stepup/options");
    if (opts.status === 404) return null; // no passkey registered
    if (!opts.ok) throw new Error(opts.data?.error || "Could not start verification");
    const asseResp = await startAuthentication({ optionsJSON: opts.data });
    const verify = await post("/api/auth/passkey/stepup/verify", { response: asseResp, scope });
    if (!verify.ok || !verify.data?.token) throw new Error(verify.data?.error || "Passkey verification failed");
    return verify.data.token as string;
  }, []);

  return { enroll, stepUp, busy };
}
