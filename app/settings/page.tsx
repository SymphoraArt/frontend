"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import { useActiveAccount } from "thirdweb/react";
import { useToast } from "@/hooks/use-toast";
import { Check, Laptop, Smartphone, Mail, Loader2, Twitter, Instagram, Wallet, AlertCircle, ArrowUpRight, Key, User, Users, Shield } from "lucide-react";

import SettingsLayout from "@/components/settings/SettingsLayout";
import SettingsNav, { TabItem } from "@/components/settings/SettingsNav";
import SettingsSection from "@/components/settings/SettingsSection";
import SettingsToggle from "@/components/settings/SettingsToggle";
import TurnkeyDeviceModal from "@/components/settings/TurnkeyDeviceModal";
import AwaitingConfirmationModal from "@/components/settings/AwaitingConfirmationModal";
import { useTurnkeyAuth } from "@/hooks/useTurnkeyAuth";
import { createAuthHeaders, generateAuthMessage } from "@/lib/auth";
import "@/components/settings/settings.css";

const ENABLE_RECOVERY_PROTOTYPE = process.env.NEXT_PUBLIC_ENABLE_RECOVERY_PROTOTYPE === "true";
const TURNKEY_ORG_STORAGE_KEY = "turnkey-sub-orgs";

const TABS: TabItem[] = [
  { id: "profile", label: "Profile" },
  { id: "wallets", label: "Wallets" },
  { id: "recovery", label: "Recovery & 2FA" },
  { id: "billing", label: "Billing", disabled: true, tooltip: "More payment rails coming soon. For now, they should manage funds via 'Wallets'" },
];

