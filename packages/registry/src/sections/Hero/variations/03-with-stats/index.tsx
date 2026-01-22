'use client';

import React from 'react';
import { Button } from 'ui-lab-components';

export function HeroWithStats() {
  const stats = [
    { label: 'Projects Completed', value: '500+' },
    { label: 'Happy Clients', value: '1000+' },
    { label: 'Team Members', value: '50+' },
    { label: 'Years in Business', value: '10+' },
  ];

  return (
    <section className="w-full min-h-screen bg-background-950 flex items-center justify-center px-4 py-20">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center space-y-12">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-background-700 bg-background-900">
              <span className="w-2 h-2 rounded-full bg-accent-500" />
              <span className="text-sm text-foreground-400">Proven Track Record</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground-50 leading-tight">
                Trusted by Industry Leaders
              </h1>
              <p className="text-lg text-foreground-300 max-w-2xl mx-auto leading-relaxed">
                Our proven expertise and track record speak for themselves. Join hundreds of satisfied clients who've transformed their businesses with our solutions.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button variant="default" size="lg">
                Get Started Today
              </Button>
              <Button variant="outline" size="lg">
                View Case Studies
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-background-700">
            {stats.map((stat) => (
              <div key={stat.label} className="space-y-2">
                <div className="text-3xl lg:text-4xl font-bold text-accent-500">
                  {stat.value}
                </div>
                <p className="text-sm text-foreground-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export const metadata = {
  name: 'Hero with Stats',
  description: 'Hero section with statistics and metrics showcasing company achievements and credibility',
  demoPath: 'hero-with-stats',
};
