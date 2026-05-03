"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { Zap, Copy, ArrowLeft, Loader2 } from "lucide-react";
import { useActiveAccount, useConnectModal } from "thirdweb/react";
import { thirdwebClient, defaultChain } from "@/lib/thirdweb";
import { inAppWallet, createWallet } from "thirdweb/wallets";
import { useToast } from "@/hooks/use-toast";
import { useX402PaymentProduction } from "@/hooks/useX402PaymentProduction";
import { getUserKeyFromAccount } from "@/lib/creations";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useRouter } from "next/navigation";

const REL_MODELS = [
  { id: 'gemini', name: 'Nano Banana Pro', cost: 0.04 },
  { id: 'gpt-image-2', name: 'GPT-Image-2', cost: 0.06 },
  { id: 'midjourney-v7', name: 'Midjourney v7', cost: 0.08 },
];

const REL_RATIOS = ['1:1', '4:5', '3:2', '16:9', '9:16', '21:9'];

const REL_DISPLAY_MODES = [
  { id: 'free', label: 'Free prompt', sub: 'Open the full prompt · anyone can copy & remix it' },
  { id: 'premium', label: 'Premium prompt', sub: 'Body locked · buyer fills variables and pays per render' },
];

const connectModalWallets = [
  inAppWallet({ auth: { options: ["email", "google", "phone", "passkey"] } }),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("walletConnect"),
];

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

