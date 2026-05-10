"use client";

import { Color } from 'ui-lab-components';

export const metadata = {
  title: 'Color Trigger',
  description: 'An uncontrolled color picker using Color as the provider and Color.Trigger to open the picker area in a popover.',
};

export default function Example() {
  return (
    <div className="flex items-center justify-center">
      <Color defaultValue="#3b82f6" size="md">
        <Color.Trigger aria-label="Choose color" />
      </Color>
    </div>
  );
}
