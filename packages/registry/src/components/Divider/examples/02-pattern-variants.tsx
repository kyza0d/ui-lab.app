import React from 'react';
import { Divider } from 'ui-lab-components';

export const metadata = {
  title: 'Pattern Variants',
  description: 'Dividers support three distinct pattern styles: solid for continuous lines, dashed for rectangular segments, and dotted for circular dots.'
};

export default function Example() {
  return (
    <div className="space-y-6 w-full">
      <div className="space-y-2">
        <span className="text-xs text-foreground-400">Solid</span>
        <Divider variant="solid" />
      </div>
      <div className="space-y-2">
        <span className="text-xs text-foreground-400">Dashed</span>
        <Divider variant="dashed" />
      </div>
      <div className="space-y-2">
        <span className="text-xs text-foreground-400">Dotted</span>
        <Divider variant="dotted" />
      </div>
    </div>
  );
}
