'use client';

import { useState } from 'react';
import { useTurnkeyAuth } from '@/hooks/useTurnkeyAuth';

interface TurnkeyDeleteConfirmProps {
  promptId: string;
  /** Auth headers from useAuth().getAuthHeaders() or useSolanaAuth().getAuthHeaders() */
  authHeaders: Record<string, string>;
  onDeleted: () => void;
  onCancel: () => void;
}

export function TurnkeyDeleteConfirm({
  promptId,
  authHeaders,
  onDeleted,
  onCancel,
}: TurnkeyDeleteConfirmProps) {
  const { getDeleteStampHeaders, isLoading, error } = useTurnkeyAuth();
  const [step, setStep] = useState<'confirm' | 'deleting'>('confirm');

  async function handleDelete() {
    setStep('deleting');

    const walletAddress = authHeaders['X-Wallet-Address'];
    if (!walletAddress) {
      setStep('confirm');
      return;
    }

    const stampHeaders = await getDeleteStampHeaders(walletAddress);
    if (!stampHeaders) {
      setStep('confirm');
      return;
    }

    const res = await fetch(`/api/prompts/${promptId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
        ...stampHeaders,
      },
    });

    if (res.ok) {
      onDeleted();
    } else {
      setStep('confirm');
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-background border border-border rounded-xl p-6 max-w-sm w-full mx-4 shadow-xl">
        <h2 className="text-lg font-semibold mb-2">Delete Prompt</h2>
        <p className="text-sm text-muted-foreground mb-6">
          This action cannot be undone. Confirm with your passkey to continue.
        </p>

        {error && (
          <p className="text-sm text-destructive mb-4">{error}</p>
        )}

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading || step === 'deleting'}
            className="flex-1 px-4 py-2 rounded-lg border border-border text-sm hover:bg-muted transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isLoading || step === 'deleting'}
            className="flex-1 px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm font-medium hover:bg-destructive/90 transition-colors disabled:opacity-50"
          >
            {isLoading || step === 'deleting' ? 'Verifying...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
