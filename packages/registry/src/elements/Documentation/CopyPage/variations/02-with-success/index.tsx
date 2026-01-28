"use client"
import React, { useState } from 'react';
import { CopyButtonWithToast } from './layout/CopyButtonWithToast';

export function CopyPageWithSuccess() {
  const [notification, setNotification] = useState<string | null>(null);

  const handleCopySuccess = () => {
    setNotification('Page content copied to clipboard!');
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="min-h-screen bg-background-950 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground-50">Share & Copy Documentation</h1>
          <CopyButtonWithToast onCopySuccess={handleCopySuccess} />
        </div>

        {notification && (
          <div className="mb-6 px-4 py-3 bg-success-500 bg-opacity-20 border border-success-500 rounded-md text-success-200 flex items-center gap-3">
            <span>✓</span>
            <span>{notification}</span>
          </div>
        )}

        <div className="bg-background-800 rounded-md border border-background-700 p-8">
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-foreground-50 mb-4">Content Section 1</h2>
              <div className="space-y-2 text-foreground-300">
                <div className="h-3 bg-background-700 rounded w-full opacity-50" />
                <div className="h-3 bg-background-700 rounded w-5/6 opacity-50" />
              </div>
            </section>

            <div className="border-t border-background-700 pt-6" />

            <section>
              <h2 className="text-xl font-semibold text-foreground-50 mb-4">Content Section 2</h2>
              <div className="space-y-2 text-foreground-300">
                <div className="h-3 bg-background-700 rounded w-full opacity-50" />
                <div className="h-3 bg-background-700 rounded w-4/5 opacity-50" />
              </div>
            </section>

            <div className="border-t border-background-700 pt-6" />

            <section>
              <h2 className="text-xl font-semibold text-foreground-50 mb-4">Content Section 3</h2>
              <div className="space-y-2 text-foreground-300">
                <div className="h-3 bg-background-700 rounded w-full opacity-50" />
                <div className="h-3 bg-background-700 rounded w-5/6 opacity-50" />
                <div className="h-3 bg-background-700 rounded w-3/4 opacity-50" />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
