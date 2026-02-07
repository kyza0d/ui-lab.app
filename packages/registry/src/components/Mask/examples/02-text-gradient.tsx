import React from 'react';
import { Mask } from 'ui-lab-components';

export const metadata = {
  title: 'Mask - Text Gradient',
  description: 'Using the mask component to create a generic gradient effect on text elements.'
};

export default function Example() {
  return (
    <div className="w-full flex flex-col items-center justify-center space-y-8 p-8">
      <div className="w-full max-w-2xl">
        <Mask.Gradient gradient="linear-gradient(to right, var(--foreground-200), var(--accent-500))">
          <div className="whitespace-nowrap text-3xl text-center">
            Gradient
          </div>
        </Mask.Gradient>
      </div>
    </div>
  );
}
