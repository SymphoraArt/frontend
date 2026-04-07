 "use client";

import { useState, useEffect } from "react";
import { useActiveAccount } from "thirdweb/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ConnectWallet } from "@/components/ConnectWallet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Shield,
  Save,
  DollarSign,
} from "lucide-react";
import { saveUserThemePreference } from "@/lib/theme-settings";

interface UserSettings {
  displayName?: string;
  showWalletInProfile?: boolean;
  showEarningsPublicly?: boolean;
  theme?: "light" | "dark";
  defaultModel?: string;
  defaultAspectRatio?: string;
  defaultResolution?: string;
  defaultLicense?: string;
  autoListPrompts?: boolean;
  minimumPrice?: string;
  showPurchaseHistory?: boolean;
  showCreatedPrompts?: boolean;
  allowAnalytics?: boolean;
  salesNotifications?: boolean;
  purchaseNotifications?: boolean;
}

export default function SettingsPage() {
  const account = useActiveAccount();
  const authenticated = !!account;
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [displayName, setDisplayName] = useState("");
  const [showWalletInProfile, setShowWalletInProfile] = useState(true);
  const [showEarningsPublicly, setShowEarningsPublicly] = useState(false);
  const [defaultModel, setDefaultModel] = useState("gemini-2.0-flash-exp");
  const [defaultAspectRatio, setDefaultAspectRatio] = useState("1:1");
  const [defaultResolution, setDefaultResolution] = useState("1024x1024");
  const [defaultLicense, setDefaultLicense] = useState("personal");
  const [autoListPrompts, setAutoListPrompts] = useState(false);
  const [minimumPrice, setMinimumPrice] = useState("5.00");
  const [showPurchaseHistory, setShowPurchaseHistory] = useState(false);
  const [showCreatedPrompts, setShowCreatedPrompts] = useState(true);
  const [allowAnalytics, setAllowAnalytics] = useState(true);
  const [salesNotifications, setSalesNotifications] = useState(true);
  const [purchaseNotifications, setPurchaseNotifications] = useState(true);

  // Load settings from API when wallet is connected
  useEffect(() => {
    const address = account?.address;
    if (!address) {
      setLoading(false);
      // Fallback to localStorage for theme
      if (typeof window !== "undefined") {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme === "light" || storedTheme === "dark") setTheme(storedTheme);
      }
      return;
    }

    async function loadSettings() {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/${address}/settings`, {
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const data = await response.json();
          const settings: UserSettings = data.settings || {};

          // Apply settings from API
          if (settings.displayName !== undefined) setDisplayName(settings.displayName);
          if (settings.showWalletInProfile !== undefined) setShowWalletInProfile(settings.showWalletInProfile);
          if (settings.showEarningsPublicly !== undefined) setShowEarningsPublicly(settings.showEarningsPublicly);
          if (settings.theme === "light" || settings.theme === "dark") {
            setTheme(settings.theme);
            const root = document.documentElement;
            if (settings.theme === "dark") root.classList.add("dark");
            else root.classList.remove("dark");
            if (typeof window !== "undefined") {
              localStorage.setItem("theme", settings.theme);
            }
          }
          if (settings.defaultModel) setDefaultModel(settings.defaultModel);
          if (settings.defaultAspectRatio) setDefaultAspectRatio(settings.defaultAspectRatio);
          if (settings.defaultResolution) setDefaultResolution(settings.defaultResolution);
          if (settings.defaultLicense) setDefaultLicense(settings.defaultLicense);
          if (settings.autoListPrompts !== undefined) setAutoListPrompts(settings.autoListPrompts);
          if (settings.minimumPrice) setMinimumPrice(settings.minimumPrice);
          if (settings.showPurchaseHistory !== undefined) setShowPurchaseHistory(settings.showPurchaseHistory);
          if (settings.showCreatedPrompts !== undefined) setShowCreatedPrompts(settings.showCreatedPrompts);
          if (settings.allowAnalytics !== undefined) setAllowAnalytics(settings.allowAnalytics);
          if (settings.salesNotifications !== undefined) setSalesNotifications(settings.salesNotifications);
          if (settings.purchaseNotifications !== undefined) setPurchaseNotifications(settings.purchaseNotifications);
        } else {
          // Fallback to localStorage if API fails
          loadFromLocalStorage();
        }
      } catch (error) {
        console.error("Error loading settings:", error);
        // Fallback to localStorage
        loadFromLocalStorage();
      } finally {
        setLoading(false);
      }
    }

    function loadFromLocalStorage() {
      if (typeof window === "undefined") return;
      const storedDisplayName = localStorage.getItem("displayName");
      if (storedDisplayName) setDisplayName(storedDisplayName);
      const storedShowWallet = localStorage.getItem("showWalletInProfile");
      if (storedShowWallet !== null) setShowWalletInProfile(storedShowWallet === "true");
      const storedShowEarnings = localStorage.getItem("showEarningsPublicly");
      if (storedShowEarnings !== null) setShowEarningsPublicly(storedShowEarnings === "true");
      const storedModel = localStorage.getItem("defaultModel");
      if (storedModel) setDefaultModel(storedModel);
      const storedAspectRatio = localStorage.getItem("defaultAspectRatio");
      if (storedAspectRatio) setDefaultAspectRatio(storedAspectRatio);
      const storedResolution = localStorage.getItem("defaultResolution");
      if (storedResolution) setDefaultResolution(storedResolution);
      const storedLicense = localStorage.getItem("defaultLicense");
      if (storedLicense) setDefaultLicense(storedLicense);
      const storedAutoList = localStorage.getItem("autoListPrompts");
      if (storedAutoList !== null) setAutoListPrompts(storedAutoList === "true");
      const storedMinPrice = localStorage.getItem("minimumPrice");
      if (storedMinPrice) setMinimumPrice(storedMinPrice);
      const storedShowPurchases = localStorage.getItem("showPurchaseHistory");
      if (storedShowPurchases !== null) setShowPurchaseHistory(storedShowPurchases === "true");
      const storedShowCreated = localStorage.getItem("showCreatedPrompts");
      if (storedShowCreated !== null) setShowCreatedPrompts(storedShowCreated === "true");
      const storedAllowAnalytics = localStorage.getItem("allowAnalytics");
      if (storedAllowAnalytics !== null) setAllowAnalytics(storedAllowAnalytics === "true");
      const storedSales = localStorage.getItem("salesNotifications");
      if (storedSales !== null) setSalesNotifications(storedSales === "true");
      const storedPurchase = localStorage.getItem("purchaseNotifications");
      if (storedPurchase !== null) setPurchaseNotifications(storedPurchase === "true");
    }

    loadSettings();
  }, [account?.address]);

  // Load theme from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme);
      const root = document.documentElement;
      if (storedTheme === "dark") root.classList.add("dark");
      else root.classList.remove("dark");
    }
  }, []);

  const handleThemeChange = async (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    const root = document.documentElement;
    if (newTheme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");

    // Persist theme preference for authenticated users
    await saveUserThemePreference(account?.address, newTheme);

    toast({ title: "Theme updated", description: `Switched to ${newTheme} mode` });
  };

  const handleSaveSettings = async () => {
    if (!account?.address) {
      toast({
        title: "Error",
        description: "Please connect your wallet to save settings",
        variant: "destructive",
      });
      return;
    }

    try {
      setSaving(true);

      // Save to localStorage as backup
      localStorage.setItem("displayName", displayName);
      localStorage.setItem("showWalletInProfile", showWalletInProfile.toString());
      localStorage.setItem("showEarningsPublicly", showEarningsPublicly.toString());
      localStorage.setItem("defaultModel", defaultModel);
      localStorage.setItem("defaultAspectRatio", defaultAspectRatio);
      localStorage.setItem("defaultResolution", defaultResolution);
      localStorage.setItem("defaultLicense", defaultLicense);
      localStorage.setItem("autoListPrompts", autoListPrompts.toString());
      localStorage.setItem("minimumPrice", minimumPrice);
      localStorage.setItem("showPurchaseHistory", showPurchaseHistory.toString());
      localStorage.setItem("showCreatedPrompts", showCreatedPrompts.toString());
      localStorage.setItem("allowAnalytics", allowAnalytics.toString());
      localStorage.setItem("salesNotifications", salesNotifications.toString());
      localStorage.setItem("purchaseNotifications", purchaseNotifications.toString());

      // Save to API
      const response = await fetch(`/api/users/${account.address}/settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          settings: {
            displayName,
            showWalletInProfile,
            showEarningsPublicly,
            theme,
            defaultModel,
            defaultAspectRatio,
            defaultResolution,
            defaultLicense,
            autoListPrompts,
            minimumPrice,
            showPurchaseHistory,
            showCreatedPrompts,
            allowAnalytics,
            salesNotifications,
            purchaseNotifications,
          },
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to save settings");
      }

      toast({
        title: "Settings saved",
        description: "Your preferences have been updated and synced across devices",
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        title: "Error saving settings",
        description: error instanceof Error ? error.message : "Failed to save settings. Changes saved locally only.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <main className="w-full px-6 lg:px-8 py-10 max-w-5xl mx-auto">
          <Card className="border border-border/60 bg-card/60 backdrop-blur">
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Connect your wallet to manage your account settings.
              </p>
              <ConnectWallet />
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <main className="w-full px-6 lg:px-8 py-10 max-w-6xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <main className="w-full px-6 lg:px-8 py-10 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="flex w-full flex-nowrap gap-1 p-1 h-auto">
            <TabsTrigger value="profile" className="flex-1 min-w-0 text-xs sm:text-sm px-2 sm:px-4 py-2 gap-1 sm:gap-2">
              <User className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />Profile
            </TabsTrigger>
            <TabsTrigger value="creator" className="flex-1 min-w-0 text-xs sm:text-sm px-2 sm:px-4 py-2 gap-1 sm:gap-2">
              <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />Creator
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex-1 min-w-0 text-xs sm:text-sm px-2 sm:px-4 py-2 gap-1 sm:gap-2">
              <Shield className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />Privacy
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Manage your public profile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="wallet">Wallet Address</Label>
                  <Input id="wallet" value={account.address} disabled className="font-mono text-sm" />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show wallet in public profile</Label>
                    <p className="text-sm text-muted-foreground">Display your wallet address</p>
                  </div>
                  <Switch checked={showWalletInProfile} onCheckedChange={setShowWalletInProfile} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show earnings publicly</Label>
                    <p className="text-sm text-muted-foreground">Allow others to see earnings</p>
                  </div>
                  <Switch checked={showEarningsPublicly} onCheckedChange={setShowEarningsPublicly} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="creator" className="space-y-6 opacity-60 pointer-events-none">
            <Card>
              <CardHeader>
                <CardTitle>Creator Settings</CardTitle>
                <CardDescription>Configure marketplace defaults</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Default License Type</Label>
                  <Select value={defaultLicense} onValueChange={setDefaultLicense}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="personal">Personal Use</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="exclusive">Exclusive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Minimum Price (USD)</Label>
                  <Input type="number" step="0.01" value={minimumPrice} onChange={(e) => setMinimumPrice(e.target.value)} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-list new prompts</Label>
                    <p className="text-sm text-muted-foreground">List automatically after creation</p>
                  </div>
                  <Switch checked={autoListPrompts} onCheckedChange={setAutoListPrompts} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6 opacity-60 pointer-events-none">
            <Card>
              <CardHeader>
                <CardTitle>Privacy & Data</CardTitle>
                <CardDescription>Control visibility and data usage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show purchase history</Label>
                    <p className="text-sm text-muted-foreground">Make purchases visible</p>
                  </div>
                  <Switch checked={showPurchaseHistory} onCheckedChange={setShowPurchaseHistory} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show created prompts</Label>
                    <p className="text-sm text-muted-foreground">Display on public profile</p>
                  </div>
                  <Switch checked={showCreatedPrompts} onCheckedChange={setShowCreatedPrompts} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Allow analytics</Label>
                    <p className="text-sm text-muted-foreground">Help improve the app</p>
                  </div>
                  <Switch checked={allowAnalytics} onCheckedChange={setAllowAnalytics} />
                </div>
                <Separator />
                <Label>Notifications</Label>
                <div className="flex items-center justify-between">
                  <Label className="font-normal">Sales notifications</Label>
                  <Switch checked={salesNotifications} onCheckedChange={setSalesNotifications} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-6">
          <Button onClick={handleSaveSettings} size="lg" disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />Save All Settings
              </>
            )}
          </Button>
        </div>
      </main>
    </div>
  );
}
