"use client";

import { useState } from 'react';
import { Popover, Button, List } from 'ui-lab-components';

export const metadata = {
  title: 'Toggleable Options',
  description: 'Popover containing a list of toggleable options using List.Item and List.Switch.'
};

const toggleableItems = [
  { id: "notifications", label: "Notifications", desc: "Push and email alerts" },
  { id: "autoSave", label: "Auto-save", desc: "Save changes automatically" },
  { id: "darkMode", label: "Dark mode", desc: "Use dark color scheme" },
];

export default function Example() {
  const [enabled, setEnabled] = useState<Set<string>>(
    () => new Set(["notifications", "darkMode"])
  );

  const toggle = (id: string) =>
    setEnabled((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <Popover
      position="bottom"
      content={
        <List items={toggleableItems} spacing="sm" style={{ width: 280 }}>
          {toggleableItems.map((item) => (
            <List.Item
              key={item.id}
              value={item.id}
              interactive
              onClick={() => toggle(item.id)}
            >
              <div className="min-w-0 flex-1">
                <List.Title>{item.label}</List.Title>
                <List.Desc>{item.desc}</List.Desc>
              </div>
              <List.Switch
                isSelected={enabled.has(item.id)}
                onChange={() => toggle(item.id)}
                aria-label={item.label}
              />
            </List.Item>
          ))}
        </List>
      }
    >
      <Button>Options</Button>
    </Popover>
  );
}
