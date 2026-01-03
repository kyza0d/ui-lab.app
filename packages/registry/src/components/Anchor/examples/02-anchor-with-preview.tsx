import React from 'react';
import { Anchor } from 'ui-lab-components';

export const metadata = {
  title: 'Anchor with Rich Preview',
  description: 'Anchor component displaying a richer preview content on hover.'
};

export default function Example() {
  return (
    <div className="space-y-4">
      <p>
        This is a paragraph with an{' '}
        <Anchor>
          React documentation
          <Anchor.Preview>
            <div className="space-y-2 max-w-xs">
              <div className="font-semibold">React Documentation</div>
              <p className="text-xs opacity-90">
                Learn about React's component model and hooks for building interactive user interfaces.
              </p>
            </div>
          </Anchor.Preview>
        </Anchor>
        {' '}link embedded in the text.
      </p>
    </div>
  );
}
