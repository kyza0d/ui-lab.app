'use client';

import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import Header from "@/components/layout/Header";
import { AppProvider } from "@/lib/app-context";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <Suspense fallback={null}>
      <AppProvider>
        <Suspense fallback={<div style={{ height: '3.75rem' }} />}>
          <Header pathname={pathname} />
        </Suspense>
        <Suspense fallback={<div />}>
          <main className="flex-1">
            {children}
          </main>
        </Suspense>
      </AppProvider>
    </Suspense>
  );
}
