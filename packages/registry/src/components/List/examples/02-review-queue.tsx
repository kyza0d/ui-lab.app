"use client";

import { useState } from "react";
import { List } from "ui-lab-components";

export const metadata = {
  title: "Review Queue",
  description: "A compact checklist for work that can be completed directly from each row.",
};

const reviewItems = [
  { id: "legal", title: "Legal review", desc: "Updated retention language" },
  { id: "security", title: "Security review", desc: "New access scopes" },
  { id: "billing", title: "Billing review", desc: "Invoice copy changes" },
];

export default function Example() {
  const [checked, setChecked] = useState(() => new Set(["legal"]));

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

  return (
    <List items={reviewItems} spacing="sm" style={{ width: 320 }}>
      {reviewItems.map((item) => (
        <List.Item key={item.id} value={item.id} interactive onClick={() => toggleItem(item.id)}>
          <List.Checkbox
            aria-label={`Mark ${item.title} reviewed`}
            placement="start"
            checked={checked.has(item.id)}
            onCheckedChange={(value) => setItem(item.id, value)}
          />
          <div className="min-w-0 flex-1">
            <List.Title>{item.title}</List.Title>
            <List.Desc>{item.desc}</List.Desc>
          </div>
        </List.Item>
      ))}
    </List>
  );
}
