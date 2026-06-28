"use client";

// Force dynamic rendering — the shell relies on client-only wallet/theme hooks.
export const dynamic = "force-dynamic";

import EnkiHome from "@/components/enki-shell/EnkiHome";

// /home — the explore feed inside the new left-side-menu shell.
export default function HomeRoute() {
  return <EnkiHome />;
}
