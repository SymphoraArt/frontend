"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  Search,
  User,
  LogOut,
  Wallet,
  Copy,
  Bell,
  Trophy,
  BadgeDollarSign,
  MessageSquareHeart,
  PenLine,
  Menu,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect, createContext, useContext, useRef } from "react";
import { useActiveAccount, useActiveWallet, useDisconnect } from "thirdweb/react";
import { ChainSwitcher } from "./ChainSwitcher";
import { WalletPickerModal } from "./WalletPickerModal";
import { useToast } from "@/hooks/use-toast";
import { useWalletInfo } from "@/hooks/useWalletInfo";
import { useWallet } from "@solana/wallet-adapter-react";
import { useSolanaAuth } from "@/hooks/useSolanaAuth";
import { useHoldings } from "@/hooks/useHoldings";
import { useTheme } from "../providers/ThemeProvider";
import { useTurnkeyEmailAuth } from "@/hooks/useTurnkeyAuth";

interface NavbarProps {
  username?: string;
  onSearch?: (query: string) => void;
}

export const NavbarContext = createContext({ showNav: true });
export function useNavbarVisibility() {
  return useContext(NavbarContext);
}

function useSafeActiveAccount() {
  try { return useActiveAccount(); } catch { return null; }
}
function useSafeActiveWallet() {
  try { return useActiveWallet(); } catch { return null; }
}
function useSafeWalletInfo() {
  try {
    return useWalletInfo();
  } catch {
    return {
      address: null, shortAddress: null, type: "none" as const,
      authMethod: "unknown" as const, isConnected: false,
      isInAppWallet: false, isExternalWallet: false, walletId: null,
      chain: { id: null, name: null },
      security: { isSmartAccount: false, isValidWallet: false, isSecureConnection: false, warnings: [] },
      displayName: "Not Connected", icon: "🔌", description: "No wallet connected",
    };
  }
}

