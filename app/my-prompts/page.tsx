"use client";

import Navbar from "@/components/Navbar";
import { usePrivy } from "@privy-io/react-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MyPromptsPage() {
  const { ready, authenticated, login } = usePrivy();

  if (!ready) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <Navbar />
        <main className="w-full px-6 lg:px-8 py-6">
          <p className="text-muted-foreground">Loading...</p>
        </main>
      </div>
    );
  }

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
                Log in to view and manage your saved prompts.
              </p>
              <Button onClick={login}>Log in</Button>
            </CardContent>
          </Card>
        </main>
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
