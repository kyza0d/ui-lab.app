'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const featureBlocks = [
  {
    id: 1,
    title: 'Advanced Analytics',
    description: 'Gain deep insights into your data with powerful visualization tools and custom reports',
    benefits: [
      'Real-time dashboards',
      'Custom report builder',
      'Data export in multiple formats',
      'Predictive analytics',
    ],
    image: 'analytics',
  },
  {
    id: 2,
    title: 'Seamless Integration',
    description: 'Connect with your favorite tools and services in minutes without any coding',
    benefits: [
      'Pre-built integrations',
      'REST API access',
      'Webhook support',
      'Custom API clients',
    ],
    image: 'integration',
  },
  {
    id: 3,
    title: 'Smart Automation',
    description: 'Automate repetitive tasks and workflows to save time and reduce human error',
    benefits: [
      'Visual workflow builder',
      'Conditional logic',
      'Scheduled execution',
      'Error handling',
    ],
    image: 'automation',
  },
];

export function FeatureList() {
  return (
    <section className="w-full py-16 px-4 md:py-24">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground-900 md:text-4xl">
            Designed for your success
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground-600">
            Comprehensive features to help you achieve your goals faster
          </p>
        </div>

        {/* Feature Blocks */}
        <div className="space-y-16 md:space-y-24">
          {featureBlocks.map((block, index) => (
            <div
              key={block.id}
              className="grid gap-8 md:gap-12 md:grid-cols-2 items-center"
            >
              {/* Content - alternate sides */}
              <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                <h3 className="mb-4 text-2xl font-bold text-foreground-900 md:text-3xl">
                  {block.title}
                </h3>
                <p className="mb-6 text-lg text-foreground-600">
                  {block.description}
                </p>

                <ul className="space-y-3">
                  {block.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-accent-500" />
                      <span className="text-foreground-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual - alternate sides */}
              <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                <div className="relative">
                  {/* Decorative background */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-background-800 to-background-900" />
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-tr ${
                    index === 0 ? 'from-accent-500/20 to-accent-600/20' :
                    index === 1 ? 'from-blue-500/20 to-blue-600/20' :
                    'from-purple-500/20 to-purple-600/20'
                  }`} />

                  {/* Content */}
                  <div className="relative rounded-2xl border border-background-700 bg-background-900/50 p-8 backdrop-blur-sm overflow-hidden">
                    {/* Placeholder visual */}
                    <div className="space-y-4">
                      <div className="h-4 w-16 rounded-full bg-background-700" />
                      <div className="h-4 w-20 rounded-full bg-background-700" />
                      <div className="mt-6 h-40 rounded-md bg-gradient-to-br from-foreground-200/20 to-foreground-100/10" />
                      <div className="grid grid-cols-3 gap-2 pt-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="h-12 rounded bg-background-700" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const metadata = {
  name: 'Feature List',
  description: 'Alternating left-right layout showcasing detailed features with benefits',
  demoPath: 'features-list',
};
