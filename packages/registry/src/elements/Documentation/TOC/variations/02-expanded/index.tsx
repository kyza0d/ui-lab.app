"use client"
import React, { useState } from 'react';
import { ExpandableTableOfContents } from './layout/ExpandableTableOfContents';

export function ExpandedTOC() {
  const [activeSection, setActiveSection] = useState('intro');

  return (
    <div className="flex gap-8 min-h-screen bg-background-950 p-8">
      <div className="flex-1">
        <article className="space-y-8">
          <section id="intro">
            <h2 className="text-2xl font-bold text-foreground-50 mb-4">Introduction</h2>
            <p className="text-foreground-300 mb-4">
              Comprehensive guide with expandable table of contents showing active section.
            </p>
            <div className="space-y-3">
              <div className="h-3 bg-background-700 rounded w-full opacity-50" />
              <div className="h-3 bg-background-700 rounded w-5/6 opacity-50" />
            </div>
          </section>

          <section id="concepts">
            <h2 className="text-2xl font-bold text-foreground-50 mb-4">Core Concepts</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground-50 mb-3">Fundamentals</h3>
                <div className="space-y-2 ml-4">
                  <div className="h-3 bg-background-700 rounded w-4/5 opacity-40" />
                  <div className="h-3 bg-background-700 rounded w-5/6 opacity-40" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground-50 mb-3">Advanced Topics</h3>
                <div className="space-y-2 ml-4">
                  <div className="h-3 bg-background-700 rounded w-4/5 opacity-40" />
                  <div className="h-3 bg-background-700 rounded w-5/6 opacity-40" />
                </div>
              </div>
            </div>
          </section>

          <section id="implementation">
            <h2 className="text-2xl font-bold text-foreground-50 mb-4">Implementation</h2>
            <div className="space-y-3">
              <div className="h-3 bg-background-700 rounded w-full opacity-50" />
              <div className="h-3 bg-background-700 rounded w-5/6 opacity-50" />
              <div className="h-3 bg-background-700 rounded w-4/5 opacity-50" />
            </div>
          </section>

          <section id="examples">
            <h2 className="text-2xl font-bold text-foreground-50 mb-4">Examples</h2>
            <div className="space-y-3">
              <div className="h-3 bg-background-700 rounded w-full opacity-50" />
              <div className="h-3 bg-background-700 rounded w-5/6 opacity-50" />
            </div>
          </section>
        </article>
      </div>

      <aside className="w-72 sticky top-8 h-fit">
        <ExpandableTableOfContents activeSection={activeSection} />
      </aside>
    </div>
  );
}
