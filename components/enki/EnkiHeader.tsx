"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, Check, Heart, Home, Image as ImageIcon, Plus, Search, User, Video } from "lucide-react";
import { useMemo, useState } from "react";
import { useActiveAccount, useActiveWallet } from "thirdweb/react";
import { ConnectWallet } from "@/components/ConnectWallet";
import { ChainSwitcher } from "@/components/ChainSwitcher";
import { getUserKeyFromAccount } from "@/lib/creations";

const networks = [
  { name: "Base", token: "USDC", balance: "linked", color: "#0052ff" },
  { name: "Solana", token: "USDC", balance: "linked", color: "#14f195" },
  { name: "Polygon", token: "USDC", balance: "linked", color: "#8247e5" },
];

function activeFromPath(pathname: string | null) {
  if (!pathname || pathname === "/") return "home";
  if (pathname.startsWith("/images")) return "images";
  if (pathname.startsWith("/videos")) return "videos";
  if (pathname.startsWith("/favorites")) return "favorites";
  if (pathname.startsWith("/profile")) return "profile";
  if (pathname.startsWith("/release") || pathname.startsWith("/editor")) return "release";
  return pathname.split("/")[1] || "home";
}

export default function EnkiHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const active = activeFromPath(pathname);
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  const userKey = useMemo(() => getUserKeyFromAccount(account), [account]);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeNet, setActiveNet] = useState("Base");
  const [search, setSearch] = useState("");
  const connected = Boolean(account?.address);
  const initials = connected ? account!.address.slice(2, 4).toUpperCase() : "SM";
  const profileHref = userKey ? `/profile/${encodeURIComponent(userKey)}` : "/my-gallery";

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <>
      <header className="enki-header">
        <div className="enki-mobile-topline mono">Gallery + prompt marketplace</div>
        <div className="enki-logo-nav-group">
          <Link href="/" className="enki-logo serif" aria-label="Enki home">Enki Art</Link>
          <nav className="enki-nav" aria-label="Primary">
            <Link href="/" className={active === "home" ? "active" : ""}>Discover</Link>
            <Link href="/images" className={active === "images" ? "active" : ""}>Images</Link>
            <Link href="/videos" className={active === "videos" ? "active" : ""}>Videos</Link>
            <Link href="/favorites" className={active === "favorites" ? "active" : ""}>Favorites</Link>
          </nav>
        </div>
        <div 
          className="enki-search" 
          role="search" 
          onClick={(e) => {
            const input = e.currentTarget.querySelector('input');
            if (input) input.focus();
          }}
        >
          <span className="enki-search-icon"><Search size={16} /></span>
          <input
            aria-label="Search prompts"
            placeholder="Search prompts, tags, artists..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onKeyDown={handleSearch}
          />
          <span className="mono enki-search-kbd">Ctrl K</span>
        </div>
        <div className="enki-header-actions">
          <Link href="/release" className={`enki-release-cta${active === "release" ? " active" : ""}`} title="Release a new prompt template">
            <Plus size={15} strokeWidth={2} />
            <span>Release prompt</span>
          </Link>
          <button className="enki-icon-btn" title="Notifications" type="button"><Bell size={14} /></button>
          <div style={{ position: "relative" }}>
            <button className="enki-avatar" onClick={() => setProfileOpen((open) => !open)} type="button">
              {initials}
            </button>
            {profileOpen && (
              <div className="enki-dropdown" onClick={(event) => event.stopPropagation()}>
                <div className="enki-dropdown-header">
                  <div className="enki-avatar" style={{ width: 40, height: 40, fontSize: 14 }}>{initials}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{connected ? "Wallet connected" : "Guest"}</div>
                    <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)" }}>
                      {connected ? `${account!.address.slice(0, 6)}...${account!.address.slice(-4)}` : "Connect to generate"}
                    </div>
                  </div>
                </div>
                <div className="enki-dropdown-section">
                  <div className="enki-dropdown-label">Pay with</div>
                  <div style={{ marginBottom: 10 }}>
                    <ChainSwitcher />
                  </div>
                  {networks.map((network) => (
                    <button
                      key={network.name}
                      className={`enki-network-item${activeNet === network.name ? " active" : ""}`}
                      onClick={() => setActiveNet(network.name)}
                      type="button"
                      style={{ width: "100%" }}
                    >
                      <div className="enki-network-name">
                        <div className="enki-network-dot" style={{ background: network.color }} />
                        <div>
                          <div style={{ fontSize: 13, color: "var(--ink)" }}>{network.name}</div>
                          <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)" }}>{network.token} / {network.balance}</div>
                        </div>
                      </div>
                      {activeNet === network.name && <Check size={12} />}
                    </button>
                  ))}
                </div>
                <div className="enki-dropdown-section">
                  {!connected && <div style={{ marginBottom: 12 }}><ConnectWallet /></div>}
                  <Link href={profileHref} className="enki-dropdown-link" onClick={() => setProfileOpen(false)}>My profile</Link>
                  <Link href="/favorites" className="enki-dropdown-link" onClick={() => setProfileOpen(false)}>Favorites</Link>
                  <Link href="/released" className="enki-dropdown-link" onClick={() => setProfileOpen(false)}>Released prompts</Link>
                  <Link href="/earnings" className="enki-dropdown-link" onClick={() => setProfileOpen(false)}>Earnings</Link>
                  <Link href="/settings" className="enki-dropdown-link" onClick={() => setProfileOpen(false)}>Settings</Link>
                  {connected && (
                    <button
                      className="enki-dropdown-link"
                      type="button"
                      onClick={async () => {
                        await wallet?.disconnect();
                        setProfileOpen(false);
                      }}
                      style={{ width: "100%", border: 0, background: "transparent", textAlign: "left", color: "var(--ink-3)" }}
                    >
                      Sign out
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      <nav className="enki-mobile-nav" aria-label="Mobile navigation">
        <Link href="/" className={active === "home" ? "active" : ""}><Home size={17} /><span>Home</span></Link>
        <Link href="/images" className={active === "images" ? "active" : ""}><ImageIcon size={17} /><span>Images</span></Link>
        <Link href="/videos" className={active === "videos" ? "active" : ""}><Video size={17} /><span>Video</span></Link>
        <Link href="/favorites" className={active === "favorites" ? "active" : ""}><Heart size={17} /><span>Saved</span></Link>
        <Link href={profileHref} className={active === "profile" ? "active" : ""}><User size={17} /><span>Profile</span></Link>
      </nav>
    </>
  );
}
