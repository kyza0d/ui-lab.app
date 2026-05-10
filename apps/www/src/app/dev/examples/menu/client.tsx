"use client";

import { useState } from "react";
import { DevExampleLayout, type DevExample } from "../dev-example-layout";
import { Menu, Button } from "ui-lab-components";
import { FaEllipsis, FaChevronDown } from "react-icons/fa6";

function ToolbarMenuPreview() {
  return (
    <Menu type="pop-over">
      <Menu.Trigger>
        <Button variant="ghost">
          File <FaChevronDown className="w-3 h-3 ml-1" />
        </Button>
      </Menu.Trigger>
      <Menu.Content align="start">
        <Menu.Item onSelect={() => {}}>
          New file
          <Menu.Shortcut>⌘N</Menu.Shortcut>
        </Menu.Item>
        <Menu.Item onSelect={() => {}}>
          Open…
          <Menu.Shortcut>⌘O</Menu.Shortcut>
        </Menu.Item>
        <Menu.Item onSelect={() => {}}>
          Save
          <Menu.Shortcut>⌘S</Menu.Shortcut>
        </Menu.Item>
        <Menu.Separator />
        <Menu.Item disabled>Recent files</Menu.Item>
      </Menu.Content>
    </Menu>
  );
}

function RowActionsPreview() {
  const rows = [
    { id: "doc_1", name: "Q3 roadmap", updated: "2h ago" },
    { id: "doc_2", name: "Pricing review", updated: "yesterday" },
    { id: "doc_3", name: "Hiring plan", updated: "3 days ago" },
  ];

  return (
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="border-b border-background-700">
          <th className="text-left py-2 px-3 font-medium text-foreground-200">Document</th>
          <th className="text-left py-2 px-3 font-medium text-foreground-200">Updated</th>
          <th className="py-2 px-3" />
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id} className="border-b border-background-700 last:border-0">
            <td className="py-2 px-3">{row.name}</td>
            <td className="py-2 px-3 text-foreground-400">{row.updated}</td>
            <td className="py-2 px-3 text-right">
              <Menu type="pop-over">
                <Menu.Trigger>
                  <Button
                    icon={<FaEllipsis />}
                    size="icon"
                    variant="ghost"
                    styles="p-2"
                    aria-label={`Actions for ${row.name}`}
                  />
                </Menu.Trigger>
                <Menu.Content align="end">
                  <Menu.Item onSelect={() => {}}>Open</Menu.Item>
                  <Menu.Item onSelect={() => {}}>Rename</Menu.Item>
                  <Menu.Item onSelect={() => {}}>Duplicate</Menu.Item>
                  <Menu.Separator />
                  <Menu.Item
                    onSelect={() => {}}
                    styles={{ root: "text-destructive" }}
                  >
                    Delete
                  </Menu.Item>
                </Menu.Content>
              </Menu>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ContextMenuPreview() {
  return (
    <Menu type="context-menu">
      <Menu.Trigger>
        <div className="flex items-center justify-center w-80 h-32 border border-dashed border-background-700 rounded-sm text-sm text-foreground-400 select-none">
          Right-click anywhere in this area
        </div>
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Item onSelect={() => {}}>
          Cut
          <Menu.Shortcut>⌘X</Menu.Shortcut>
        </Menu.Item>
        <Menu.Item onSelect={() => {}}>
          Copy
          <Menu.Shortcut>⌘C</Menu.Shortcut>
        </Menu.Item>
        <Menu.Item onSelect={() => {}}>
          Paste
          <Menu.Shortcut>⌘V</Menu.Shortcut>
        </Menu.Item>
        <Menu.Separator />
        <Menu.Item onSelect={() => {}} styles={{ root: "text-destructive" }}>
          Delete
        </Menu.Item>
      </Menu.Content>
    </Menu>
  );
}

function ViewOptionsPreview() {
  const [showGrid, setShowGrid] = useState(true);
  const [showRulers, setShowRulers] = useState(false);
  const [density, setDensity] = useState("comfortable");

  return (
    <Menu type="pop-over">
      <Menu.Trigger>
        <Button>View</Button>
      </Menu.Trigger>
      <Menu.Content align="start">
        <Menu.Label>Display</Menu.Label>
        <Menu.CheckboxItem checked={showGrid} onCheckedChange={setShowGrid}>
          Show grid
        </Menu.CheckboxItem>
        <Menu.CheckboxItem checked={showRulers} onCheckedChange={setShowRulers}>
          Show rulers
        </Menu.CheckboxItem>
        <Menu.Separator />
        <Menu.Label>Density</Menu.Label>
        <Menu.RadioGroup value={density} onValueChange={setDensity}>
          <Menu.RadioItem value="compact">Compact</Menu.RadioItem>
          <Menu.RadioItem value="comfortable">Comfortable</Menu.RadioItem>
          <Menu.RadioItem value="spacious">Spacious</Menu.RadioItem>
        </Menu.RadioGroup>
      </Menu.Content>
    </Menu>
  );
}

const examples: DevExample[] = [
  {
    id: "toolbar",
    title: "Toolbar Dropdown",
    description: "Dropdown menu of actions with keyboard shortcuts and a disabled item.",
    preview: <ToolbarMenuPreview />,
    previewLayout: "center",
  },
  {
    id: "row-actions",
    title: "Table Row Actions",
    description: "Per-row overflow menu in a table, with a destructive action separated from neutral ones.",
    preview: <RowActionsPreview />,
    previewLayout: "center",
  },
  {
    id: "context-menu",
    title: "Context Menu",
    description: "Right-click anywhere in the surface to open the menu at the cursor position.",
    preview: <ContextMenuPreview />,
    previewLayout: "center",
  },
  {
    id: "view-options",
    title: "View Options",
    description: "Mixed checkbox and radio items for toggling display state and selecting a single density.",
    preview: <ViewOptionsPreview />,
    previewLayout: "center",
  },
];

export default function MenuExamplesPage() {
  return (
    <DevExampleLayout
      title="Menu Examples"
      description="Focused examples of the Menu in toolbar, table-row, and view-settings contexts."
      examples={examples}
      backHref="/dev/examples"
      backLabel="Examples"
    />
  );
}
