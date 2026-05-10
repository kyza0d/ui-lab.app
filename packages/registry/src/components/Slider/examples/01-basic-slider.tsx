"use client";

import { useState } from 'react';
import { Slider } from 'ui-lab-components';

export const metadata = {
  title: 'Volume Control',
  description: 'Horizontal slider with a label and live numeric readout.'
};

export default function Example() {
  const [volume, setVolume] = useState(60);

  return (
    <div className="flex items-center gap-4 w-72">
      <span className="text-sm text-muted-foreground w-16">Volume</span>
      <Slider
        aria-label="Volume"
        value={volume}
        onValueChange={([v]) => setVolume(v)}
        className="flex-1"
      />
      <span className="text-sm tabular-nums w-8 text-right">{volume}</span>
    </div>
  );
}
