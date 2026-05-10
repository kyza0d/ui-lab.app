"use client";

import { useState } from 'react';
import { Color } from 'ui-lab-components';

export const metadata = {
  title: 'Inline Color Area',
  description: 'Color.Area can be composed directly inside Color when the picker should stay visible.',
};

export default function Example() {
  const [color, setColor] = useState('#8b5cf6');

  return (
    <div className="flex flex-col gap-4 items-center">
      <Color
        value={color}
        onChange={setColor}
        showPreview={true}
        format="hex"
        size="md"
      >
        <Color.Area />
      </Color>
    </div>
  );
}
