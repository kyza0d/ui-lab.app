'use client';

import { Suspense } from 'react';
import { AppProvider } from '@/features/theme';

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProvider>
      <div className="flex flex-col h-screen w-screen overflow-hidden">
        <Suspense fallback={<div className="w-full h-full bg-background-950" />}>
          {children}
        </Suspense>
      </div>
    </AppProvider>
  );
}
