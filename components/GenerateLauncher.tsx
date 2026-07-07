"use client";

import { useEffect, useMemo, useRef, useState, type Dispatch, type SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import { useActiveAccount } from "thirdweb/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useTurnkeyEmailAuth } from "@/hooks/useTurnkeyAuth";
import { useToast } from "@/hooks/use-toast";
import { addCreation } from "@/lib/creations";
import EnkiMobileGenerateModal from "@/components/EnkiMobileGenerateModal";
import type { EnkiPrompt } from "@/lib/enkiPromptAdapter";

// Per-render display price (USD). This build generates via the free Pollinations
// endpoint, so the price is cosmetic — it mirrors the editor's $0.10 label.
const GL_MODELS = [
  { id: "nano-banana-pro", name: "Nano Banana Pro", price: 0.1 },
  { id: "gpt-image-2", name: "GPT-Image-2", price: 0.1 },
];
const GL_RATIOS = ["1:1", "4:5", "3:4", "16:9", "9:16"];
const MAX_REFERENCE_IMAGES = 20;

/**
 * GenerateLauncher — the unified "Generate" entry point (ported from pr45) that
 * replaces the old EnkiQuickCreate pill/panel. The launch pill opens the shared
 * EnkiMobileGenerateModal (Generate-only) on all viewports, with
 * reference-image upload + NFT support.
 *
 * This build has no server-side billing, so generation runs through the free
 * Pollinations endpoint (/api/generate-free) — no balance, no on-chain payment.
 *
 * `seedPrompt` lets the explore feed open this same modal pre-filled with a
 * clicked prompt: free prompts (visibility "full") expose the full editable
 * body; paid prompts (visibility "vars-only") lock the body and surface only
 * the creator's exposed variables. When `seedPrompt` is null the launcher
 * behaves as the blank floating "Generate" entry point.
 */
type GenerateLauncherProps = {
  seedPrompt?: EnkiPrompt | null;
  onSeedClose?: () => void;
};

export default function GenerateLauncher({ seedPrompt = null, onSeedClose }: GenerateLauncherProps) {
  const router = useRouter();
  const { toast } = useToast();
  const account = useActiveAccount();
  const { publicKey: solanaPublicKey } = useWallet();
  const { address: turnkeyAddress } = useTurnkeyEmailAuth();
  const userKey = useMemo(
    () => account?.address ?? solanaPublicKey?.toBase58() ?? turnkeyAddress ?? null,
    [account?.address, solanaPublicKey, turnkeyAddress]
  );

  const [open, setOpen] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [valueByToken, setValueByToken] = useState<Record<string, string>>({});
  const [model, setModel] = useState(GL_MODELS[0].id);
  const [ratio, setRatio] = useState("1:1");
  const [referenceImages, setReferenceImages] = useState<string[]>([]);
  const [nftImages, setNftImages] = useState<string[]>([]);
  const nftInputRef = useRef<HTMLInputElement>(null);
  const [results, setResults] = useState<string[]>([]);
  // When opened from a clicked feed prompt: lock the body for paid prompts and
  // carry the creator's exposed variables (which may be checkbox/image types
  // that can't be inferred from the visible template via regex).
  const [locked, setLocked] = useState(false);
  type SeedVariable = { id: string; name: string; label: string; type: string; defaultValue: string; values: string[] };
  const [seededVariables, setSeededVariables] = useState<SeedVariable[] | null>(null);

  // Seed the modal from a clicked feed prompt.
  useEffect(() => {
    if (!seedPrompt) return;
    const isPaid = seedPrompt.visibility === "vars-only";
    const body = seedPrompt.promptTemplate || "";
    const seededValues: Record<string, string> = {};
    const mapped: SeedVariable[] = (seedPrompt.variables || []).map((v) => {
      const token = `[${v.name}]`;
      const val = typeof v.value === "boolean" ? "" : String(v.value ?? "");
      seededValues[token] = val;
      return {
        id: token,
        name: v.name,
        label: v.label || v.name,
        type: v.type === "checkbox" || v.type === "image" ? v.type : "text",
        defaultValue: val,
        values: [val],
      };
    });
    setPrompt(body);
    setValueByToken(seededValues);
    setSeededVariables(mapped.length ? mapped : null);
    setLocked(isPaid);
    setReferenceImages([]);
    setNftImages([]);
    setResults([]);
    setOpen(true);
  }, [seedPrompt]);

  const closeModal = () => {
    setOpen(false);
    setResults([]);
    setLocked(false);
    setSeededVariables(null);
    setPrompt("");
    setValueByToken({});
    onSeedClose?.();
  };

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
    setGenerating(true);
    try {
      const res = await fetch("/api/generate-free", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: final.trim(),
          aspectRatio: ratio,
          resolution: "2K",
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        imageUrl?: string;
        error?: string;
      };
      if (!res.ok || !data.imageUrl) {
        throw new Error(data.error || "Generation failed");
      }

      // Surface the new image ABOVE the modal (newest first); keep the modal open.
      setResults((prev) => [data.imageUrl as string, ...prev]);
      if (userKey) {
        addCreation(userKey, {
          id: `gl-${Date.now()}`,
          imageUrl: data.imageUrl,
          prompt: final,
          createdAt: new Date().toISOString(),
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

  // Pick an NFT as a reference. The real wallet NFT-picker isn't built in this
  // free build yet — for now this opens a file picker so the NFT deck is
  // usable; swap this for the wallet's NFT selection flow when ready.
  const pickNFT = () => {
    nftInputRef.current?.click();
  };

  const addToList = (
    files: FileList,
    setList: Dispatch<SetStateAction<string[]>>
  ) => {
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const url = typeof reader.result === "string" ? reader.result : null;
        if (url) {
          setList((prev) => (prev.length >= MAX_REFERENCE_IMAGES ? prev : [...prev, url]));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const addReferenceImages = (files: FileList) => addToList(files, setReferenceImages);

  const reorder = (list: string[], from: number, to: number) => {
    if (from === to || from < 0 || to < 0 || from >= list.length || to >= list.length) {
      return list;
    }
    const next = [...list];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    return next;
  };

  return (
    <>
      {/* Placeholder picker for the NFT deck until the wallet NFT flow is wired. */}
      <input
        ref={nftInputRef}
        type="file"
        accept="image/*"
        multiple
        style={{ display: "none" }}
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            addToList(e.target.files, setNftImages);
          }
          e.target.value = "";
        }}
      />
      <EnkiMobileGenerateModal
        isOpen={open}
        onClose={closeModal}
        promptBody={prompt}
        // Paid (vars-only) prompts keep the body hidden/locked: no setter → read-only.
        setPromptBody={locked ? undefined : setPrompt}
        // Prefer the creator's exposed variables when a prompt was clicked;
        // otherwise infer text variables from the typed body.
        variables={seededVariables ?? variables}
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
        onReorderReferenceImages={(from, to) =>
          setReferenceImages((prev) => reorder(prev, from, to))
        }
        onPickNFT={pickNFT}
        nftImages={nftImages}
        onRemoveNFT={(i) => setNftImages((prev) => prev.filter((_, idx) => idx !== i))}
        onReorderNFTs={(from, to) => setNftImages((prev) => reorder(prev, from, to))}
        generateLabel={generating ? "Generating…" : "Generate"}
        hideReleaseTab
        balance={null}
        resultImages={results}
        isGenerating={generating}
        onGenerate={generate}
        onOpenPromptEditor={() => router.push("/editor")}
      />

      {/* "stern Generate" floating button — matches the /editor launcher */}
      {!open && (
        <div
          className="ek-generate-launcher"
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
              background: "var(--qc-bg)",
              color: "var(--qc-ink)",
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
              <Sparkles size={18} style={{ fill: "var(--qc-ink)" }} />
              <span style={{ fontFamily: "var(--font-outfit), 'Outfit', sans-serif", fontSize: 16, fontWeight: 500 }}>
                Generate
              </span>
            </div>
            <span style={{ fontFamily: "var(--font-instrument-serif), 'Playfair Display', serif", fontStyle: "italic", fontSize: 15, color: "var(--qc-ink)", opacity: 0.7 }}>
              new image
            </span>
          </button>
        </div>
      )}
    </>
  );
}
