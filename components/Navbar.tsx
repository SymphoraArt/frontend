"use client";

import { useRouter, usePathname } from "next/navigation";
import { Search, Plus, Eye, Moon, Sun, User, LogOut, Menu } from "lucide-react";
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
import { useActiveAccount, useActiveWallet } from "thirdweb/react";
import { ConnectWallet } from "./ConnectWallet";
import { ChainSwitcher } from "./ChainSwitcher";
import { Wallet, Copy, LayoutDashboard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { getChainExplorerUrl } from "@/lib/thirdweb";
import { useWalletInfo } from "@/hooks/useWalletInfo";
import { saveUserThemePreference } from "@/lib/theme-settings";

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
  const [walletResolved, setWalletResolved] = useState(false);
  // Give Thirdweb time to restore session from storage/extension so we don't show "Guest" then flip to connected on first click
  useEffect(() => {
    const t = setTimeout(() => setWalletResolved(true), 400);
    return () => clearTimeout(t);
  }, []);
  const authenticated = !!account && walletInfo.isConnected;
  const router = useRouter();
  const { toast } = useToast();
  const [showNav, setShowNav] = useState(true);
  const lastScrollYRef = useRef(0);
  const themeTransitionTimeoutRef = useRef<number | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const themeSyncedFromStorage = useRef(false);
  const pathname = usePathname();
  const [mobileLogoFailed, setMobileLogoFailed] = useState(false);
  const [desktopLogoFailed, setDesktopLogoFailed] = useState(false);

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

  // Sync theme from localStorage on mount so we don't flash light when navigating (e.g. to generator)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("theme");
    const initial = stored === "light" || stored === "dark" ? stored : "light";
    setTheme(initial);
    themeSyncedFromStorage.current = true;
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  // When a wallet/account is available, try to sync theme from user settings
  useEffect(() => {
    const address = account?.address;
    if (!address) return;

    (async () => {
      try {
        const res = await fetch(`/api/users/${address}/settings`, {
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) return;
        const data = await res.json();
        const settings = data?.settings as { theme?: "light" | "dark" } | undefined;
        if (settings?.theme === "light" || settings?.theme === "dark") {
          setTheme(settings.theme);
          if (typeof window !== "undefined") {
            localStorage.setItem("theme", settings.theme);
          }
        }
      } catch (error) {
        console.error("Failed to sync theme from settings", error);
      }
    })();
  }, [account?.address]);

  useEffect(() => {
    if (!themeSyncedFromStorage.current) return;

    const root = document.documentElement;
    root.classList.add("theme-transition");
    if (themeTransitionTimeoutRef.current) {
      window.clearTimeout(themeTransitionTimeoutRef.current);
    }

    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);

    themeTransitionTimeoutRef.current = window.setTimeout(() => {
      root.classList.remove("theme-transition");
      themeTransitionTimeoutRef.current = null;
    }, 320);

    return () => {
      if (themeTransitionTimeoutRef.current) {
        window.clearTimeout(themeTransitionTimeoutRef.current);
        themeTransitionTimeoutRef.current = null;
      }
      root.classList.remove("theme-transition");
    };
  }, [theme]);

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70 transition-transform duration-300 ${
        showNav ? "translate-y-0" : "-translate-y-24"
      }`}
    >
      <div className="w-full px-2 sm:px-3 lg:px-8 max-w-full min-w-0">
        <div className="w-full min-w-0">
          <div className="flex h-11 sm:h-12 md:h-14 items-center justify-between gap-1 sm:gap-2 md:gap-3 min-h-0">
            <div className="flex items-center gap-1 sm:gap-2 md:gap-4 min-w-0 shrink">
              <div
                role="button"
                tabIndex={0}
                className="flex items-center gap-1.5 sm:gap-2 rounded-md px-1.5 sm:px-2 py-1.5 sm:py-2 shrink-0 cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                onClick={() => router.push("/")}
                onKeyDown={(e) => e.key === "Enter" && router.push("/")}
              >
                <div className="h-5 w-5 rounded-md bg-primary/10 flex items-center justify-center shrink-0 sm:hidden">
                  {!mobileLogoFailed ? (
                    <img
                      src="/enki-art-logo.png"
                      alt="Enki Art logo"
                      className="h-full w-full object-contain p-0.5"
                      onError={() => setMobileLogoFailed(true)}
                    />
                  ) : (
                    <span className="text-primary font-semibold text-[10px] sm:text-xs">E</span>
                  )}
                </div>
                <div className="hidden sm:flex h-6 md:h-7 items-center">
                  {!desktopLogoFailed ? (
                    <img
                      src="/enki-art-logo_full.png"
                      alt="Enki Art"
                      className="h-full w-auto object-contain"
                      onError={() => setDesktopLogoFailed(true)}
                    />
                  ) : (
                    <span className="font-semibold text-foreground text-sm truncate">
                      Enki Art
                    </span>
                  )}
                </div>
              </div>

              {/* Desktop-Navigation */}
              <div className="hidden md:flex gap-0.5 sm:gap-1 md:gap-2 min-w-0">
                <Button
                  variant={pathname === "/" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => router.push("/")}
                  className="gap-1 sm:gap-2 h-8 sm:h-9 px-2 sm:px-3 text-xs"
                  data-testid="nav-marketplace"
                >
                  <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                  <span className="hidden sm:inline truncate">Marketplace</span>
                </Button>
                <Button
                  variant={pathname === "/showcase" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => router.push("/showcase")}
                  className="gap-1 sm:gap-2 h-8 sm:h-9 px-2 sm:px-3 text-xs"
                  data-testid="nav-showroom"
                >
                  <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                  <span className="hidden sm:inline truncate">Showroom</span>
                </Button>
                <Button
                  variant={pathname === "/workspace" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => router.push("/workspace")}
                  className="gap-1 sm:gap-2 h-8 sm:h-9 px-2 sm:px-3 text-xs"
                  data-testid="nav-workspace"
                >
                  <LayoutDashboard className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                  <span className="hidden sm:inline truncate">My Workspace</span>
                </Button>
              </div>

              {/* Mobile/Tablet: Burger-Menü */}
              <div className="md:hidden flex items-center">
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      aria-label="Navigation menu"
                    >
                      <Menu className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem
                      onClick={() => router.push("/")}
                      data-testid="nav-marketplace-dropdown"
                    >
                      Marketplace
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => router.push("/showcase")}
                      data-testid="nav-showroom-dropdown"
                    >
                      Showroom
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => router.push("/workspace")}
                      data-testid="nav-workspace-dropdown"
                    >
                      My Workspace
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="hidden lg:flex flex-1 max-w-md xl:max-w-xl min-w-0 shrink">
              <div className="relative w-full min-w-0">
                <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 -translate-y-1/2 text-muted-foreground shrink-0" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-7 sm:pl-9 w-full h-8 sm:h-9 text-sm"
                  onChange={(e) => onSearch?.(e.target.value)}
                  data-testid="input-search"
                />
              </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 min-w-0">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 sm:h-9 sm:w-9 shrink-0"
                onClick={async () => {
                  const nextTheme = theme === "dark" ? "light" : "dark";
                  setTheme(nextTheme);
                  // Best-effort persistence for authenticated users
                  await saveUserThemePreference(account?.address ?? walletAddress ?? null, nextTheme);
                }}
                aria-label="Toggle theme"
                data-testid="button-theme-toggle"
              >
                {theme === "dark" ? (
                  <Sun className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                ) : (
                  <Moon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                )}
              </Button>

              {/* Chain Switcher - show when wallet is connected; hide until wallet state resolved to avoid flash */}
              {walletResolved && authenticated && (
                <div className="shrink min-w-0 max-w-[140px] sm:max-w-[180px]">
                  <ChainSwitcher />
                </div>
              )}

              <div className="flex items-center gap-1 sm:gap-2">
                <Button
                  variant="default"
                  size="sm"
                  className="gap-1 sm:gap-1.5 h-8 sm:h-9 px-2 sm:px-3 text-xs shrink-0"
                  onClick={() => router.push("/editor")}
                  data-testid="button-create-prompt"
                >
                  <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                  <span className="hidden sm:inline">Create Prompt</span>
                </Button>

                {/* User Menu - always visible, never shrink */}
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <button className="rounded-full shrink-0" data-testid="button-user-menu">
                      <Avatar className="h-8 w-8 sm:h-9 sm:w-9 shrink-0">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs sm:text-sm">
                          {!walletResolved ? (
                            <User className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          ) : authenticated ? (
                            walletAddress ? walletAddress.slice(2, 3).toUpperCase() : "W"
                          ) : (
                            <User className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          )}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64">
                    {!walletResolved ? (
                      <div className="px-2 py-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        Checking connection…
                      </div>
                    ) : authenticated && walletInfo.isConnected && walletAddress ? (
                      <div className="px-2 py-2 space-y-2">
                        <div className="flex items-center gap-2">
                          <Wallet className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm font-medium">Wallet Connected</p>
                        </div>
                        <div className="space-y-1.5">
                          <p className="text-xs text-muted-foreground">
                            {walletInfo.description}
                          </p>
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
                    {!walletResolved ? null : authenticated ? (
                      <>
                        <DropdownMenuItem
                          onClick={() => walletAddress && router.push(`/profile/${encodeURIComponent(walletAddress)}`)}
                          data-testid="menu-item-my-gallery"
                        >
                          My Gallery
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
          </div>
        </div>
      </div>
    </header>
  );
}
