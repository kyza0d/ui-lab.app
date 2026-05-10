import React from 'react';
import { Button, Frame, Popover } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';
import Example1, { metadata as metadata1 } from './examples/01-basic-popover.js';
import Example2, { metadata as metadata2 } from './examples/02-toggleable-options.js';
import Example3, { metadata as metadata3 } from './examples/03-table-row-actions.js';
import Example4, { metadata as metadata4 } from './examples/04-input-form.js';
import Example5, { metadata as metadata5 } from './examples/05-arrow-positions.js';
import examplesJson from './examples.json' with { type: 'json' };
import { loadComponentExamples } from '../../utils/load-component-examples.js';
import { FaQuestion } from 'react-icons/fa6';

const TAIL_WIDTH = 18;
const TAIL_PATH = "M 0.00 0.00 C 3.00 0.00 7.50 -6.00 9.00 -6.00 C 10.50 -6.00 13.50 0.00 18.00 0.00";

const examplesData = [
  { id: '01-basic-popover', Component: Example1, metadata: metadata1 },
  { id: '02-toggleable-options', Component: Example2, metadata: metadata2 },
  { id: '03-table-row-actions', Component: Example3, metadata: metadata3 },
  { id: '04-input-form', Component: Example4, metadata: metadata4 },
  { id: '05-arrow-positions', Component: Example5, metadata: metadata5 },
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
export * from './examples/index.js';
