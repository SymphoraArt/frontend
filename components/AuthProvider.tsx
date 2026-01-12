"use client";

import { ReactNode, createContext, useContext } from 'react';
import { ThirdwebProvider } from 'thirdweb/react';
import { useAuth } from '@/hooks/useAuth';

interface AuthContextType {
  isAuthenticated: boolean;
  walletAddress: string | null;
  isLoading: boolean;
  error: string | null;
  authenticate: () => Promise<boolean>;
  logout: () => void;
  getAuthHeaders: () => Record<string, string> | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <ThirdwebProvider>
      <AuthProviderInner>
        {children}
      </AuthProviderInner>
    </ThirdwebProvider>
  );
}

function AuthProviderInner({ children }: AuthProviderProps) {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Component to require authentication
 */
export function RequireAuth({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading, authenticate, error } = useAuthContext();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Authenticating...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md mx-auto p-6">
          <h2 className="text-xl font-semibold mb-4">Authentication Required</h2>
          <p className="text-muted-foreground mb-6">
            Please connect your wallet and sign a message to access the marketplace.
          </p>

          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3 mb-4">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <button
            onClick={authenticate}
            className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Connect & Authenticate
          </button>

          <p className="text-xs text-muted-foreground mt-4">
            This signature proves wallet ownership and is required for marketplace security.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}