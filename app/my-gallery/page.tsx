 "use client";

import { useActiveAccount } from "thirdweb/react";
import { useEffect, useMemo } from "react";
import { getUserKeyFromAccount } from "@/lib/creations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ConnectWallet } from "@/components/ConnectWallet";
import { useRouter } from "next/navigation";

export default function MyGalleryPage() {
  const router = useRouter();
  const account = useActiveAccount();
  const authenticated = !!account;
  const userKey = useMemo(() => getUserKeyFromAccount(account), [account]);

  useEffect(() => {
    if (userKey) {
      router.replace(`/profile/${encodeURIComponent(userKey)}`);
    }
  }, [userKey, router]);

  if (!authenticated || !userKey) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <main className="w-full px-2 sm:px-4 lg:px-6 py-10">
          <Card className="border border-border/60 bg-card/60 backdrop-blur">
            <CardHeader>
              <CardTitle>My Gallery</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Connect your wallet to view your private creations and prompts.
              </p>
              <ConnectWallet />
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <main className="w-full flex items-center justify-center py-20">
        <p className="text-sm text-muted-foreground">Redirecting to your profile…</p>
      </main>
    </div>
  );
}
