'use client';

import { Suspense } from 'react';
import { Sidebar } from "@/shared";

export default function SidebarSlot() {
  return (
    <Suspense fallback={null}>
      <Sidebar />
    </Suspense>
  );
}
