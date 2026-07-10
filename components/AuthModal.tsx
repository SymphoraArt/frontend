"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Wallet, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEmailAuth } from "@/hooks/useEmailAuth";

type Mode = "signin" | "signup" | "forgot";

/**
 * Email + password auth. Register / sign in / forgot-password in one compact,
 * responsive card; wallet login is the optional route at the bottom (opens the
 * existing wallet picker via onWallet). 2FA prompts get layered on later.
 */
export function AuthModal({
  open,
  onClose,
  onWallet,
}: {
  open: boolean;
  onClose: () => void;
  onWallet?: () => void;
}) {
  const { register, login, forgot } = useEmailAuth();
  const { toast } = useToast();

  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const reset = () => { setError(null); setSent(false); };
  const go = (m: Mode) => { reset(); setPassword(""); setConfirm(""); setMode(m); };
  const close = () => { setMode("signin"); setEmail(""); setPassword(""); setConfirm(""); reset(); onClose(); };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (mode === "signup" && password !== confirm) { setError("Passwords don't match"); return; }
    setLoading(true);
    try {
      if (mode === "signin") { await login(email.trim(), password); toast({ title: "Welcome back" }); close(); }
      else if (mode === "signup") { await register(email.trim(), password); toast({ title: "Account created" }); close(); }
      else { await forgot(email.trim()); setSent(true); }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const title = mode === "signup" ? "Create account" : mode === "forgot" ? "Reset password" : "Sign in";

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) close(); }}>
      <DialogContent className="sm:max-w-sm p-5">
        <DialogHeader>
          <div className="flex items-center gap-2">
            {mode === "forgot" && (
              <button type="button" onClick={() => go("signin")} aria-label="Back"
                className="-ml-1 rounded-md p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                <ArrowLeft size={18} />
              </button>
            )}
            <DialogTitle className="text-base">{title}</DialogTitle>
          </div>
          <DialogDescription className="sr-only">Sign in or create an account with email and password.</DialogDescription>
        </DialogHeader>

        {sent ? (
          <div className="py-2 text-sm text-muted-foreground">
            If an account exists for <strong className="text-foreground">{email}</strong>, a reset link is on its way.
            <Button variant="outline" className="mt-4 w-full" onClick={() => go("signin")}>Back to sign in</Button>
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="auth-email" className="text-xs">Email</Label>
              <Input id="auth-email" type="email" required autoComplete="email" placeholder="you@example.com"
                value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            {mode !== "forgot" && (
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auth-password" className="text-xs">Password</Label>
                  {mode === "signin" && (
                    <button type="button" onClick={() => go("forgot")}
                      className="text-xs text-muted-foreground hover:text-foreground">Forgot?</button>
                  )}
                </div>
                <Input id="auth-password" type="password" required minLength={8}
                  autoComplete={mode === "signup" ? "new-password" : "current-password"} placeholder="••••••••"
                  value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            )}

            {mode === "signup" && (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="auth-confirm" className="text-xs">Confirm password</Label>
                <Input id="auth-confirm" type="password" required minLength={8} autoComplete="new-password" placeholder="••••••••"
                  value={confirm} onChange={(e) => setConfirm(e.target.value)} />
              </div>
            )}

            {error && <p className="text-xs text-red-500">{error}</p>}

            <Button type="submit" disabled={loading} className="mt-1 w-full">
              {loading && <Loader2 size={15} className="mr-2 animate-spin" />}
              {mode === "signup" ? "Create account" : mode === "forgot" ? "Send reset link" : "Sign in"}
            </Button>

            {mode !== "forgot" && (
              <p className="text-center text-xs text-muted-foreground">
                {mode === "signin" ? "New here? " : "Already have an account? "}
                <button type="button" onClick={() => go(mode === "signin" ? "signup" : "signin")}
                  className="font-medium text-foreground hover:underline">
                  {mode === "signin" ? "Create one" : "Sign in"}
                </button>
              </p>
            )}
          </form>
        )}

        {onWallet && mode !== "forgot" && (
          <>
            <div className="my-1 flex items-center gap-3 text-[11px] uppercase tracking-wide text-muted-foreground">
              <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
            </div>
            <Button variant="outline" className="w-full" onClick={() => { close(); onWallet(); }}>
              <Wallet size={15} className="mr-2" /> Continue with a wallet
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
