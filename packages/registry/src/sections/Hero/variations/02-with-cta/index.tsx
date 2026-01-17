import React from 'react';
import { Button } from 'ui-lab-components';

export function HeroWithCTA() {
  return (
    <section className="w-full min-h-screen bg-background-950 flex items-center justify-center px-4 py-20">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-background-700 bg-background-900">
              <span className="w-2 h-2 rounded-full bg-accent-500" />
              <span className="text-sm text-foreground-400">Now Available</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground-50 leading-tight">
                Accelerate Your Development
              </h1>
              <p className="text-lg text-foreground-300 leading-relaxed">
                Comprehensive component library with production-ready code, extensive documentation, and accessibility best practices built in.
              </p>
            </div>

            <ul className="space-y-3">
              {['50+ UI Components', 'TypeScript Support', 'Fully Customizable'].map(feature => (
                <li key={feature} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-accent-400" />
                  </div>
                  <span className="text-foreground-300">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button variant="default" size="lg">
                Start Building
              </Button>
              <Button variant="outline" size="lg">
                View Docs
              </Button>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-500/10 to-accent-600/10 rounded-xl blur-3xl" />
              <div className="relative bg-gradient-to-br from-background-900 to-background-800 rounded-xl p-8 border border-background-700 shadow-xl">
                <div className="space-y-3">
                  <div className="h-12 bg-background-700/50 rounded" />
                  <div className="h-8 bg-background-700/30 rounded w-3/4" />
                  <div className="h-8 bg-background-700/30 rounded w-2/3" />
                </div>
                <div className="mt-8 space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-3 bg-background-700/20 rounded" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const metadata = {
  name: 'Hero with CTA',
  description: 'Alternating layout with feature highlights and visual mockup representation',
  demoPath: 'hero-with-cta',
};
