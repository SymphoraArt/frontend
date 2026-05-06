"use client";

import { useRouter, usePathname } from "next/navigation";
import { Search, User, LogOut, Wallet, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect, useRef, createContext, useContext } from "react";
import { useActiveAccount, useActiveWallet } from "thirdweb/react";
import { ConnectWallet } from "./ConnectWallet";
import { ChainSwitcher } from "./ChainSwitcher";
import { useToast } from "@/hooks/use-toast";
import { useWalletInfo } from "@/hooks/useWalletInfo";
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



  const NAV_LINKS = [
    { label: "DISCOVER",  href: "/" },
    { label: "IMAGES",    href: "/showcase" },
    { label: "VIDEOS",    href: "/showcase" },
    { label: "FAVORITES", href: "/my-gallery" },
  ];

  return (
    <header style={{
      position: "fixed", top: 24, left: "50%", zIndex: 50,
      width: "calc(100% - 80px)",
      background: "rgba(255, 255, 255, 0.72)",
      backdropFilter: "blur(20px) saturate(180%)",
      WebkitBackdropFilter: "blur(20px) saturate(180%)",
      border: "1px solid rgba(255, 255, 255, 0.8)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)",
      borderRadius: 9999,
      transform: "translate(-50%, 0)",
      fontFamily: "var(--font-outfit), 'Outfit', sans-serif",
    }}>
      <div style={{ padding: "0 8px 0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>

        {/* Logo */}
        <div onClick={() => router.push("/")} style={{ display: "flex", alignItems: "center", gap: 2, cursor: "pointer", flexShrink: 0, zIndex: 2 }}>
          <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 700, fontSize: 19, color: "#111" }}>
            Enki Art
          </span>
          <span style={{ color: "#d94f3d", fontSize: 22, lineHeight: 1, marginLeft: 1 }}>·</span>
        </div>

        {/* Nav Links (Centered Absolutely) */}
        <nav style={{ display: "flex", alignItems: "center", position: "absolute", left: "50%", transform: "translateX(-50%)", zIndex: 1 }}>
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = (label === "DISCOVER" && pathname === "/") || (label === "IMAGES" && pathname === "/showcase");
            return (
              <button key={label} onClick={() => router.push(href)} style={{
                background: "none", border: "none", cursor: "pointer",
                padding: "0 16px", height: 56,
                fontSize: 12, fontWeight: isActive ? 600 : 400,
                letterSpacing: "0.5px", color: isActive ? "#111" : "#777",
                transition: "color 0.2s ease",
              }}
                onMouseEnter={e => (e.currentTarget.style.color = "#111")}
                onMouseLeave={e => (e.currentTarget.style.color = isActive ? "#111" : "#777")}
              >
                {label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0, zIndex: 2 }}>
          
          {/* Search Icon */}
          <button style={{
            width: 38, height: 38, borderRadius: "50%",
            background: "none", border: "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "#555", transition: "background 0.2s ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,0,0,0.04)")}
          onMouseLeave={e => (e.currentTarget.style.background = "none")}>
            <Search size={16} />
          </button>

          {/* Release Prompt (Solid Pill) */}
          <button onClick={() => router.push("/editor")} style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "0 20px", height: 40, background: "#111", color: "#fff",
            border: "none", borderRadius: 999, cursor: "pointer",
            fontSize: 13, fontWeight: 500, fontFamily: "inherit", whiteSpace: "nowrap",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)", transition: "transform 0.2s ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.02)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}>
            Release
          </button>

          {/* Chain Switcher */}
          {authenticated && <ChainSwitcher />}

          {/* Avatar & Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button data-testid="button-user-menu" style={{
                width: 40, height: 40, borderRadius: "50%",
                background: "#f0ede6", border: "1px solid #e0ddd5",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "#111", fontSize: 13, fontWeight: 600,
                fontFamily: "monospace", letterSpacing: "0.5px",
                marginLeft: 4
              }}>
                {authenticated && walletAddress
                  ? walletAddress.slice(2, 4).toUpperCase()
                  : <User size={16} />}
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
              <DropdownMenuSeparator />
              {/* Secondary Actions Moved Here */}
              <DropdownMenuItem onClick={() => {}}>
                <Coins className="h-4 w-4 mr-2 text-yellow-600" /> Hunt a prompt
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {}}>
                <MessageSquareHeart className="h-4 w-4 mr-2 text-blue-600" /> Earn for feedback
              </DropdownMenuItem>
              <DropdownMenuSeparator />
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
