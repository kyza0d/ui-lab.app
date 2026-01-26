"use client";

import { Sidebar } from './layout/Sidebar';

export default function SidebarPage() {
  return (
    <div className="flex min-h-screen bg-background-950 text-foreground-100 font-sans">
      <Sidebar activeItem="home" />

      <main className="flex-1 p-12">
        <div className="max-w-6xl mx-auto space-y-12">

          {/* Header Area */}
          <div className="h-12 w-48 bg-background-900/50 rounded-sm"></div>

          {/* Primary Content Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-64 bg-background-900/50 rounded-sm"></div>
            <div className="h-64 bg-background-900/50 rounded-sm"></div>
          </div>

          {/* Secondary Large Block */}
          <div className="h-96 w-full bg-background-900/50 rounded-sm"></div>

        </div>
      </main>
    </div>
  );
}
