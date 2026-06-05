"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import { useActiveAccount } from "thirdweb/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useTurnkeyEmailAuth } from "@/hooks/useTurnkeyAuth";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "../providers/ThemeProvider";
import { addCreation } from "@/lib/creations";
import { useHoldings, refreshHoldings } from "@/hooks/useHoldings";
import AlgencyMobileGenerateModal from "@/components/AlgencyMobileGenerateModal";

// Per-render API cost (USDC). Canonical prices live in the Supabase `models`
// table (served via /api/models); these mirror the editor's $0.10 fallback.
const GL_MODELS = [
  { id: "nano-banana-pro", name: "Nano Banana Pro", price: 0.1 },
  { id: "gpt-image-2", name: "GPT-Image-2", price: 0.1 },
];
const GL_RATIOS = ["1:1", "4:5", "3:4", "16:9", "9:16"];
const MAX_REFERENCE_IMAGES = 4;

/**
 * GenerateLauncher — the unified "Generate" entry point that replaces the
 * old EnkiQuickCreate pill/panel. The launch pill opens the shared
 * AlgencyMobileGenerateModal (Generate-only; Release stays in /editor) on
 * all viewports, with reference-image upload + NFT support.
 */
export default function GenerateLauncher() {
  const router = useRouter();
  const { toast } = useToast();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const account = useActiveAccount();
  const { publicKey: solanaPublicKey, connected: solanaAdapterConnected } = useWallet();
  const { address: turnkeyAddress, sessionToken: turnkeySession } = useTurnkeyEmailAuth();
  const userKey = useMemo(
    () => account?.address ?? solanaPublicKey?.toBase58() ?? turnkeyAddress ?? null,
    [account?.address, solanaPublicKey, turnkeyAddress]
  );

  // Generation is paid from the user's persisted USD balance server-side (the
  // platform's API keys cover the actual cost). No on-chain payment, no Turnkey
  // signing — the user just needs to be signed in with enough balance.
  const solanaConnected = solanaAdapterConnected || !!turnkeyAddress;
  const walletConnected = Boolean(account?.address) || solanaConnected;

  // Account balance shown in plain $ (no chain wording). This is the spendable
  // fiat balance stored on the user (turnkey_users.balance), the same place
  // Stripe/PayPal top-ups land — NOT an on-chain wallet balance.
  const payAddress = account?.address ?? turnkeyAddress ?? null;
  const { balance: holdings, ready: holdingsReady } = useHoldings(payAddress);
  const balance = payAddress && holdingsReady ? holdings : null;

  // Sends the user to Settings → Billing to top up (Apple Pay / card / deposit).
  const goTopUp = () => {
    setOpen(false);
    router.push("/settings?tab=billing");
  };

  const [open, setOpen] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [valueByToken, setValueByToken] = useState<Record<string, string>>({});
  const [model, setModel] = useState(GL_MODELS[0].id);
  const [ratio, setRatio] = useState("1:1");
  const [referenceImages, setReferenceImages] = useState<string[]>([]);
  const [results, setResults] = useState<string[]>([]);

  // Detect [bracket] variables; preserve entered values keyed by token.
  const variables = useMemo(() => {
    const seen = new Set<string>();
    const out: {
      id: string;
      name: string;
      label: string;
      type: string;
      defaultValue: string;
      values: string[];
    }[] = [];
    const re = /\[([^\]]+)\]/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(prompt)) !== null) {
      const full = m[0];
      if (seen.has(full)) continue;
      seen.add(full);
      out.push({
        id: full,
        name: m[1],
        label: m[1],
        type: "text",
        defaultValue: "",
        values: [valueByToken[full] ?? ""],
      });
    }
    return out;
  }, [prompt, valueByToken]);

  const generate = async () => {
    if (generating) return;
    const final = prompt.replace(/\[[^\]]+\]/g, (tok) => valueByToken[tok] || tok);
    if (!final.trim()) {
      toast({ title: "Error", description: "Please enter a prompt.", variant: "destructive" });
      return;
    }
    if (!walletConnected || !payAddress) {
      toast({
        title: "Sign in to generate",
        description: "Log in with your email or wallet first.",
      });
      return;
    }
    setGenerating(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(turnkeySession ? { "X-Session-Token": turnkeySession } : {}),
        },
        body: JSON.stringify({
          prompt: final.trim(),
          aspectRatio: ratio,
          resolution: "2K",
          address: payAddress,
          referenceImages,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        imageUrl?: string;
        error?: string;
        code?: string;
      };

      // Out of balance → guide to top-up instead of a raw error.
      if (res.status === 402 || data.code === "INSUFFICIENT_BALANCE") {
        toast({
          title: "Add funds to generate",
          description: "Your balance is too low. Top up to keep creating.",
        });
        goTopUp();
        return;
      }
      if (!res.ok || !data.imageUrl) {
        throw new Error(data.error || "Generation failed");
      }

      // The charge already changed the server balance; refresh the navbar pill.
      refreshHoldings();
      // Surface the new image ABOVE the modal (newest first); keep the modal open.
      setResults((prev) => [data.imageUrl as string, ...prev]);
      if (userKey) {
        addCreation(userKey, {
          id: `gl-${Date.now()}`,
          imageUrl: data.imageUrl,
          prompt: final,
          createdAt: new Date().toISOString(),
          referenceImages: referenceImages.length ? referenceImages : undefined,
          aspectRatio: ratio,
        });
        window.dispatchEvent(new Event("gallery-refresh"));
      }
      toast({ title: "Generated & saved to gallery", description: "Your image is ready." });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      toast({ title: "Generation failed", description: msg, variant: "destructive" });
    } finally {
      setGenerating(false);
    }
  };

  const addReferenceImages = (files: FileList) => {
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const url = typeof reader.result === "string" ? reader.result : null;
        if (url) {
          setReferenceImages((prev) =>
            prev.length >= MAX_REFERENCE_IMAGES ? prev : [...prev, url]
          );
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <AlgencyMobileGenerateModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setResults([]);
        }}
        promptBody={prompt}
        setPromptBody={setPrompt}
        variables={variables}
        onVariableChange={(id, val) => setValueByToken((prev) => ({ ...prev, [id]: val }))}
        onAddVariable={() => {
          const n = variables.length + 1;
          setPrompt((prev) => `${prev}${prev && !prev.endsWith(" ") ? " " : ""}[var_${n}]`);
        }}
        onRemoveVariable={(name) => setPrompt((prev) => prev.split(`[${name}]`).join("").replace(/\s{2,}/g, " ").trim())}
        models={{ available: GL_MODELS, selected: [model] }}
        setModel={setModel}
        ratios={{ available: GL_RATIOS, selected: ratio }}
        setRatio={setRatio}
        pricePerSlot={GL_MODELS.find((m) => m.id === model)?.price ?? 0.1}
        referenceImages={referenceImages}
        onAddReferenceImages={addReferenceImages}
        onRemoveReferenceImage={(i) =>
          setReferenceImages((prev) => prev.filter((_, idx) => idx !== i))
        }
        generateLabel={generating ? "Generating…" : "Generate"}
        balance={balance}
        onTopUp={goTopUp}
        resultImages={results}
        isGenerating={generating}
        onGenerate={generate}
        onOpenPromptEditor={() => router.push("/editor")}
      />

      {/* "stern Generate" floating button — matches the /editor launcher */}
      {!open && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            left: 16,
            right: 16,
            zIndex: 150,
            display: "flex",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <button
            type="button"
            onClick={() => setOpen(true)}
            style={{
              width: "100%",
              maxWidth: 560,
              background: isDark ? "#FFFFFF" : "#1a1715",
              color: isDark ? "#1C1A18" : "#FFFFFF",
              padding: "16px 24px",
              borderRadius: 32,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              border: "none",
              boxShadow: "0 12px 32px rgba(0,0,0,0.2)",
              cursor: "pointer",
              pointerEvents: "auto",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Sparkles size={18} style={{ fill: isDark ? "#1C1A18" : "#FFFFFF" }} />
              <span style={{ fontFamily: "var(--font-outfit), 'Outfit', sans-serif", fontSize: 16, fontWeight: 500 }}>
                Generate
              </span>
            </div>
            <span style={{ fontFamily: "var(--font-instrument-serif), 'Playfair Display', serif", fontStyle: "italic", fontSize: 15, color: "#9A938A" }}>
              new image
            </span>
          </button>
        </div>
      )}
    </>
  );
}
