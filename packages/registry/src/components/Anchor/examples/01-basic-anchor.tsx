import React from 'react';
import { Anchor } from 'ui-lab-components';

export const metadata = {
  title: 'Basic Anchor',
  description: 'A simple anchor component with custom underline. Hover to see the popover preview.'
};

export default function Example() {
  return (
    <Anchor>
      Learn more about this topic
      <Anchor.Preview>
        <div className="text-sm">Preview content</div>
      </Anchor.Preview>
    </Anchor>
  );
}
