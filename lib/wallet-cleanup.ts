/**
 * Wallet Cleanup Utility
 * 
 * Clears old Privy wallet state from localStorage that might cause
 * "Wallet with id privy not found" errors after migration to Thirdweb-only.
 */

/**
 * Clears all Privy-related wallet state from localStorage
 * Should be called on app initialization after Privy deprecation
 */
export function clearPrivyWalletState() {
  if (typeof window === "undefined") return;

  try {
    // Thirdweb stores wallet state in localStorage with various keys
    const keysToRemove: string[] = [];

    // Find all localStorage keys that might contain Privy wallet state
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;

      // Remove Thirdweb wallet state that references "privy"
      if (
        key.includes("thirdweb") ||
        key.includes("wallet") ||
        key.includes("privy") ||
        key.includes("activeWallet") ||
        key.includes("connectedWallet")
      ) {
        // Check if the value contains "privy" reference
        try {
          const value = localStorage.getItem(key);
          if (value && (value.includes("privy") || value.includes('"id":"privy"'))) {
            keysToRemove.push(key);
          }
        } catch (e) {
          // If we can't read it, remove it anyway
          keysToRemove.push(key);
        }
      }
    }

    // Remove all Privy-related keys
    keysToRemove.forEach((key) => {
      try {
        localStorage.removeItem(key);
        console.log(`🧹 Cleared Privy wallet state: ${key}`);
      } catch (e) {
        console.warn(`⚠️ Failed to clear ${key}:`, e);
      }
    });

    // Also clear sessionStorage
    try {
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key && (key.includes("privy") || key.includes("wallet"))) {
          sessionStorage.removeItem(key);
        }
      }
    } catch (e) {
      // Ignore sessionStorage errors
    }

    if (keysToRemove.length > 0) {
      console.log(`✅ Cleared ${keysToRemove.length} Privy wallet state entries`);
    }
  } catch (error) {
    console.warn("⚠️ Error clearing Privy wallet state:", error);
  }
}

/**
 * Clears all wallet state (use with caution - will disconnect all wallets)
 */
export function clearAllWalletState() {
  if (typeof window === "undefined") return;

  try {
    const keysToRemove: string[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (
        key &&
        (key.includes("thirdweb") ||
          key.includes("wallet") ||
          key.includes("privy") ||
          key.includes("activeWallet") ||
          key.includes("connectedWallet"))
      ) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach((key) => {
      localStorage.removeItem(key);
    });

    console.log(`🧹 Cleared all wallet state (${keysToRemove.length} entries)`);
  } catch (error) {
    console.warn("⚠️ Error clearing wallet state:", error);
  }
}
