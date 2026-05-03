"use client";

import { useCallback, useMemo, useState, useEffect } from "react";
import { ChevronDown, X, Zap } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useActiveAccount } from "thirdweb/react";
import { useX402PaymentProduction } from "@/hooks/useX402PaymentProduction";
import { getUserKeyFromAccount, addCreation, updateCreation } from "@/lib/creations";
import { useToast } from "@/hooks/use-toast";
import { ConnectWallet } from "@/components/ConnectWallet";

const quickCreatePaths = ["/", "/images", "/videos", "/search", "/favorites", "/showcase", "/workspace"];
const ratios = ["1:1", "4:5", "3:4", "16:9", "9:16"];
const resolutions = ["1K", "2K", "4K"] as const;

function parseTokens(text: string) {
  const seen = new Set<string>();
  const tokens: string[] = [];
  const re = /\[([^\]]+)\]/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text))) {
    const token = (match[1] || "").split(":")[0]?.split("=")[0]?.trim();
    if (token && !seen.has(token)) {
      seen.add(token);
      tokens.push(token);
    }
  }
  return tokens;
}

export default function EnkiQuickCreate() {
  const pathname = usePathname();
  const router = useRouter();
  const account = useActiveAccount();
  const userKey = useMemo(() => getUserKeyFromAccount(account), [account]);
  const { toast } = useToast();
  const { generateImage, isPending, getPaymentStatus } = useX402PaymentProduction();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"generate" | "release">("generate");
  const [prompt, setPrompt] = useState("A photograph of [subject] at [location], [mood], lit by [lighting].");
  const [vars, setVars] = useState<Record<string, string>>({
    subject: "a young woman with dark hair",
    location: "a small wooden room",
    mood: "contemplative",
    lighting: "late afternoon window",
  });
  const [ratio, setRatio] = useState("3:4");
  const [resolution, setResolution] = useState<(typeof resolutions)[number]>("2K");
  const [count, setCount] = useState(1);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 760);
    const handleScroll = () => setScrolled(window.scrollY > 300);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const tokens = useMemo(() => parseTokens(prompt), [prompt]);
  const filledPrompt = useMemo(
    () => tokens.reduce((text, token) => text.replaceAll(`[${token}]`, vars[token] || `[${token}]`), prompt),
    [prompt, tokens, vars]
  );
  const missing = useMemo(() => tokens.some((token) => !vars[token]?.trim()), [tokens, vars]);

  const [results, setResults] = useState<{ url: string; prompt: string }[] | null>(null);

  const generate = useCallback(async () => {
    if (mode === "release") {
      try {
        localStorage.setItem("syncedPromptText", prompt);
        localStorage.setItem("syncedPromptVariables", JSON.stringify(tokens.map((token) => ({ name: token, defaultValue: vars[token] || "", type: "text" }))));
      } catch {}
      router.push("/release");
      return;
    }

    if (!account || !userKey) {
      toast({ title: "Wallet required", description: "Connect your wallet to generate images.", variant: "destructive" });
      return;
    }
    if (!getPaymentStatus().isConnected) {
      toast({ title: "Wallet not ready", description: "Wait a moment for the payment wallet to finish connecting.", variant: "destructive" });
      return;
    }
    if (!filledPrompt.trim() || missing) return;

    const creationId = `${Date.now()}`;
    addCreation(userKey, {
      id: creationId,
      prompt: filledPrompt,
      createdAt: new Date().toISOString(),
      status: "pending",
      source: "quick_create",
      aspectRatio: ratio,
      resolution,
    });

    try {
      const result = await generateImage({
        prompt: filledPrompt,
        prompts: Array.from({ length: count }, () => filledPrompt),
        aspectRatio: ratio,
        resolution,
        userId: userKey,
      }) as { imageUrl?: string; imageUrls?: string[] };
      
      const urls = result.imageUrls || (result.imageUrl ? [result.imageUrl] : []);
      
      if (urls.length > 0) {
        updateCreation(userKey, creationId, { status: "completed", imageUrl: urls[0] });
        setResults(urls.map(u => ({ url: u, prompt: filledPrompt })));
        toast({ title: "Images generated", description: "Showing results." });
      } else {
        updateCreation(userKey, creationId, { status: "failed" });
        throw new Error("No image URL returned");
      }
    } catch (error) {
      updateCreation(userKey, creationId, { status: "failed" });
      toast({ title: "Generation failed", description: error instanceof Error ? error.message : String(error), variant: "destructive" });
    }
  }, [account, count, filledPrompt, generateImage, getPaymentStatus, missing, mode, prompt, ratio, resolution, router, toast, tokens, userKey, vars]);

  const [activeVar, setActiveVar] = useState<string | null>(null);

  if (!pathname || !quickCreatePaths.includes(pathname)) return null;

  return (
    <>
      <div className={`enki-qc${open ? " open" : ""}${scrolled ? " visible" : ""}`}>
        <button className="enki-qc-bar" onClick={() => setOpen((value) => !value)} type="button">
          <span className="enki-qc-bar-bolt"><Zap size={12} /></span>
          <span className="enki-qc-bar-label serif">Quick create</span>
          <span className="mono enki-qc-bar-hint">{open ? "Click to collapse" : "Paste a prompt - wrap variables in [brackets]"}</span>
          <span className="enki-qc-bar-chev"><ChevronDown size={14} className={open ? "up" : ""} /></span>
        </button>
        {open && (
          <div className="enki-qc-panel">
            <div className="enki-qc-sheet-handle" />
            <div className="enki-qc-sheet-head">
              <div className="enki-qc-segmented">
                <button className={mode === "generate" ? "active" : ""} onClick={() => setMode("generate")} type="button">Generate</button>
                <button className={mode === "release" ? "active" : ""} onClick={() => setMode("release")} type="button">Release</button>
              </div>
              <button className="enki-icon-btn" onClick={() => setOpen(false)} aria-label="Close" type="button"><X size={14} /></button>
            </div>
              <div className="enki-qc-grid">
                <div className="enki-qc-col">
                  <div className="enki-qc-section-label">
                    <span>{mode === "release" ? "Prompt template" : "Prompt"}</span>
                    <span className="enki-qc-section-meta">Auto-detected variables</span>
                  </div>
                  <div style={{ position: 'relative', width: '100%', borderBottom: '1px solid var(--rule)' }}>
                    <div className="enki-qc-textarea serif" aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', color: 'transparent', whiteSpace: 'pre-wrap', wordWrap: 'break-word', zIndex: 1, border: 'none', padding: '4px 0 8px' }}>
                      {prompt.split(/(\[[^\]]+\])/).map((part, i) => {
                        const m = part.match(/^\[([^\]]+)\]$/);
                        const isFocused = m && activeVar === m[1];
                        if (m) return <span key={i} style={{ background: isFocused ? 'var(--ember)' : 'var(--ember-soft)', color: isFocused ? 'var(--paper)' : 'var(--ember)', borderRadius: 2, padding: '1px 6px', margin: '0 -6px' }}>{part}</span>;
                        return <span key={i}>{part}</span>;
                      })}
                    </div>
                    <textarea 
                      className="enki-qc-textarea serif" 
                      value={prompt} 
                      onChange={(event) => setPrompt(event.target.value)} 
                      rows={3} 
                      placeholder="Write your prompt here... Use [brackets] for variables." 
                      style={{ position: 'relative', zIndex: 2, background: 'transparent', cursor: 'text', border: 'none', padding: '4px 0 8px' }}
                    />
                  </div>
                  <div className="enki-qc-token-row">
                    {tokens.map((token) => (
                      <button key={token} className={`enki-qc-token mono${vars[token]?.trim() ? " filled" : ""}${activeVar === token ? " active" : ""}`} onClick={() => setActiveVar(token)} type="button">
                        {token}
                      </button>
                    ))}
                    {tokens.length === 0 && <span className="enki-qc-hint">No variables found</span>}
                  </div>
                  <div className="enki-qc-settings">
                    <div className="enki-qc-setting">
                      <span className="enki-qc-setting-label">Model</span>
                      <select className="enki-qc-select" value="gemini" onChange={() => {}}>
                        <option value="gemini">Nano Banana Pro</option>
                      </select>
                    </div>
                    <div className="enki-qc-setting">
                      <span className="enki-qc-setting-label">Aspect</span>
                      <select className="enki-qc-select" value={ratio} onChange={(event) => setRatio(event.target.value)}>
                        {ratios.map((item) => <option key={item}>{item}</option>)}
                      </select>
                    </div>
                    <div className="enki-qc-setting">
                      <span className="enki-qc-setting-label">Resolution</span>
                      <select className="enki-qc-select" value={resolution} onChange={(event) => setResolution(event.target.value as (typeof resolutions)[number])}>
                        {resolutions.map((item) => <option key={item}>{item}</option>)}
                      </select>
                    </div>
                    <div className="enki-qc-setting">
                      <span className="enki-qc-setting-label">{mode === "release" ? "Price per run" : "Generations"}</span>
                      <select className="enki-qc-select" value={count} onChange={(event) => setCount(Number(event.target.value))}>
                        {[1, 2, 3, 4].map((item) => <option key={item} value={item}>{mode === "release" ? "$0.10" : `x ${item}`}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="enki-qc-col">
                  <div className="enki-qc-section-label">
                    <span>Variables</span>
                    <span className="enki-qc-section-meta">{tokens.length} detected</span>
                  </div>
                  <div className="enki-qc-vars">
                    {tokens.map((token) => (
                      <div key={token} className={`enki-qc-var${vars[token]?.trim() ? " filled" : ""}${activeVar === token ? " active" : ""}`} onClick={() => setActiveVar(token)}>
                        <span className="enki-qc-var-label">[{token}]</span>
                        <input 
                          className="enki-qc-var-input" 
                          value={vars[token] || ""} 
                          onChange={(event) => setVars((state) => ({ ...state, [token]: event.target.value }))} 
                          onFocus={() => setActiveVar(token)}
                          placeholder={`value for [${token}]`} 
                        />
                      </div>
                    ))}
                    {tokens.length === 0 && <div className="enki-qc-hint" style={{ padding: '20px 0', textAlign: 'center', opacity: 0.5 }}>Variables added in brackets [like this] appear here for easy editing.</div>}
                  </div>
                  <div className="enki-qc-cost">
                    <div className="enki-qc-cost-line">
                      <span className="enki-qc-cost-faint mono">{mode === "release" ? "Earn on" : "Pay with"}</span>
                      <span className="mono" style={{ color: "var(--ink-3)", fontSize: 10 }}>Solana / {account?.address ? `${account.address.slice(0, 4)}...${account.address.slice(-4)}` : "connect"}</span>
                    </div>
                    {account ? (
                      <button className="enki-btn enki-qc-generate" disabled={isPending || !prompt.trim() || (mode === "generate" && missing)} onClick={generate} type="button">
                        {isPending ? "Generating..." : mode === "release" ? `Release prompt / ${tokens.length} var` : "Generate / live price"}
                      </button>
                    ) : (
                      <ConnectWallet buttonClassName="enki-btn enki-qc-generate" />
                    )}
                  </div>
                </div>
              </div>
            </div>
        )}
      </div>

      {results && (
        <div className="enki-qc-results">
          <div className="enki-qc-results-head">
            <div>
              <div className="mono enki-qc-results-eyebrow">Generated / {results.length} images</div>
              <div className="serif enki-qc-results-title">Batch result</div>
            </div>
            <button className="enki-icon-btn" onClick={() => setResults(null)} title="Close"><X size={14} /></button>
          </div>
          <div className="enki-qc-results-grid">
            {results.map((res, i) => (
              <div key={i} className="enki-qc-result" style={{ "--ratio": ratio.replace(':', '/') } as any}>
                <img src={res.url} alt="" />
                <div className="enki-qc-result-actions">
                  <button className="enki-btn enki-btn-secondary" style={{ flex: 1, fontSize: 11 }} onClick={() => { toast({ title: "Saved", description: "Added to your collection." }); }}>Save as prompt</button>
                  <button className="enki-icon-btn" title="Remix"><Zap size={14} /></button>
                </div>
              </div>
            ))}
          </div>
          <div className="enki-qc-results-prompt mono">
            <span className="enki-qc-results-prompt-label">Prompt</span>
            <span>{results[0].prompt}</span>
          </div>
        </div>
      )}
    </>
  );
}
