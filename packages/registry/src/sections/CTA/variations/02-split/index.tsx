'use client';

import React from 'react';
import { Button } from 'ui-lab-components';
import { CheckCircle2 } from 'lucide-react';

export function SplitCTA() {
  const features = [
    'Instant setup and configuration',
    'Real-time analytics and reporting',
    'Dedicated customer support',
    'Enterprise-grade security',
  ];

  return (
    <section className="w-full py-16 px-4 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:gap-12 md:grid-cols-2 items-center">
          {/* Left content */}
          <div className="order-2 md:order-1">
            <div className="mb-4 inline-block rounded-full bg-accent-500/10 px-4 py-1.5">
              <span className="text-sm font-medium text-accent-600">Limited Time Offer</span>
            </div>

            <h2 className="mb-4 text-3xl font-bold text-foreground-400 md:text-4xl">
              Get 50% off for the first 3 months
            </h2>
            <p className="mb-8 text-lg text-foreground-400">
              Upgrade your workflow and unlock powerful features that will transform how your team collaborates.
            </p>

            <ul className="mb-8 space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-accent-500" />
                  <span className="text-foreground-400">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="w-full sm:w-auto">
                Claim Offer
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Learn More
              </Button>
            </div>

            <p className="mt-6 text-sm text-foreground-400">
              No credit card needed. Cancel anytime.
            </p>
          </div>

          {/* Right visual */}
          <div className="order-1 md:order-2">
            <div className="relative">
              {/* Decorative background */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-background-800 to-background-900" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-accent-500/20 to-accent-600/20" />

              {/* Content */}
              <div className="relative rounded-2xl border border-background-700 bg-background-900/50 p-8 backdrop-blur-sm">
                <div className="space-y-4">
                  <div className="h-3 w-24 rounded-full bg-background-700" />
                  <div className="h-3 w-32 rounded-full bg-background-700" />
                  <div className="mt-6 h-32 rounded-md bg-gradient-to-br from-accent-500/30 to-accent-600/30" />
                  <div className="grid grid-cols-3 gap-4 pt-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="rounded bg-background-700 p-3 text-center">
                        <div className="text-lg font-bold text-accent-500">42K</div>
                        <div className="text-xs text-foreground-400">Active Users</div>
                      </div>
                    ))}
                  </div>
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
  name: 'Split CTA',
  description: 'Two-column layout with promotional content on left and visual mockup on right',
  demoPath: 'cta-split',
};
