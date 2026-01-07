"use client";

export const dynamic = "force-dynamic";
import { Suspense } from "react";
import TestPageClient from "./TestPageClient";

export default function TestPage() {
  return (
    <Suspense fallback={null}>
      <TestPageClient />
    </Suspense>
  );
}
