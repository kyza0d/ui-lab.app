import React from 'react';
import { Flex } from 'ui-lab-components';

export const metadata = {
  title: 'Basic Flex',
  description: 'A simple flex layout arranging items in a row. Use this component to easily create flexible layouts with consistent spacing.'
};

export default function Example() {
  return (
    <Flex gap="md">
      <div className="h-16 w-20 bg-background-800 rounded border border-accent-500/50 flex items-center justify-center">1</div>
      <div className="h-16 w-20 bg-background-800 rounded border border-accent-500/50 flex items-center justify-center">2</div>
      <div className="h-16 w-20 bg-background-800 rounded border border-accent-500/50 flex items-center justify-center">3</div>
    </Flex>
  );
}
