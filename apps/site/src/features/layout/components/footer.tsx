"use client";

import { Logo } from "@/shared";

export function Footer() {
  return (
    <footer className="py-6 px-8 relative bg-background-950 border-t border-background-700/40 overflow-hidden">
      <div className="absolute inset-0 bg-background-950/80 -z-10" />

      <div className="relative flex z-10 px-2">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="text-md font-semibold text-foreground-300">UI Lab</span>
        </div>
      </div>
    </footer>
  );
}
