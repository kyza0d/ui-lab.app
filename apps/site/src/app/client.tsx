'use client';

import { Suspense } from 'react';
import { AppProvider } from "@/features/theme";

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      {children}
    </AppProvider>
  );
}

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <Suspense fallback={<div />}>
        <main className="flex-1">
          {children}
        </main>
      </Suspense>
    </Suspense>
  );
}
