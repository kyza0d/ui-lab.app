"use client";

import { useState } from 'react';
import { Color } from 'ui-lab-components';

export const metadata = {
  title: 'Controlled Color Trigger',
  description: 'A controlled color picker with alpha support, using Color.Trigger to keep the picker area in a popover.',
};

export default function Example() {
  const [color, setColor] = useState('#ef4444');

  return (
    <div className="flex flex-col gap-4 items-center">
      <Color
        value={color}
        onChange={setColor}
        showOpacity={true}
        size="md"
      >
        <Color.Trigger aria-label="Choose accent color" />
      </Color>
      <div className="text-sm text-foreground-400">
        Selected: {color}
      </div>
    </div>
  );
}
