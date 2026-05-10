"use client";

import { useState } from "react";
import { DevExampleLayout, type DevExample } from "../dev-example-layout";
import { Popover, Button, Flex, List, Label, Input } from "ui-lab-components";
import { FaEllipsis } from "react-icons/fa6";

function BasicPopoverPreview() {
  return (
    <Popover
      content={
        <div className="w-64 space-y-3">
          <div className="space-y-1">
            <div className="text-sm font-medium">Quick note</div>
            <p>A popover works best when it adds one small piece of context, one simple choice, or one short action.</p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              Dismiss
            </Button>
            <Button size="sm">
              Continue
            </Button>
          </div>
        </div>
      }
    >
      <Button>Show info</Button>
    </Popover>
  );
}

const toggleableItems = [
  { id: "notifications", label: "Notifications", desc: "Push and email alerts" },
  { id: "autoSave", label: "Auto-save", desc: "Save changes automatically" },
  { id: "darkMode", label: "Dark mode", desc: "Use dark color scheme" },
] as const;

function ToggleableOptionsPreview() {
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

function TableRowPopoverPreview() {
  const rows = [
    { id: "usr_1", name: "Alice", role: "Admin", status: "Active" },
    { id: "usr_2", name: "Bob", role: "Member", status: "Invited" },
    { id: "usr_3", name: "Carol", role: "Viewer", status: "Active" },
  ];

  return (
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="border-b border-background-700">
          <th className="text-left py-2 px-3 font-medium text-foreground-200">Name</th>
          <th className="text-left py-2 px-3 font-medium text-foreground-200">Role</th>
          <th className="text-left py-2 px-3 font-medium text-foreground-200">Status</th>
          <th className="py-2 px-3" />
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id} className="border-b border-background-700 last:border-0">
            <td className="py-2 px-3">{row.name}</td>
            <td className="py-2 px-3 text-foreground-200">{row.role}</td>
            <td className="py-2 px-3 text-foreground-200">{row.status}</td>
            <td className="py-2 px-3 text-right">
              <Popover
                position="left"
                content={
                  <List gap="sm" styles={{ root: "w-full" }}>
                    <Button
                      variant="ghost"
                      size="sm"
                      styles={{ root: "justify-start" }}
                    >
                      Edit {row.name}
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      styles={{ root: "justify-start" }}
                    >
                      Remove {row.name}
                    </Button>
                  </List>
                }
              >
                <Button icon={<FaEllipsis />} styles="p-2" size="icon" variant="ghost" aria-label={`Row actions for ${row.name}`} />
              </Popover>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function InputFormPopoverPreview() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <Popover
      position="bottom"
      content={
        <Flex direction="column" gap="sm" styles={{ root: "w-80" }}>
          <Flex direction="column" gap="xs">
            <Label htmlFor="contact-name">Name</Label>
            <Input
              id="contact-name"
              type="text"
              value={name}
              onChange={(e) => setName((e.target as HTMLInputElement).value)}
              placeholder="Full name"
            />
          </Flex>
          <Flex direction="column" gap="xs">
            <Label htmlFor="contact-email">Email</Label>
            <Input
              id="contact-email"
              type="email"
              value={email}
              onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
              placeholder="name@example.com"
            />
          </Flex>
        </Flex>
      }
    >
      <Button>Edit contact</Button>
    </Popover>
  );
}

function ArrowPopoverPreview() {
  return (
    <Flex align="center">
      {(["top", "bottom", "left", "right"] as const).map((position) => (
        <Popover
          key={position}
          position={position}
          showArrow
          content={<span className="text-sm capitalize">{position}</span>}
        >
          <Button variant="ghost">
            <span className="capitalize">{position}</span>
          </Button>
        </Popover>
      ))}
    </Flex>
  );
}

const examples: DevExample[] = [
  {
    id: "basic",
    title: "Basic",
    description: "Default popover with a short note and two clear actions.",
    preview: <BasicPopoverPreview />,
    previewLayout: "center",
  },
  {
    id: "toggleable-options",
    title: "Toggleable Options",
    description: "Popover containing a list of toggleable options using List.Item and List.Switch.",
    preview: <ToggleableOptionsPreview />,
    previewLayout: "center",
  },
  {
    id: "table-row-actions",
    title: "Table Row Actions",
    description: "Per-row action menu in a data table, anchored to the overflow button.",
    preview: <TableRowPopoverPreview />,
    previewLayout: "center",
  },
  {
    id: "input-form",
    title: "Input Form",
    description: "Popover containing a small form with labeled input fields and save/cancel actions.",
    preview: <InputFormPopoverPreview />,
    previewLayout: "center",
  },
  {
    id: "arrow-positions",
    title: "Arrow & Positions",
    description: "Directional arrow enabled across all four placement options.",
    preview: <ArrowPopoverPreview />,
    previewLayout: "center",
  },
];

export default function PopoverExamplesPage() {
  return (
    <DevExampleLayout
      title="Popover Examples"
      description="Focused examples of the Popover in form, table, and interactive editor contexts."
      examples={examples}
      backHref="/dev/examples"
      backLabel="Examples"
    />
  );
}
