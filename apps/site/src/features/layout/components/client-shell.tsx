'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { HeaderClient } from "@/features/layout";
import { SidebarProvider } from "@/features/layout/hooks/sidebar-context";
import { LandingSidebarProvider } from "@/features/layout/hooks/landing-sidebar-context";

const ElementsHeaderSetup = dynamic(
  () => import("@/features/layout").then(mod => ({ default: mod.ElementsHeaderSetup })),
  { ssr: false }
);

const ChatWindow = dynamic(
  () => import("@/features/chat").then(mod => ({ default: mod.ChatWindow })),
  { ssr: false }
);

export function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <LandingSidebarProvider>
        <Suspense fallback={null}>
          <ElementsHeaderSetup />
        </Suspense>
        <Suspense fallback={null}>
          <HeaderClient />
        </Suspense>
        <main className="flex-1">
          {children}
        </main>
        <Suspense fallback={null}>
          <ChatWindow />
        </Suspense>
      </LandingSidebarProvider>
    </SidebarProvider>
  );
}
