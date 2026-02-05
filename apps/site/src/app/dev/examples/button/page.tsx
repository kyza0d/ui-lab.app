"use client";

import { useState } from "react";
import { DevExampleLayout, type DevExample } from "../dev-example-layout";
import { Button, Group, Divider, Select } from "ui-lab-components";
import { FaList, FaGrip, FaTable, FaBold, FaItalic, FaUnderline, FaChevronLeft, FaChevronRight, FaEllipsis, FaPlay, FaPlus, FaTrash, FaGear, FaStrikethrough, FaListUl, FaLink, FaImage, FaQuoteLeft } from "react-icons/fa6";

function VariantsPreview() {
  return (
    <div className="p-4 space-y-8">
      <div>
        <h3 className="text-sm font-semibold text-foreground-200 mb-3">Primary Variant</h3>
        <div className="flex gap-2 flex-wrap">
          <Button variant="primary">Primary Button</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-foreground-200 mb-3">Default Variant</h3>
        <div className="flex gap-2 flex-wrap">
          <Button variant="default">Default Button</Button>
          <Button variant="default" disabled>Disabled</Button>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-foreground-200 mb-3">Outline Variant</h3>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline">Outline Button</Button>
          <Button variant="outline" disabled>Disabled</Button>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-foreground-200 mb-3">Ghost Variant</h3>
        <div className="flex gap-2 flex-wrap">
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="ghost" disabled>Disabled</Button>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-foreground-200 mb-3">Sizes</h3>
        <div className="flex gap-2 flex-wrap items-center">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>
    </div>

  );
}

function JoinedTogglePreview() {
  const [viewMode, setViewMode] = useState("list");
  return (
    <Group orientation="horizontal" spacing="none">
      <Group.Button active={viewMode === "list"} onClick={() => setViewMode("list")}>
        <FaList className="mr-1.5" /> List
      </Group.Button>
      <Divider />
      <Group.Button active={viewMode === "grid"} onClick={() => setViewMode("grid")}>
        <FaGrip className="mr-1.5" /> Grid
      </Group.Button>
      <Divider />
      <Group.Button active={viewMode === "table"} onClick={() => setViewMode("table")}>
        <FaTable className="mr-1.5" /> Table
      </Group.Button>
    </Group>
  );
}

function SplitActionPreview() {
  const [action, setAction] = useState<string | number | null>("run");
  return (
    <Group orientation="horizontal" spacing="none">
      <Group.Select selectedKey={action} onSelectionChange={setAction}>
        <Group.Button className="border-r border-background-700" size="md">Run Pipeline</Group.Button>
        <Select.Trigger />
        <Select.Content>
          <Select.List>
            <Select.Item value="run" textValue="Run Pipeline">Run Pipeline</Select.Item>
            <Select.Item value="schedule" textValue="Schedule Run">Schedule Run</Select.Item>
            <Select.Item value="debug" textValue="Debug Mode">Debug Mode</Select.Item>
          </Select.List>
        </Select.Content>
      </Group.Select>
    </Group>
  );
}

function ToolbarPreview() {
  const [textStyle, setTextStyle] = useState<string | number | null>('normal')
  return (
    <div className="flex flex-col gap-8">
      <Group orientation="horizontal" spacing="sm">
        <Group.Select selectedKey={textStyle} onSelectionChange={setTextStyle}>
          <Select.Trigger className='w-34 py-2'>
            <Select.Value placeholder="Text Style" />
          </Select.Trigger>
          <Select.Content>
            <Select.List>
              <Select.Item value="normal" textValue="Normal">Normal</Select.Item>
              <Select.Item value="h1" textValue="Heading 1">Heading 1</Select.Item>
              <Select.Item value="h2" textValue="Heading 2">Heading 2</Select.Item>
              <Select.Item value="quote" textValue="Quote">Quote</Select.Item>
              <Select.Item value="code" textValue="Code">Code</Select.Item>
            </Select.List>
          </Select.Content>
        </Group.Select>

        <Divider orientation='vertical' />

        <Group.Button title="Bold">
          <FaBold size={16} />
        </Group.Button>

        <Divider orientation='vertical' />

        <Group.Button title="Italic">
          <FaItalic size={16} />
        </Group.Button>

        <Divider orientation='vertical' />

        <Group.Button title="More Options">
          <FaEllipsis size={16} />
        </Group.Button>


        <Group.Button title="Underline">
          <FaUnderline size={16} />
        </Group.Button>
        <Group.Button title="Strikethrough">
          <FaStrikethrough size={16} />
        </Group.Button>

        <Group.Button title="Bullet List">
          <FaList size={16} />
        </Group.Button>
        <Group.Button title="Numbered List">
          <FaListUl size={16} />
        </Group.Button>


        <Group.Button title="Insert Link">
          <FaLink size={16} />
        </Group.Button>
        <Group.Button title="Insert Image">
          <FaImage size={16} />
        </Group.Button>


        <Group.Button title="Block Quote">
          <FaQuoteLeft size={16} />
        </Group.Button>
      </Group>
      <Group orientation="horizontal" spacing="none">
        <Group.Button title="Bold"><FaBold /></Group.Button>
        <Group.Button title="Italic"><FaItalic /></Group.Button>
        <Group.Button title="Underline"><FaUnderline /></Group.Button>
        <Divider orientation="vertical" />
        <Group.Button title="More options"><FaEllipsis /></Group.Button>
      </Group>
    </div>
  );
}

