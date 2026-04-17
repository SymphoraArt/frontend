"use client";

import { useRouter, usePathname } from "next/navigation";
import { Search, Plus, Eye, Moon, Sun, User, LogOut, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState, useEffect, useRef, createContext, useContext } from "react";
import { useTheme } from "../providers/ThemeProvider";
import { useActiveAccount, useActiveWallet } from "thirdweb/react";
import { ConnectWallet } from "./ConnectWallet";
import { ChainSwitcher } from "./ChainSwitcher";
import { Wallet, Copy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { getChainExplorerUrl } from "@/lib/thirdweb";
import { useWalletInfo } from "@/hooks/useWalletInfo";

interface NavbarProps {
  username?: string;
  onSearch?: (query: string) => void;
}

export const NavbarContext = createContext({ showNav: true });
export function useNavbarVisibility() {
  return useContext(NavbarContext);
}

// Safe wrapper for useActiveAccount that handles missing provider
function useSafeActiveAccount() {
  try {
    return useActiveAccount();
  } catch (error) {
    // Provider not available yet (SSR or initial render)
    return null;
  }
}

// Safe wrapper for useActiveWallet that handles missing provider
function useSafeActiveWallet() {
  try {
    return useActiveWallet();
  } catch (error) {
    // Provider not available yet (SSR or initial render)
    return null;
  }
}

// Safe wrapper for useWalletInfo that handles missing provider
function useSafeWalletInfo() {
  try {
    return useWalletInfo();
  } catch (error) {
    // Provider not available yet (SSR or initial render)
    return {
      address: null,
      shortAddress: null,
      type: "none" as const,
      authMethod: "unknown" as const,
      isConnected: false,
      isInAppWallet: false,
      isExternalWallet: false,
      walletId: null,
      chain: { id: null, name: null },
      security: {
        isSmartAccount: false,
        isValidWallet: false,
        isSecureConnection: false,
        warnings: [],
      },
      displayName: "Not Connected",
      icon: "🔌",
      description: "No wallet connected",
    };
  }
}

export default function Navbar({
  username = "Artist",
  onSearch,
}: NavbarProps) {
  const account = useSafeActiveAccount();
  const wallet = useSafeActiveWallet();
  const walletInfo = useSafeWalletInfo();
  const authenticated = !!account && walletInfo.isConnected;
  const router = useRouter();
  const { toast } = useToast();
  const [showNav, setShowNav] = useState(true);
  const lastScrollYRef = useRef(0);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  const walletAddress = walletInfo.address;
  const shortAddress = walletInfo.shortAddress;
  const walletDescription = walletInfo.description;

  // #region agent log
  if (typeof window !== 'undefined' && wallet && authenticated) {
    (async () => {
      try {
        let eoaAddress = null;
        try {
          const walletAccount = await wallet.getAccount();
          eoaAddress = walletAccount?.address || null;
        } catch (e) {}
        fetch('http://127.0.0.1:7245/ingest/09072fc2-e9a8-4b0b-9748-5e9d2e8abc2b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Navbar.tsx:wallet-address',message:'Navbar displaying wallet address',data:{displayedAddress:walletAddress,walletEOA:eoaAddress,walletId:wallet.id,addressesMatch:walletAddress===eoaAddress,isSmartAccount:walletAddress!==eoaAddress},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      } catch (e) {}
    })();
  }
  // #endregion

  // Copy address to clipboard
  const handleCopyAddress = async () => {
    if (!walletAddress) return;
    try {
      await navigator.clipboard.writeText(walletAddress);
      toast({
        title: "Address copied",
        description: "Wallet address copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Failed to copy address to clipboard",
        variant: "destructive",
      });
    }
  };


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollYRef.current && currentScrollY > 50) {
        setShowNav(false);
      } else if (currentScrollY < lastScrollYRef.current) {
        setShowNav(true);
      }
      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`fixed left-0 right-0 z-50 flex justify-center pt-[14px] px-[20px] transition-transform duration-300 ${showNav ? "translate-y-0" : "-translate-y-full"}`}>
      <header
        className="flex items-center justify-between w-full max-w-[1100px] h-[48px] px-3 sm:px-4 rounded-[16px] backdrop-blur-[28px] backdrop-saturate-[180%] bg-[rgba(13,22,45,0.55)] border border-[rgba(255,255,255,0.10)] hover:border-[rgba(255,255,255,0.16)] shadow-[0_4px_24px_rgba(0,0,0,0.35),0_1px_0_rgba(255,255,255,0.06)_inset] transition-all"
        style={{ WebkitBackdropFilter: "saturate(180%) blur(28px)" }}
      >
            <div className="flex items-center gap-2 sm:gap-4">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => router.push("/")}
              >
                <div className="h-[26px] w-[26px] rounded-[7px] flex items-center justify-center" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
                  <span className="text-white font-bold text-[12px]">A</span>
                </div>
                <span className="font-[600] text-[rgba(255,255,255,0.9)] text-[14px] tracking-[-0.3px] hidden sm:inline">
                  AIgency
                </span>
              </div>
              <div className="w-[1px] h-[18px] bg-[rgba(255,255,255,0.1)] mx-1 hidden sm:block"></div>

              <div className="flex gap-2">
                <button
                  className="flex items-center gap-2 px-[11px] py-[5px] rounded-[10px] transition-all duration-150"
                  style={pathname === "/showcase" ? {
                    color: "rgba(255,255,255,0.92)",
                    background: "rgba(99,102,241,0.22)",
                    boxShadow: "0 0 0 1px rgba(99,102,241,0.35)",
                    fontSize: "13px", fontWeight: 500
                  } : {
                    color: "rgba(255,255,255,0.45)",
                    fontSize: "13px", fontWeight: 500
                  }}
                  onMouseEnter={(e) => {
                    if (pathname !== "/showcase") {
                      e.currentTarget.style.color = "rgba(255,255,255,0.8)";
                      e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (pathname !== "/showcase") {
                      e.currentTarget.style.color = "rgba(255,255,255,0.45)";
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                  onClick={() => router.push("/showcase")}
                  data-testid="nav-showroom"
                >
                  <span className="hidden sm:inline">Showroom</span>
                </button>
              </div>
            </div>

            <div className="hidden md:flex flex-1 mx-4">
              <div className="w-full flex items-center h-[30px] bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] rounded-[9px] px-[10px] gap-[7px] focus-within:border-[rgba(99,102,241,0.45)] focus-within:bg-[rgba(99,102,241,0.07)] transition-all">
                <Search className="h-[13px] w-[13px] opacity-35 text-white shrink-0" />
                <input
                  type="search"
                  placeholder="Search prompts..."
                  className="w-full bg-transparent border-none outline-none text-[12.5px] text-[rgba(255,255,255,0.88)] placeholder-[rgba(255,255,255,0.25)] h-full"
                  onChange={(e) => onSearch?.(e.target.value)}
                  data-testid="input-search"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                className="flex items-center justify-center shrink-0 w-[30px] h-[30px] rounded-[8px] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.6)] hover:bg-[rgba(255,255,255,0.10)] hover:border-[rgba(255,255,255,0.14)] transition-all"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              <button className="flex items-center justify-center shrink-0 w-[30px] h-[30px] rounded-[8px] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.6)] hover:bg-[rgba(255,255,255,0.10)] hover:border-[rgba(255,255,255,0.14)] transition-all">
                <Share2 className="h-4 w-4" />
              </button>
              
              {/* Chain Switcher - Only show when wallet is connected */}
              {authenticated && <ChainSwitcher />}
              
              <div className="flex gap-2">
                {authenticated && (
                  <button
                    className="flex items-center gap-[6px] h-[30px] px-[12px] rounded-[9px] shadow-[0_2px_10px_rgba(99,102,241,0.35)] transition-all hover:scale-[1.02]"
                    style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                    onClick={() => router.push("/editor")}
                    data-testid="button-create-prompt"
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    <span className="text-white font-[600] text-[12px] hidden sm:inline">Create Prompt</span>
                  </button>
                )}

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="rounded-full rounded-full border-[1.5px] border-[rgba(255,255,255,0.18)] block shrink-0" data-testid="button-user-menu">
                      <Avatar className="h-[28px] w-[28px]">
                        <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-[12px] font-medium">
                          {authenticated ? (walletAddress ? walletAddress.slice(2, 3).toUpperCase() : "W") : <User className="h-3.5 w-3.5" />}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64">
                    {authenticated && walletInfo.isConnected && walletAddress ? (
                      <div className="px-2 py-2 space-y-2">
                        <div className="flex items-center gap-2">
                          <Wallet className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm font-medium">Wallet Connected</p>
                        </div>
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-xs text-muted-foreground">
                              {walletInfo.description}
                            </p>
                            <Badge variant="outline" className="text-xs font-mono">
                              {shortAddress}
                            </Badge>
                          </div>
                          {walletInfo.type === "in-app" && (
                            <Badge variant="secondary" className="text-xs">
                              {walletInfo.authMethod}
                            </Badge>
                          )}
                          <div className="flex items-center gap-1">
                            <code className="text-xs font-mono text-foreground/80 break-all flex-1">
                              {walletAddress}
                            </code>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 flex-shrink-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCopyAddress();
                              }}
                              title="Copy address"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="px-2 py-2">
                        <p className="text-sm font-medium">Guest</p>
                        <p className="text-xs text-muted-foreground">Log in to save your creations</p>
                      </div>
                    )}
                    <DropdownMenuSeparator />
                    {authenticated ? (
                      <>
                        <DropdownMenuItem
                          onClick={() => router.push("/my-gallery")}
                          data-testid="menu-item-my-gallery"
                        >
                          My Gallery
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => router.push("/my-prompts")}
                          data-testid="menu-item-my-prompts"
                        >
                          My Prompts
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => router.push("/my-gallery")}
                          data-testid="menu-item-creations"
                        >
                          My Creations
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => router.push("/settings")}
                          data-testid="menu-item-settings"
                        >
                          Settings
                        </DropdownMenuItem>
                        {authenticated && account && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={async () => {
                                try {
                                  if (wallet) {
                                    await wallet.disconnect();
                                  } else {
                                    // If wallet object not available, try to disconnect via account
                                    // This handles In-App Wallets that might not expose wallet.disconnect()
                                    window.location.reload();
                                  }
                                  toast({
                                    title: "Wallet disconnected",
                                    description: "You have been disconnected from your wallet",
                                  });
                                } catch (error) {
                                  // Fallback: reload page to clear state
                                  window.location.reload();
                                }
                              }}
                              className="cursor-pointer text-destructive focus:text-destructive"
                            >
                              <LogOut className="h-4 w-4 mr-2" />
                              Disconnect Wallet
                            </DropdownMenuItem>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <DropdownMenuItem
                          onClick={() => router.push("/my-gallery")}
                          data-testid="menu-item-my-gallery"
                        >
                          My Gallery
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => router.push("/my-prompts")}
                          data-testid="menu-item-my-prompts"
                        >
                          My Prompts
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => router.push("/my-gallery")}
                          data-testid="menu-item-creations"
                        >
                          My Creations
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => router.push("/settings")}
                          data-testid="menu-item-settings"
                        >
                          Settings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <div className="px-2 py-1.5">
                          <div className="w-full [&_.connect-wallet-button]:w-full [&_.connect-wallet-button]:justify-center [&_.connect-wallet-button]:min-h-9 [&_.connect-wallet-button]:text-sm">
                            <ConnectWallet />
                          </div>
                        </div>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>
        </div>
  );
}
