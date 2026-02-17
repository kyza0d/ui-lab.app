import React from 'react';
import { Button, Group, Flex } from 'ui-lab-components';

export const metadata = {
  name: 'Hero with CTA',
  description: 'Hero section with headline, subheadline, and call-to-action button group',
};

export default function HeroWithCTA() {
  return (
    <section className="w-full min-h-[70vh] flex items-center justify-center px-6 py-20 bg-background-950">
      <Flex direction="column" align="center" gap="lg">
        <div className="text-center max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground-50 mb-4 tracking-tight">
            Build beautiful interfaces
          </h1>
          <p className="text-lg md:text-xl text-foreground-300 max-w-2xl mx-auto">
            A composable component library for modern React applications.
            Ship faster with accessible, themeable components.
          </p>
        </div>
        <Group spacing="sm">
          <Button variant="primary" size="lg">
            Get Started
          </Button>
          <Button variant="ghost" size="lg">
            View Documentation
          </Button>
        </Group>
      </Flex>
    </section>
  );
}