function PaginationPreview() {
  const [currentPage, setCurrentPage] = useState(2);
  return (
    <Group variant="ghost" spacing="none">
      <Group.Button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} isDisabled={currentPage === 1}>
        <FaChevronLeft />
      </Group.Button>
      {[1, 2, 3, 4, 5].map((page) => (
        <Group.Button key={page} active={currentPage === page} onClick={() => setCurrentPage(page)}>
          {page}
        </Group.Button>
      ))}
      <Group.Button onClick={() => setCurrentPage((p) => Math.min(5, p + 1))} isDisabled={currentPage === 5}>
        <FaChevronRight />
      </Group.Button>
    </Group>
  );
}

function ActionButtonsPreview() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="primary"><FaPlus className="mr-1.5" /> Create Project</Button>
      <Button variant="outline"><FaGear className="mr-1.5" /> Settings</Button>
      <Button variant="ghost"><FaTrash className="mr-1.5" /> Delete</Button>
    </div>
  );
}

const examples: DevExample[] = [
  {
    id: "variants",
    title: "Button Variants",
    description: "All available button variants including primary, default, outline, and ghost styles with sizes.",
    code: `import { Button } from "ui-lab-components";

export function Example() {
  return (
    <div className="space-y-4">
      <Button variant="primary">Primary</Button>
      <Button variant="default">Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  );
}`,
    preview: <VariantsPreview />,
    previewLayout: "start",
  },
  {
    id: "joined-toggle",
    title: "Joined Toggle Buttons",
    description: "Multiple buttons grouped together for view/mode selection with active state indication.",
    code: `import { useState } from "react";
import { Group, Divider } from "ui-lab-components";
import { FaList, FaGrip, FaTable } from "react-icons/fa6";

export function ViewToggle() {
  const [viewMode, setViewMode] = useState("list");

  return (
    <Group orientation="horizontal" spacing="none">
      <Group.Button active={viewMode === "list"} onClick={() => setViewMode("list")}>
        <FaList className="mr-1.5" /> List
      </Group.Button>
      <Divider />
      <Group.Button active={viewMode === "grid"} onClick={() => setViewMode("grid")}>
        <FaGrip className="mr-1.5" /> Grid
      </Group.Button>
      <Divider />
      <Group.Button active={viewMode === "table"} onClick={() => setViewMode("table")}>
        <FaTable className="mr-1.5" /> Table
      </Group.Button>
    </Group>
  );
}`,
    preview: <JoinedTogglePreview />,
  },
  {
    id: "split-action",
    title: "Split Action Button",
    description: "Primary action with dropdown trigger. Combines main action with secondary options menu.",
    code: `import { useState } from "react";
import { Group, Select } from "ui-lab-components";

export function Example() {
  const [action, setAction] = useState("run");

  return (
    <Group orientation="horizontal" spacing="none">
      <Group.Select selectedKey={action} onSelectionChange={setAction}>
        <Group.Button>Run Pipeline</Group.Button>
        <Select.Trigger />
        <Select.Content>
          <Select.List>
            <Select.Item value="run">Run Pipeline</Select.Item>
            <Select.Item value="schedule">Schedule Run</Select.Item>
            <Select.Item value="debug">Debug Mode</Select.Item>
          </Select.List>
        </Select.Content>
      </Group.Select>
    </Group>
  );
}`,
    preview: <SplitActionPreview />,
  },
  {
    id: "toolbar",
    title: "Editor Toolbar",
    description: "Icon buttons grouped together with a divider to separate related actions.",
    code: `import { Group, Divider } from "ui-lab-components";
import { FaBold, FaItalic, FaUnderline, FaEllipsis } from "react-icons/fa6";

export function EditorToolbar() {
  return (
    <Group orientation="horizontal" spacing="none">
      <Group.Button title="Bold"><FaBold /></Group.Button>
      <Group.Button title="Italic"><FaItalic /></Group.Button>
      <Group.Button title="Underline"><FaUnderline /></Group.Button>
      <Divider orientation="vertical" />
      <Group.Button title="More options"><FaEllipsis /></Group.Button>
    </Group>
  );
}`,
    preview: <ToolbarPreview />,
  },
  {
    id: "pagination",
    title: "Pagination Controls",
    description: "Ghost variant Group with active state for page navigation.",
    code: `import { useState } from "react";
import { Group } from "ui-lab-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export function Pagination() {
  const [currentPage, setCurrentPage] = useState(2);

  return (
    <Group variant="ghost" spacing="none">
      <Group.Button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} isDisabled={currentPage === 1}>
        <FaChevronLeft />
      </Group.Button>
      {[1, 2, 3, 4, 5].map((page) => (
        <Group.Button key={page} active={currentPage === page} onClick={() => setCurrentPage(page)}>
          {page}
        </Group.Button>
      ))}
      <Group.Button onClick={() => setCurrentPage((p) => Math.min(5, p + 1))} isDisabled={currentPage === 5}>
        <FaChevronRight />
      </Group.Button>
    </Group>
  );
}`,
    preview: <PaginationPreview />,
  },
  {
    id: "action-buttons",
    title: "Action Buttons with Icons",
    description: "Common action buttons with leading icons for clarity.",
    code: `import { Button } from "ui-lab-components";
import { FaPlus, FaGear, FaTrash } from "react-icons/fa6";

export function ActionButtons() {
  return (
    <div className="flex gap-3">
      <Button variant="primary"><FaPlus className="mr-1.5" /> Create Project</Button>
      <Button variant="outline"><FaGear className="mr-1.5" /> Settings</Button>
      <Button variant="ghost"><FaTrash className="mr-1.5" /> Delete</Button>
    </div>
  );
}`,
    preview: <ActionButtonsPreview />,
  },
];

export default function ButtonExamplesPage() {
  return (
    <DevExampleLayout
      title="Button Examples"
      description="Development environment for Button component examples. These render exactly as they would on the production component page."
      examples={examples}
      backHref="/dev/examples"
      backLabel="Examples"
    />
  );
}
