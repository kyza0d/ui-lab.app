"use client";

import { useMemo, useState } from "react";
import { List, Select } from "ui-lab-components";

export const metadata = {
  title: "Permissions Matrix",
  description: "A parent checkbox can summarize rows that also expose per-row Select controls.",
};

const permissionItems = [
  { id: "members", title: "Members", desc: "Invite and remove workspace members" },
  { id: "billing", title: "Billing", desc: "Update plan, seats, and invoices" },
  { id: "tokens", title: "Tokens", desc: "Issue scoped API credentials" },
];

export default function Example() {
  const rows = useMemo(() => [{ id: "all", title: "All permissions" }, ...permissionItems], []);
  const [checked, setChecked] = useState(() => new Set(["members", "tokens"]));
  const [level, setLevel] = useState<Record<string, string | number | null>>({
    members: "edit",
    billing: "view",
    tokens: "edit",
  });
  const allChecked = checked.size === permissionItems.length;
  const isIndeterminate = checked.size > 0 && !allChecked;

  const setItem = (id: string, value: boolean) => {
    setChecked((current) => {
      const next = new Set(current);
      value ? next.add(id) : next.delete(id);
      return next;
    });
  };

  const setAll = (value: boolean) => {
    permissionItems.forEach((item) => setItem(item.id, value));
  };

  const setPermissionLevel = (id: string, value: string | number | null) => {
    setLevel((current) => ({ ...current, [id]: value }));
  };

  return (
    <List items={rows} spacing="sm" style={{ width: 420 }}>
      <List.Item value="all" interactive onClick={() => setAll(!allChecked)}>
        <List.Checkbox
          aria-label="Toggle all permissions"
          placement="start"
          checked={allChecked}
          isIndeterminate={isIndeterminate}
          onCheckedChange={setAll}
        />
        <List.Title>All permissions</List.Title>
      </List.Item>
      <List.Divider />
      {permissionItems.map((item) => (
        <List.Item key={item.id} value={item.id} interactive onClick={() => setItem(item.id, !checked.has(item.id))}>
          <div className="w-5 flex-shrink-0" />
          <List.Checkbox
            aria-label={`Allow ${item.title.toLowerCase()}`}
            placement="start"
            checked={checked.has(item.id)}
            onCheckedChange={(value) => setItem(item.id, value)}
          />
          <div className="min-w-0 flex-1">
            <List.Title>{item.title}</List.Title>
            <List.Desc>{item.desc}</List.Desc>
          </div>
          <List.Select
            selectedKey={level[item.id]}
            valueLabel={String(level[item.id] ?? "")}
            isDisabled={!checked.has(item.id)}
            onSelectionChange={(value) => setPermissionLevel(item.id, value)}
          >
            <Select.Trigger>
              <Select.Value placeholder="Access" />
            </Select.Trigger>
            <Select.Content>
              <Select.List>
                <Select.Item value="view">View</Select.Item>
                <Select.Item value="edit">Edit</Select.Item>
                <Select.Item value="admin">Admin</Select.Item>
              </Select.List>
            </Select.Content>
          </List.Select>
        </List.Item>
      ))}
    </List>
  );
}
