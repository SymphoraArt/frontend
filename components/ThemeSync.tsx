"use client";

import { Theme } from "@radix-ui/themes";
import { useEffect, useState } from "react";

export default function ThemeSync({
  children,
}: {
  children: React.ReactNode;
}) {
  const [appearance, setAppearance] = useState<"light" | "dark">("light");

  useEffect(() => {
    const root = document.documentElement;

    const compute = () => {
      setAppearance(root.classList.contains("dark") ? "dark" : "light");
    };

    compute();

    const observer = new MutationObserver(() => {
      compute();
    });

    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <Theme appearance={appearance} scaling="95%">
      {children}
    </Theme>
  );
}
