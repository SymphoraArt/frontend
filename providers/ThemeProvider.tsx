"use client";

/**
 * ThemeProvider — manages dark/light mode independently of wallet state.
 *
 * Design decisions:
 *  - Initial theme is read from `document.documentElement.classList` which
 *    was already set by the inline <script> in layout.tsx (no FOUC).
 *  - Using a dedicated React context so wallet connect/disconnect re-renders
 *    never reset the theme.
 *  - The class list + localStorage write is done in a useEffect so the theme
 *    survives any provider tree re-mount.
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Read the theme that was already applied by the inline script in <head>.
 * Falls back to localStorage, then to "light".
 */
function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";

  // The inline script already added .dark to <html> if needed,
  // so reading the classList is the most reliable source of truth.
  if (document.documentElement.classList.contains("dark")) return "dark";

  // Fallback: check localStorage in case classList was not set yet
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") return "dark";
  } catch {
    // localStorage might throw in private browsing
  }

  return "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Lazy initializer — runs once, reads from the DOM (already set by inline script)
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  // Keep DOM + localStorage in sync whenever `theme` changes
  useEffect(() => {
    const root = document.documentElement;

    // Smooth transition class
    root.classList.add("theme-transition");

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    try {
      localStorage.setItem("theme", theme);
    } catch {
      // Ignore in private browsing
    }

    const timeoutId = window.setTimeout(() => {
      root.classList.remove("theme-transition");
    }, 320);

    return () => {
      window.clearTimeout(timeoutId);
      root.classList.remove("theme-transition");
    };
  }, [theme]);

  const setTheme = useCallback((t: Theme) => setThemeState(t), []);
  const toggleTheme = useCallback(
    () => setThemeState((prev) => (prev === "dark" ? "light" : "dark")),
    []
  );

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to consume the theme context.
 * Safe to call anywhere below <ThemeProvider>.
 */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within <ThemeProvider>");
  }
  return ctx;
}
