import React, { useState } from 'react';
import { Color } from 'ui-lab-components';

export const metadata = {
  title: 'Opacity Slider',
  description: 'Color picker with opacity/alpha slider enabled for transparent color selection.'
};

export default function Example() {
  const [color, setColor] = useState('rgba(106, 90, 205, 0.75)');

  return (
    <div className="p-4 space-y-4">
      <div>
        <p className="text-sm text-foreground-300 mb-3">Selected color: <code className="text-accent-500 font-mono">{color}</code></p>
        <Color
          value={color}
          onChange={setColor}
          showOpacity
          format="rgb"
          defaultValue="rgba(106, 90, 205, 0.75)"
        />
      </div>
    </div>
  );
}
