"use client";

import { useState } from 'react';
import { Color } from 'ui-lab-components';

export const metadata = {
  title: 'Standalone Color Slider',
  description: 'Color.Slider can be used on its own for hue and opacity control without rendering the full color picker.',
};

export default function Example() {
  const [hue, setHue] = useState(215);
  const [opacity, setOpacity] = useState(0.72);

  const baseColor = `hsl(${hue} 100% 50%)`;
  const previewColor = `hsl(${hue} 100% 50% / ${opacity})`;

  return (
    <div className="w-72 space-y-4">
      <div className="flex items-center gap-3">
        <div
          className="h-10 w-10 rounded-sm border border-background-700"
          style={{ backgroundColor: previewColor }}
          aria-hidden="true"
        />
        <div className="min-w-0 flex-1 text-sm text-foreground-300">
          <div>Hue {Math.round(hue)} deg</div>
          <div>Opacity {Math.round(opacity * 100)}%</div>
        </div>
      </div>

      <Color.Slider
        aria-label="Accent hue"
        value={hue}
        onChange={setHue}
      />

      <Color.Slider
        type="opacity"
        aria-label="Accent opacity"
        value={opacity}
        onChange={setOpacity}
        color={baseColor}
      />
    </div>
  );
}
