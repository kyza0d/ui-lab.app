import React from 'react';
import { Sidebar } from './layout/Sidebar';

export function BasicSidebar() {
  return (
    <div className="flex min-h-screen bg-background-950">
      <Sidebar activeItem="home" />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-8 py-12">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground-50 mb-2">Welcome</h1>
              <p className="text-foreground-400">This is a basic sidebar layout example</p>
            </div>

            <div className="bg-background-800 rounded-lg border border-background-700 p-8">
              <div className="h-32 bg-background-700 rounded mb-4" />
              <div className="space-y-3">
                <div className="h-4 bg-background-700 rounded w-3/4" />
                <div className="h-4 bg-background-700 rounded w-5/6" />
                <div className="h-4 bg-background-700 rounded w-4/5" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <div key={i} className="bg-background-800 rounded-lg border border-background-700 p-6">
                  <div className="h-24 bg-background-700 rounded mb-4" />
                  <div className="space-y-2">
                    <div className="h-4 bg-background-700 rounded w-4/5" />
                    <div className="h-3 bg-background-700 rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-background-800 rounded-lg border border-background-700 p-8">
              <div className="space-y-3">
                <div className="h-4 bg-background-700 rounded w-full" />
                <div className="h-4 bg-background-700 rounded w-full" />
                <div className="h-4 bg-background-700 rounded w-3/4" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
