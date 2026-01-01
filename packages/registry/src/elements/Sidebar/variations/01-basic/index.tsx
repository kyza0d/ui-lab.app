"use client";

import { Sidebar } from './layout/Sidebar';

export function BasicSidebar() {
  return (
    <div className="flex min-h-screen bg-background-950">
      <Sidebar activeItem="home" />

      <main className="flex-1">
        {/* Content */}
      </main>
    </div>
  );
}
