"use client";

import { useRouter, usePathname } from "next/navigation";
import { Search, Plus, Eye, Moon, Sun, User, LogOut } from "lucide-react";
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

export default function Navbar({
  username = "Artist",
  onSearch,
}: NavbarProps) {
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  const walletInfo = useWalletInfo();
  const authenticated = !!account && walletInfo.isConnected;
  const router = useRouter();
  const { toast } = useToast();
  const [showNav, setShowNav] = useState(true);
  const lastScrollYRef = useRef(0);
  const themeTransitionTimeoutRef = useRef<number | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
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
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
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
      <div className="w-full px-3 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex h-14 items-center justify-between gap-2 sm:gap-3">
            <div className="flex items-center gap-2 sm:gap-4">
              <div
                className="flex items-center gap-2 rounded-md px-2 py-2"
                onClick={() => router.push("/")}
              >
                <div className="h-7 w-7 rounded-md bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-semibold text-xs">A</span>
                </div>
                <span className="font-semibold text-foreground hidden sm:inline">
                  AIgency
                </span>
              </div>

              <div className="flex gap-2">
                <Button
                  variant={pathname === "/showcase" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => router.push("/showcase")}
                  className="gap-2"
                  data-testid="nav-showroom"
                >
                  <Eye className="h-4 w-4" />
                  <span className="hidden sm:inline">Showroom</span>
                </Button>
              </div>
            </div>

            <div className="hidden md:flex flex-1 max-w-md lg:max-w-xl">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search prompts..."
                  className="pl-9 w-full"
                  onChange={(e) => onSearch?.(e.target.value)}
                  data-testid="input-search"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
                data-testid="button-theme-toggle"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
              
              {/* Chain Switcher - Only show when wallet is connected */}
              {authenticated && <ChainSwitcher />}
              
              <div className="flex gap-2">
                {authenticated && (
                  <Button
                    variant="default"
                    size="sm"
                    className="gap-1.5"
                    onClick={() => router.push("/editor")}
                    data-testid="button-create-prompt"
                  >
                    <Plus className="h-4 w-4" />
                    <span className="hidden sm:inline">Create Prompt</span>
                  </Button>
                )}

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="rounded-full" data-testid="button-user-menu">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {authenticated ? (walletAddress ? walletAddress.slice(2, 3).toUpperCase() : "W") : <User className="h-4 w-4" />}
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
          </div>
        </div>
      </div>
    </header>
  );
}
