"use client"
import React from 'react';
import { CopyButton } from './layout/CopyButton';

export function BasicCopyPage() {
  return (
    <div className="min-h-screen bg-background-950 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground-50">Documentation Page</h1>
          <CopyButton />
        </div>

        <div className="bg-background-800 rounded-md border border-background-700 p-8">
          <div className="prose prose-invert space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-foreground-50 mb-4">Overview</h2>
              <div className="space-y-2 text-foreground-300">
                <div className="h-3 bg-background-700 rounded w-full opacity-50" />
                <div className="h-3 bg-background-700 rounded w-5/6 opacity-50" />
                <div className="h-3 bg-background-700 rounded w-4/5 opacity-50" />
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground-50 mb-4">Getting Started</h2>
              <div className="space-y-2 text-foreground-300">
                <div className="h-3 bg-background-700 rounded w-full opacity-50" />
                <div className="h-3 bg-background-700 rounded w-5/6 opacity-50" />
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground-50 mb-4">Features</h2>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent-500 mt-1.5 flex-shrink-0" />
                  <div className="space-y-1">
                    <div className="h-3 bg-background-700 rounded w-32 opacity-50" />
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent-500 mt-1.5 flex-shrink-0" />
                  <div className="space-y-1">
                    <div className="h-3 bg-background-700 rounded w-40 opacity-50" />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
