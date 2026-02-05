import React, { useState } from 'react';
import { Color } from 'ui-lab-components';

export const metadata = {
  title: 'Format Switching',
  description: 'Color picker with format toggle between hex and RGB to copy colors in different formats.'
};

export default function Example() {
  const [color, setColor] = useState('#3B82F6');
  const [format, setFormat] = useState<'hex' | 'rgb'>('hex');

  const handleFormatChange = () => {
    setFormat(format === 'hex' ? 'rgb' : 'hex');
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-foreground-300">
            Selected color: <code className="text-accent-500 font-mono">{color}</code>
          </p>
          <button
            onClick={handleFormatChange}
            className="px-3 py-1 text-xs bg-foreground-800 hover:bg-foreground-700 text-foreground-100 rounded transition-colors"
          >
            Format: {format.toUpperCase()}
          </button>
        </div>
        <Color
          value={color}
          onChange={setColor}
          format={format}
          defaultValue="#3B82F6"
        />
      </div>
      <div className="mt-4 p-3 bg-foreground-850 rounded border border-foreground-800">
        <p className="text-xs text-foreground-300">
          <strong>Tip:</strong> Click the format button to switch between hex and RGB output formats.
          This is useful when you need to copy colors in different formats for different contexts.
        </p>
      </div>
    </div>
  );
}
