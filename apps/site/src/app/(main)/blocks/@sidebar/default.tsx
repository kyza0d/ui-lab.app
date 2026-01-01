'use client';

import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { ElementsSidebar } from '@/features/elements';

function SidebarSkeleton() {
  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-background-700">
      <div className="h-screen"></div>
    </aside>
  );
}

function SidebarContent() {
  const pathname = usePathname();
  return <ElementsSidebar elements={[]} pathname={pathname} />;
}

export default function SidebarSlot() {
  return (
    <Suspense fallback={<SidebarSkeleton />}>
      <SidebarContent />
    </Suspense>
  );
}
