"use client";

import { useState } from "react";
import { DevExampleLayout, type DevExample } from "../dev-example-layout";
import { Color } from "ui-lab-components";

function BasicColorPicker() {
  return (
    <div className="flex items-center justify-center">
      <Color defaultValue="#3b82f6" size="md" />
    </div>
  );
}

function ColorPickerWithOpacity() {
  const [color, setColor] = useState("#ef4444");

  return (
    <div className="flex flex-col gap-4 items-center">
      <Color
        value={color}
        onChange={setColor}
        showOpacity={true}
        size="md"
      />
      <div className="text-sm text-foreground-400">
        Selected: {color}
      </div>
    </div>
  );
}

function ColorPickerWithPreview() {
  const [color, setColor] = useState("#8b5cf6");

  return (
    <div className="flex flex-col gap-4 items-center">
      <Color
        value={color}
        onChange={setColor}
        showPreview={true}
        format="hex"
        size="md"
      />
    </div>
  );
}

const examples: DevExample[] = [
  {
    id: "basic-color-picker",
    title: "Basic Color Picker",
    description: "A simple uncontrolled color picker with hue, saturation, brightness, and recent colors.",
    preview: <BasicColorPicker />,
  },
  {
    id: "color-picker-opacity",
    title: "Color Picker with Opacity",
    description: "Color picker with opacity/alpha slider control. Shows controlled state and displays the selected color value.",
    preview: <ColorPickerWithOpacity />,
  },
  {
    id: "color-picker-preview",
    title: "Color Picker with Preview Swatch",
    description: "Color picker with a color preview swatch displayed next to the input field for quick visual feedback.",
    preview: <ColorPickerWithPreview />,
  },
];

export default function ColorExamplesPage() {
  return (
    <DevExampleLayout
      title="Color Examples"
      description="Development environment for Color component examples. These render exactly as they would on the production component page."
      examples={examples}
      backHref="/dev/examples"
      backLabel="Examples"
    />
  );
}
