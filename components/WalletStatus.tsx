"use client";

import { useActiveAccount } from 'thirdweb/react';
import { Badge } from '@/components/ui/badge';

export function WalletStatus() {
  const account = useActiveAccount();

  if (!account) {
    return null;
  }

  const address = account.address;
  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : '';

  return (
    <Badge variant="outline" className="gap-1">
      <span>🔗</span>
      <span>Wallet</span>
      {shortAddress && <span className="text-xs opacity-70">{shortAddress}</span>}
    </Badge>
  );
}