function useBreakpoint() {
  const [width, setWidth] = useState(1200);

  useEffect(() => {
    setWidth(window.innerWidth);
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    isMobile: width <= 900,
    isTablet: width > 900 && width < 1200,
    isDesktop: width >= 1200,
  };
}

export default function Navbar({ username = "Artist", onSearch }: NavbarProps) {
  const account = useSafeActiveAccount();
  const wallet = useSafeActiveWallet();
  const walletInfo = useSafeWalletInfo();
  const { disconnect: evmDisconnect } = useDisconnect();
  const { connected: solanaConnected, publicKey: solanaPublicKey, disconnect: solanaDisconnect } = useWallet();
  const { isAuthenticated: solanaSessionActive, walletAddress: solanaSessionAddress, logout: solanaSessionLogout } = useSolanaAuth();
  const { address: turnkeyAddress, clear: clearTurnkeyAuth } = useTurnkeyEmailAuth();
  // Same key as the billing recipient so the navbar shows the balance that
  // top-ups credit (see BillingPanel / useHoldings).
  const holdingsAddress = account?.address ?? turnkeyAddress ?? null;
  const { balance: holdings, ready: holdingsReady } = useHoldings(holdingsAddress);
  const { theme, setTheme } = useTheme();
  const [themeReady, setThemeReady] = useState(false);
  const [showWalletPicker, setShowWalletPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // Falls back to the text wordmark if the logo asset is missing/broken.
  const [logoError, setLogoError] = useState(false);
  const evmAuthenticated = !!account && walletInfo.isConnected;
  // Solana는 서명까지 끝나야(=session active) 인증으로 본다. 단순 connect 상태로는
  // 인증된 것처럼 표시하지 않는다 (premature-login 버그 방지).
  const authenticated = evmAuthenticated || solanaSessionActive || !!turnkeyAddress;
  const router = useRouter();
  const { toast } = useToast();
  const pathname = usePathname();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  const walletAddress = walletInfo.address ?? solanaSessionAddress ?? turnkeyAddress ?? (solanaSessionActive ? solanaPublicKey?.toBase58() ?? null : null);
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  // Purple is a dark variant, so "dark styling" applies to both.
  const isDark = themeReady && theme !== "light";

  useEffect(() => {
    setThemeReady(true);
  }, []);

  const iconColor = isDark ? "#f7f2eb" : "#555";
  const activeColor = isDark ? "#fff" : "#111";
  const inactiveColor = isDark ? "#c8c1b8" : "#555";

  const handleCopyAddress = async () => {
    if (!walletAddress) return;
    try {
      await navigator.clipboard.writeText(walletAddress);
      toast({ title: "Address copied", description: "Wallet address copied to clipboard" });
    } catch {
      toast({ title: "Copy failed", variant: "destructive" });
    }
  };

  const NAV_LINKS = [
    { label: "EXPLORE", href: "/explore", disabled: false },
    { label: "IMAGES", href: "/images", disabled: false },
    { label: "VIDEOS", href: "/showcase", disabled: true, tooltip: "Video prompts will be implemented soon" },
  ];

  const visibleNavLinks = isTablet
    ? NAV_LINKS.filter((link) => !link.disabled)
    : NAV_LINKS;

  return (
    <>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        width: "100%",
        background: "var(--header-bg)",
        backdropFilter: "blur(64px) saturate(200%)",
        WebkitBackdropFilter: "blur(64px) saturate(200%)",
        fontFamily: "var(--font-sans)",
      }}>
        <div style={{ padding: isMobile ? "0 12px" : "0 8px 0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
          

          <div onClick={() => router.push("/")} style={{ display: "flex", alignItems: "center", gap: 2, cursor: "pointer", flexShrink: 0, zIndex: 2 }}>
            {/* Transparent-background logo (no font, no bg). Drop the asset at
                public/enki-art-logo.png. Falls back to the wordmark if missing. */}
            {!logoError ? (
              <img
                src="/enki-art-logo.png"
                alt="Enki Art"
                onError={() => setLogoError(true)}
                style={{ height: isMobile ? 30 : 42, width: "auto", display: "block", objectFit: "contain" }}
              />
            ) : (
              <>
                <span style={{ fontFamily: "var(--font-instrument-serif), serif", fontStyle: "italic", fontWeight: 400, fontSize: isMobile ? 22 : 28, color: isDark ? "#f1f1f3" : "#111", letterSpacing: "-0.02em" }}>
                  Enki Art
                </span>
                <span style={{ color: "rgb(var(--ember-rgb))", fontSize: 24, lineHeight: 1, marginLeft: 1 }}>.</span>
              </>
            )}
          </div>

          {!isMobile && (
            <nav style={{ display: "flex", alignItems: "center", gap: isTablet ? 0 : 4, margin: "0 auto" }}>
              {visibleNavLinks.map(({ label, href, disabled, tooltip }) => {
                const isActive = (label === "EXPLORE" && pathname === "/explore") || (label === "IMAGES" && pathname === "/images");
                return (
                  <button
                    key={label}
                    onClick={() => !disabled && router.push(href)}
                    title={disabled ? tooltip : undefined}
                    style={{
                      background: "none", border: "none",
                      cursor: disabled ? "not-allowed" : "pointer",
                      padding: isTablet ? "0 10px" : "0 16px", height: 56,
                      fontSize: isTablet ? 11.5 : 12.5, fontWeight: isActive ? 600 : 400,
                      letterSpacing: "0.4px",
                      color: disabled ? (isDark ? "#6f6a64" : "#bbb") : isActive ? activeColor : inactiveColor,
                      opacity: disabled ? 0.5 : 1,
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.color = activeColor; }}
                    onMouseLeave={(e) => { if (!disabled) e.currentTarget.style.color = isActive ? activeColor : inactiveColor; }}
                  >
                    {label}
                  </button>
                );
              })}
            </nav>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 2 : 4, flexShrink: 0, zIndex: 2 }}>
            {!isMobile && (
              <div style={{ 
                position: "relative", 
                width: isTablet ? 300 : 480, 
                height: 40, 
                display: "flex", 
                alignItems: "center",
                marginRight: 24,
                padding: "0 14px",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.15)" : "#d8d2c5"}`,
                borderRadius: 100,
                background: isDark ? "rgba(255,255,255,0.05)" : "#f3efe7",
                transition: "all 0.2s ease"
              }}>
                <Search size={16} color={isDark ? "#7d8a8c" : "#6b665e"} style={{ flexShrink: 0 }} />
                <input 
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search prompts, artists..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      if (onSearch) {
                        onSearch(searchQuery);
                      } else {
                        router.push(`/images?q=${encodeURIComponent(searchQuery)}`);
                      }
                    }
                  }}
                  style={{ 
                    flex: 1, 
                    height: "100%", 
                    padding: "0 10px", 
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    fontSize: 14,
                    color: isDark ? "#e8e0cc" : "#1a1715",
                    fontFamily: "var(--font-sans)",
                  }}
                />
                <span className="mono" style={{ 
                  fontSize: 10, 
                  color: isDark ? "#7d8a8c" : "#6b665e", 
                  border: `1px solid ${isDark ? "rgba(255,255,255,0.15)" : "#d8d2c5"}`, 
                  padding: "2px 5px", 
                  borderRadius: 3, 
                  whiteSpace: "nowrap",
                  opacity: 0.8
                }}>Ctrl K</span>
              </div>
            )}

            {isDesktop && (
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: 4, marginRight: 6 }}>
                <button onClick={() => router.push("/leaderboard")} title="Leaderboard" style={{ background: "none", border: "none", cursor: "pointer", color: iconColor, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Trophy size={18} />
                </button>
                <button onClick={() => router.push("/referrals")} title="Referrals — get paid when you invite others" style={{ background: "none", border: "none", cursor: "pointer", color: iconColor, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <BadgeDollarSign size={18} />
                </button>
                <button onClick={() => router.push("/feedback")} title="Feedbacks" style={{ background: "none", border: "none", cursor: "pointer", color: iconColor, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <MessageSquareHeart size={18} />
                </button>
                <button title="Notifications" style={{ background: "none", border: "none", cursor: "pointer", color: iconColor, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Bell size={18} />
                </button>
                <button onClick={() => router.push("/editor")} style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "0 20px", height: 36,
                  background: isDark ? "var(--cta-bg)" : "#111",
                  color: isDark ? "var(--cta-ink)" : "#fff",
                  border: "none", borderRadius: 8, cursor: "pointer",
                  fontSize: 12, fontWeight: 600, fontFamily: "var(--font-geist-sans), sans-serif", letterSpacing: "0.05em", textTransform: "uppercase", whiteSpace: "nowrap",
                  boxShadow: isDark ? "inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 14px rgba(var(--ember-rgb), 0.3)" : "0 2px 10px rgba(0,0,0,0.1)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                  if (isDark) e.currentTarget.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.3), 0 6px 20px rgba(var(--ember-rgb), 0.45)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  if (isDark) e.currentTarget.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 14px rgba(201, 104, 56, 0.25)";
                }}>
                  Release prompt
                </button>
              </div>
            )}

            {isTablet && (
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginRight: 4 }}>
                <button onClick={() => router.push("/leaderboard")} title="Leaderboard" style={{ color: iconColor, background: "none", border: "none" }}>
                  <Trophy size={16} />
                </button>
                <button title="Notifications" style={{ color: iconColor, background: "none", border: "none" }}>
                  <Bell size={16} />
                </button>
                <button onClick={() => router.push("/editor")} title="Release prompt" style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: "#111", border: "none",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", color: "#fff", transition: "transform 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
                  <PenLine size={15} />
                </button>
              </div>
            )}

            {evmAuthenticated && <ChainSwitcher />}

            {/* Balance — sits right next to the profile avatar. Tap to top up. */}
            <button
              onClick={() => router.push("/settings?tab=billing")}
              title="Your balance — tap to add funds"
              aria-label="Holdings"
              style={{
                display: "flex", alignItems: "center", gap: 5,
                height: 32, padding: "0 12px", marginLeft: 4,
                borderRadius: 100, cursor: "pointer",
                background: isDark ? "rgba(255,255,255,0.06)" : "#f3efe7",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "#e2ded6"}`,
                color: isDark ? "#f1ede6" : "#1c1a18",
                fontSize: 13, fontWeight: 600, fontFamily: "var(--font-sans)",
                whiteSpace: "nowrap", transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.12)" : "#ebe5d8")}
              onMouseLeave={(e) => (e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.06)" : "#f3efe7")}
            >
              <Wallet size={14} color="rgb(var(--ember-rgb))" />
              ${holdingsReady ? holdings.toFixed(2) : "0.00"}
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {isMobile ? (
                  <button data-testid="button-user-menu" style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: "none", border: "none",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", color: isDark ? "#f7f2eb" : "#333",
                    marginLeft: 2,
                  }}>
                    <Menu size={22} />
                  </button>
                ) : (
                  <button data-testid="button-user-menu" style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: "#111", border: "none",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", color: "#fff", fontSize: 13, fontWeight: 600,
                    fontFamily: "monospace", letterSpacing: "0.5px",
                    marginLeft: 4,
                  }}>
                    {authenticated && walletAddress
                      ? (walletAddress.startsWith("0x") ? walletAddress.slice(2, 4) : walletAddress.slice(0, 2)).toUpperCase()
                      : <User size={16} />}
                  </button>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-72 p-0 rounded-[12px] overflow-hidden border shadow-2xl"
                style={{
                  background: isDark ? "var(--surface-1)" : "#faf8f4",
                  color: isDark ? "#e8e0cc" : "#1a1715",
                  borderColor: isDark ? "rgba(255,255,255,0.1)" : "#d8d2c5"
                }}
              >
                {/* Header Section */}
                <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 12, borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#ebe5d8"}` }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%",
                    background: "#111", color: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, fontWeight: 500, fontFamily: "var(--font-instrument-serif), serif", fontStyle: "italic"
                  }}>
                    {walletAddress
                      ? (walletAddress.startsWith("0x") ? walletAddress.slice(2, 4) : walletAddress.slice(0, 2)).toUpperCase()
                      : <User size={16} />}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 500, fontSize: 14 }}>
                      {authenticated ? (username === "Artist" ? "Account" : username) : "Guest"}
                    </div>
                    <div className="mono" style={{ fontSize: 10, color: isDark ? "#7d8a8c" : "#6b665e", marginTop: 2 }}>
                      {walletAddress
                        ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`
                        : "Not connected"}
                    </div>
                  </div>
                </div>


                {/* Links Section */}
                <div style={{ padding: "8px 0" }}>
                  {[
                    { label: "My profile", href: "/profile" },
                    { label: "My Gallery", href: "/my-gallery" },
                    { label: "Settings", href: "/settings" }
                  ].map((link) => (
                    <DropdownMenuItem 
                      key={link.label}
                      onClick={() => router.push(link.href)}
                      className="focus:bg-[#c96838]/10 focus:text-[#c96838]"
                      style={{ 
                        padding: "10px 20px", 
                        fontSize: 14, 
                        fontWeight: 400, 
                        cursor: "pointer",
                        outline: "none",
                        color: "inherit"
                      }}
                    >
                      {link.label}
                    </DropdownMenuItem>
                  ))}
                  
                  {authenticated ? (
                    <DropdownMenuItem
                      onClick={async () => {
                        try {
                          if (turnkeyAddress) { clearTurnkeyAuth(); toast({ title: "Signed out" }); return; }
                          if (solanaConnected || solanaSessionActive) {
                            await solanaSessionLogout().catch(() => {});
                            await solanaDisconnect().catch(() => {});
                          }
                          else if (wallet) evmDisconnect(wallet);
                          else window.location.reload();
                          toast({ title: "Wallet disconnected" });
                        } catch { window.location.reload(); }
                      }}
                      className="focus:bg-[#c96838]/10 focus:text-[#c96838]"
                      style={{
                        padding: "10px 20px",
                        fontSize: 14,
                        fontWeight: 400,
                        cursor: "pointer",
                        outline: "none",
                        color: "inherit",
                        display: "flex",
                        alignItems: "center",
                        gap: 8
                      }}
                    >
                      <LogOut size={14} /> Sign out
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem
                      onClick={() => setShowWalletPicker(true)}
                      className="focus:bg-[#c96838]/10 focus:text-[#c96838]"
                      style={{
                        padding: "10px 20px",
                        fontSize: 14,
                        fontWeight: 500,
                        cursor: "pointer",
                        outline: "none",
                        color: "#c96838",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <Wallet size={14} /> Connect Wallet
                    </DropdownMenuItem>
                  )}
                </div>

                {/* Color setup — pick between the three themes (stays open so
                    you can preview each). */}
                <DropdownMenuSeparator style={{ margin: 0, height: 1, background: isDark ? "rgba(255,255,255,0.07)" : "#ebe5d8" }} />
                <div style={{ padding: "12px 20px 16px" }}>
                  <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: isDark ? "#7d8a8c" : "#8a8174", marginBottom: 10, fontFamily: "var(--font-jetbrains-mono), monospace" }}>
                    Color setup
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    {([
                      { id: "light", label: "Bright", sw: "linear-gradient(135deg, #faf8f4 0%, #ebe5d8 100%)", accent: "#c96838" },
                      { id: "dark", label: "Dark", sw: "linear-gradient(135deg, #0f2230 0%, #16303f 100%)", accent: "#cba24a" },
                      { id: "purple", label: "Purple", sw: "linear-gradient(135deg, #1a1228 0%, #6d28d9 100%)", accent: "#a855f7" },
                    ] as const).map((opt) => {
                      const active = theme === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={(e) => { e.preventDefault(); setTheme(opt.id); }}
                          style={{
                            flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 7,
                            padding: "10px 4px", borderRadius: 10, cursor: "pointer",
                            background: active ? (isDark ? "rgba(255,255,255,0.06)" : "#f3efe7") : "transparent",
                            border: `1px solid ${active ? opt.accent : (isDark ? "rgba(255,255,255,0.08)" : "#e2ded6")}`,
                            color: "inherit", transition: "border-color 0.15s ease, background 0.15s ease",
                          }}
                        >
                          <span style={{
                            width: 30, height: 30, borderRadius: "50%",
                            background: opt.sw,
                            border: `2px solid ${active ? opt.accent : (isDark ? "rgba(255,255,255,0.18)" : "#d8d2c5")}`,
                            boxShadow: active ? `0 0 0 3px ${opt.accent}33` : "none",
                            flexShrink: 0,
                          }} />
                          <span style={{ fontSize: 11, fontWeight: active ? 600 : 400 }}>{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <WalletPickerModal open={showWalletPicker} onClose={() => setShowWalletPicker(false)} />
    </>
  );
}
