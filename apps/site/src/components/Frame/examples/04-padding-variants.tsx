import React from 'react';
import Frame from '../Frame';

export const metadata = {
  title: 'Padding Variants',
  description: 'Frames with different padding options to accommodate various content layouts.'
};

export default function Example() {
  return (
    <div className="space-y-4">
      <Frame variant="default" padding="small" className="w-full max-w-md">
        <p className="text-sm text-foreground-300">Small padding</p>
      </Frame>
      <Frame variant="default" padding="medium" className="w-full max-w-md">
        <p className="text-sm text-foreground-300">Medium padding</p>
      </Frame>
      <Frame variant="default" padding="large" className="w-full max-w-md">
        <p className="text-sm text-foreground-300">Large padding</p>
      </Frame>
    </div>
  );
}
