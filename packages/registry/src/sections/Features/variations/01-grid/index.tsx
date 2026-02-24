'use client';

import React from 'react';
import {
  Zap,
  Shield,
  Gauge,
  Users,
  Clock,
  TrendingUp
} from 'lucide-react';

const features = [
  {
    icon: Zap,
    name: 'Lightning Fast',
    description: 'Optimized performance with sub-100ms response times',
  },
  {
    icon: Shield,
    name: 'Secure by Default',
    description: 'Enterprise-grade encryption and security protocols',
  },
  {
    icon: Gauge,
    name: 'Highly Scalable',
    description: 'Handles millions of requests without breaking a sweat',
  },
  {
    icon: Users,
    name: 'Team Friendly',
    description: 'Built for collaboration with real-time synchronization',
  },
  {
    icon: Clock,
    name: '24/7 Support',
    description: 'Round-the-clock customer support and monitoring',
  },
  {
    icon: TrendingUp,
    name: 'Grow Your Business',
    description: 'Built-in analytics to track growth and optimize performance',
  },
];

export function GridFeatures() {
  return (
    <section className="w-full py-16 px-4 md:py-24">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold text-foreground-400 md:text-4xl">
            Powerful features for modern teams
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground-400">
            Everything you need to build, deploy, and scale your applications with confidence
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group rounded-md border border-background-700 bg-background-900/50 p-6 backdrop-blur-sm transition-all hover:border-accent-500/50 hover:bg-background-900"
              >
                <div className="mb-4 inline-flex rounded-md bg-accent-500/10 p-3">
                  <Icon className="h-6 w-6 text-accent-500" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground-400">
                  {feature.name}
                </h3>
                <p className="text-foreground-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export const metadata = {
  name: 'Grid Features',
  description: '3-column grid layout showcasing key features with icons',
  demoPath: 'features-grid',
};
