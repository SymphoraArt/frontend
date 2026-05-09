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
  Users,
  MessageSquareHeart,
  PenLine,
  Menu,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect, createContext, useContext } from "react";
import { useActiveAccount, useActiveWallet } from "thirdweb/react";
import { ChainSwitcher } from "./ChainSwitcher";
import { WalletPickerModal } from "./WalletPickerModal";
import { useToast } from "@/hooks/use-toast";
import { useWalletInfo } from "@/hooks/useWalletInfo";
import { useWallet } from "@solana/wallet-adapter-react";
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
  const { connected: solanaConnected, publicKey: solanaPublicKey, disconnect: solanaDisconnect } = useWallet();
  const { address: turnkeyAddress, clear: clearTurnkeyAuth } = useTurnkeyEmailAuth();
  const { theme, toggleTheme } = useTheme();
  const [themeReady, setThemeReady] = useState(false);
  const [showWalletPicker, setShowWalletPicker] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const evmAuthenticated = !!account && walletInfo.isConnected;
  const authenticated = evmAuthenticated || solanaConnected || !!turnkeyAddress;
  const router = useRouter();
  const { toast } = useToast();
  const pathname = usePathname();
  const walletAddress = walletInfo.address ?? solanaPublicKey?.toBase58() ?? turnkeyAddress ?? null;
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  const isDark = themeReady && theme === "dark";

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
    { label: "DISCOVER", href: "/", disabled: false },
    { label: "IMAGES", href: "/showcase", disabled: false },
    { label: "VIDEOS", href: "/showcase", disabled: true, tooltip: "Video prompts will be implemented soon" },
    { label: "FAVORITES", href: "/my-gallery", disabled: false },
  ];

  const visibleNavLinks = isTablet
    ? NAV_LINKS.filter((link) => !link.disabled)
    : NAV_LINKS;

  return (
    <>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        width: "100%",
        background: isDark ? "rgba(10, 10, 12, 0.98)" : "rgba(255, 255, 255, 0.98)",
        backdropFilter: "blur(64px) saturate(200%)",
        WebkitBackdropFilter: "blur(64px) saturate(200%)",
        borderBottom: isDark ? "1px solid rgba(168, 85, 247, 0.3)" : "1px solid rgba(0,0,0,0.08)",
        boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.8)" : "0 4px 12px rgba(0,0,0,0.05)",
        borderRadius: 0,
        fontFamily: "var(--font-sora), 'Sora', sans-serif",
      }}>
        <div style={{ padding: isMobile ? "0 12px" : "0 8px 0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
          
          {/* Full Width Search Overlay */}
          {isSearchOpen && (
            <div style={{ position: "absolute", inset: 0, padding: isMobile ? "0 12px" : "0 24px", display: "flex", alignItems: "center", background: isDark ? "rgba(13, 13, 13, 1)" : "#fff", zIndex: 10 }}>
              <Search size={18} color={iconColor} style={{ flexShrink: 0 }} />
              <input 
                autoFocus
                placeholder="Search Enki Art..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (onSearch) onSearch(searchQuery);
                    setIsSearchOpen(false);
                  }
                }}
                style={{ flex: 1, height: "100%", background: "transparent", border: "none", outline: "none", padding: "0 16px", color: isDark ? "#fff" : "#111", fontSize: 16, fontFamily: "inherit" }}
              />
              <button onClick={() => setIsSearchOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: iconColor, padding: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 20, lineHeight: 1 }}>×</span>
              </button>
            </div>
          )}

          <div onClick={() => router.push("/")} style={{ display: "flex", alignItems: "center", gap: 2, cursor: "pointer", flexShrink: 0, zIndex: 2 }}>
            <span style={{ fontFamily: "var(--font-sora), 'Sora', sans-serif", fontStyle: "italic", fontWeight: 800, fontSize: isMobile ? 18 : 22, color: isDark ? "#f1f1f3" : "#111", letterSpacing: "-0.04em" }}>
              EnkiArt
            </span>
            <span style={{ color: "#a855f7", fontSize: 24, lineHeight: 1, marginLeft: 1 }}>.</span>
          </div>

          {!isMobile && (
            <nav style={{ display: "flex", alignItems: "center", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 1 }}>
              {visibleNavLinks.map(({ label, href, disabled, tooltip }) => {
                const isActive = (label === "DISCOVER" && pathname === "/") || (label === "IMAGES" && pathname === "/showcase");
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

          <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 2 : 6, flexShrink: 0, zIndex: 2 }}>
            <button
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              onClick={toggleTheme}
              style={{
                width: 36, height: 36, borderRadius: "50%",
                background: "none", border: "none",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: iconColor, transition: "background 0.2s ease, color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "none", border: "none",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: iconColor, transition: "background 0.2s ease",
            }}
            onClick={() => setIsSearchOpen(true)}
            onMouseEnter={(e) => (e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.04)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "none")}>
              <Search size={16} />
            </button>

            {isDesktop && (
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginRight: 8 }}>
                <button onClick={() => router.push("/leaderboard")} title="Leaderboard" style={{ background: "none", border: "none", cursor: "pointer", color: iconColor, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Trophy size={18} />
                </button>
                <button onClick={() => router.push("/referrals")} title="Referrals" style={{ background: "none", border: "none", cursor: "pointer", color: iconColor, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Users size={18} />
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
                  background: isDark ? "linear-gradient(135deg, #a855f7 0%, #c026d3 100%)" : "#111",
                  color: "#fff",
                  border: "none", borderRadius: 8, cursor: "pointer",
                  fontSize: 12, fontWeight: 600, fontFamily: "var(--font-geist-sans), sans-serif", letterSpacing: "0.05em", textTransform: "uppercase", whiteSpace: "nowrap",
                  boxShadow: isDark ? "inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 14px rgba(168, 85, 247, 0.25)" : "0 2px 10px rgba(0,0,0,0.1)", 
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                  if (isDark) e.currentTarget.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.3), 0 6px 20px rgba(168, 85, 247, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  if (isDark) e.currentTarget.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 14px rgba(168, 85, 247, 0.25)";
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

            {!authenticated && (
              <button onClick={() => setShowWalletPicker(true)} style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "0 16px", height: 36, 
                background: isDark ? "rgba(255,255,255,0.05)" : "#111", 
                color: isDark ? "#fff" : "#fff",
                border: isDark ? "1px solid rgba(255,255,255,0.1)" : "none", 
                borderRadius: 8, cursor: "pointer",
                fontSize: 12, fontWeight: 600, fontFamily: "var(--font-geist-sans), sans-serif", letterSpacing: "0.05em", textTransform: "uppercase", whiteSpace: "nowrap",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)", transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
                Connect Wallet
              </button>
            )}

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
                      ? walletAddress.slice(0, 2).toUpperCase()
                      : <User size={16} />}
                  </button>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 p-2 mt-2 rounded-[24px] border border-black/15 bg-white text-[#111] shadow-2xl dark:border-white/15 dark:bg-[#171717] dark:text-white">
                {authenticated && walletAddress ? (
                  <div className="px-2 py-2 space-y-1">
                    <div className="flex items-center gap-2">
                      <Wallet className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm font-medium">Wallet Connected</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <code className="text-xs font-mono text-foreground/80 break-all flex-1">{walletAddress}</code>
                      <Button variant="ghost" size="icon" className="h-6 w-6 flex-shrink-0" onClick={(e) => { e.stopPropagation(); handleCopyAddress(); }}>
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="px-2 py-2">
                    <p className="text-sm font-medium">Guest</p>
                    <p className="text-xs text-muted-foreground">Log in to save your creations</p>
                  </div>
                )}
                <DropdownMenuSeparator />

                {isMobile && (
                  <>
                    <DropdownMenuItem onClick={() => router.push("/editor")} className="rounded-xl cursor-pointer focus:bg-[#d94f3d]/10 focus:text-[#d94f3d]">
                      <PenLine className="h-4 w-4 mr-2 text-[#d94f3d]" /> Release prompt
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/leaderboard")} className="rounded-xl cursor-pointer focus:bg-[#d94f3d]/10 focus:text-[#d94f3d]">
                      <Trophy className="h-4 w-4 mr-2 text-[#d94f3d]" /> Leaderboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/referrals")} className="rounded-xl cursor-pointer focus:bg-[#d94f3d]/10 focus:text-[#d94f3d]">
                      <Users className="h-4 w-4 mr-2 text-[#d94f3d]" /> Referrals
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/feedback")} className="rounded-xl cursor-pointer focus:bg-[#d94f3d]/10 focus:text-[#d94f3d]">
                      <MessageSquareHeart className="h-4 w-4 mr-2 text-[#d94f3d]" /> Feedback
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-black/10 dark:bg-white/10" />
                  </>
                )}

                <DropdownMenuItem onClick={() => router.push("/my-gallery")} className="rounded-xl cursor-pointer focus:bg-[#d94f3d]/10 focus:text-[#d94f3d]">My Gallery</DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/my-prompts")} className="rounded-xl cursor-pointer focus:bg-[#d94f3d]/10 focus:text-[#d94f3d]">My Prompts</DropdownMenuItem>
                <DropdownMenuSeparator className="bg-black/10 dark:bg-white/10" />
                <DropdownMenuItem onClick={() => router.push("/leaderboard")} className="rounded-xl cursor-pointer focus:bg-[#d94f3d]/10 focus:text-[#d94f3d]">
                  <Trophy className="h-4 w-4 mr-2 text-[#d94f3d]" /> Leaderboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/referrals")} className="rounded-xl cursor-pointer focus:bg-[#d94f3d]/10 focus:text-[#d94f3d]">
                  <Users className="h-4 w-4 mr-2 text-[#d94f3d]" /> Referrals
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/feedback")} className="rounded-xl cursor-pointer focus:bg-[#d94f3d]/10 focus:text-[#d94f3d]">
                  <MessageSquareHeart className="h-4 w-4 mr-2 text-[#111] dark:text-white" /> Earn for feedback
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-black/10 dark:bg-white/10" />
                <DropdownMenuItem onClick={() => router.push("/settings")} className="rounded-xl cursor-pointer focus:bg-[#d94f3d]/10 focus:text-[#d94f3d]">Settings</DropdownMenuItem>

                {((authenticated && account) || solanaConnected || !!turnkeyAddress) && (
                  <>
                    <DropdownMenuSeparator className="bg-black/5" />
                    <DropdownMenuItem
                      onClick={async () => {
                        try {
                          if (turnkeyAddress) { clearTurnkeyAuth(); toast({ title: "Signed out" }); return; }
                          if (solanaConnected) await solanaDisconnect();
                          else if (wallet) await wallet.disconnect();
                          else window.location.reload();
                          toast({ title: "Wallet disconnected" });
                        } catch { window.location.reload(); }
                      }}
                      className="cursor-pointer text-red-500 focus:text-red-600 focus:bg-red-50 rounded-xl mt-1"
                    >
                      <LogOut className="h-4 w-4 mr-2" /> {turnkeyAddress ? "Sign Out" : "Disconnect Wallet"}
                    </DropdownMenuItem>
                  </>
                )}
                <div className="px-2 py-1.5">
                  <Button 
                    className="w-full bg-[#C7663A] hover:bg-[#A3522E] text-white rounded-none h-8 text-[10px] font-mono uppercase tracking-wider" 
                    size="sm" 
                    onClick={() => setShowWalletPicker(true)}
                  >
                    Connect Wallet
                  </Button>
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
