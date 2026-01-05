import React from 'react';
import { Button, Popover } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';
import Example1, { metadata as metadata1 } from './examples/01-basic-popover.js';
import examplesJson from './examples.json';
import { loadComponentExamples } from '../../utils/load-component-examples';

export function getPreview(): React.ReactNode {
  return (
    <div className="flex items-center justify-center h-22">
      <Popover content="Click to show">
        <Button variant="secondary">Click Me</Button>
      </Popover>
    </div>
  );
}

const examplesData = [
  { id: '01-basic-popover', Component: Example1, metadata: metadata1 },
];

const popoverControls: ControlDef[] = [
  {
    name: "position",
    label: "Position",
    type: "select",
    options: [
      { label: "Top", value: "top" },
      { label: "Right", value: "right" },
      { label: "Bottom", value: "bottom" },
      { label: "Left", value: "left" },
    ],
    defaultValue: "bottom",
  },
];

const popoverBasicCode = `import { Popover, Button } from "ui-lab-components";

export function Example() {
  return (
    <Popover content="Popover content">
      <Button>Click me</Button>
    </Popover>
  );
}`;

export const popoverDetail: ComponentDetail = {
  id: "popover",
  name: "Popover",
  description:
    "A floating content container triggered by click with positioning control and click-outside-to-close behavior.",

  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Popover component displays floating content relative to a trigger element.
        Unlike tooltips which appear on hover, popovers are explicitly triggered by user
        interaction and persist until dismissed.
      </p>
      <p>
        Popovers support four positioning options (top, right, bottom, left), controlled
        or uncontrolled state, and automatic dismissal via click-outside or Escape key.
        Perfect for dropdown menus, notifications, forms, and contextual actions.
      </p>
    </div>
  ),

  examples: [
    {
      id: "preview",
      title: "Preview",
      description: "Adjust props to customize the component",
      code: popoverBasicCode,
      preview: (
        <Popover content={<p className="text-sm">This is a popover</p>}>
          <Button>Click me</Button>
        </Popover>
      ),
      controls: popoverControls,
      renderPreview: (props: any) => (
        <Popover position={props.position} content={<p className="text-sm">Popover at {props.position}</p>}>
          <Button>Click me</Button>
        </Popover>
      ),
    },
    ...loadComponentExamples(examplesData, examplesJson),
  ],

  variants: [
    {
      id: "default",
      name: "Default",
      description: "Basic popover with bottom positioning.",
      code: popoverBasicCode,
      preview: (
        <Popover content={<p className="text-sm">Popover content</p>}>
          <Button size="sm">Click me</Button>
        </Popover>
      ),
    },
    {
      id: "positions",
      name: "Positions",
      description: "Popover supports top, right, bottom, and left positioning.",
      code: `<Popover position="top" content="Top position">
  <Button>Click me</Button>
</Popover>`,
      preview: (
        <div className="flex gap-4 justify-center">
          <Popover position="top" content="Top">
            <Button size="sm">Top</Button>
          </Popover>
          <Popover position="right" content="Right">
            <Button size="sm">Right</Button>
          </Popover>
          <Popover position="bottom" content="Bottom">
            <Button size="sm">Bottom</Button>
          </Popover>
          <Popover position="left" content="Left">
            <Button size="sm">Left</Button>
          </Popover>
        </div>
      ),
    },
  ],
};

export { popoverControls };
export * from './examples';
