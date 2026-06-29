"use client";

/**
 * /recovery/status
 *
 * Read-only summary of every recovery rail this account currently has.
 * - Email recovery (Turnkey): live as soon as a user signs in via OTP. Recovery
 *   is "log in with the same email to land on the same wallet".
 * - On-chain guardian (Symphora program): reads the GuardianConfig PDA for the
 *   active wallet. Registration / recovery transactions are intentionally not
 *   wired here yet — they're scheduled for the post-hackathon write-flow PR.
 */

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import Navbar from "@/components/Navbar";
import { useTurnkeyEmailAuth } from "@/hooks/useTurnkeyAuth";
import { useSolanaAuth } from "@/hooks/useSolanaAuth";
import {
  fetchGuardianConfig,
  getGuardianConfigPda,
  SYMPHORA_PROGRAM_ID,
  type GuardianConfigAccount,
} from "@/lib/symphora-program";

type GuardianStatus =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "missing"; pda: string }
  | { state: "registered"; pda: string; account: GuardianConfigAccount }
  | { state: "error"; message: string };

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section
      style={{
        background: "var(--background, #fff)",
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 16,
        padding: "20px 22px",
        marginBottom: 16,
      }}
    >
      <h2 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 12px", letterSpacing: "0.02em", textTransform: "uppercase" }}>
        {title}
      </h2>
      <div style={{ fontSize: 13, lineHeight: 1.6, color: "rgba(0,0,0,0.75)" }}>{children}</div>
    </section>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code
      style={{
        fontFamily: "var(--font-jetbrains-mono), monospace",
        fontSize: 12,
        background: "rgba(0,0,0,0.05)",
        padding: "1px 6px",
        borderRadius: 4,
        wordBreak: "break-all",
      }}
    >
      {children}
    </code>
  );
}

function StatusPill({ tone, children }: { tone: "ok" | "warn" | "muted"; children: React.ReactNode }) {
  const colors = {
    ok: { bg: "rgba(16,185,129,0.12)", fg: "#059669" },
    warn: { bg: "rgba(245,158,11,0.12)", fg: "#b45309" },
    muted: { bg: "rgba(0,0,0,0.06)", fg: "rgba(0,0,0,0.55)" },
  }[tone];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        background: colors.bg,
        color: colors.fg,
        fontSize: 11,
        fontWeight: 600,
        padding: "3px 10px",
        borderRadius: 999,
        letterSpacing: "0.02em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </span>
  );
}

