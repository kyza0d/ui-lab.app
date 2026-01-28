"use client";

import { Suspense } from 'react';
import { HeaderClient } from "@/features/layout";
import { ElementsHeaderSetup } from "@/features/layout";
import { ChatWindow } from "@/features/chat";

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
      <Suspense fallback={null}>
        <HeaderClient />
      </Suspense>
      <main className="flex-1">
        {children}
      </main>
      <ChatWindow />
    </>
  );
}
