import React from 'react';
import { Card, Badge, Button, Grid, Flex } from 'ui-lab-components';
import { Check } from 'lucide-react';

export const metadata = {
  name: 'Pricing Cards',
  description: 'Side-by-side pricing plan cards with feature lists and CTAs',
};

const plans = [
  {
    name: 'Starter',
    price: '$0',
    period: '/month',
    description: 'For individuals and side projects',
    features: [
      '5 projects',
      '1 GB storage',
      'Community support',
      'Basic analytics',
    ],
    buttonVariant: 'outline' as const,
    buttonLabel: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'For growing teams and businesses',
    features: [
      'Unlimited projects',
      '100 GB storage',
      'Priority support',
      'Advanced analytics',
      'Custom domains',
      'Team collaboration',
    ],
    buttonVariant: 'primary' as const,
    buttonLabel: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: '/month',
    description: 'For large organizations',
    features: [
      'Everything in Pro',
      '1 TB storage',
      'Dedicated support',
      'SSO & SAML',
      'Audit logs',
      'Custom contracts',
    ],
    buttonVariant: 'outline' as const,
    buttonLabel: 'Contact Sales',
    highlighted: false,
  },
];

export default function PricingCards() {
  return (
    <section className="w-full px-6 py-20 bg-background-950">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground-50 mb-3">
            Simple, transparent pricing
          </h2>
          <p className="text-foreground-300 text-lg">
            Choose the plan that fits your needs.
          </p>
        </div>
        <Grid columns={{ sm: '1', md: '3' }} gap="md">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={
                plan.highlighted
                  ? 'border-accent-500 ring-1 ring-accent-500/20'
                  : ''
              }
            >
              <Card.Body>
                <Flex direction="column" gap="md">
                  <Flex direction="column" gap="xs">
                    <Flex align="center" gap="sm">
                      <h3 className="text-lg font-semibold text-foreground-50">
                        {plan.name}
                      </h3>
                      {plan.highlighted && (
                        <Badge variant="default">Popular</Badge>
                      )}
                    </Flex>
                    <p className="text-sm text-foreground-400">
                      {plan.description}
                    </p>
                  </Flex>
                  <div>
                    <span className="text-4xl font-bold text-foreground-50">
                      {plan.price}
                    </span>
                    <span className="text-foreground-400">{plan.period}</span>
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-foreground-200"
                      >
                        <Check className="w-4 h-4 text-accent-400 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant={plan.buttonVariant} className="w-full">
                    {plan.buttonLabel}
                  </Button>
                </Flex>
              </Card.Body>
            </Card>
          ))}
        </Grid>
      </div>
    </section>
  );
}