export default function RecoveryStatusPage() {
  const { publicKey: solanaPublicKey } = useWallet();
  const { walletAddress: solanaSessionAddress, isAuthenticated: solanaSessionActive } = useSolanaAuth();
  const { address: turnkeyAddress } = useTurnkeyEmailAuth();

  const activeOwnerAddress = useMemo<string | null>(() => {
    if (turnkeyAddress) return turnkeyAddress;
    if (solanaSessionActive && solanaSessionAddress) return solanaSessionAddress;
    if (solanaPublicKey) return solanaPublicKey.toBase58();
    return null;
  }, [turnkeyAddress, solanaSessionActive, solanaSessionAddress, solanaPublicKey]);

  const [guardian, setGuardian] = useState<GuardianStatus>({ state: "idle" });

  useEffect(() => {
    if (!activeOwnerAddress) {
      setGuardian({ state: "idle" });
      return;
    }
    let cancelled = false;
    setGuardian({ state: "loading" });
    (async () => {
      try {
        const owner = new PublicKey(activeOwnerAddress);
        const pda = getGuardianConfigPda(owner).toBase58();
        const account = await fetchGuardianConfig(owner);
        if (cancelled) return;
        if (!account) {
          setGuardian({ state: "missing", pda });
        } else {
          setGuardian({ state: "registered", pda, account });
        }
      } catch (err) {
        if (cancelled) return;
        setGuardian({ state: "error", message: err instanceof Error ? err.message : "Failed to fetch GuardianConfig" });
      }
    })();
    return () => { cancelled = true; };
  }, [activeOwnerAddress]);

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 720, margin: "100px auto 80px", padding: "0 20px", fontFamily: "var(--font-sans)" }}>
      <div style={{ background: "#fffbeb", borderBottom: "1px solid #fde68a", color: "#92400e", fontSize: 13, fontWeight: 600, textAlign: "center", padding: "8px 16px" }}>MOCK — this recovery flow is a UI prototype, not wired to Turnkey yet.</div>
        <header style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 11, fontFamily: "monospace", letterSpacing: "0.2em", color: "rgba(0,0,0,0.5)", margin: 0 }}>
            ACCOUNT &nbsp;/&nbsp; RECOVERY
          </p>
          <h1 style={{ fontFamily: "var(--font-instrument-serif), serif", fontStyle: "italic", fontSize: 36, fontWeight: 400, margin: "8px 0 4px", letterSpacing: "-0.01em" }}>
            Recovery status
          </h1>
          <p style={{ fontSize: 13, color: "rgba(0,0,0,0.6)", margin: 0 }}>
            Live read of every recovery rail attached to the wallet you&apos;re currently signed in with.
          </p>
        </header>

        <Section title="Connected wallet">
          {activeOwnerAddress ? (
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <Code>{activeOwnerAddress}</Code>
              {turnkeyAddress ? <StatusPill tone="ok">Turnkey email</StatusPill> : <StatusPill tone="muted">External wallet</StatusPill>}
            </div>
          ) : (
            <p style={{ margin: 0 }}>
              Not signed in. <Link href="/" style={{ color: "#d94f3d" }}>Connect a wallet</Link> to view recovery state.
            </p>
          )}
        </Section>

        <Section title="Email recovery">
          {turnkeyAddress ? (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <StatusPill tone="ok">Active</StatusPill>
                <span>Sign in with the same email to recover this wallet on any device.</span>
              </div>
              <p style={{ margin: "8px 0 0", color: "rgba(0,0,0,0.55)", fontSize: 12 }}>
                Recovery happens via Turnkey OTP. The wallet address is bound to the email at sign-up; subsequent logins resolve to the same Solana address.
              </p>
            </>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <StatusPill tone="muted">Not used</StatusPill>
              <span>This account signed in with an external wallet, so email recovery does not apply.</span>
            </div>
          )}
        </Section>

        <Section title="On-chain guardian (Symphora program)">
          <p style={{ margin: "0 0 10px", color: "rgba(0,0,0,0.55)", fontSize: 12 }}>
            Program: <Code>{SYMPHORA_PROGRAM_ID.toBase58()}</Code>
          </p>
          {guardian.state === "idle" && (
            <p style={{ margin: 0 }}>Connect a wallet to inspect GuardianConfig.</p>
          )}
          {guardian.state === "loading" && (
            <p style={{ margin: 0 }}>Reading GuardianConfig PDA from devnet…</p>
          )}
          {guardian.state === "error" && (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <StatusPill tone="warn">Error</StatusPill>
              <span>{guardian.message}</span>
            </div>
          )}
          {guardian.state === "missing" && (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <StatusPill tone="muted">Not registered</StatusPill>
                <span>No guardian assigned for this owner yet.</span>
              </div>
              <p style={{ margin: "8px 0 4px", fontSize: 12, color: "rgba(0,0,0,0.55)" }}>
                Expected PDA: <Code>{guardian.pda}</Code>
              </p>
              <button
                disabled
                style={{
                  marginTop: 12, padding: "8px 14px", borderRadius: 8,
                  background: "rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.08)",
                  color: "rgba(0,0,0,0.5)", fontSize: 12, fontWeight: 600,
                  cursor: "not-allowed", letterSpacing: "0.05em", textTransform: "uppercase",
                }}
                title="register_guardian write transaction lands in the next sprint."
              >
                Register guardian (coming soon)
              </button>
            </>
          )}
          {guardian.state === "registered" && (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <StatusPill tone="ok">Registered</StatusPill>
                <span>Guardian-based recovery is active for this account.</span>
              </div>
              <dl style={{ margin: "12px 0 0", display: "grid", gridTemplateColumns: "max-content 1fr", gap: "6px 14px", fontSize: 12 }}>
                <dt style={{ color: "rgba(0,0,0,0.55)" }}>Owner</dt>
                <dd style={{ margin: 0 }}><Code>{guardian.account.owner.toBase58()}</Code></dd>
                <dt style={{ color: "rgba(0,0,0,0.55)" }}>Guardian</dt>
                <dd style={{ margin: 0 }}><Code>{guardian.account.guardian.toBase58()}</Code></dd>
                <dt style={{ color: "rgba(0,0,0,0.55)" }}>PDA</dt>
                <dd style={{ margin: 0 }}><Code>{guardian.pda}</Code></dd>
              </dl>
            </>
          )}
        </Section>

        <Section title="Notes">
          <ul style={{ margin: 0, paddingLeft: 18, color: "rgba(0,0,0,0.65)", fontSize: 12, lineHeight: 1.7 }}>
            <li>Email recovery is wallet-equivalent: the same OTP login restores the same Solana address and Turnkey sub-organization.</li>
            <li>Guardian recovery requires a guardian to be registered on-chain (instruction <Code>register_guardian</Code>). The recovery transaction (<Code>recover_wallet</Code>) is executed by the guardian, not the user.</li>
            <li>This page is read-only on purpose — write transactions ship in the next iteration once the program client is signer-ready.</li>
          </ul>
        </Section>
      </main>
    </>
  );
}
