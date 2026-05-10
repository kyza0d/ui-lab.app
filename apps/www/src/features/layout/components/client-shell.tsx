'use client';

import dynamic from 'next/dynamic';
import { HeaderClient } from "@/features/layout";
import { SidebarProvider } from "@/features/layout/hooks/sidebar-context";
import { LandingSidebarProvider } from "@/features/layout/hooks/landing-sidebar-context";
import { DocsNavigationProvider } from "@/features/navigation/lib/docs-navigation-context";
import type { DocsNavigationData } from "@/features/navigation/lib/sidebar-registry-resolver";

const ElementsHeaderSetup = dynamic(
  () => import("@/features/layout").then(mod => ({ default: mod.ElementsHeaderSetup })),
  { ssr: false, loading: () => null }
);

const ChatWindow = dynamic(
  () => import("@/features/chat").then(mod => ({ default: mod.ChatWindow })),
  { ssr: false, loading: () => null }
);

export function ClientShell({
  children,
  docsNavigationData,
}: {
  children: React.ReactNode;
  docsNavigationData: DocsNavigationData;
}) {
  return (
    <DocsNavigationProvider data={docsNavigationData}>
      <SidebarProvider>
        <LandingSidebarProvider>
          <ElementsHeaderSetup />
          <HeaderClient />
          <main className="flex-1">
            {children}
          </main>
          <ChatWindow />
        </LandingSidebarProvider>
      </SidebarProvider>
    </DocsNavigationProvider>
  );
}
