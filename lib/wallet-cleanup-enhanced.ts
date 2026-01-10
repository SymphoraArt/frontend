/**
 * Enhanced Wallet Cleanup & Validation Utility
 *
 * Provides comprehensive utilities to:
 * - Clear old Privy wallet state after migration to Thirdweb-only
 * - Validate Thirdweb wallet integrity
 * - Clean up corrupted wallet data
 * - Safely reset wallet state when needed
 * - Detect and prevent wallet conflicts
 */

export interface WalletValidationResult {
  isValid: boolean;
  issues: string[];
  warnings: string[];
  hasPrivyContamination: boolean;
  hasCorruptedData: boolean;
  thirdwebKeysFound: number;
}

/**
 * Clears all Privy-related wallet state from localStorage
 * Should be called on app initialization after Privy deprecation
 *
 * @param verbose - If true, logs detailed information
 * @returns Number of items cleared
 */
export function clearPrivyWalletState(verbose = false): number {
  if (typeof window === "undefined") return 0;

  try {
    const keysToRemove: string[] = [];

    // Find all localStorage keys that might contain Privy wallet state
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;

      // Only examine wallet-related keys to avoid false positives
      const isWalletRelated =
        key.includes("thirdweb") ||
        key.includes("wallet") ||
        key.includes("privy") ||
        key.includes("activeWallet") ||
        key.includes("connectedWallet");

      if (!isWalletRelated) continue;

      // Check if the value contains "privy" reference
      try {
        const value = localStorage.getItem(key);
        if (!value) continue;

        // Check for Privy-specific markers
        const hasPrivyMarker =
          value.includes("privy") ||
          value.includes('"id":"privy"') ||
          value.includes("'id':'privy'") ||
          value.includes("privy-io");

        if (hasPrivyMarker) {
          keysToRemove.push(key);
          if (verbose) {
            console.log(`🔍 Found Privy state in: ${key}`);
          }
        }
      } catch (e) {
        // If we can't read it, it might be corrupted - mark for removal
        console.warn(`⚠️ Cannot read localStorage key: ${key}`, e);
        keysToRemove.push(key);
      }
    }

    // Remove all Privy-related keys
    keysToRemove.forEach((key) => {
      try {
        localStorage.removeItem(key);
        if (verbose) {
          console.log(`🧹 Cleared Privy wallet state: ${key}`);
        }
      } catch (e) {
        console.error(`❌ Failed to clear ${key}:`, e);
      }
    });

    // Also clear sessionStorage
    try {
      const sessionKeys: string[] = [];
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key && (key.includes("privy") || key.includes("wallet"))) {
          sessionKeys.push(key);
        }
      }

      sessionKeys.forEach((key) => {
        sessionStorage.removeItem(key);
      });

      if (verbose && sessionKeys.length > 0) {
        console.log(`🧹 Cleared ${sessionKeys.length} session storage items`);
      }
    } catch (e) {
      console.warn("⚠️ Error clearing session storage:", e);
    }

    if (keysToRemove.length > 0) {
      console.log(`✅ Cleared ${keysToRemove.length} Privy wallet state entries`);
    }

    return keysToRemove.length;
  } catch (error) {
    console.error("⚠️ Error clearing Privy wallet state:", error);
    return 0;
  }
}

/**
 * Validates Thirdweb wallet state integrity
 * Checks for corrupted or invalid wallet data
 *
 * @param fix - If true, attempts to fix issues automatically
 * @returns Validation result with issues found
 */
