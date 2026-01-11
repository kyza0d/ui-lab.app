import React from 'react';
import { Header } from './layout/Header';

export function HeaderWithActions() {
  return (
    <div className="flex flex-col min-h-screen bg-background-950">
      <Header logoText="UI Lab" />

      <main className="flex-1">
        <div className="mx-auto px-4 py-12">
          <div className="space-y-6">
            <div className="bg-background-800 rounded-lg border border-background-700 p-8">
              <div className="h-32 bg-background-700 rounded mb-4" />
              <div className="space-y-3">
                <div className="h-4 bg-background-700 rounded w-3/4" />
                <div className="h-4 bg-background-700 rounded w-5/6" />
                <div className="h-4 bg-background-700 rounded w-4/5" />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-background-800 rounded-lg border border-background-700 p-6">
                  <div className="h-20 bg-background-700 rounded mb-3" />
                  <div className="space-y-2">
                    <div className="h-3 bg-background-700 rounded w-4/5" />
                    <div className="h-2 bg-background-700 rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-background-800 rounded-lg border border-background-700 p-8">
              <h2 className="text-xl font-semibold text-foreground-50 mb-4">Content Section</h2>
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
