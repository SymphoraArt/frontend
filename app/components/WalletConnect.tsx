'use client';

import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Loader2, Wallet, LogOut, User, CheckCircle } from 'lucide-react';
import { useUniversalProfile } from '../contexts/UniversalProfileContext';
import { getProfileImageURL, getDisplayName } from '../lib/lukso/profile';

interface WalletConnectProps {
  variant?: 'button' | 'card' | 'compact';
  className?: string;
}

export function WalletConnect({ variant = 'button', className = '' }: WalletConnectProps) {
  const {
    isConnected,
    isConnecting,
    address,
    profile,
    isLoadingProfile,
    connect,
    disconnect
  } = useUniversalProfile();

  const handleConnect = async () => {
    try {
      await connect();
    } catch (error: any) {
      console.error('Connection failed:', error);
      // You could show a toast here
    }
  };

  const handleDisconnect = () => {
    disconnect();
  };

  const displayName = profile ? getDisplayName(profile) : '';
  const profileImage = profile ? getProfileImageURL(profile) : null;

  // Button variant
  if (variant === 'button') {
    if (isConnected && address) {
      return (
        <div className={`flex items-center space-x-2 ${className}`}>
          <Avatar className="h-8 w-8">
            <AvatarImage src={profileImage || undefined} alt={displayName} />
            <AvatarFallback>
              {displayName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="hidden sm:block">
            <p className="text-sm font-medium">{displayName}</p>
            <p className="text-xs text-muted-foreground">
              {address.slice(0, 6)}...{address.slice(-4)}
            </p>
          </div>

          <Button variant="outline" size="sm" onClick={handleDisconnect}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      );
    }

    return (
      <Button
        onClick={handleConnect}
        disabled={isConnecting}
        className={className}
      >
        {isConnecting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Connecting...
          </>
        ) : (
          <>
            <Wallet className="mr-2 h-4 w-4" />
            Connect LUKSO UP
          </>
        )}
      </Button>
    );
  }

  // Card variant
  if (variant === 'card') {
    return (
      <Card className={className}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2">
            <Wallet className="h-5 w-5" />
            <span>LUKSO Universal Profile</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isConnected && address ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={profileImage || undefined} alt={displayName} />
                  <AvatarFallback>
                    {displayName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold">{displayName}</h3>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <p className="text-sm text-muted-foreground font-mono">
                    {address.slice(0, 8)}...{address.slice(-6)}
                  </p>
                  <Badge variant="secondary" className="mt-1">
                    Connected
                  </Badge>
                </div>
              </div>

              {isLoadingProfile && (
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Loading profile...</span>
                </div>
              )}

              <Button variant="outline" onClick={handleDisconnect} className="w-full">
                <LogOut className="mr-2 h-4 w-4" />
                Disconnect
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center">
                <Wallet className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <h3 className="font-semibold mb-1">Connect Your Universal Profile</h3>
                <p className="text-sm text-muted-foreground">
                  Connect your LUKSO Universal Profile to access personalized features,
                  manage your creations, and interact with the AIgency ecosystem.
                </p>
              </div>

              <Button
                onClick={handleConnect}
                disabled={isConnecting}
                className="w-full"
                size="lg"
              >
                {isConnecting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Wallet className="mr-2 h-4 w-4" />
                    Connect LUKSO Universal Profile
                  </>
                )}
              </Button>

              <div className="text-xs text-muted-foreground space-y-1">
                <p>• Secure blockchain-based authentication</p>
                <p>• Access to exclusive AI prompts</p>
                <p>• Track your creation history</p>
                <p>• Receive platform rewards</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Compact variant
  if (variant === 'compact') {
    if (isConnected && address) {
      return (
        <Button variant="outline" size="sm" onClick={handleDisconnect} className={className}>
          <Avatar className="h-4 w-4 mr-2">
            <AvatarImage src={profileImage || undefined} alt={displayName} />
            <AvatarFallback className="text-xs">
              {displayName.slice(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="hidden sm:inline">{displayName}</span>
          <LogOut className="h-3 w-3 ml-2" />
        </Button>
      );
    }

    return (
      <Button
        variant="outline"
        size="sm"
        onClick={handleConnect}
        disabled={isConnecting}
        className={className}
      >
        {isConnecting ? (
          <Loader2 className="h-3 w-3 animate-spin" />
        ) : (
          <Wallet className="h-3 w-3" />
        )}
        <span className="hidden sm:inline ml-2">
          {isConnecting ? 'Connecting...' : 'Connect'}
        </span>
      </Button>
    );
  }

  return null;
}

// Hook for easier access to connection state
export function useWalletConnection() {
  const { isConnected, isConnecting, address, profile, connect, disconnect } = useUniversalProfile();

  return {
    isConnected,
    isConnecting,
    address,
    profile,
    connect,
    disconnect
  };
}
