"use client";

import { useState } from "react";
import { Switch, Slider, Divider } from "ui-lab-components";

const SWITCHES = [
  { id: "dark-mode", label: "Dark mode", desc: "Use dark theme", on: true },
  { id: "beta", label: "Beta features", desc: "Early access", on: false },
];

export function TogglesAndSwitches() {
  const [states, setStates] = useState<Record<string, boolean>>(
    Object.fromEntries(SWITCHES.map((s) => [s.id, s.on]))
  );
  const [volume, setVolume] = useState(65);

  return (
    <div className="w-full overflow-hidden">
      {SWITCHES.map((s, i) => (
        <div key={s.id}>
          <div className="px-4 py-2.5 flex items-center justify-between">
            <div>
              <div className="text-xs text-foreground-100">{s.label}</div>
              <div className="text-xs text-foreground-500">{s.desc}</div>
            </div>
            <Switch
              isSelected={states[s.id]}
              onChange={(v) => setStates((prev) => ({ ...prev, [s.id]: v }))}
              aria-label={s.label}
            />
          </div>
          {i < SWITCHES.length - 1 && <Divider size="sm" spacing="none" />}
        </div>
      ))}

      <Divider size="sm" spacing="none" />

      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-foreground-100">Volume</span>
          <span className="text-xs text-foreground-400">{volume}%</span>
        </div>
        <Slider.Root
          value={volume}
          onValueChange={(v) => setVolume(v[0])}
          aria-label="Volume"
        />
      </div>
    </div>
  );
}
