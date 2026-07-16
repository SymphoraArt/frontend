"use client";

/**
 * /guardian?token=… — where an INVITED GUARDIAN (a friend, not the account
 * owner) confirms their role. Reached only via the share link from
 * Settings → Recovery & 2FA. Wallet guardians connect the invited wallet and
 * sign one message; email guardians just press confirm.
 * Styled like the landing login popup (EnkiCardPage).
 */
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletReadyState } from "@solana/wallet-adapter-base";
import type { WalletName } from "@solana/wallet-adapter-base";
import { CheckCircle2, Loader2 } from "lucide-react";
import { guardianMessage } from "@/lib/guardian-message";
import EnkiCardPage, { EnkiCardButton } from "@/components/EnkiCardPage";

interface Invite {
  guardianType: "wallet" | "email";
  maskedValue: string;
  status: "pending" | "confirmed";
  inviterHandle: string;
}

const SUB = { fontSize: 14, lineHeight: 1.6, color: "rgba(245,242,236,0.72)" } as const;

/** Recovery mode: a guardian enters the 7-digit code from their email to
 *  approve a locked-out friend's account recovery. */
function RecoveryApprove({ requestId, guardianId }: { requestId: string; guardianId: string }) {
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ approved: number; threshold: number } | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setError(null);
    try {
      const res = await fetch("/api/recovery/approve", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, guardianId, code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Could not approve.");
      setResult({ approved: data.approved, threshold: data.threshold });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not approve.");
    } finally { setBusy(false); }
  };

  if (result) {
    return (
      <EnkiCardPage title="Thank you — approval counted." eyebrow="Enki Art · Recovery">
        <p style={{ ...SUB, display: "flex", alignItems: "flex-start", gap: 8 }}>
          <CheckCircle2 size={20} style={{ color: "#7fd99a", flexShrink: 0, marginTop: 2 }} />
          <span>
            {result.approved} of {result.threshold} approvals are in.
            {result.approved >= result.threshold
              ? " Your friend can set a new password now."
              : " Once enough guardians approve, your friend gets back in."}
          </span>
        </p>
      </EnkiCardPage>
    );
  }

  return (
    <EnkiCardPage title="Help your friend get back in." eyebrow="Enki Art · Recovery">
      <p style={{ ...SUB, marginBottom: 8 }}>
        Someone who trusts you as their recovery guardian is locked out. You got a
        <b> 7-digit code</b> in the same email as this link.
      </p>
      <p style={{ fontSize: 13, color: "#e8a83a", fontWeight: 600, marginBottom: 18 }}>
        Only enter it if they contacted you personally and you&apos;re sure it&apos;s really them.
      </p>
      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input
          inputMode="numeric" autoComplete="one-time-code" placeholder="1234567" maxLength={7} autoFocus
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 7))}
          style={{
            width: "100%", padding: "13px 16px", borderRadius: 12, outline: "none",
            border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)",
            color: "#f5f2ec", textAlign: "center", fontSize: 26, letterSpacing: "0.45em",
            fontFamily: "monospace", fontWeight: 700,
          }}
        />
        {error && <p style={{ fontSize: 13, color: "#ff7a6b", margin: 0 }}>{error}</p>}
        <EnkiCardButton type="submit" disabled={busy || code.length !== 7}>
          {busy ? "Checking…" : "Approve recovery"}
        </EnkiCardButton>
      </form>
    </EnkiCardPage>
  );
}

/** Deletion-approval mode: a guardian approves a friend's account deletion. */
function DeletionApprove({ token }: { token: string }) {
  const [info, setInfo] = useState<{ requesterHandle: string; alreadyApproved: boolean } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/account/delete/approve?token=${encodeURIComponent(token)}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "This link isn't valid.");
        setInfo(data);
        if (data.alreadyApproved) setDone(true);
      } catch (e) {
        setError(e instanceof Error ? e.message : "This link isn't valid.");
      }
    })();
  }, [token]);

  const approve = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/account/delete/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Could not approve.");
      setDone(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not approve.");
    } finally { setBusy(false); }
  };

  if (done) {
    return (
      <EnkiCardPage title="Approved." eyebrow="Enki Art · Account">
        <p style={SUB}>
          Thanks. Once enough guardians approve, {info?.requesterHandle ?? "their"} account will be deleted. You can close this page.
        </p>
      </EnkiCardPage>
    );
  }
  if (error && !info) {
    return <EnkiCardPage title="Hm, that didn't work." eyebrow="Enki Art · Account"><p style={SUB}>{error}</p></EnkiCardPage>;
  }
  if (!info) {
    return <EnkiCardPage title="One moment…" eyebrow="Enki Art · Account"><Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /></EnkiCardPage>;
  }
  return (
    <EnkiCardPage title={`Approve deleting ${info.requesterHandle}'s account?`} eyebrow="Enki Art · Account">
      <p style={{ ...SUB, marginBottom: 20 }}>
        {info.requesterHandle} asked to permanently delete their Enki Art account and named you as a guardian.
        Only approve if you know this is really them. Doing nothing is also fine.
      </p>
      <EnkiCardButton onClick={approve} disabled={busy}>
        {busy ? "One moment…" : "Yes, approve deletion"}
      </EnkiCardButton>
      {error && <p style={{ fontSize: 13, color: "#ff7a6b", marginTop: 12 }}>{error}</p>}
    </EnkiCardPage>
  );
}

