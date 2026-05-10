"use client";

import { useState } from 'react';
import { Slider } from 'ui-lab-components';

export const metadata = {
  title: 'Price Range',
  description: 'Range slider with two thumbs for min/max filtering.'
};

export default function Example() {
  const [range, setRange] = useState([200, 800]);

  return (
    <div className="w-80 flex flex-col gap-4">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Price range</span>
        <span>${range[0]} – ${range[1]}</span>
      </div>
      <Slider
        aria-label="Price range"
        value={range}
        min={0}
        max={1000}
        step={10}
        onValueChange={setRange}
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>$0</span>
        <span>$1,000</span>
      </div>
    </div>
  );
}
