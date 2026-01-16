'use client';

import { Page } from './layout/Page';

export function BasicPage() {
  return (
    <Page>
      <div className="space-y-6">
        <div className="bg-background-800 rounded-lg border border-background-700 p-8">
          <h2 className="text-2xl font-semibold text-foreground-100 mb-4">Welcome to Your Page</h2>
          <div className="space-y-3">
            <div className="h-4 bg-background-700 rounded w-3/4" />
            <div className="h-4 bg-background-700 rounded w-5/6" />
            <div className="h-4 bg-background-700 rounded w-4/5" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
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
    </Page>
  );
}
