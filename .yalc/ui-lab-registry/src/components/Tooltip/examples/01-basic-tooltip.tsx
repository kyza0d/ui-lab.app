import React from 'react';
import { Tooltip } from 'ui-lab-components';

export const metadata = {
  title: 'Basic Tooltip',
  description: 'A simple tooltip that appears on hover. Hover over the button to see the tooltip with helpful information.'
};

export default function Example() {
  return (
    <Tooltip content="This is a helpful tooltip">
      <button>Hover me</button>
    </Tooltip>
  );
}
