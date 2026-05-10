"use client";

import { useState } from 'react';
import { Slider } from 'ui-lab-components';

export const metadata = {
  title: 'Vertical Mixer',
  description: 'Vertical orientation for audio-style channel controls.'
};

export default function Example() {
  const [channels, setChannels] = useState([70, 50, 80, 40]);

  return (
    <div className="flex items-end gap-6 h-40">
      {["CH1", "CH2", "CH3", "CH4"].map((label, i) => (
        <div key={label} className="flex flex-col items-center gap-2">
          <Slider
            aria-label={label}
            value={channels[i]}
            orientation="vertical"
            onValueChange={([v]) => {
              const next = [...channels];
              next[i] = v;
              setChannels(next);
            }}
            style={{ height: 120 }}
          />
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  );
}
