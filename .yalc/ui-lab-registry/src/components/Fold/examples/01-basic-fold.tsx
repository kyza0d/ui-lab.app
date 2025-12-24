import React from 'react';
import { Fold } from 'ui-lab-components';

export const metadata = {
  title: 'Basic Fold',
  description: 'An expandable/collapsible disclosure component. Use this to show and hide content sections while maintaining accessibility and keyboard support.'
};

export default function Example() {
  return (
    <Fold title="What is a Fold component?">
      <p className="text-foreground-300">
        A Fold component is a disclosure widget that expands and collapses content.
        It's built with React Aria for full accessibility support.
      </p>
    </Fold>
  );
}
