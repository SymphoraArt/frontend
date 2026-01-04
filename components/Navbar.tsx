"use client";

import { useRouter, usePathname } from "next/navigation";
import { Search, Plus, Eye, Moon, Sun, User } from "lucide-react";
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
import { usePrivy } from "@privy-io/react-auth";
import { Flex } from "@radix-ui/themes";

interface NavbarProps {
  credits?: number;
  username?: string;
  onSearch?: (query: string) => void;
}

export const NavbarContext = createContext({ showNav: true });
export function useNavbarVisibility() {
  return useContext(NavbarContext);
}

export default function Navbar({
  credits = 125,
  username = "Artist",
  onSearch,
}: NavbarProps) {
  const { ready, authenticated, user, login, logout } = usePrivy();
  const disableLogin = !ready || (ready && authenticated);
  const router = useRouter();
  const [authDialog, setAuthDialog] = useState<null | "login">(null);
  const [authEmail, setAuthEmail] = useState("");
  const [showNav, setShowNav] = useState(true);
  const lastScrollYRef = useRef(0);
  const themeTransitionTimeoutRef = useRef<number | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const pathname = usePathname();

  const email = user?.email?.address;
  const walletAddress = user?.wallet?.address;
  const googleAccount = user?.google;

  const displayEmail =
    email || googleAccount?.email || (walletAddress ? `${walletAddress.slice(0, 6)}…${walletAddress.slice(-4)}` : null);
  const privyName = (user as any)?.name;
  const displayName =
    (typeof privyName === "string" && privyName) ||
    (typeof googleAccount?.name === "string" && googleAccount.name) ||
    (displayEmail ? displayEmail.split("@")[0] : username);

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

              <Flex gap="2">
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
              </Flex>
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

            <Flex align="center" gap="2">
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
              <Flex gap="2">
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

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="rounded-full" data-testid="button-user-menu">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {authenticated ? displayName.charAt(0) : <User className="h-4 w-4" />}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64">
                    <div className="px-2 py-2">
                      <p className="text-sm font-medium">
                        {authenticated ? displayName : "Guest"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {authenticated ? displayEmail || "" : "Log in to save your creations"}
                      </p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => router.push("/my-gallery")}
                      disabled={!authenticated}
                      data-testid="menu-item-my-gallery"
                    >
                      My Gallery
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => router.push("/my-prompts")}
                      disabled={!authenticated}
                      data-testid="menu-item-my-prompts"
                    >
                      My Prompts
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => router.push("/my-gallery")}
                      disabled={!authenticated}
                      data-testid="menu-item-creations"
                    >
                      My Creations
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => router.push("/settings")}
                      disabled={!authenticated}
                      data-testid="menu-item-settings"
                    >
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {!authenticated ? (
                      <DropdownMenuItem
                        onClick={login}
                        disabled={disableLogin}
                        data-testid="menu-item-login"
                      >
                        Log in
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem
                        data-testid="menu-item-logout"
                        onClick={logout}
                      >
                        Logout
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </Flex>
            </Flex>
          </div>
        </div>
      </div>
    </header>
  );
}
