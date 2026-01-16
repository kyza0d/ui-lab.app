'use client';

import { FaRoadBarrier } from "react-icons/fa6";

export function SectionsPageClient() {
  return (
    <div className="flex h-[calc(100vh-var(--header-height))] items-center justify-center py-24">
      <div className="text-center flex flex-col items-center">
        <FaRoadBarrier className="text-foreground-500" size={34} />
        <p className="text-md text-foreground-300 mb-2">Sections currently <br /> in development</p>
      </div>
    </div>
  );
}
