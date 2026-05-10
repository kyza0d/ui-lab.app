"use client";

import { useState } from 'react';
import { Slider } from 'ui-lab-components';

export const metadata = {
  title: 'Settings Panel',
  description: 'Multiple sliders in a settings list with dividers.'
};

export default function Example() {
  const [brightness, setBrightness] = useState(80);
  const [contrast, setContrast] = useState(50);
  const [saturation, setSaturation] = useState(40);

  const settings = [
    { id: "brightness", label: "Brightness", value: brightness, onChange: (v: number[]) => setBrightness(v[0]) },
    { id: "contrast", label: "Contrast", value: contrast, onChange: (v: number[]) => setContrast(v[0]) },
    { id: "saturation", label: "Saturation", value: saturation, onChange: (v: number[]) => setSaturation(v[0]) },
  ];

  return (
    <div className="w-80 divide-y divide-border divide-background-700">
      {settings.map(({ id, label, value, onChange }) => (
        <div key={id} className="flex items-center gap-4 py-3">
          <span className="text-sm w-24 shrink-0">{label}</span>
          <Slider aria-label={label} value={value} onValueChange={onChange} className="flex-1" />
          <span className="text-sm tabular-nums w-8 text-right text-muted-foreground">{value}</span>
        </div>
      ))}
    </div>
  );
}
