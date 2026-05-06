"use client";

import { useRouter, usePathname } from "next/navigation";
import { Search, Plus, User, LogOut, Bell, Wallet, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect, useRef, createContext, useContext } from "react";
import { useTheme } from "../providers/ThemeProvider";
import { useActiveAccount, useActiveWallet } from "thirdweb/react";
import { ConnectWallet } from "./ConnectWallet";
import { ChainSwitcher } from "./ChainSwitcher";
import { useToast } from "@/hooks/use-toast";
import { useWalletInfo } from "@/hooks/useWalletInfo";
import HuntPromptPopover from "./HuntPromptPopover";
import FeedbackPopover from "./FeedbackPopover";
import { Coins, MessageSquareHeart } from "lucide-react";

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

export default function Navbar({ username = "Artist", onSearch }: NavbarProps) {
  const account = useSafeActiveAccount();
  const wallet = useSafeActiveWallet();
  const walletInfo = useSafeWalletInfo();
  const authenticated = !!account && walletInfo.isConnected;
  const router = useRouter();
  const { toast } = useToast();
  const [showNav, setShowNav] = useState(true);
  const lastScrollYRef = useRef(0);
  const pathname = usePathname();
  const walletAddress = walletInfo.address;

  const handleCopyAddress = async () => {
    if (!walletAddress) return;
    try {
      await navigator.clipboard.writeText(walletAddress);
      toast({ title: "Address copied", description: "Wallet address copied to clipboard" });
    } catch {
      toast({ title: "Copy failed", variant: "destructive" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y > lastScrollYRef.current && y > 50) setShowNav(false);
      else if (y < lastScrollYRef.current) setShowNav(true);
      lastScrollYRef.current = y;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NAV_LINKS = [
    { label: "DISCOVER",  href: "/" },
    { label: "IMAGES",    href: "/showcase" },
    { label: "VIDEOS",    href: "/showcase" },
    { label: "FAVORITES", href: "/my-gallery" },
  ];

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: "rgba(245, 243, 238, 0.92)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderBottom: "1px solid #e0ddd5",
      transition: "transform 0.3s ease",
      transform: showNav ? "translateY(0)" : "translateY(-100%)",
      fontFamily: "var(--font-outfit), 'Outfit', sans-serif",
    }}>
      <div style={{ padding: "0 32px", height: 52, display: "flex", alignItems: "center", gap: 0 }}>

        {/* Logo */}
        <div onClick={() => router.push("/")} style={{ display: "flex", alignItems: "center", gap: 2, cursor: "pointer", marginRight: 28, flexShrink: 0 }}>
          <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 700, fontSize: 18, color: "#111" }}>
            Enki Art
          </span>
          <span style={{ color: "#d94f3d", fontSize: 20, lineHeight: 1, marginLeft: 1 }}>·</span>
        </div>

        {/* Nav Links */}
        <nav style={{ display: "flex", marginRight: 20, flexShrink: 0 }}>
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = (label === "DISCOVER" && pathname === "/") || (label === "IMAGES" && pathname === "/showcase");
            return (
              <button key={label} onClick={() => router.push(href)} style={{
                background: "none", border: "none", cursor: "pointer",
                padding: "0 12px", height: 52,
                fontSize: 11, fontWeight: isActive ? 700 : 400,
                letterSpacing: "0.7px", color: isActive ? "#111" : "#999",
                textDecoration: isActive ? "underline" : "none",
                textUnderlineOffset: "4px", transition: "color 0.15s",
              }}
                onMouseEnter={e => (e.currentTarget.style.color = "#111")}
                onMouseLeave={e => (e.currentTarget.style.color = isActive ? "#111" : "#999")}
              >
                {label}
              </button>
            );
          })}
        </nav>

        {/* Search */}
        <div style={{ flex: 1, maxWidth: 420, position: "relative" }}>
          <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#aaa" }} />
          <input
            type="search"
            placeholder="Search prompts, tags, artists..."
            onChange={(e) => onSearch?.(e.target.value)}
            style={{
              width: "100%", padding: "7px 52px 7px 34px",
              background: "#eceae3", border: "none", borderRadius: 8,
              fontSize: 13, color: "#555", outline: "none",
              fontFamily: "inherit", boxSizing: "border-box",
            }}
          />
          <span style={{
            position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
            fontSize: 10, color: "#aaa", fontFamily: "monospace",
            background: "#e0ddd5", padding: "2px 6px", borderRadius: 4,
          }}>⌘ K</span>
        </div>

        {/* Right Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: 16, flexShrink: 0 }}>

          {/* + Release prompt */}
          <button onClick={() => router.push("/editor")} style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "7px 16px", background: "#111", color: "#fff",
            border: "none", borderRadius: 20, cursor: "pointer",
            fontSize: 13, fontWeight: 500, fontFamily: "inherit", whiteSpace: "nowrap",
          }}>
            <Plus size={14} /> Release prompt
          </button>

          {/* Hunt */}
          <HuntPromptPopover>
            <button style={{
              display: "flex", alignItems: "center", gap: 5,
              padding: "6px 13px", background: "#fffaf0", color: "#b8860b",
              border: "1px solid #f5e6cc", borderRadius: 20, cursor: "pointer",
              fontSize: 12, fontWeight: 500, fontFamily: "inherit", whiteSpace: "nowrap",
            }}>
              <Coins size={13} /> Hunt a prompt, earn 50%
            </button>
          </HuntPromptPopover>

          {/* Feedback */}
          <FeedbackPopover>
            <button style={{
              display: "flex", alignItems: "center", gap: 5,
              padding: "6px 13px", background: "#f0f8ff", color: "#4169e1",
              border: "1px solid #e6f0fa", borderRadius: 20, cursor: "pointer",
              fontSize: 12, fontWeight: 500, fontFamily: "inherit", whiteSpace: "nowrap",
            }}>
              <MessageSquareHeart size={13} /> Earn $100 for feedback
            </button>
          </FeedbackPopover>

          {/* Chain Switcher */}
          {authenticated && <ChainSwitcher />}

          {/* Bell */}
          <button style={{
            width: 34, height: 34, borderRadius: "50%",
            background: "none", border: "1px solid #e0ddd5",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "#666",
          }}>
            <Bell size={15} />
          </button>

          {/* Avatar */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button data-testid="button-user-menu" style={{
                width: 34, height: 34, borderRadius: "50%",
                background: "#111", border: "none",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "#fff", fontSize: 12, fontWeight: 600,
                fontFamily: "monospace", letterSpacing: "0.5px",
              }}>
                {authenticated && walletAddress
                  ? walletAddress.slice(2, 4).toUpperCase()
                  : <User size={15} />}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
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
              <DropdownMenuItem onClick={() => router.push("/my-gallery")}>My Gallery</DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/my-prompts")}>My Prompts</DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/settings")}>Settings</DropdownMenuItem>
              {authenticated && account && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={async () => {
                      try {
                        if (wallet) await wallet.disconnect();
                        else window.location.reload();
                        toast({ title: "Wallet disconnected" });
                      } catch { window.location.reload(); }
                    }}
                    className="cursor-pointer text-destructive focus:text-destructive"
                  >
                    <LogOut className="h-4 w-4 mr-2" /> Disconnect Wallet
                  </DropdownMenuItem>
                </>
              )}
              {!authenticated && (
                <div className="px-2 py-1.5">
                  <ConnectWallet />
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
