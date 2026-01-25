"use client";

import { memo } from "react";
import { SliderControl } from "./shared-components";

interface LayoutPanelProps {
  radius: number;
  borderWidth: number;
  spacingScale: number;
  onRadiusChange: (value: number) => void;
  onBorderWidthChange: (value: number) => void;
  onSpacingScaleChange: (value: number) => void;
}

export const LayoutPanel = memo(
  ({
    radius,
    borderWidth,
    spacingScale,
    onRadiusChange,
    onBorderWidthChange,
    onSpacingScaleChange,
  }: LayoutPanelProps) => {
    return (
      <div className="p-4 space-y-6">
        <SliderControl
          label="Corner Radius"
          value={radius}
          min={0}
          max={1.5}
          step={0.1}
          unit="rem"
          onChange={onRadiusChange}
        />
        <SliderControl
          label="Border Width"
          value={borderWidth}
          min={0}
          max={4}
          step={0.5}
          unit="px"
          onChange={onBorderWidthChange}
        />
        <SliderControl
          label="Spacing Density"
          value={spacingScale}
          min={0.75}
          max={1.25}
          step={0.05}
          unit="x"
          onChange={onSpacingScaleChange}
        />
      </div>
    );
  },
);

LayoutPanel.displayName = "LayoutPanel";
