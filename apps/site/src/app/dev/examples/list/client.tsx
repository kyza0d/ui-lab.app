"use client";

import { useMemo, useState } from "react";
import { List, Select } from "ui-lab-components";

import { DevExampleLayout, type DevExample } from "../dev-example-layout";

const reviewItems = [
  { id: "legal", title: "Legal review", desc: "Updated retention language" },
  { id: "security", title: "Security review", desc: "New access scopes" },
  { id: "billing", title: "Billing review", desc: "Invoice copy changes" },
];

const notificationItems = [
  { id: "comments", title: "Comments", desc: "Replies and mentions" },
  { id: "deployments", title: "Deployments", desc: "Preview and production updates" },
  { id: "incidents", title: "Incidents", desc: "Status changes and postmortems" },
];

const quotaItems = [
  { id: "seats", title: "Seats", desc: "Maximum workspace members" },
  { id: "projects", title: "Projects", desc: "Active projects per workspace" },
  { id: "tokens", title: "Tokens", desc: "Monthly API token budget" },
];

const permissionItems = [
  { id: "members", title: "Members", desc: "Invite and remove workspace members" },
  { id: "billing", title: "Billing", desc: "Update plan, seats, and invoices" },
  { id: "tokens", title: "Tokens", desc: "Issue scoped API credentials" },
];

function useCheckedSet(initial: string[]) {
  const [checked, setChecked] = useState(() => new Set(initial));

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

  return { checked, setItem, toggleItem };
}

function ReviewQueuePreview() {
  const { checked, setItem, toggleItem } = useCheckedSet(["legal"]);

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

function NotificationRulesPreview() {
  const { checked, setItem, toggleItem } = useCheckedSet(["comments", "incidents"]);
  const [delivery, setDelivery] = useState<Record<string, string | number | null>>({
    comments: "digest",
    deployments: "email",
    incidents: "push",
  });

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

function QuotaEditorPreview() {
  const { checked, setItem, toggleItem } = useCheckedSet(["seats", "projects"]);
  const [limits, setLimits] = useState<Record<string, string>>({
    seats: "24",
    projects: "12",
    tokens: "50000",
  });

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

function PermissionsMatrixPreview() {
  const rows = useMemo(() => [{ id: "all", title: "All permissions" }, ...permissionItems], []);
  const { checked, setItem, toggleItem } = useCheckedSet(["members", "tokens"]);
  const [level, setLevel] = useState<Record<string, string | number | null>>({
    members: "edit",
    billing: "view",
    tokens: "edit",
  });
  const allChecked = checked.size === permissionItems.length;
  const isIndeterminate = checked.size > 0 && !allChecked;

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
        <List.Item key={item.id} value={item.id} interactive onClick={() => toggleItem(item.id)}>
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

const examples: DevExample[] = [
  {
    id: "review-queue",
    title: "Review Queue",
    description: "A compact checklist for work that can be completed directly from each row.",
    preview: <ReviewQueuePreview />,
  },
  {
    id: "notification-rules",
    title: "Notification Rules",
    description: "Rows can combine a leading checkbox with a trailing Select action.",
    preview: <NotificationRulesPreview />,
  },
  {
    id: "quota-editor",
    title: "Quota Editor",
    description: "Inline inputs work as row actions without taking over the List primitive.",
    preview: <QuotaEditorPreview />,
  },
  {
    id: "permissions-matrix",
    title: "Permissions Matrix",
    description: "A parent checkbox can summarize rows that also expose per-row Select controls.",
    preview: <PermissionsMatrixPreview />,
  },
];

export default function ListExamplesPage() {
  return (
    <DevExampleLayout
      title="List Examples"
      description="Minimal List patterns for checkbox selection, inline row actions, and mixed controls."
      examples={examples}
      backHref="/dev/examples"
      backLabel="Examples"
    />
  );
}
