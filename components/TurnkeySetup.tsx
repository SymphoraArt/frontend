'use client';

import { useState } from 'react';
import { useTurnkeyAuth } from '@/hooks/useTurnkeyAuth';

interface TurnkeySetupProps {
  walletAddress: string;
  authHeaders: Record<string, string>;
  onComplete: () => void;
  onSkip?: () => void;
}

export function TurnkeySetup({ walletAddress, authHeaders, onComplete, onSkip }: TurnkeySetupProps) {
  const { register, isLoading, error } = useTurnkeyAuth();
  const [done, setDone] = useState(false);

  async function handleRegister() {
    const ok = await register(walletAddress, authHeaders);
    if (ok) {
      setDone(true);
      setTimeout(onComplete, 1200);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-background border border-border rounded-xl p-6 max-w-sm w-full mx-4 shadow-xl">
        <h2 className="text-lg font-semibold mb-2">Set up 2FA</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Register a passkey (Face ID, fingerprint, or hardware key) to protect your prompts.
          Required for deletion.
        </p>

        {done && (
          <p className="text-sm text-green-500 mb-4">Passkey registered!</p>
        )}

        {error && (
          <p className="text-sm text-destructive mb-4">{error}</p>
        )}

        <div className="flex gap-3">
          {onSkip && (
            <button
              onClick={onSkip}
              disabled={isLoading}
              className="flex-1 px-4 py-2 rounded-lg border border-border text-sm hover:bg-muted transition-colors disabled:opacity-50"
            >
              Skip for now
            </button>
          )}
          <button
            onClick={handleRegister}
            disabled={isLoading || done}
            className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Registering...' : 'Register Passkey'}
          </button>
        </div>
      </div>
    </div>
  );
}
