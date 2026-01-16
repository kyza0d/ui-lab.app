'use client';

import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { StartersSidebar } from '@/features/starters';

function SidebarSkeleton() {
  return (
    <aside className="hidden md:flex w-56 flex-col border-r border-background-700">
      <div className="h-screen"></div>
    </aside>
  );
}

function SidebarContent() {
  const pathname = usePathname();
  return <StartersSidebar pathname={pathname} />;
}

export default function SidebarSlot() {
  return (
    <Suspense fallback={<SidebarSkeleton />}>
      <SidebarContent />
    </Suspense>
  );
}
