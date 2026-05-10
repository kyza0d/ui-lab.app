"use client";

import { useState } from "react";
import { List } from "ui-lab-components";

export const metadata = {
  title: "Quota Editor",
  description: "Inline inputs work as row actions without taking over the List primitive.",
};

const quotaItems = [
  { id: "seats", title: "Seats", desc: "Maximum workspace members" },
  { id: "projects", title: "Projects", desc: "Active projects per workspace" },
  { id: "tokens", title: "Tokens", desc: "Monthly API token budget" },
];

export default function Example() {
  const [checked, setChecked] = useState(() => new Set(["seats", "projects"]));
  const [limits, setLimits] = useState<Record<string, string>>({
    seats: "24",
    projects: "12",
    tokens: "50000",
  });

  const setItem = (id: string, value: boolean) => {
    setChecked((current) => {
      const next = new Set(current);
      value ? next.add(id) : next.delete(id);
      return next;
    });
  };

  const toggleItem = (id: string) => {
    setChecked((current) => {
      const next = new Set(current);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const setLimit = (id: string, value: string) => {
    setLimits((current) => ({ ...current, [id]: value }));
  };

  return (
    <List items={quotaItems} spacing="sm" style={{ width: 396 }}>
      {quotaItems.map((item) => (
        <List.Item key={item.id} value={item.id} interactive onClick={() => toggleItem(item.id)}>
          <List.Checkbox
            aria-label={`Enable ${item.title.toLowerCase()} limit`}
            placement="start"
            checked={checked.has(item.id)}
            onCheckedChange={(value) => setItem(item.id, value)}
          />
          <div className="min-w-0 flex-1">
            <List.Title>{item.title}</List.Title>
            <List.Desc>{item.desc}</List.Desc>
          </div>
          <List.Input
            aria-label={`${item.title} limit`}
            type="number"
            value={limits[item.id]}
            disabled={!checked.has(item.id)}
            onChange={(event) => setLimit(item.id, event.currentTarget.value)}
            className="w-24"
          />
        </List.Item>
      ))}
    </List>
  );
}
