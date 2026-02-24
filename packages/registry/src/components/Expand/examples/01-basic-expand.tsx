import React from 'react';
import { Expand } from 'ui-lab-components';

export const metadata = {
  title: 'Basic Expand',
  description: 'An expandable/collapsible disclosure component. Use this to show and hide content sections while maintaining accessibility and keyboard support.'
};

export default function Example() {
  return (
    <Expand title="What is an Expand component?">
      <p className="text-foreground-300">
        An Expand component is a disclosure widget that expands and collapses content.
        It's built with React Aria for full accessibility support.
      </p>
    </Expand>
  );
}
