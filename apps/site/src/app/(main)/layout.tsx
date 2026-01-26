"use client";

import { Suspense } from 'react';
import { HeaderClient } from "@/features/layout";
import { ElementsHeaderSetup } from "@/features/layout";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={null}>
        <ElementsHeaderSetup />
      </Suspense>
      <HeaderClient />
      <main className="flex-1">
        {children}
      </main>
    </>
  );
}
