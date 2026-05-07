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
import { useTheme } from "../providers/ThemeProvider";
import { useActiveAccount, useActiveWallet } from "thirdweb/react";
import { ChainSwitcher } from "./ChainSwitcher";
import { WalletPickerModal } from "./WalletPickerModal";
import { Wallet, Copy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { getChainExplorerUrl } from "@/lib/thirdweb";
import { useWalletInfo } from "@/hooks/useWalletInfo";
import { useSolanaAuth } from "@/hooks/useSolanaAuth";
import { useWallet } from "@solana/wallet-adapter-react";

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
  const [showWalletPicker, setShowWalletPicker] = useState(false);
  const { connected: solanaConnected, publicKey: solanaPublicKey, disconnect: solanaDisconnect } = useWallet();
  const { isAuthenticated: solanaAuthenticated, authenticate: solanaAuthenticate, isLoading: solanaAuthLoading, logout: solanaLogout } = useSolanaAuth();
  const solanaAuthTriedRef = useRef(false);

  // Authenticated if EVM wallet connected OR Solana wallet authenticated
  const evmAuthenticated = !!account && walletInfo.isConnected;
  const authenticated = evmAuthenticated || solanaAuthenticated;

  const router = useRouter();
  const { toast } = useToast();
  const [showNav, setShowNav] = useState(true);
  const [mounted, setMounted] = useState(false);
  const lastScrollYRef = useRef(0);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  // Use Solana address when EVM not connected
  const walletAddress = walletInfo.address ?? (solanaAuthenticated ? solanaPublicKey?.toBase58() ?? null : null);
  const shortAddress = walletAddress ? `${walletAddress.slice(0, 4)}…${walletAddress.slice(-4)}` : null;
  const walletDescription = walletInfo.address ? walletInfo.description : solanaAuthenticated ? "Solana Wallet" : "No wallet connected";

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


  useEffect(() => { setMounted(true); }, []);

  // Auto-authenticate after Solana wallet connects (triggers sign message popup)
  useEffect(() => {
    if (solanaConnected && !solanaAuthenticated && !solanaAuthLoading && !solanaAuthTriedRef.current) {
      solanaAuthTriedRef.current = true;
      solanaAuthenticate();
    }
    if (!solanaConnected) {
      solanaAuthTriedRef.current = false;
    }
  }, [solanaConnected, solanaAuthenticated, solanaAuthLoading, solanaAuthenticate]);

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
    <>
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
                onClick={toggleTheme}
                aria-label="Toggle theme"
                data-testid="button-theme-toggle"
              >
                {mounted && theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
              
              {/* Chain Switcher - Only show when EVM wallet is connected */}
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
                    {authenticated && walletAddress ? (
                      <div className="px-2 py-2 space-y-2">
                        <div className="flex items-center gap-2">
                          <Wallet className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm font-medium">Wallet Connected</p>
                        </div>
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-xs text-muted-foreground">
                              {walletDescription}
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
                        {authenticated && (evmAuthenticated ? account : solanaAuthenticated) && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={async () => {
                                try {
                                  if (solanaAuthenticated) {
                                    await solanaLogout();
                                    await solanaDisconnect();
                                  } else if (wallet) {
                                    await wallet.disconnect();
                                  } else {
                                    window.location.reload();
                                  }
                                  toast({
                                    title: "Wallet disconnected",
                                    description: "You have been disconnected from your wallet",
                                  });
                                } catch (error) {
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
                          <Button
                            className="w-full"
                            size="sm"
                            onClick={() => setShowWalletPicker(true)}
                          >
                            Connect Wallet
                          </Button>
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

    <WalletPickerModal
      open={showWalletPicker}
      onClose={() => setShowWalletPicker(false)}
    />
    </>
  );
}
