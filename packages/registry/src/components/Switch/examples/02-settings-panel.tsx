"use client";

import { useState } from 'react';
import { Switch } from 'ui-lab-components';

export const metadata = {
  title: 'Settings Panel',
  description: 'A list of toggleable settings with dividers.'
};

export default function Example() {
  const [notifications, setNotifications] = useState(true);
  const [sounds, setSounds] = useState(false);
  const [badge, setBadge] = useState(true);

  const settings = [
    { id: "notifications", label: "Push notifications", value: notifications, onChange: setNotifications },
    { id: "sounds", label: "Sound effects", value: sounds, onChange: setSounds },
    { id: "badge", label: "App badge", value: badge, onChange: setBadge },
  ];

  return (
    <div className="w-72 divide-y divide-border">
      {settings.map(({ id, label, value, onChange }) => (
        <div key={id} className="flex items-center justify-between py-3">
          <span className="text-sm">{label}</span>
          <Switch aria-label={label} isSelected={value} onChange={onChange} />
        </div>
      ))}
    </div>
  );
}
