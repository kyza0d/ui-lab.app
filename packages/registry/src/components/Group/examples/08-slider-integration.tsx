"use client";

import { useState } from "react";
import { Group, Slider } from "ui-lab-components";
import { FaPercent } from "react-icons/fa6";

export const metadata = {
  title: "Slider with Input Group",
  description: "Numeric input synced with a slider for precise value selection.",
};

export default function Example() {
  const [sliderValue, setSliderValue] = useState<number[]>([45]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val)) setSliderValue([Math.min(Math.max(val, 0), 100)]);
  };

  return (
    <div className="space-y-4 w-64">
      <Group>
        <Group.Input type="number" min={0} max={100} value={sliderValue[0]} onChange={handleInputChange} className="w-full" />
        <div className="bg-background-800 flex items-center px-3 text-foreground-400 text-sm font-medium">
          <FaPercent />
        </div>
      </Group>
      <Slider.Root value={sliderValue} onValueChange={setSliderValue} max={100} step={1} />
    </div>
  );
}
