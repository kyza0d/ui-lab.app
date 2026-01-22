'use client';

import React from 'react';
import { Button } from 'ui-lab-components';
import { Check, X } from 'lucide-react';

const comparisonData = {
  plans: [
    { id: 1, name: 'Starter', price: 29 },
    { id: 2, name: 'Professional', price: 99 },
    { id: 3, name: 'Enterprise', price: null },
  ],
  features: [
    {
      category: 'Core Features',
      items: [
        { name: 'API Requests', starter: '1K/month', professional: '100K/month', enterprise: 'Unlimited' },
        { name: 'Rate Limits', starter: '10 req/sec', professional: '100 req/sec', enterprise: 'Custom' },
        { name: 'Data Retention', starter: '30 days', professional: '90 days', enterprise: 'Unlimited' },
        { name: 'Webhook Support', starter: true, professional: true, enterprise: true },
      ],
    },
    {
      category: 'Analytics & Reporting',
      items: [
        { name: 'Basic Analytics', starter: true, professional: true, enterprise: true },
        { name: 'Advanced Analytics', starter: false, professional: true, enterprise: true },
        { name: 'Custom Reports', starter: false, professional: true, enterprise: true },
        { name: 'Real-time Dashboards', starter: false, professional: false, enterprise: true },
      ],
    },
    {
      category: 'Support & Security',
      items: [
        { name: 'Email Support', starter: true, professional: true, enterprise: true },
        { name: 'Priority Support', starter: false, professional: true, enterprise: true },
        { name: '24/7 Phone Support', starter: false, professional: false, enterprise: true },
        { name: 'SSO & SAML', starter: false, professional: false, enterprise: true },
      ],
    },
  ],
};

export function PricingComparison() {
  return (
    <section className="w-full py-16 px-4 md:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground-900 md:text-4xl">
            Compare all plans
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground-600">
            Find the perfect plan with detailed feature comparison
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-2xl border border-background-700 bg-background-900/50">
          <table className="w-full">
            <thead>
              <tr className="border-b border-background-700">
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground-900">
                  Features
                </th>
                {comparisonData.plans.map((plan) => (
                  <th
                    key={plan.id}
                    className="px-6 py-4 text-center text-sm font-semibold text-foreground-900"
                  >
                    <div className="mb-2">{plan.name}</div>
                    {plan.price ? (
                      <div className="text-lg font-bold text-accent-500">
                        ${plan.price}
                        <span className="text-xs text-foreground-600">/mo</span>
                      </div>
                    ) : (
                      <div className="text-sm text-foreground-600">Custom</div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonData.features.map((category, categoryIndex) => (
                <React.Fragment key={categoryIndex}>
                  <tr className="border-t border-background-700 bg-background-900/30">
                    <td
                      colSpan={4}
                      className="px-6 py-4 text-sm font-semibold text-foreground-700"
                    >
                      {category.category}
                    </td>
                  </tr>
                  {category.items.map((item, itemIndex) => (
                    <tr key={itemIndex} className="border-t border-background-700/50">
                      <td className="px-6 py-4 text-sm text-foreground-700">
                        {item.name}
                      </td>
                      {comparisonData.plans.map((plan) => {
                        const value =
                          item[plan.name.toLowerCase() as keyof typeof item];
                        return (
                          <td key={plan.id} className="px-6 py-4 text-center">
                            {typeof value === 'boolean' ? (
                              value ? (
                                <Check className="mx-auto h-5 w-5 text-accent-500" />
                              ) : (
                                <X className="mx-auto h-5 w-5 text-foreground-600" />
                              )
                            ) : (
                              <span className="text-sm text-foreground-700">
                                {value}
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA Section */}
        <div className="mt-12 rounded-2xl border border-background-700 bg-background-900/50 p-8 text-center">
          <h3 className="mb-4 text-2xl font-bold text-foreground-900">
            Ready to get started?
          </h3>
          <p className="mb-6 text-foreground-600">
            Choose your plan and start building today. All plans include a 14-day free trial.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button variant="outline">View Starter</Button>
            <Button>View Professional</Button>
            <Button variant="outline">Contact Sales</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export const metadata = {
  name: 'Pricing Comparison',
  description: 'Feature comparison table showing all plans with detailed breakdown',
  demoPath: 'pricing-comparison',
};
