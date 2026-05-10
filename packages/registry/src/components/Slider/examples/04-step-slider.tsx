"use client";

import { useState } from 'react';
import { Slider } from 'ui-lab-components';

export const metadata = {
  title: 'Step Slider',
  description: 'Slider constrained to discrete steps with tick labels.'
};

export default function Example() {
  const [rating, setRating] = useState(3);

  return (
    <div className="flex flex-col gap-3 w-64">
      <div className="flex justify-between items-center">
        <label className="text-sm">Quality rating</label>
        <span className="text-sm font-medium">{rating} / 5</span>
      </div>
      <Slider
        aria-label="Quality rating"
        value={rating}
        min={1}
        max={5}
        step={1}
        onValueChange={([v]) => setRating(v)}
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n}>{n}</span>
        ))}
      </div>
    </div>
  );
}
