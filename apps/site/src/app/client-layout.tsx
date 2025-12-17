'use client';

import { Suspense, useEffect } from 'react';
import Header from "@/components/layout/Header";
import { AppProvider } from "@/lib/app-context";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <Suspense fallback={<div style={{ height: '3.75rem' }} />}>
        <Header />
      </Suspense>
      <Suspense fallback={<div />}>
        <main className="flex-1">
          {children}
        </main>
      </Suspense>
    </AppProvider>
  );
}
