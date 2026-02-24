"use client";

import { useState } from "react";
import { Button, Group, Divider } from "ui-lab-components";
import { FaClock, FaMicrochip, FaMemory, FaMinus, FaPlus, FaBoltLightning } from "react-icons/fa6";
import { SiGnubash } from "react-icons/si";

function Stepper({
  value,
  onChange,
  min,
  max,
  step = 1,
}: {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
}) {
  return (
    <Group spacing="none" className="h-9">
      <Group.Button
        variant="ghost"
        size="sm"
        isDisabled={value <= min}
        onClick={() => onChange(Math.max(min, value - step))}
      >
        <FaMinus size={10} />
      </Group.Button>
      <Divider />
      <input
        type="number"
        value={value}
        onChange={(e) => {
          const n = Number(e.target.value);
          if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
        }}
        className="w-12 text-center text-sm text-foreground-100 bg-background-200 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none focus:outline-none"
      />
      <Divider />
      <Group.Button
        variant="ghost"
        size="sm"
        isDisabled={value >= max}
        onClick={() => onChange(Math.min(max, value + step))}
      >
        <FaPlus size={10} />
      </Group.Button>
    </Group>
  );
}

export function SessionConfigPanel() {
  const [duration, setDuration] = useState(1);
  const [cores, setCores] = useState(2);
  const [memory, setMemory] = useState(4);

  const cost = (duration * (cores * 0.014 + memory * 0.007)).toFixed(2);

  const rows = [
    {
      icon: <FaClock className="text-foreground-300" size={20} />,
      label: "Duration",
      desc: "hrs",
      value: duration,
      onChange: setDuration,
      min: 1,
      max: 8,
      step: 1,
    },
    {
      icon: <FaMicrochip className="text-foreground-300" size={20} />,
      label: "CPU Cores",
      desc: "Virtual processors",
      value: cores,
      onChange: setCores,
      min: 1,
      max: 16,
      step: 1,
    },
    {
      icon: <FaMemory className="text-foreground-300" size={20} />,
      label: "Memory",
      desc: "GB RAM",
      value: memory,
      onChange: setMemory,
      min: 2,
      max: 64,
      step: 2,
    },
  ];

  return (
    <div className="h-fit w-full bg-background-200 border border-background-700 rounded-md overflow-hidden">
      <div className="flex items-center gap-5 px-4 pt-3.5 pb-3 border-b border-background-700">
        <SiGnubash size={26} />
        <div>
          <div className="text-sm font-semibold text-foreground-100">New Session</div>
          <div className="text-xs text-foreground-500 mt-0.5">Configure your environment.</div>
        </div>
      </div>

      {rows.map((row, i) => (
        <div key={row.label}>
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-md bg-background-300 flex items-center justify-center shrink-0">
                {row.icon}
              </div>
              <div>
                <div className="text-sm text-foreground-100">{row.label}</div>
                <div className="text-xs text-foreground-500">{row.desc}</div>
              </div>
            </div>
            <Stepper
              value={row.value}
              onChange={row.onChange}
              min={row.min}
              max={row.max}
              step={row.step}
            />
          </div>
          {i < rows.length - 1 && <Divider spacing="none" size="sm" />}
        </div>
      ))}

      <div className="px-4 py-3.5 border-t border-background-700 flex items-center justify-between">
        <div>
          <div className="text-xs text-foreground-500">{duration}h session</div>
          <div className="text-base font-semibold text-foreground-100">${cost}</div>
        </div>
        <Button variant="outline" icon={{ left: <FaBoltLightning /> }}>Start</Button>
      </div>
    </div>
  );
}
