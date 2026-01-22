import React, { useState } from 'react';
import { ColorPicker } from 'ui-lab-components';

export const metadata = {
  title: 'Basic ColorPicker',
  description: 'A simple color picker with default configuration showing hex format.'
};

export default function Example() {
  const [color, setColor] = useState('#FF6B6B');

  return (
    <div className="p-4 space-y-4">
      <div>
        <p className="text-sm text-foreground-300 mb-3">Selected color: <code className="text-accent-500 font-mono">{color}</code></p>
        <ColorPicker
          value={color}
          onChange={setColor}
          format="hex"
          defaultValue="#FF6B6B"
        />
      </div>
    </div>
  );
}
