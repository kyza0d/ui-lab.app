"use client";

import { Button, Input, Checkbox, Radio, Badge, Card, Select, Slider } from "ui-lab-components";

const coreComponents = [
  {
    id: "button",
    name: "Button",
    category: "basic",
    height: "h-20",
    columnSpan: 1,
    rowSpan: 1,
    render: () => <Button variant="secondary">Click me</Button>,
  },
  {
    id: "input",
    name: "Input",
    category: "basic",
    height: "h-32",
    columnSpan: 2,
    rowSpan: 1,
    render: () => <Input placeholder="Enter text..." />,
  },
  {
    id: "checkbox",
    name: "Checkbox",
    category: "basic",
    height: "h-28",
    columnSpan: 1,
    rowSpan: 2,
    render: () => <Checkbox defaultChecked label="Accept" />,
  },
  {
    id: "radio",
    name: "Radio",
    category: "basic",
    height: "h-24",
    columnSpan: 2,
    rowSpan: 2,
    render: () => <Radio value="option1" label="Select" />,
  },
  {
    id: "badge",
    name: "Badge",
    category: "basic",
    height: "h-16",
    columnSpan: 1,
    rowSpan: 1,
    render: () => <Badge>New</Badge>,
  },
  {
    id: "slider",
    name: "Slider",
    category: "basic",
    height: "h-36",
    columnSpan: 2,
    rowSpan: 1,
    render: () => (
      <div className="w-full">
        <Slider.Root min={0} max={100} defaultValue={[50]} />
      </div>
    ),
  },
  {
    id: "card",
    name: "Card",
    category: "container",
    height: "h-40",
    columnSpan: 1,
    rowSpan: 2,
    render: () => (
      <Card className="w-full h-full">
        <Card.Body>
          <p className="text-xs">Card content</p>
        </Card.Body>
      </Card>
    ),
  },
  {
    id: "select",
    name: "Select",
    category: "basic",
    height: "h-26",
    columnSpan: 1,
    rowSpan: 1,
    render: () => (
      <Select>
        <Select.Trigger>
          <Select.Value placeholder="Pick one" />
        </Select.Trigger>
        <Select.Content>
          <Select.List>
            <Select.Item value="option1">Option 1</Select.Item>
            <Select.Item value="option2">Option 2</Select.Item>
          </Select.List>
        </Select.Content>
      </Select>
    ),
  },
];

export function Showcase() {
  return (
    <div className="bg-background-950 ml-auto h-240 border-t border-b-0 border-background-700 overflow-hidden">
      <div className="overflow-auto flex flex-col">
        <div className="flex-1 overflow-auto">
          <div className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {coreComponents.map((component) => (
              <div
                key={component.id}
                style={{
                  gridColumn: `span ${component.columnSpan}`,
                  gridRow: `span ${component.rowSpan}`,
                }}
                className={`flex flex-col gap-3 p-4 h-full border-r border-b border-background-700 ${component.height}`}
              >
                <div className="flex items-center justify-center flex-1 p-2">
                  {component.render()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
