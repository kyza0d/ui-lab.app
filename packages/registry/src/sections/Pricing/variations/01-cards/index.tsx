'use client';

import React from 'react';
import { Button } from 'ui-lab-components';
import { Check } from 'lucide-react';

const pricingPlans = [
  {
    id: 1,
    name: 'Starter',
    description: 'Perfect for getting started',
    price: 29,
    period: 'month',
    cta: 'Get Started',
    highlighted: false,
    features: [
      'Up to 1,000 requests/month',
      'Basic analytics',
      'Community support',
      'API access',
    ],
  },
  {
    id: 2,
    name: 'Professional',
    description: 'Best for growing teams',
    price: 99,
    period: 'month',
    cta: 'Start Free Trial',
    highlighted: true,
    features: [
      'Up to 100,000 requests/month',
      'Advanced analytics',
      'Priority email support',
      'API access',
      'Custom integrations',
      'Team collaboration',
    ],
  },
  {
    id: 3,
    name: 'Enterprise',
    description: 'For large-scale operations',
    price: null,
    period: 'contact',
    cta: 'Contact Sales',
    highlighted: false,
    features: [
      'Unlimited requests',
      'Real-time analytics',
      '24/7 dedicated support',
      'Custom API endpoints',
      'Advanced security',
      'SLA guarantee',
    ],
  },
];

export function PricingCards() {
  return (
    <section className="w-full py-16 px-4 md:py-24">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold text-foreground-900 md:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground-600">
            Choose the perfect plan for your needs. Always flexible to scale.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 md:grid-cols-3 items-start">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-8 transition-all ${
                plan.highlighted
                  ? 'border border-accent-500 bg-gradient-to-br from-accent-500/10 to-accent-600/5 ring-1 ring-accent-500/20'
                  : 'border border-background-700 bg-background-900/50 hover:border-background-600'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-accent-500 px-4 py-1 text-xs font-semibold text-white">
                    Most Popular
                  </span>
                </div>
              )}

              <h3 className="mb-2 text-2xl font-bold text-foreground-900">
                {plan.name}
              </h3>
              <p className="mb-6 text-foreground-600">{plan.description}</p>

              {/* Pricing */}
              <div className="mb-8">
                {plan.price ? (
                  <>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-foreground-900">
                        ${plan.price}
                      </span>
                      <span className="text-foreground-600">/{plan.period}</span>
                    </div>
                  </>
                ) : (
                  <div className="text-lg font-semibold text-foreground-900">
                    Custom pricing
                  </div>
                )}
              </div>

              {/* CTA */}
              <Button
                className="mb-8 w-full"
                variant={plan.highlighted ? 'default' : 'outline'}
              >
                {plan.cta}
              </Button>

              {/* Features */}
              <div className="border-t border-background-700 pt-8">
                <ul className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 flex-shrink-0 text-accent-500 mt-0.5" />
                      <span className="text-foreground-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-12 text-center">
          <p className="text-foreground-600">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
}

export const metadata = {
  name: 'Pricing Cards',
  description: '3-column pricing tier cards with features list and highlighted popular plan',
  demoPath: 'pricing-cards',
};