export function validateThirdwebWalletState(fix = false): WalletValidationResult {
  if (typeof window === "undefined") {
    return {
      isValid: true,
      issues: [],
      warnings: [],
      hasPrivyContamination: false,
      hasCorruptedData: false,
      thirdwebKeysFound: 0,
    };
  }

  const issues: string[] = [];
  const warnings: string[] = [];
  let hasPrivyContamination = false;
  let hasCorruptedData = false;

  try {
    // Check for Thirdweb-specific keys
    const thirdwebKeys = Object.keys(localStorage).filter((key) =>
      key.includes("thirdweb")
    );

    if (thirdwebKeys.length === 0) {
      warnings.push("No Thirdweb wallet data found - user may need to connect wallet");
    }

    // Validate each Thirdweb key
    thirdwebKeys.forEach((key) => {
      try {
        const value = localStorage.getItem(key);
        if (!value) {
          issues.push(`Empty value for key: ${key}`);
          if (fix) {
            localStorage.removeItem(key);
            console.log(`🔧 Removed empty key: ${key}`);
          }
          return;
        }

        // Try to parse as JSON if it looks like JSON
        if (value.startsWith("{") || value.startsWith("[")) {
          try {
            JSON.parse(value);
          } catch (e) {
            issues.push(`Invalid JSON in key: ${key}`);
            hasCorruptedData = true;
            if (fix) {
              localStorage.removeItem(key);
              console.log(`🔧 Removed corrupted key: ${key}`);
            }
          }
        }

        // Check for Privy contamination
        if (value.includes("privy")) {
          issues.push(`Privy reference found in: ${key}`);
          hasPrivyContamination = true;
          if (fix) {
            localStorage.removeItem(key);
            console.log(`🔧 Removed Privy-contaminated key: ${key}`);
          }
        }
      } catch (e) {
        issues.push(`Cannot validate key: ${key}`);
        hasCorruptedData = true;
      }
    });

    const isValid = issues.length === 0;
    return {
      isValid,
      issues,
      warnings,
      hasPrivyContamination,
      hasCorruptedData,
      thirdwebKeysFound: thirdwebKeys.length,
    };
  } catch (error) {
    issues.push(`Validation error: ${error}`);
    return {
      isValid: false,
      issues,
      warnings,
      hasPrivyContamination: false,
      hasCorruptedData: true,
      thirdwebKeysFound: 0,
    };
  }
}

/**
 * Clears all wallet state (use with caution - will disconnect all wallets)
 *
 * @param confirm - Must be set to true to confirm this destructive action
 * @returns Number of items cleared
 */
export function clearAllWalletState(confirm = false): number {
  if (!confirm) {
    console.error("⚠️ clearAllWalletState requires confirm=true parameter");
    return 0;
  }

  if (typeof window === "undefined") return 0;

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
    return keysToRemove.length;
  } catch (error) {
    console.error("⚠️ Error clearing wallet state:", error);
    return 0;
  }
}

/**
 * Auto-repair wallet state
 * Attempts to fix common issues automatically
 *
 * @returns Repair result
 */
export function autoRepairWalletState(): {
  repaired: boolean;
  actionsTaken: string[];
  remainingIssues: string[];
} {
  const actionsTaken: string[] = [];
  const remainingIssues: string[] = [];

  // Step 1: Clear Privy contamination
  const privyCleared = clearPrivyWalletState(true);
  if (privyCleared > 0) {
    actionsTaken.push(`Cleared ${privyCleared} Privy-contaminated entries`);
  }

  // Step 2: Validate and fix Thirdweb state
  const validation = validateThirdwebWalletState(true);
  if (validation.hasCorruptedData) {
    actionsTaken.push("Removed corrupted wallet data");
  }

  // Step 3: Check remaining issues
  const finalValidation = validateThirdwebWalletState(false);
  if (!finalValidation.isValid) {
    remainingIssues.push(...finalValidation.issues);
  }

  const repaired = remainingIssues.length === 0;

  if (repaired) {
    console.log("✅ Wallet state repaired successfully");
  } else {
    console.warn("⚠️ Some wallet issues remain:", remainingIssues);
  }

  return {
    repaired,
    actionsTaken: actionsTaken,
    remainingIssues,
  };
}

/**
 * Check if wallet is properly initialized for our app
 *
 * @returns Initialization status
 */
export function checkWalletInitialization(): {
  isInitialized: boolean;
  hasThirdwebData: boolean;
  hasValidState: boolean;
  needsCleanup: boolean;
} {
  if (typeof window === "undefined") {
    return {
      isInitialized: false,
      hasThirdwebData: false,
      hasValidState: false,
      needsCleanup: false,
    };
  }

  const validation = validateThirdwebWalletState(false);

  const hasThirdwebData = validation.thirdwebKeysFound > 0;
  const hasValidState = validation.isValid;
  const needsCleanup = validation.hasPrivyContamination || validation.hasCorruptedData;
  const isInitialized = hasThirdwebData && hasValidState && !needsCleanup;

  return {
    isInitialized,
    hasThirdwebData,
    hasValidState,
    needsCleanup,
  };
}
