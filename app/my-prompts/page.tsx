"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useActiveAccount } from "thirdweb/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WalletPickerModal } from "@/components/WalletPickerModal";
import { useTurnkeyEmailAuth } from "@/hooks/useTurnkeyAuth";

export default function MyPromptsPage() {
  const account = useActiveAccount();
  const { connected: solanaConnected } = useWallet();
  const { address: turnkeyAddress } = useTurnkeyEmailAuth();
  const authenticated = !!account || solanaConnected || !!turnkeyAddress;
  const [showWalletPicker, setShowWalletPicker] = useState(false);

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <Navbar />
        <main className="w-full px-6 lg:px-8 py-10 max-w-5xl mx-auto">
          <Card className="border border-border/60 bg-card/60 backdrop-blur">
            <CardHeader>
              <CardTitle>My Prompts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Connect your wallet to view and manage your saved prompts.
              </p>
              <Button onClick={() => setShowWalletPicker(true)}>Connect Wallet</Button>
            </CardContent>
          </Card>
        </main>
        <WalletPickerModal open={showWalletPicker} onClose={() => setShowWalletPicker(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <Navbar />
      <main className="w-full px-6 lg:px-8 py-10 max-w-5xl mx-auto">
        <Card className="border border-border/60 bg-card/60 backdrop-blur">
          <CardHeader>
            <CardTitle>My Prompts</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Coming soon.
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
