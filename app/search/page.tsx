"use client";

import { useSearchParams } from "next/navigation";
import EnkiFeedPage from "@/components/enki/EnkiFeedPage";

export default function SearchPage() {
  const params = useSearchParams();
  return <EnkiFeedPage kind="search" query={params.get("q") || ""} />;
}