export default function ReleasePage() {
  const router = useRouter();
  const { toast } = useToast();
  const account = useActiveAccount();
  const { connect } = useConnectModal();
  const userKey = useMemo(() => getUserKeyFromAccount(account), [account]);
  const { generateImage, isPending: isGenerating } = useX402PaymentProduction();

  const [title, setTitle] = useState(() => {
    if (typeof window !== 'undefined') return localStorage.getItem('syncedPromptTitle') || 'Untitled prompt';
    return 'Untitled prompt';
  });
  
  const [promptBody, setPromptBody] = useState(() => {
    if (typeof window !== 'undefined') return localStorage.getItem('syncedPromptText') || '';
    return '';
  });

  const [varValues, setVarValues] = useState<Record<string, string>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('syncedPromptVariables');
        if (stored) {
          const parsed = JSON.parse(stored);
          const initial: Record<string, string> = {};
          parsed.forEach((v: any) => { initial[v.name] = v.defaultValue; });
          return initial;
        }
      } catch {}
    }
    return {};
  });

  const [activeVar, setActiveVar] = useState<string | null>(null);
  const [varLabels, setVarLabels] = useState<Record<string, string>>({});
  const [varTypes, setVarTypes] = useState<Record<string, string>>({});
  
  const [preferredModels, setPreferredModels] = useState(['gemini']);
  const [preferredRatio, setPreferredRatio] = useState('4:5');
  const [ratioOptional, setRatioOptional] = useState(true);
  const [displayMode, setDisplayMode] = useState('premium');
  const [artistPrice, setArtistPrice] = useState(0.10);
  const [versions, setVersions] = useState<Array<string | null>>([null, null, null, null]);
  
  const promptRef = useRef<HTMLTextAreaElement>(null);

  const tokens = useMemo(() => parseTokens(promptBody), [promptBody]);
  const isFree = displayMode === 'free';
  const verifyCount = versions.filter(v => v !== null).length;
  const canPublish = verifyCount >= (isFree ? 1 : 4);

  const apiCost = useMemo(() => {
    const sel = REL_MODELS.filter(m => preferredModels.includes(m.id));
    return sel.length ? Math.max(...sel.map(m => m.cost)) : 0;
  }, [preferredModels]);

  const subtotal = apiCost + artistPrice;
  const fee = subtotal * 0.07;
  const consumerPrice = subtotal + fee;

  useEffect(() => {
    if (tokens.length > 0 && !activeVar) {
      setActiveVar(tokens[0]);
    }
  }, [tokens, activeVar]);

  const toggleModel = (id: string) => setPreferredModels(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const handleGenerate = async (index: number) => {
    if (!account || !userKey) {
      connect({ client: thirdwebClient, chain: defaultChain, wallets: connectModalWallets });
      return;
    }

    const filled = tokens.reduce((text, token) => {
      return text.replaceAll(`[${token}]`, varValues[token] || `[${token}]`);
    }, promptBody);

    try {
      const result = await generateImage({
        prompt: filled,
        prompts: [filled],
        aspectRatio: ratioOptional ? '1:1' : preferredRatio,
        resolution: '1K',
        userId: userKey,
      }) as { imageUrl?: string };

      if (result?.imageUrl) {
        setVersions(prev => {
          const next = [...prev];
          next[index] = result.imageUrl!;
          return next;
        });
      }
    } catch (err) {
      toast({ title: "Generation failed", description: String(err), variant: "destructive" });
    }
  };

  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("POST", "/api/prompts", data);
    },
    onSuccess: () => {
      toast({ title: "Prompt published", description: "Successfully shared with the world." });
      localStorage.removeItem("syncedPromptText");
      localStorage.removeItem("syncedPromptVariables");
      router.push("/workspace");
    },
    onError: (err) => {
      toast({ title: "Publish failed", description: String(err), variant: "destructive" });
    }
  });

  const handlePublish = () => {
    if (!canPublish) return;
    
    const promptData = {
      title,
      prompt: promptBody,
      promptType: isFree ? 'free-prompt' : 'paid-prompt',
      price: artistPrice,
      aiModel: preferredModels[0] || 'gemini',
      aspectRatio: ratioOptional ? null : preferredRatio,
      variables: tokens.map(t => ({
        id: t,
        name: t,
        uiLabel: varLabels[t] || t,
        type: varTypes[t] || 'text',
        defaultValue: varValues[t] || '',
        required: true,
        position: tokens.indexOf(t)
      })),
      uploadedPhotos: versions.filter(v => v !== null)
    };

    saveMutation.mutate(promptData);
  };

  return (
    <div className="enki">
      <div className="enki-release-bar">
        <div className="enki-release-titlebox">
          <label className="enki-release-titlebox-label">Prompt title</label>
          <input className="enki-release-titlebox-input" value={title} onChange={e => setTitle(e.target.value)} placeholder="Untitled prompt" spellCheck={false} />
        </div>
        <div className="enki-release-actions">
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 20px 0 0', borderRight: '1px solid var(--rule)', fontSize: 11, color: 'var(--ink-3)', gap: 2 }}>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: canPublish ? 'var(--ember)' : 'var(--rule)', display: 'inline-block', marginRight: 8 }} />
              <span className="mono">{verifyCount}/{isFree ? '1' : '4'} verified</span>
            </span>
          </div>
          
          <button className="enki-btn enki-btn-secondary" onClick={() => router.back()}>Cancel</button>
          
          {!account ? (
            <button className="enki-btn" onClick={() => connect({ client: thirdwebClient, chain: defaultChain, wallets: connectModalWallets })}>
              Connect wallet
            </button>
          ) : (
            <div className="enki-btn enki-btn-secondary mono" style={{ background: 'var(--ember-soft)', color: 'var(--ember)', borderColor: 'var(--ember)' }}>
              {account.address.slice(0, 6)}...{account.address.slice(-4)}
            </div>
          )}

          <button 
            className="enki-btn" 
            disabled={!canPublish || !account || saveMutation.isPending}
            onClick={handlePublish}
          >
            {saveMutation.isPending ? <Loader2 className="animate-spin h-4 w-4" /> : "Publish prompt"}
          </button>
        </div>
      </div>

      <div className="enki-release-workspace">
        {/* Pane 1: Settings */}
        <aside className="enki-release-pane enki-release-pane-settings">
          <div className="enki-release-pane-head">
            <span className="enki-release-pane-num">01</span>
            <span className="enki-release-pane-title">Settings</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div className="enki-qc-section-label">Display mode</div>
            {REL_DISPLAY_MODES.map(m => (
              <button 
                key={m.id} 
                onClick={() => setDisplayMode(m.id)} 
                style={{ 
                  textAlign: 'left', padding: '12px', border: `1px solid ${displayMode === m.id ? 'var(--ink)' : 'var(--rule)'}`, 
                  background: 'var(--paper)', cursor: 'pointer', 
                  boxShadow: displayMode === m.id ? '0 0 0 1px var(--ink)' : 'none' 
                }}
              >
                <div style={{ fontFamily: 'var(--serif)', fontSize: 16, color: 'var(--ink)', marginBottom: 2 }}>{m.label}</div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', lineHeight: 1.4 }}>{m.sub}</div>
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div className="enki-qc-section-label">Preferred models</div>
            {REL_MODELS.map(m => (
              <button 
                key={m.id} 
                onClick={() => toggleModel(m.id)} 
                style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', 
                  border: `1px solid ${preferredModels.includes(m.id) ? 'var(--ember)' : 'var(--rule)'}`, 
                  background: preferredModels.includes(m.id) ? 'var(--ember-soft)' : 'var(--paper)', cursor: 'pointer'
                }}
              >
                <span style={{ fontSize: 13 }}>{m.name}</span>
                <span className="mono" style={{ fontSize: 11, color: preferredModels.includes(m.id) ? 'var(--ember)' : 'var(--ink-3)' }}>${m.cost.toFixed(2)}</span>
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div className="enki-qc-section-label">Ratio</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              <button className={`enki-size-chip mono${ratioOptional ? ' active' : ''}`} onClick={() => setRatioOptional(true)}>Any ratio</button>
              {REL_RATIOS.map(r => (
                <button key={r} className={`enki-size-chip mono${!ratioOptional && preferredRatio === r ? ' active' : ''}`} onClick={() => { setRatioOptional(false); setPreferredRatio(r); }}>{r}</button>
              ))}
            </div>
          </div>

          {!isFree && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div className="enki-qc-section-label">Pricing</div>
              <div style={{ background: 'var(--paper)', border: '1px solid var(--rule)', padding: '14px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <label className="mono" style={{ fontSize: 11, color: 'var(--ink-3)' }}>Artist fee</label>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, borderBottom: '1px solid var(--ink)' }}>
                    <span className="mono" style={{ fontSize: 13, color: 'var(--ink-3)' }}>$</span>
                    <input type="number" step="0.01" value={artistPrice} onChange={e => setArtistPrice(parseFloat(e.target.value) || 0)} style={{ border: 'none', background: 'transparent', fontFamily: 'var(--serif)', fontSize: 18, width: 60, textAlign: 'right', outline: 'none' }} />
                  </div>
                </div>
                <div style={{ borderTop: '1px solid var(--rule-2)', paddingTop: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--ink-3)' }}><span>API</span><span>${apiCost.toFixed(2)}</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--ink-3)' }}><span>Platform 7%</span><span>${fee.toFixed(3)}</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, borderTop: '1px solid var(--rule-2)', paddingTop: 8, marginTop: 4 }}><span>Total</span><span className="serif" style={{ fontSize: 20 }}>${consumerPrice.toFixed(2)}</span></div>
                </div>
              </div>
            </div>
          )}
        </aside>

        {/* Pane 2: Prompt */}
        <section className="enki-release-pane">
          <div className="enki-release-pane-head">
            <span className="enki-release-pane-num">02</span>
            <span className="enki-release-pane-title">Prompt</span>
          </div>
          <div style={{ position: 'relative', width: '100%', flex: 1, display: 'flex', flexDirection: 'column', border: '1px solid var(--rule)', background: 'transparent' }}>
            <div className="serif" aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', color: 'transparent', padding: '16px', fontSize: 19, lineHeight: 1.6, whiteSpace: 'pre-wrap', wordWrap: 'break-word', zIndex: 1 }}>
              {promptBody.split(/(\[[^\]]+\])/).map((part, i) => {
                const m = part.match(/^\[([^\]]+)\]$/);
                const isFocused = m && activeVar === m[1];
                if (m) return <span key={i} style={{ background: isFocused ? 'var(--ember)' : 'var(--ember-soft)', color: isFocused ? 'var(--paper)' : 'var(--ember)', padding: '0 4px', margin: '0 -4px', borderRadius: 2 }}>{part}</span>;
                return <span key={i}>{part}</span>;
              })}
            </div>
            <textarea 
              className="enki-qc-textarea serif" 
              value={promptBody} 
              onChange={e => setPromptBody(e.target.value)} 
              spellCheck={false} 
              style={{ flex: 1, minHeight: 300, fontSize: 19, lineHeight: 1.6, background: 'transparent', border: 'none', padding: '16px', zIndex: 2, color: 'var(--ink)', outline: 'none', resize: 'none', width: '100%' }} 
              placeholder="Write your prompt... Use [brackets] for variables."
            />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {tokens.map(t => (
              <span 
                key={t} 
                onClick={() => setActiveVar(t)} 
                className={`enki-qc-token mono${activeVar === t ? ' filled' : ''}`}
                style={{ cursor: 'pointer', padding: '4px 8px', fontSize: 11 }}
              >
                [{t}]
              </span>
            ))}
          </div>
        </section>

        {/* Pane 3: Variables */}
        <section className="enki-release-pane">
          <div className="enki-release-pane-head">
            <span className="enki-release-pane-num">03</span>
            <span className="enki-release-pane-title">Variables</span>
            <span className="mono" style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--ink-3)', opacity: 0.6 }}>defaults & types</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {tokens.map(t => (
              <div 
                key={t} 
                onClick={() => setActiveVar(t)} 
                style={{ 
                  border: `1px solid ${activeVar === t ? 'var(--ink)' : 'var(--rule)'}`, 
                  background: 'var(--paper)', padding: '16px 20px', cursor: 'pointer', 
                  display: 'flex', flexDirection: 'column', gap: 10,
                  boxShadow: activeVar === t ? '0 0 0 1px var(--ink)' : 'none',
                  transition: 'all 0.15s'
                }}
              >
                <div className="mono" style={{ fontSize: 9, textTransform: 'uppercase', color: 'var(--ink-3)', letterSpacing: '0.12em' }}>Variable name</div>
                <input 
                  className="serif" 
                  value={varLabels[t] || t} 
                  onChange={e => setVarLabels(s => ({ ...s, [t]: e.target.value }))} 
                  style={{ width: '100%', border: 'none', background: 'transparent', fontSize: 20, outline: 'none', padding: '0', color: 'var(--ink)', marginBottom: '4px' }} 
                  onClick={e => e.stopPropagation()}
                />
                
                <div className="enki-qc-segmented" style={{ width: '100%', background: 'var(--paper-2)', padding: '2px' }}>
                  <button onClick={(e) => { e.stopPropagation(); setVarTypes(s => ({ ...s, [t]: 'text' })); }} className={varTypes[t] !== 'checkbox' ? 'active' : ''} style={{ flex: 1, padding: '6px 0' }}>Text input</button>
                  <button onClick={(e) => { e.stopPropagation(); setVarTypes(s => ({ ...s, [t]: 'checkbox' })); }} className={varTypes[t] === 'checkbox' ? 'active' : ''} style={{ flex: 1, padding: '6px 0' }}>Yes / No checkbox</button>
                </div>

                <div className="mono" style={{ fontSize: 9, textTransform: 'uppercase', color: 'var(--ink-3)', letterSpacing: '0.12em', marginTop: '4px' }}>Default Value</div>
                <input 
                  className="serif" 
                  value={varValues[t] || ''} 
                  onChange={e => setVarValues(s => ({ ...s, [t]: e.target.value }))} 
                  placeholder={`e.g. ${t === 'subject' ? 'a young woman' : 'cinematic'}...`}
                  style={{ width: '100%', border: 'none', borderBottom: '1px solid var(--rule-2)', background: 'transparent', fontSize: 16, outline: 'none', padding: '4px 0', color: 'var(--ink-2)' }} 
                  onClick={e => e.stopPropagation()}
                />
                <div style={{ fontSize: 10, color: 'var(--ink-3)', fontStyle: 'italic', opacity: 0.8 }}>Used until the buyer changes it.</div>
              </div>
            ))}
          </div>
        </section>

        {/* Pane 4: Verify */}
        <section className="enki-release-pane enki-release-pane-verify">
          <div className="enki-release-pane-head">
            <span className="enki-release-pane-num">04</span>
            <span className="enki-release-pane-title">Verify</span>
          </div>
          <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', marginBottom: 10 }}>{isFree ? '1 render required' : '4 renders required'}</div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[0, 1, 2, 3].map(i => (
              <div key={i} style={{ border: '1px solid var(--rule)', background: 'var(--paper)', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderBottom: '1px solid var(--rule-2)' }}>
                  <span className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.04em' }}>Version 0{i+1}</span>
                  {versions[i] ? (
                    <span className="mono" style={{ fontSize: 10, color: 'var(--ember)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span style={{ fontSize: 14 }}>•</span> ready
                    </span>
                  ) : (
                    <span className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', opacity: 0.5 }}>pending</span>
                  )}
                </div>
                <div style={{ aspectRatio: '1', background: 'var(--paper-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', minHeight: 200 }}>
                  {versions[i] ? (
                    <img src={versions[i]!} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <button 
                      className="enki-btn" 
                      style={{ padding: '8px 20px', fontSize: 12, borderRadius: 2 }} 
                      onClick={() => handleGenerate(i)} 
                      disabled={isGenerating}
                    >
                      <Zap size={14} fill="currentColor" /> {isGenerating ? "Processing..." : "Gen"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 'auto', paddingTop: 20, borderTop: '1px solid var(--rule)', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div className="mono" style={{ fontSize: 9, color: 'var(--ink-3)', textTransform: 'uppercase' }}>x402 link preview</div>
            <div className="enki-x402-link mono" style={{ fontSize: 11 }}>
              <span style={{ opacity: 0.7 }}>x402://</span>enkiart.xyz/p/{title.toLowerCase().replace(/\s+/g, '-')}
              <Copy size={12} style={{ marginLeft: 'auto', cursor: 'pointer', opacity: 0.5 }} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
