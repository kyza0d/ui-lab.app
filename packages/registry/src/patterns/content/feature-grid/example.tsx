import React from 'react';
import { Grid, Card, Flex } from 'ui-lab-components';
import { Zap, Shield, Palette, Layers, Code, Globe } from 'lucide-react';

export const metadata = {
  name: 'Feature Grid',
  description: 'Responsive grid of feature cards with icons and descriptions',
};

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized for performance with minimal bundle size and zero runtime overhead.',
  },
  {
    icon: Shield,
    title: 'Accessible',
    description: 'Built on React Aria with full keyboard navigation and screen reader support.',
  },
  {
    icon: Palette,
    title: 'Themeable',
    description: 'Semantic color system with automatic light and dark mode support.',
  },
  {
    icon: Layers,
    title: 'Composable',
    description: 'Compound component patterns that snap together like building blocks.',
  },
  {
    icon: Code,
    title: 'TypeScript First',
    description: 'Full type safety with autocompletion and inline documentation.',
  },
  {
    icon: Globe,
    title: 'Framework Agnostic',
    description: 'Works with Next.js, Vite, Remix, and any React framework.',
  },
];

export default function FeatureGrid() {
  return (
    <section className="w-full px-6 py-20 bg-background-950">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground-50 mb-3">
            Everything you need
          </h2>
          <p className="text-foreground-300 text-lg max-w-2xl mx-auto">
            A complete toolkit for building modern user interfaces.
          </p>
        </div>
        <Grid columns={{ sm: '1', md: '2', lg: '3' }} gap="md">
          {features.map((feature) => (
            <Card key={feature.title}>
              <Card.Body>
                <Flex direction="column" gap="sm">
                  <div className="w-10 h-10 rounded-lg bg-accent-500/10 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-accent-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground-50">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-foreground-300">
                    {feature.description}
                  </p>
                </Flex>
              </Card.Body>
            </Card>
          ))}
        </Grid>
      </div>
    </section>
  );
}