function GuardianInner() {
  const params = useSearchParams();
  const token = params.get("token") ?? "";
  const recoveryId = params.get("recovery");
  const recoveryGuardian = params.get("g");
  const deleteToken = params.get("delete");
  const { wallets, select, publicKey, signMessage, connected } = useWallet();

  const [invite, setInvite] = useState<Invite | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [declined, setDeclined] = useState(false);
  // The email carries separate accept/decline links (?action=…). Neither
  // auto-executes — mail scanners prefetch links — the page just leads with
  // the matching button.
  const [mode, setMode] = useState<"accept" | "decline">(params.get("action") === "decline" ? "decline" : "accept");

  useEffect(() => {
    if (!token) { setError("This link is missing its code — ask your friend to copy it again from their Recovery settings."); return; }
    (async () => {
      try {
        const res = await fetch(`/api/recovery/guardians/confirm?token=${encodeURIComponent(token)}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "This link isn't valid.");
        setInvite(data as Invite);
        if ((data as Invite).status === "confirmed") setDone(true);
      } catch (e) {
        setError(e instanceof Error ? e.message : "This link isn't valid.");
      }
    })();
  }, [token]);

  const confirm = async (signature?: string) => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/recovery/guardians/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signature ? { token, signature } : { token }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Could not confirm.");
      setDone(true);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Could not confirm.";
      if (!/reject|cancel|denied/i.test(msg)) setError(msg);
    } finally { setBusy(false); }
  };

  const confirmWallet = async () => {
    if (!connected || !publicKey || !signMessage) { setError("Connect the invited wallet first."); return; }
    try {
      const sigBytes = await signMessage(new TextEncoder().encode(guardianMessage(token)));
      await confirm(Buffer.from(sigBytes).toString("base64"));
    } catch { /* user closed the popup — stay put */ }
  };

  const decline = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/recovery/guardians/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, decline: true }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Could not decline.");
      setDeclined(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not decline.");
    } finally { setBusy(false); }
  };

  const installedWallets = wallets.filter(
    (w) => w.readyState === WalletReadyState.Installed || w.readyState === WalletReadyState.Loadable
  );

  // Account-deletion approval mode (?delete=token).
  if (deleteToken) {
    return <DeletionApprove token={deleteToken} />;
  }

  // Recovery-approval mode (?recovery=…&g=…) — a different job than the
  // invite-confirm flow below.
  if (recoveryId && recoveryGuardian) {
    return <RecoveryApprove requestId={recoveryId} guardianId={recoveryGuardian} />;
  }

  if (declined) {
    return (
      <EnkiCardPage title="No problem." eyebrow="Enki Art · Recovery">
        <p style={SUB}>
          You&apos;ve declined the guardian role.
          {invite?.inviterHandle ? ` ${invite.inviterHandle} will see you're no longer on their list.` : ""}
          {" "}You can close this page.
        </p>
      </EnkiCardPage>
    );
  }

  if (done) {
    return (
      <EnkiCardPage title="You're a guardian now." eyebrow="Enki Art · Recovery">
        <p style={{ ...SUB, display: "flex", alignItems: "flex-start", gap: 8 }}>
          <CheckCircle2 size={20} style={{ color: "#7fd99a", flexShrink: 0, marginTop: 2 }} />
          <span>
            Nothing else to do today. If {invite?.inviterHandle ?? "your friend"} ever loses access,
            we&apos;ll ask you to approve their recovery — that&apos;s the whole job.
          </span>
        </p>
      </EnkiCardPage>
    );
  }

  if (error && !invite) {
    return (
      <EnkiCardPage title="Hm, that didn't work." eyebrow="Enki Art · Recovery">
        <p style={SUB}>{error}</p>
      </EnkiCardPage>
    );
  }

  if (!invite) {
    return (
      <EnkiCardPage title="One moment…" eyebrow="Enki Art · Recovery">
        <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
      </EnkiCardPage>
    );
  }

  if (mode === "decline") {
    return (
      <EnkiCardPage title="Decline the guardian role?" eyebrow="Enki Art · Recovery">
        <p style={{ ...SUB, marginBottom: 20 }}>
          {invite.inviterHandle} asked you to be a recovery guardian for their Enki Art account.
          If that&apos;s not for you, decline below and you&apos;re off their list.
        </p>
        <EnkiCardButton onClick={decline} disabled={busy}>
          {busy ? "One moment…" : "Yes, decline"}
        </EnkiCardButton>
        <button
          onClick={() => setMode("accept")}
          disabled={busy}
          style={{
            width: "100%", marginTop: 10, minHeight: 40, borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.14)", background: "transparent",
            color: "rgba(245,242,236,0.6)", fontSize: 13, fontWeight: 600, cursor: "pointer",
          }}
        >
          I&apos;d rather accept the role
        </button>
        {error && <p style={{ fontSize: 13, color: "#ff7a6b", marginTop: 12 }}>{error}</p>}
      </EnkiCardPage>
    );
  }

  return (
    <EnkiCardPage title={`Become a guardian for ${invite.inviterHandle}`} eyebrow="Enki Art · Recovery">
      <p style={{ ...SUB, marginBottom: 20 }}>
        {invite.inviterHandle} trusts you to help them get back into their Enki Art account if they
        ever get locked out. Confirming costs nothing and moves no money — you&apos;d simply be asked
        to approve their recovery one day.
      </p>
      {invite.guardianType === "email" ? (
        <>
          <EnkiCardButton onClick={() => confirm()} disabled={busy}>
            {busy ? "Confirming…" : "Yes, I'll be their guardian"}
          </EnkiCardButton>
          <button
            onClick={decline}
            disabled={busy}
            style={{
              width: "100%", marginTop: 10, minHeight: 40, borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.14)", background: "transparent",
              color: "rgba(245,242,236,0.6)", fontSize: 13, fontWeight: 600, cursor: "pointer",
            }}
          >
            No thanks, decline
          </button>
        </>
      ) : (
        <>
          <p style={{ fontSize: 13, color: "rgba(245,242,236,0.55)", marginBottom: 14 }}>
            Invited wallet: <span style={{ fontFamily: "monospace" }}>{invite.maskedValue}</span>.
            Connect exactly that wallet, then sign one message to prove it&apos;s yours.
          </p>
          {!connected ? (
            installedWallets.length === 0 ? (
              <p style={{ fontSize: 13, color: "rgba(245,242,236,0.55)" }}>
                No Solana wallet extension found in this browser.
              </p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {installedWallets.map((w) => (
                  <button
                    key={w.adapter.name}
                    onClick={async () => {
                      setError(null);
                      try {
                        select(w.adapter.name as WalletName);
                        await w.adapter.connect();
                      } catch { /* user closed the popup */ }
                    }}
                    style={{
                      display: "flex", alignItems: "center", gap: 10, padding: "12px 14px",
                      borderRadius: 12, border: "1px solid rgba(255,255,255,0.12)",
                      background: "rgba(255,255,255,0.04)", color: "#f5f2ec",
                      fontSize: 14, fontWeight: 600, cursor: "pointer",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={w.adapter.icon} alt="" width={20} height={20} />
                    Connect {w.adapter.name}
                  </button>
                ))}
              </div>
            )
          ) : (
            <EnkiCardButton onClick={confirmWallet} disabled={busy}>
              {busy ? "Waiting for your signature…" : "Sign & confirm"}
            </EnkiCardButton>
          )}
          <button
            onClick={decline}
            disabled={busy}
            style={{
              width: "100%", marginTop: 10, minHeight: 40, borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.14)", background: "transparent",
              color: "rgba(245,242,236,0.6)", fontSize: 13, fontWeight: 600, cursor: "pointer",
            }}
          >
            No thanks, decline
          </button>
        </>
      )}
      {error && <p style={{ fontSize: 13, color: "#ff7a6b", marginTop: 12 }}>{error}</p>}
    </EnkiCardPage>
  );
}

export default function GuardianPage() {
  return (
    <Suspense fallback={null}>
      <GuardianInner />
    </Suspense>
  );
}