export default function SettingsPage() {
  const account = useActiveAccount();
  const { toast } = useToast();
  const { register, isLoading: turnkeyLoading, error: turnkeyError } = useTurnkeyAuth();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false); // keeping it fast since we mock mostly
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [deviceModalOpen, setDeviceModalOpen] = useState(false);
  const [isAwaitingModalOpen, setIsAwaitingModalOpen] = useState(false);
  const [showLivenessBanner, setShowLivenessBanner] = useState(true);
  const [passkeyRegistered, setPasskeyRegistered] = useState(false);
  const [guardiansList, setGuardiansList] = useState([
    { id: "g1", name: "@lune_lab",  type: "handle", sub: "Enki Art User", status: "confirmed" },
    { id: "g2", name: "0xA1B2…C3D4", type: "wallet", sub: "Ethereum Wallet", status: "confirmed" },
    { id: "g3", name: "friend@email.com", type: "email", sub: "Trusted Email", status: "confirmed" },
  ]);

  const pingGuardian = (id: string) => {
    setGuardiansList(prev => prev.map(g => g.id === id ? { ...g, status: "pinged" } : g));
    toast({ title: "Ping sent", description: "Guardian has been requested to confirm their liveness." });
  };

  // --- Mock States ---
  const [settings, setSettings] = useState({
    showLeaderboardGen: true,
    showLeaderboardEarn: true,
  });
  const [initialSettings, setInitialSettings] = useState({
    showLeaderboardGen: true,
    showLeaderboardEarn: true,
  });

  const [recoverySettings, setRecoverySettings] = useState({
    deleteWorkCheck: true,
    sellPromptCheck: true,
    sendMoneyCheck: true
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");
    if (tab && TABS.some(t => t.id === tab && !t.disabled)) {
      setActiveTab(tab);
    }
  }, []);

  useEffect(() => {
    if (!account?.address) {
      setPasskeyRegistered(false);
      return;
    }

    try {
      const stored = localStorage.getItem(TURNKEY_ORG_STORAGE_KEY);
      const orgs = stored ? JSON.parse(stored) as Record<string, string> : {};
      setPasskeyRegistered(Boolean(orgs[account.address.toLowerCase()]));
    } catch {
      setPasskeyRegistered(false);
    }
  }, [account?.address]);
  
  // --- Change Detection ---
  useEffect(() => {
    const isDifferent = JSON.stringify(settings) !== JSON.stringify(initialSettings);
    setHasChanges(isDifferent);
  }, [settings, initialSettings]);

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    // Mock save delay
    await new Promise(r => setTimeout(r, 800));
    setInitialSettings(settings);
    setHasChanges(false);
    setSaving(false);
    toast({ title: "Settings saved", description: "Your preferences have been updated." });
  };

  const handleRegisterPasskey = useCallback(async () => {
    if (!account?.address) {
      toast({ title: "Wallet required", description: "Connect your wallet before registering a passkey.", variant: "destructive" });
      return;
    }

    setIsAuthenticating(true);
    try {
      const nonceResponse = await fetch("/api/auth/nonce", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress: account.address, walletType: "evm" }),
      });
      const nonceResult = await nonceResponse.json();
      if (!nonceResponse.ok || typeof nonceResult.nonce !== "string") {
        throw new Error(nonceResult.error || "Failed to get authentication nonce");
      }

      const { message, timestamp } = generateAuthMessage(account.address, nonceResult.nonce);
      const signature = await account.signMessage({ message });
      const headers = createAuthHeaders(account.address, signature, message, timestamp, nonceResult.nonce) as Record<string, string>;

      const ok = await register(account.address, headers);
      if (ok) {
        setPasskeyRegistered(true);
        toast({ title: "Passkey registered", description: "Turnkey 2FA is now available for this wallet." });
      } else {
        toast({ title: "Passkey registration failed", description: turnkeyError || "Turnkey rejected the registration attempt.", variant: "destructive" });
      }
    } catch (err) {
      toast({
        title: "Authentication failed",
        description: err instanceof Error ? err.message : "Please sign the wallet authentication message and try again.",
        variant: "destructive",
      });
    } finally {
      setIsAuthenticating(false);
    }
  }, [account, register, toast, turnkeyError]);

  const handleDeleteAccount = () => {
    toast({
      title: "Action required",
      description: "Please check your email or authenticator app to confirm account deletion.",
    });
  };

  // --- Render Helpers ---
  const titleMap: Record<string, React.ReactNode> = {
    profile: "Profile.",
    wallets: "Wallets.",
    earnings: "Earnings.",
    recovery: <>Recovery<br/><span>&</span> 2FA.</>
  };

  const descMap: Record<string, string> = {
    profile: "Manage your connected social accounts and visibility settings.",
    wallets: "Manage your connected Turnkey networks and external wallets.",
    earnings: "Track your earnings from owned prompts and hunted affiliates.",
    recovery: "Keep more than one way to sign in — that way you'll never lose your account. Turn on the extra check below if you want a second confirmation before risky things happen."
  };

  // TODO: replace with a server-provided role claim before exposing admin navigation.
  const IS_ADMIN = false;

  return (
    <>
      <Navbar />
      <div className="pt-14">
        <SettingsLayout
          breadcrumbs={`Settings > ${TABS.find(t => t.id === activeTab)?.label}`}
          title={titleMap[activeTab] || "Settings."}
          description={descMap[activeTab]}
        >
          <SettingsNav 
            tabs={TABS} 
            activeTab={activeTab} 
            onChange={setActiveTab} 
          />

          {/* === PROFILE TAB === */}
          {activeTab === "profile" && (
            <>
              <SettingsSection num="01" title="Social Connections">
                <div className="set-section-desc" style={{ paddingBottom: '16px' }}>
                  Connect your socials. If you've previously posted your prompts on X and they generated revenue, you can claim your dormant X USDC once connected!
                </div>
                <div className="set-list-item">
                  <div className="set-item-icon" style={{ background: '#1da1f2', color: 'white' }}><Twitter size={14} /></div>
                  <div className="set-item-content">
                    <div className="set-item-title">Connect X (Twitter)</div>
                    <div className="set-item-sub">Connect to claim dormant earnings from past generations.</div>
                  </div>
                  <button className="set-btn set-btn-outline">Connect</button>
                </div>
                <div className="set-list-item">
                  <div className="set-item-icon" style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', color: 'white' }}><Instagram size={14} /></div>
                  <div className="set-item-content">
                    <div className="set-item-title">Connect Instagram</div>
                    <div className="set-item-sub">Link your IG portfolio to your Enki Art profile.</div>
                  </div>
                  <button className="set-btn set-btn-outline">Connect</button>
                </div>
              </SettingsSection>

              <SettingsSection num="02" title="Leaderboard Visibility">
                <div className="set-list-item" title="Leaderboards coming soon">
                  <div className="set-item-content">
                    <div className="set-item-title" style={{ color: '#aaa' }}>Show generations on leaderboard</div>
                    <div className="set-item-sub">Allow others to see your generation count (Coming Soon)</div>
                  </div>
                  <SettingsToggle checked={settings.showLeaderboardGen} disabled={true} onChange={(c) => updateSetting("showLeaderboardGen", c)} />
                </div>
                <div className="set-list-item" title="Leaderboards coming soon">
                  <div className="set-item-content">
                    <div className="set-item-title" style={{ color: '#aaa' }}>Show earnings on leaderboard</div>
                    <div className="set-item-sub">Allow others to see your total earnings (Coming Soon)</div>
                  </div>
                  <SettingsToggle checked={settings.showLeaderboardEarn} disabled={true} onChange={(c) => updateSetting("showLeaderboardEarn", c)} />
                </div>
              </SettingsSection>

              <SettingsSection num="03" title="Danger Zone">
                <div className="set-list-item">
                  <div className="set-item-icon" style={{ color: '#e23b3b', background: '#ffebeb' }}><AlertCircle size={14} /></div>
                  <div className="set-item-content">
                    <div className="set-item-title" style={{ color: '#e23b3b' }}>Delete Account</div>
                    <div className="set-item-sub">Permanently delete your account and all associated data. This action requires multi-factor confirmation.</div>
                </div>
                <button className="set-btn set-btn-danger" onClick={handleDeleteAccount}>Delete Account</button>
              </div>
              </SettingsSection>

              {IS_ADMIN && (
                <SettingsSection num="04" title="Admin">
                  <div className="set-list-item">
                    <div className="set-item-icon" style={{ color: '#f5c542', background: '#fffaeb' }}>⚙</div>
                    <div className="set-item-content">
                      <div className="set-item-title">Admin Panel</div>
                      <div className="set-item-sub">Review imports, reports, feedback, and manage community trust. Only visible to admin wallets.</div>
                    </div>
                    <a href="/admin" className="set-btn set-btn-secondary" style={{ display: "flex", alignItems: "center", gap: 6, textDecoration: "none" }}>
                      Open Admin <ArrowUpRight size={12} />
                    </a>
                  </div>
                  <div className="set-list-item">
                    <div className="set-item-icon" style={{ color: '#6366f1', background: '#eef2ff' }}>📊</div>
                    <div className="set-item-content">
                      <div className="set-item-title">Leaderboard</div>
                      <div className="set-item-sub">View top creators and earners across the platform.</div>
                    </div>
                    <a href="/leaderboard" className="set-btn set-btn-secondary" style={{ display: "flex", alignItems: "center", gap: 6, textDecoration: "none" }}>
                      View <ArrowUpRight size={12} />
                    </a>
                  </div>
                </SettingsSection>
              )}
            </>
          )}

          {/* === WALLETS TAB === */}
          {activeTab === "wallets" && (
            <SettingsSection num="01" title="Network Holdings">
              <div className="set-section-desc" style={{ paddingBottom: '16px' }}>
                Your assets managed securely via Turnkey infrastructure.
              </div>
              <div className="set-list-item">
                <div className="set-item-icon"><Wallet size={14} /></div>
                <div className="set-item-content">
                  <div className="set-item-title">Ethereum (Base) <span className="set-badge-dark">ACTIVE</span></div>
                  <div className="set-item-sub" style={{ fontFamily: 'monospace' }}>0x71C...9B3f</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '14px', fontWeight: 500 }}>0.45 ETH</div>
                    <div style={{ fontSize: '11px', color: '#888' }}>~$1,204.50</div>
                  </div>
                  <button className="set-btn set-btn-dark"><ArrowUpRight size={14} /> Send</button>
                </div>
              </div>
              <div className="set-list-item">
                <div className="set-item-icon"><Wallet size={14} /></div>
                <div className="set-item-content">
                  <div className="set-item-title">Solana</div>
                  <div className="set-item-sub" style={{ fontFamily: 'monospace' }}>HN7c...k8W2</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '14px', fontWeight: 500 }}>12.5 SOL</div>
                    <div style={{ fontSize: '11px', color: '#888' }}>~$1,850.00</div>
                  </div>
                  <button className="set-btn set-btn-dark"><ArrowUpRight size={14} /> Send</button>
                </div>
              </div>
            </SettingsSection>
          )}

          {/* === EARNINGS TAB === */}
          {activeTab === "earnings" && (
            <>
              <SettingsSection num="01" title="My Prompts">
                <div className="set-section-desc" style={{ paddingBottom: '16px' }}>
                  Revenue generated from prompts you created and own.
                </div>
                <div className="set-table-wrapper">
                  <table className="set-table">
                    <thead>
                      <tr>
                        <th>Prompt Name</th>
                        <th>Generations</th>
                        <th>Total Earnings</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Quiet Window, Late Afternoon</td>
                        <td>432</td>
                        <td className="money">$124.50</td>
                        <td><button className="set-btn set-btn-outline">View Details</button></td>
                      </tr>
                      <tr>
                        <td>Cyberpunk Alleyway</td>
                        <td>1,204</td>
                        <td className="money">$850.00</td>
                        <td><button className="set-btn set-btn-outline">View Details</button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </SettingsSection>

              <SettingsSection num="02" title="Hunted Prompts (50% Affiliate)">
                <div className="set-section-desc" style={{ paddingBottom: '16px' }}>
                  Your 50% affiliate revenue from prompts you brought into Enki Art via the Hunt flow.
                </div>
                <div className="set-table-wrapper">
                  <table className="set-table">
                    <thead>
                      <tr>
                        <th>Prompt Name</th>
                        <th>Original Artist</th>
                        <th>Total Affiliate Earnings</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Neon Samurai</td>
                        <td>@digital_ronin</td>
                        <td className="money">$45.00</td>
                        <td><button className="set-btn set-btn-outline">View Details</button></td>
                      </tr>
                      <tr>
                        <td>Ethereal Landscape</td>
                        <td>@nature_ai</td>
                        <td className="money">$12.50</td>
                        <td><button className="set-btn set-btn-outline">View Details</button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </SettingsSection>
            </>
          )}

          {/* === RECOVERY & 2FA TAB === */}
          {activeTab === "recovery" && (
            <>
              {showLivenessBanner && (
                <div style={{ background: "#fef9eb", border: "1px solid #f5e6c0", borderLeft: "3px solid #f5c542", borderRadius: 8, padding: "14px 20px", marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#7a5c10" }}>Annual Guardians check</p>
                    <p style={{ margin: "4px 0 0 0", fontSize: 13, color: "#8a7020" }}>Please confirm your guardians are still up to date or ping them to verify liveness.</p>
                  </div>
                  <button onClick={() => setShowLivenessBanner(false)} style={{ background: "none", border: "none", color: "#a09788", fontSize: 13, cursor: "pointer", fontFamily: "var(--font-outfit)" }}>Dismiss</button>
                </div>
              )}

              {!ENABLE_RECOVERY_PROTOTYPE && (
                <div style={{ background: "#fef9eb", border: "1px solid #f5e6c0", borderLeft: "3px solid #d94f3d", borderRadius: 8, padding: "14px 20px", marginBottom: 24 }}>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#7a5c10" }}>Recovery prototype is disabled</p>
                  <p style={{ margin: "4px 0 0 0", fontSize: 13, color: "#8a7020" }}>
                    The recovery phrase, guardians, pairing code, and manual review screens are UI previews until the Turnkey/Supabase recovery APIs are wired. Passkey registration below is the active security path.
                  </p>
                </div>
              )}

              {/* ── Recovery Phrase ── */}
              <SettingsSection num="01" title="Recovery Phrase">
                <div className="set-section-desc" style={{ paddingBottom: '16px' }}>
                  Your 24-word BIP39 master key. Anyone who has it can access your account — store it offline only. Entering it at <strong>/recovery</strong> grants immediate access with no delay.
                </div>
                <div className="set-list-item">
                  <div className="set-item-icon" style={{ color: '#276738', background: '#eaf6ee' }}><Key size={14} /></div>
                  <div className="set-item-content">
                    <div className="set-item-title">
                      Recovery phrase
                      <span style={{ marginLeft: 8, padding: '2px 8px', background: ENABLE_RECOVERY_PROTOTYPE ? '#eaf6ee' : '#f0ede6', color: ENABLE_RECOVERY_PROTOTYPE ? '#276738' : '#a09788', borderRadius: 20, fontSize: 11, fontWeight: 600 }}>
                        {ENABLE_RECOVERY_PROTOTYPE ? "✓ Set" : "Preview only"}
                      </span>
                    </div>
                    <div className="set-item-sub">
                      {ENABLE_RECOVERY_PROTOTYPE ? "Generated at account creation. Stored nowhere by us — only you have it." : "Disabled until real Turnkey recovery phrase generation and verification are wired."}
                    </div>
                  </div>
                  <button className="set-btn set-btn-secondary" disabled={!ENABLE_RECOVERY_PROTOTYPE}>Rotate phrase</button>
                </div>
                <div className="set-list-item" style={{ background: '#f8f6f1' }}>
                  <div className="set-item-icon" style={{ color: '#5a3e8f', background: '#f0eafb' }}><Key size={14} /></div>
                  <div className="set-item-content">
                    <div className="set-item-title">
                      Split Recovery Phrase 
                      <span style={{marginLeft: 6, fontSize: 10, color: '#a09788', fontWeight: 'normal', fontFamily: 'monospace', letterSpacing: '1px'}}>SLIP-39</span>
                      <span style={{ marginLeft: 6, padding: '2px 8px', background: '#f0ede6', color: '#a09788', borderRadius: 20, fontSize: 11, fontWeight: 600 }}>Coming soon</span>
                    </div>
                    <div className="set-item-sub">Split your phrase into 5 shares, any 3 reconstruct it. Eliminates single-point-of-failure. Pending Turnkey infrastructure support.</div>
                  </div>
                </div>
              </SettingsSection>

              {/* ── Social Recovery ── */}
              <SettingsSection num="02" title="Social Recovery">
                <div className="set-section-desc" style={{ paddingBottom: '16px' }}>
                  A secondary recovery path. Add trusted friends, wallets, or email addresses as guardians. If you lose your phrase, you can restore access if enough guardians approve it.
                </div>

                {/* Guardians List */}
                <div className="set-list-item" style={{ background: '#f8f6f1', borderBottom: 'none' }}>
                  <div className="set-item-content">
                    <div className="set-item-title" style={{ fontSize: 13 }}>Your Guardians</div>
                  </div>
                  <button className="set-btn set-btn-secondary" disabled={!ENABLE_RECOVERY_PROTOTYPE} style={{ padding: '4px 10px', fontSize: 11 }}>+ Add guardian</button>
                </div>
                
                {guardiansList.map((g, i, arr) => (
                  <div key={g.id} className="set-list-item" style={{ borderBottom: i === arr.length - 1 ? '1px solid #e8e5de' : 'none' }}>
                    <div className="set-item-icon" style={{ background: '#f5f3ee' }}>
                      {g.type === "handle" ? <User size={14} /> : g.type === "wallet" ? <Wallet size={14} /> : <Mail size={14} />}
                    </div>
                    <div className="set-item-content">
                      <div className="set-item-title" style={{ fontFamily: g.type === "wallet" ? "monospace" : "'Outfit', sans-serif" }}>
                        {g.name}
                        {showLivenessBanner && (
                          <span style={{ marginLeft: 8, fontSize: 11, padding: "2px 6px", borderRadius: 12, background: g.status === "pinged" ? "#fff0c2" : "#eaf6ee", color: g.status === "pinged" ? "#966f07" : "#276738", fontWeight: 600 }}>
                            {g.status === "pinged" ? "Pinged" : "Confirmed"}
                          </span>
                        )}
                      </div>
                      <div className="set-item-sub">{g.sub}</div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      {showLivenessBanner && g.status !== "pinged" && (
                        <button className="set-btn set-btn-outline" disabled={!ENABLE_RECOVERY_PROTOTYPE} onClick={() => pingGuardian(g.id)}>Ping</button>
                      )}
                      <button className="set-btn set-btn-outline" disabled={!ENABLE_RECOVERY_PROTOTYPE}>Remove</button>
                    </div>
                  </div>
                ))}

                {/* Threshold */}
                <div className="set-list-item">
                  <div className="set-item-icon" style={{ color: '#4a6fa5', background: '#eff6ff' }}><Users size={14} /></div>
                  <div className="set-item-content">
                    <div className="set-item-title">Approval Threshold</div>
                    <div className="set-item-sub">How many guardians must approve to restore access.</div>
                  </div>
                  <select className="set-btn set-btn-secondary" disabled={!ENABLE_RECOVERY_PROTOTYPE} style={{ outline: 'none' }}>
                    <option>2 of 3 required</option>
                    <option>3 of 3 required</option>
                  </select>
                </div>

                {/* ZK Commitment */}
                <div className="set-list-item">
                  <div className="set-item-icon" style={{ color: '#7c5cbf', background: '#f5f0fa' }}><Shield size={14} /></div>
                  <div className="set-item-content">
                    <div className="set-item-title">
                      Guardian Passcode
                      <span style={{marginLeft: 6, fontSize: 10, color: '#a09788', fontWeight: 'normal', fontFamily: 'monospace', letterSpacing: '1px'}}>ZK PROOF</span>
                      <span style={{ marginLeft: 8, padding: '2px 8px', background: ENABLE_RECOVERY_PROTOTYPE ? '#eaf6ee' : '#f0ede6', color: ENABLE_RECOVERY_PROTOTYPE ? '#276738' : '#a09788', borderRadius: 20, fontSize: 11, fontWeight: 600 }}>
                        {ENABLE_RECOVERY_PROTOTYPE ? "✓ Set" : "Preview only"}
                      </span>
                    </div>
                    <div className="set-item-sub">The cryptographic hash of your passphrase + guardian set. Proves you initiated the recovery without revealing your passphrase.</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="set-btn" disabled={!ENABLE_RECOVERY_PROTOTYPE} style={{ background: '#f5f3ee', color: '#4a4540', border: '1px solid #e8e5de' }}>Verify proof</button>
                    <button className="set-btn set-btn-secondary" disabled={!ENABLE_RECOVERY_PROTOTYPE}>Rotate</button>
                  </div>
                </div>
              </SettingsSection>

              <SettingsSection num="03" title="How you sign in">
                <div className="set-section-desc" style={{ paddingBottom: '16px' }}>
                  Each device you add is a way back into your account. Add at least two — if you lose one (a stolen phone, a wiped laptop), you can still get in with the other.
                </div>
                <div className="px-6 pb-4">
                  {ENABLE_RECOVERY_PROTOTYPE ? (
                    <button className="set-btn set-btn-dark" onClick={() => setDeviceModalOpen(true)}>+ Add a device</button>
                  ) : (
                    <button className="set-btn set-btn-dark" onClick={handleRegisterPasskey} disabled={turnkeyLoading || isAuthenticating || !account?.address}>
                      {turnkeyLoading || isAuthenticating ? "Registering..." : passkeyRegistered ? "Re-register passkey" : "Register passkey"}
                    </button>
                  )}
                </div>
                {!ENABLE_RECOVERY_PROTOTYPE && (turnkeyError) && (
                  <div className="px-6 pb-4" style={{ color: "#b03020", fontSize: 12 }}>{turnkeyError}</div>
                )}
                {ENABLE_RECOVERY_PROTOTYPE ? (
                  <>
                    <div className="set-list-item">
                      <div className="set-item-icon"><Laptop size={14} /></div>
                      <div className="set-item-content">
                        <div className="set-item-title">MacBook Pro &middot; Touch ID <span className="set-badge-dark">THIS DEVICE</span></div>
                        <div className="set-item-sub">Active now</div>
                      </div>
                      <button className="set-btn set-btn-outline">Remove</button>
                    </div>
                    <div className="set-list-item">
                      <div className="set-item-icon"><Smartphone size={14} /></div>
                      <div className="set-item-content">
                        <div className="set-item-title">iPhone 15 &middot; Face ID</div>
                        <div className="set-item-sub">Used 2 days ago</div>
                      </div>
                      <button className="set-btn set-btn-outline">Remove</button>
                    </div>
                    <div className="set-list-item" style={{ background: '#f5f2ec' }}>
                      <div className="set-item-icon" style={{ background: '#fff' }}><Mail size={14} /></div>
                      <div className="set-item-content">
                        <div className="set-item-title">Recovery email <span style={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: 'normal', color: '#666' }}>eli@enki.studio</span></div>
                        <div className="set-item-sub">If all your devices are gone, we'll send a one-time code here so you can sign in again.</div>
                      </div>
                      <button className="set-btn set-btn-outline" onClick={() => setIsAwaitingModalOpen(true)}>Change email</button>
                    </div>
                  </>
                ) : (
                  <div className="set-list-item">
                    <div className="set-item-icon"><Key size={14} /></div>
                    <div className="set-item-content">
                      <div className="set-item-title">
                        Turnkey passkey
                        {passkeyRegistered && <span className="set-badge-dark">REGISTERED</span>}
                      </div>
                      <div className="set-item-sub">
                        {passkeyRegistered ? "A Turnkey sub-organization is registered for this wallet in local browser storage." : "No local Turnkey passkey registration found for this wallet."}
                      </div>
                    </div>
                  </div>
                )}
              </SettingsSection>

              <SettingsSection num="04" title="Extra check before risky actions">
                <div className="set-list-item" style={{ borderBottom: 'none' }}>
                  <div className="set-item-content" style={{ paddingRight: '24px' }}>
                    <div className="set-item-sub" style={{ fontSize: '12px', color: '#666', lineHeight: '1.5', marginTop: 0 }}>
                      When this is on, we'll ask you to confirm one more time on this device before something serious happens — like deleting your work or sending a payment. Stops accidents and stops anyone who briefly grabs your laptop.
                    </div>
                  </div>
                  <SettingsToggle 
                    checked={recoverySettings.deleteWorkCheck} 
                    onChange={(val) => setRecoverySettings(p => ({...p, deleteWorkCheck: val, sellPromptCheck: val, sendMoneyCheck: val}))} 
                  />
                </div>
                
                <div className="set-list-item" style={{ paddingTop: 0, borderTop: '1px solid #f0eee8' }}>
                  <div className="set-check-circle"><Check size={12} /></div>
                  <div className="set-item-content">
                    <div className="set-item-title">Deleting any of your work</div>
                    <div className="set-item-sub">Images, prompts, releases — once gone, it's gone.</div>
                  </div>
                </div>
                
                <div className="set-list-item" style={{ paddingTop: 0 }}>
                  <div className="set-check-circle"><Check size={12} /></div>
                  <div className="set-item-content">
                    <div className="set-item-title">Selling or releasing a prompt</div>
                    <div className="set-item-sub">Anything that takes payment or goes public on-chain.</div>
                  </div>
                </div>

                <div className="set-list-item" style={{ paddingTop: 0 }}>
                  <div className="set-check-circle"><Check size={12} /></div>
                  <div className="set-item-content">
                    <div className="set-item-title">Sending money out of your wallet</div>
                    <div className="set-item-sub">Any transfer to an address that isn't yours.</div>
                  </div>
                </div>
              </SettingsSection>

              {/* ── Last Resort Recovery ── */}
              <SettingsSection num="05" title="Last Resort Recovery">
                <div className="set-section-desc" style={{ paddingBottom: '16px' }}>
                  If you ever lose your device, seed phrase, and email simultaneously, our team can manually verify your identity and restore access. No automated path — a real person reviews every case.
                </div>

                {/* ZKP hash — optional evidence */}
                <div className="set-list-item">
                  <div className="set-item-icon" style={{ color: '#5a3e8f', background: '#f0eafb' }}>🔐</div>
                  <div className="set-item-content">
                    <div className="set-item-title">
                      Recovery Evidence Hash
                      <span style={{ marginLeft: 6, padding: '2px 8px', background: '#fef9eb', color: '#7a5c10', borderRadius: 20, fontSize: 11, fontWeight: 600 }}>Not set</span>
                    </div>
                    <div className="set-item-sub">Optional but strong supporting evidence for manual review. You generate 3 secret phrases locally — the hash is stored, never the phrases. Submit it with your recovery request.</div>
                  </div>
                  <a href={ENABLE_RECOVERY_PROTOTYPE ? "/recovery/setup-zkp" : "#"} aria-disabled={!ENABLE_RECOVERY_PROTOTYPE} className="set-btn set-btn-secondary" style={{ textDecoration: 'none', whiteSpace: 'nowrap', pointerEvents: ENABLE_RECOVERY_PROTOTYPE ? "auto" : "none", opacity: ENABLE_RECOVERY_PROTOTYPE ? 1 : 0.55 }}>Set up</a>
                </div>

                {/* What counts as evidence */}
                <div className="set-list-item" style={{ background: '#f8f6f1', flexDirection: 'column', alignItems: 'flex-start', gap: 10 }}>
                  <div className="set-item-title" style={{ fontSize: 12 }}>📋 What helps during manual review</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 16px', width: '100%' }}>
                    {['Old connected email', 'Known wallet address', 'Prompts / content you own', 'Recovery evidence hash', 'Social account links', 'Purchase receipts'].map(e => (
                      <div key={e} className="set-item-sub" style={{ margin: 0 }}>· {e}</div>
                    ))}
                  </div>
                </div>

                {/* Link to recovery page */}
                <div className="set-list-item" style={{ borderTop: '1px solid #f0ede6', background: '#f8f6f1' }}>
                  <div className="set-item-icon" style={{ color: '#c2692a', background: '#fef0e6' }}>🆘</div>
                  <div className="set-item-content">
                    <div className="set-item-title">Lost all access?</div>
                    <div className="set-item-sub">Submit a manual recovery request. A team member will review your case within 2–5 business days and reach out at a new email you provide.</div>
                  </div>
                  <a href={ENABLE_RECOVERY_PROTOTYPE ? "/recovery" : "#"} aria-disabled={!ENABLE_RECOVERY_PROTOTYPE} className="set-btn set-btn-secondary" style={{ textDecoration: 'none', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 4, pointerEvents: ENABLE_RECOVERY_PROTOTYPE ? "auto" : "none", opacity: ENABLE_RECOVERY_PROTOTYPE ? 1 : 0.55 }}>
                    Request recovery <ArrowUpRight size={12} />
                  </a>
                </div>
              </SettingsSection>

            </>
          )}

        </SettingsLayout>
        
        {/* Floating Save Button */}
        <div className={`set-save-floater ${hasChanges ? 'visible' : ''}`}>
          <span>Unsaved changes</span>
          <button onClick={handleSaveSettings} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Settings"}
          </button>
        </div>
        
        <TurnkeyDeviceModal isOpen={deviceModalOpen} onClose={() => setDeviceModalOpen(false)} />
        <AwaitingConfirmationModal 
          isOpen={isAwaitingModalOpen} 
          onClose={() => setIsAwaitingModalOpen(false)} 
          email="eli@enki.studio"
          device="MacBook Pro"
        />
      </div>
    </>
  );
}
