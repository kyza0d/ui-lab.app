import React from 'react';
import { Button, Group, Flex } from 'ui-lab-components';

export const metadata = {
  name: 'Sticky Header',
  description: 'Fixed navigation header with logo, links, and action buttons',
};

const navLinks = ['Features', 'Pricing', 'Docs', 'Blog'];

export default function StickyHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-background-800 bg-background-950/80 backdrop-blur-md">
      <Flex
        align="center"
        justify="space-between"
        className="max-w-6xl mx-auto h-16 px-6"
      >
        <Flex align="center" gap="lg">
          <span className="text-lg font-bold text-foreground-50">
            Acme
          </span>
          <nav>
            <Group spacing="sm">
              {navLinks.map((link) => (
                <Button key={link} variant="ghost" size="sm">
                  {link}
                </Button>
              ))}
            </Group>
          </nav>
        </Flex>
        <Group spacing="sm">
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
          <Button variant="primary" size="sm">
            Get Started
          </Button>
        </Group>
      </Flex>
    </header>
  );
}
