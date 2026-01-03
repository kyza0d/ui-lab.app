import React from 'react';
import { Divider } from 'ui-lab-components';

export const metadata = {
  title: 'Vertical Orientation',
  description: 'Vertical dividers separate side-by-side content. All pattern variants work in both horizontal and vertical orientations.'
};

export default function Example() {
  return (
    <div className="flex items-center gap-4 h-16">
      <span className="text-foreground-300">First</span>
      <Divider orientation="vertical" variant="solid" spacing="none" />
      <span className="text-foreground-300">Second</span>
      <Divider orientation="vertical" variant="dashed" spacing="none" />
      <span className="text-foreground-300">Third</span>
      <Divider orientation="vertical" variant="dotted" spacing="none" />
      <span className="text-foreground-300">Fourth</span>
    </div>
  );
}
