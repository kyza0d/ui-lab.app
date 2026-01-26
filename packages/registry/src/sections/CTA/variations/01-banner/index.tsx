'use client';

import React from 'react';
import { Button } from 'ui-lab-components';
import { ArrowRight } from 'lucide-react';

export function BannerCTA() {
  return (
    <section className="w-full py-16 px-4 md:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-accent-600 to-accent-500 px-6 py-12 md:px-12 md:py-16">
          {/* Decorative elements */}
          <div className="absolute right-0 top-0 h-96 w-96 translate-x-1/3 -translate-y-1/4 rounded-full bg-accent-400 opacity-10 blur-3xl" />
          <div className="absolute left-0 bottom-0 h-80 w-80 -translate-x-1/3 translate-y-1/4 rounded-full bg-accent-600 opacity-10 blur-3xl" />

          <div className="relative z-10">
            <h2 className="mx-auto mb-4 max-w-2xl text-3xl font-bold text-white md:text-4xl">
              Ready to get started?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-lg text-accent-50">
              Join thousands of satisfied users and transform the way you work today. No credit card required.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                variant="secondary"
                size="lg"
                className="group w-full sm:w-auto"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const metadata = {
  name: 'Banner CTA',
  description: 'Wide banner call-to-action with gradient background and dual action buttons',
  demoPath: 'cta-banner',
};
