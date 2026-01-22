'use client';

import React from 'react';
import { Button } from 'ui-lab-components';
import { Zap, Shield, Rocket, Layers } from 'lucide-react';

export function HeroWithFeatures() {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance for blazing fast load times and smooth interactions.',
    },
    {
      icon: Shield,
      title: 'Secure by Default',
      description: 'Enterprise-grade security with built-in protection and compliance standards.',
    },
    {
      icon: Rocket,
      title: 'Production Ready',
      description: 'Battle-tested code ready for immediate deployment to production.',
    },
    {
      icon: Layers,
      title: 'Fully Customizable',
      description: 'Extensive configuration options to match your unique brand and requirements.',
    },
  ];

  return (
    <section className="w-full bg-background-950 px-4 py-20">
      <div className="max-w-6xl mx-auto w-full">
        <div className="space-y-12">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-background-700 bg-background-900">
              <span className="w-2 h-2 rounded-full bg-accent-500" />
              <span className="text-sm text-foreground-400">Powerful Features</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground-50 leading-tight">
                Everything You Need to Succeed
              </h1>
              <p className="text-lg text-foreground-300 max-w-2xl mx-auto leading-relaxed">
                Comprehensive toolkit with all the features you need to build amazing applications quickly and efficiently.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button variant="default" size="lg">
                Start Building
              </Button>
              <Button variant="outline" size="lg">
                View Documentation
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
            {features.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-6 rounded-xl border border-background-700 bg-gradient-to-br from-background-900/50 to-background-950 hover:border-accent-500/30 transition-colors group"
                >
                  <div className="mb-4 inline-flex p-3 rounded-md bg-accent-500/10 group-hover:bg-accent-500/20 transition-colors">
                    <IconComponent className="w-6 h-6 text-accent-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground-50 mb-2">{feature.title}</h3>
                  <p className="text-sm text-foreground-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export const metadata = {
  name: 'Hero with Features',
  description: 'Hero section with feature cards showcasing key benefits and capabilities',
  demoPath: 'hero-with-features',
};
