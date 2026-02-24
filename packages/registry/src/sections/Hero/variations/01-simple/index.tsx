'use client';

import React from 'react';
import { Button } from 'ui-lab-components';

export function SimpleHero() {
  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-background-900 via-background-950 to-background-900 flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground-50 leading-tight">
            Beautiful Design Systems
          </h1>
          <p className="text-xl text-foreground-300 max-w-2xl mx-auto leading-relaxed">
            Build modern interfaces with reusable components and consistent design patterns. Everything you need to create exceptional user experiences.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center pt-4">
          <Button variant="default" size="lg">
            Get Started
          </Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>

        <div className="pt-12 border-t border-background-700">
          <p className="text-sm text-foreground-400 mb-6">Trusted by leading companies</p>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            <div className="h-8 w-24 bg-background-700 rounded opacity-40" />
            <div className="h-8 w-24 bg-background-700 rounded opacity-40" />
            <div className="h-8 w-24 bg-background-700 rounded opacity-40" />
            <div className="h-8 w-24 bg-background-700 rounded opacity-40" />
          </div>
        </div>
      </div>
    </section>
  );
}

export const metadata = {
  name: 'Simple Hero',
  description: 'Clean hero section with headline, subheading, and dual CTA buttons',
  demoPath: 'hero-simple',
};
