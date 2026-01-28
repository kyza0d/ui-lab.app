"use client"
import React from 'react';
import { TableOfContents } from './layout/TableOfContents';

export function BasicTOC() {
  return (
    <div className="flex gap-8 min-h-screen bg-background-950 p-8">
      <div className="flex-1">
        <article className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground-50 mb-4">Introduction</h2>
            <p className="text-foreground-300 mb-4">
              This document provides a comprehensive guide to getting started with UI Lab components.
            </p>
            <div className="space-y-3">
              <div className="h-3 bg-background-700 rounded w-full opacity-50" />
              <div className="h-3 bg-background-700 rounded w-5/6 opacity-50" />
              <div className="h-3 bg-background-700 rounded w-4/5 opacity-50" />
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold text-foreground-50 mb-4">Overview</h3>
            <div className="space-y-3">
              <div className="h-3 bg-background-700 rounded w-full opacity-40" />
              <div className="h-3 bg-background-700 rounded w-5/6 opacity-40" />
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold text-foreground-50 mb-4">Getting Started</h3>
            <div className="space-y-3">
              <div className="h-3 bg-background-700 rounded w-full opacity-40" />
              <div className="h-3 bg-background-700 rounded w-4/5 opacity-40" />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground-50 mb-4">Installation</h2>
            <div className="space-y-3">
              <div className="h-3 bg-background-700 rounded w-full opacity-50" />
              <div className="h-3 bg-background-700 rounded w-5/6 opacity-50" />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground-50 mb-4">Usage</h2>
            <div className="space-y-3">
              <div className="h-3 bg-background-700 rounded w-full opacity-50" />
              <div className="h-3 bg-background-700 rounded w-3/4 opacity-50" />
            </div>
          </section>
        </article>
      </div>

      <aside className="w-64 sticky top-8 h-fit">
        <TableOfContents />
      </aside>
    </div>
  );
}
