"use client";

import { useState } from "react";
import { DevExampleLayout, type DevExample } from "../dev-example-layout";
import { Slider } from "ui-lab-components";

function VolumeControlPreview() {
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

function SettingsPanelPreview() {
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

function PriceRangePreview() {
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

function StepSliderPreview() {
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

function DisabledStatePreview() {
  return (
    <div className="flex flex-col gap-4 w-64">
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground w-20">Active</span>
        <Slider aria-label="Active slider" defaultValue={40} className="flex-1" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground w-20">Disabled</span>
        <Slider aria-label="Disabled slider" defaultValue={40} disabled className="flex-1" />
      </div>
    </div>
  );
}

function VerticalMixerPreview() {
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

const examples: DevExample[] = [
  {
    id: "volume-control",
    title: "Volume Control",
    description: "Horizontal slider with a label and live numeric readout.",
    preview: <VolumeControlPreview />,
    previewLayout: "center",
  },
  {
    id: "settings-panel",
    title: "Settings Panel",
    description: "Multiple sliders in a settings list with dividers.",
    preview: <SettingsPanelPreview />,
    previewLayout: "center",
  },
  {
    id: "price-range",
    title: "Price Range",
    description: "Range slider with two thumbs for min/max filtering.",
    preview: <PriceRangePreview />,
    previewLayout: "center",
  },
  {
    id: "step-slider",
    title: "Step Slider",
    description: "Slider constrained to discrete steps with tick labels.",
    preview: <StepSliderPreview />,
    previewLayout: "center",
  },
  {
    id: "disabled-state",
    title: "Disabled State",
    description: "Active and disabled sliders side by side.",
    preview: <DisabledStatePreview />,
    previewLayout: "center",
  },
  {
    id: "vertical-mixer",
    title: "Vertical Mixer",
    description: "Vertical orientation for audio-style channel controls.",
    preview: <VerticalMixerPreview />,
    previewLayout: "center",
  },
];

export default function SliderExamplesPage() {
  return (
    <DevExampleLayout
      title="Slider Examples"
      description="Focused examples of the Slider component across common UI contexts."
      examples={examples}
      backHref="/dev/examples"
      backLabel="Examples"
    />
  );
}
