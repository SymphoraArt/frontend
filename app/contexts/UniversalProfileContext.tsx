'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UniversalProfile, UniversalProfileContextType } from '../lib/lukso/types';
import { fetchUniversalProfile, updateUniversalProfile } from '../lib/lukso/profile';

const UniversalProfileContext = createContext<UniversalProfileContextType | undefined>(undefined);

export function useUniversalProfile() {
  const context = useContext(UniversalProfileContext);
  if (context === undefined) {
    throw new Error('useUniversalProfile must be used within a UniversalProfileProvider');
  }
  return context;
}

interface UniversalProfileProviderProps {
  children: React.ReactNode;
}

export function UniversalProfileProvider({ children }: UniversalProfileProviderProps) {
  // Connection state
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  // Profile state
  const [profile, setProfile] = useState<UniversalProfile | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);

  // Check for existing connection on mount
  useEffect(() => {
    checkExistingConnection();
  }, []);

  // Load profile when address changes
  useEffect(() => {
    if (address) {
      loadProfile(address);
    } else {
      setProfile(null);
    }
  }, [address]);

  const checkExistingConnection = useCallback(async () => {
    try {
      // Check if we have a stored connection
      const storedAddress = localStorage.getItem('lukso-up-address');
      if (storedAddress) {
        setAddress(storedAddress);
        setIsConnected(true);
      }
    } catch (error) {
      console.warn('Failed to check existing connection:', error);
    }
  }, []);

  const loadProfile = useCallback(async (userAddress: string) => {
    setIsLoadingProfile(true);
    try {
      const profileData = await fetchUniversalProfile(userAddress);
      setProfile(profileData);
    } catch (error) {
      console.error('Failed to load profile:', error);
      setProfile(null);
    } finally {
      setIsLoadingProfile(false);
    }
  }, []);

  const connect = useCallback(async () => {
    setIsConnecting(true);
    try {
      // TODO: Integrate with LUKSO wallet connector (Universal Profile Browser Extension, WalletConnect, etc.)
      // For production, this must use a real wallet connection
      
      // Check if window.ethereum or LUKSO wallet is available
      if (typeof window !== 'undefined') {
        // Try to detect LUKSO Universal Profile Browser Extension
        const luksoProvider = (window as any).lukso;
        const ethereumProvider = (window as any).ethereum;

        if (luksoProvider) {
          // Request connection to Universal Profile
          const accounts = await luksoProvider.request({ method: 'eth_requestAccounts' });
          if (accounts && accounts.length > 0) {
            const walletAddress = accounts[0];
            setAddress(walletAddress);
            setIsConnected(true);
            localStorage.setItem('lukso-up-address', walletAddress);
            console.log(`🔗 Connected to Universal Profile: ${walletAddress}`);
            return;
          }
        } else if (ethereumProvider) {
          // Fallback to standard Ethereum provider (may work with LUKSO)
          const accounts = await ethereumProvider.request({ method: 'eth_requestAccounts' });
          if (accounts && accounts.length > 0) {
            const walletAddress = accounts[0];
            setAddress(walletAddress);
            setIsConnected(true);
            localStorage.setItem('lukso-up-address', walletAddress);
            console.log(`🔗 Connected to wallet: ${walletAddress}`);
            return;
          }
        }
      }

      // No wallet found - throw error
      throw new Error('No LUKSO wallet found. Please install a LUKSO-compatible wallet extension.');

    } catch (error: any) {
      console.error('Failed to connect:', error);
      throw new Error(error.message || 'Failed to connect to Universal Profile');
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setAddress(null);
    setProfile(null);
    setIsConnected(false);
    setIsConnecting(false);

    // Clear stored connection
    localStorage.removeItem('lukso-up-address');

    console.log('🔌 Disconnected from Universal Profile');
  }, []);

  const getProfile = useCallback(async (targetAddress?: string): Promise<UniversalProfile | null> => {
    const addr = targetAddress || address;
    if (!addr) return null;

    try {
      return await fetchUniversalProfile(addr);
    } catch (error) {
      console.error('Failed to get profile:', error);
      return null;
    }
  }, [address]);

  const updateProfile = useCallback(async (updates: Partial<UniversalProfile>) => {
    if (!address) {
      throw new Error('No Universal Profile connected');
    }

    try {
      const success = await updateUniversalProfile(address, updates);
      if (success) {
        // Reload profile data
        await loadProfile(address);
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error: any) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  }, [address, loadProfile]);

  const value: UniversalProfileContextType = {
    // Connection state
    isConnected,
    isConnecting,
    address,

    // Profile data
    profile,
    isLoadingProfile,

    // Actions
    connect,
    disconnect,

    // Utilities
    getProfile,
    updateProfile
  };

  return (
    <UniversalProfileContext.Provider value={value}>
      {children}
    </UniversalProfileContext.Provider>
  );
}
