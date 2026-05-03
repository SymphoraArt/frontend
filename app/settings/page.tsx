"use client";

import { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import { ConnectWallet } from "@/components/ConnectWallet";
import { useToast } from "@/hooks/use-toast";
import { saveUserThemePreference } from "@/lib/theme-settings";

interface UserSettings {
  displayName?: string;
  showWalletInProfile?: boolean;
  showEarningsPublicly?: boolean;
  theme?: "light" | "dark";
  defaultAspectRatio?: string;
  defaultResolution?: string;
  minimumPrice?: string;
  allowAnalytics?: boolean;
  salesNotifications?: boolean;
}

export default function SettingsPage() {
  const account = useActiveAccount();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<Required<UserSettings>>({
    displayName: "",
    showWalletInProfile: true,
    showEarningsPublicly: false,
    theme: "light",
    defaultAspectRatio: "1:1",
    defaultResolution: "2K",
    minimumPrice: "0.10",
    allowAnalytics: true,
    salesNotifications: true,
  });

  useEffect(() => {
    const address = account?.address;
    if (!address) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      return;
    }

    let cancelled = false;
    async function loadSettings() {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/${address}/settings`, {
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) return;
        const data = await response.json();
        const incoming = (data.settings || {}) as UserSettings;
        if (!cancelled) {
          setSettings((current) => ({ ...current, ...incoming }));
        }
      } catch {
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadSettings();
    return () => {
      cancelled = true;
    };
  }, [account?.address]);

  const update = <K extends keyof Required<UserSettings>>(key: K, value: Required<UserSettings>[K]) => {
    setSettings((current) => ({ ...current, [key]: value }));
  };

  const save = async () => {
    if (!account?.address) return;
    setSaving(true);
    try {
      localStorage.setItem("theme", settings.theme);
      document.documentElement.classList.toggle("dark", settings.theme === "dark");
      await saveUserThemePreference(account.address, settings.theme);
      const response = await fetch(`/api/users/${account.address}/settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      });
      if (!response.ok) throw new Error("Failed to save settings");
      toast({ title: "Settings saved", description: "Your Enki preferences are synced." });
    } catch (error) {
      toast({
        title: "Settings not saved",
        description: error instanceof Error ? error.message : "Try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (!account) {
    return (
      <>
        <div className="enki-page-title">
          <div className="enki-page-eyebrow">Account / settings</div>
          <h1 className="enki-page-h1 serif"><em>Connect</em><br />to manage Enki.</h1>
        </div>
        <div className="enki-settings">
          <div className="enki-settings-row">
            <div>
              <div className="enki-settings-title serif">Wallet required</div>
              <div className="enki-settings-meta mono">Settings are stored against your connected wallet.</div>
            </div>
            <ConnectWallet />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="enki-page-title">
        <div className="enki-page-eyebrow">Account / settings</div>
        <h1 className="enki-page-h1 serif"><em>Settings</em><br />for your studio.</h1>
      </div>
      <div className="enki-settings">
        <label className="enki-settings-row">
          <div>
            <div className="enki-settings-title serif">Display name</div>
            <div className="enki-settings-meta mono">{account.address.slice(0, 6)}...{account.address.slice(-4)}</div>
          </div>
          <input className="enki-settings-input" value={settings.displayName} onChange={(event) => update("displayName", event.target.value)} placeholder="Creator name" />
        </label>
        <label className="enki-settings-row">
          <div>
            <div className="enki-settings-title serif">Theme</div>
            <div className="enki-settings-meta mono">Synced to backend settings</div>
          </div>
          <select className="enki-settings-input" value={settings.theme} onChange={(event) => update("theme", event.target.value as "light" | "dark")}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
        <label className="enki-settings-row">
          <div>
            <div className="enki-settings-title serif">Default aspect</div>
            <div className="enki-settings-meta mono">Used by release and generate flows</div>
          </div>
          <select className="enki-settings-input" value={settings.defaultAspectRatio} onChange={(event) => update("defaultAspectRatio", event.target.value)}>
            {["1:1", "3:4", "4:5", "16:9", "9:16"].map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label className="enki-settings-row">
          <div>
            <div className="enki-settings-title serif">Minimum price</div>
            <div className="enki-settings-meta mono">Marketplace default in USD</div>
          </div>
          <input className="enki-settings-input" value={settings.minimumPrice} onChange={(event) => update("minimumPrice", event.target.value)} />
        </label>
        {[
          ["showWalletInProfile", "Show wallet in profile", "Display public wallet identity"],
          ["showEarningsPublicly", "Show earnings publicly", "Expose creator stats on profile"],
          ["allowAnalytics", "Allow analytics", "Help improve prompt performance"],
          ["salesNotifications", "Sales notifications", "Notify when a prompt sells"],
        ].map(([key, title, meta]) => (
          <label key={key} className="enki-settings-row">
            <div>
              <div className="enki-settings-title serif">{title}</div>
              <div className="enki-settings-meta mono">{meta}</div>
            </div>
            <input
              type="checkbox"
              checked={Boolean(settings[key as keyof Required<UserSettings>])}
              onChange={(event) => update(key as keyof Required<UserSettings>, event.target.checked as never)}
            />
          </label>
        ))}
        <div className="enki-settings-row">
          <div>
            <div className="enki-settings-title serif">{loading ? "Loading" : "Save changes"}</div>
            <div className="enki-settings-meta mono">Backend endpoint: /api/users/[wallet]/settings</div>
          </div>
          <button className="enki-btn" onClick={save} disabled={saving || loading} type="button">
            {saving ? "Saving..." : "Save settings"}
          </button>
        </div>
      </div>
    </>
  );
}
