import React from 'react';
import { Divider } from 'ui-lab-components';

export const metadata = {
  title: 'Basic Divider',
  description: 'A simple horizontal divider separating content sections. Use this to create visual separation between different areas of your interface.'
};

export default function Example() {
  return (
    <div className="space-y-4">
      <div className="text-foreground-300">Content above</div>
      <Divider />
      <div className="text-foreground-300">Content below</div>
    </div>
  );
}
