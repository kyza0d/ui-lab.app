"use client";

import { useState } from "react";
import { List, Select } from "ui-lab-components";

export const metadata = {
  title: "Notification Rules",
  description: "Rows can combine a leading checkbox with a trailing Select action.",
};

const notificationItems = [
  { id: "comments", title: "Comments", desc: "Replies and mentions" },
  { id: "deployments", title: "Deployments", desc: "Preview and production updates" },
  { id: "incidents", title: "Incidents", desc: "Status changes and postmortems" },
];

export default function Example() {
  const [checked, setChecked] = useState(() => new Set(["comments", "incidents"]));
  const [delivery, setDelivery] = useState<Record<string, string | number | null>>({
    comments: "digest",
    deployments: "email",
    incidents: "push",
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

  const setDeliveryMode = (id: string, value: string | number | null) => {
    setDelivery((current) => ({ ...current, [id]: value }));
  };

  return (
    <List items={notificationItems} spacing="sm" style={{ width: 400 }}>
      {notificationItems.map((item) => (
        <List.Item key={item.id} value={item.id} interactive onClick={() => toggleItem(item.id)}>
          <List.Checkbox
            aria-label={`Enable ${item.title.toLowerCase()} notifications`}
            placement="start"
            checked={checked.has(item.id)}
            onCheckedChange={(value) => setItem(item.id, value)}
          />
          <div className="min-w-0 flex-1">
            <List.Title>{item.title}</List.Title>
            <List.Desc>{item.desc}</List.Desc>
          </div>
          <List.Select
            selectedKey={delivery[item.id]}
            valueLabel={String(delivery[item.id] ?? "")}
            isDisabled={!checked.has(item.id)}
            onSelectionChange={(value) => setDeliveryMode(item.id, value)}
          >
            <Select.Trigger>
              <Select.Value placeholder="Mode" />
            </Select.Trigger>
            <Select.Content>
              <Select.List>
                <Select.Item value="email">Email</Select.Item>
                <Select.Item value="digest">Digest</Select.Item>
                <Select.Item value="push">Push</Select.Item>
              </Select.List>
            </Select.Content>
          </List.Select>
        </List.Item>
      ))}
    </List>
  );
}
