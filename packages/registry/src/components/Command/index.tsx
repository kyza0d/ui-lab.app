import React, { useState } from 'react';
import { Command, Button, type Command as CommandType } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';
import { FaKeyboard } from 'react-icons/fa6';
import Example1, { metadata as metadata1 } from './examples/01-basic-command.js';
import examplesJson from './examples.json';
import { loadComponentExamples } from '../../utils/load-component-examples';
import { FaSearch } from 'react-icons/fa';

const examplesData = [
  { id: '01-basic-command', Component: Example1, metadata: metadata1 },
];

const commandControls: ControlDef[] = [
  {
    name: 'open',
    label: 'Open',
    type: 'toggle',
    defaultValue: false,
  },
];

const commandBasicCode = `import { Command, Button } from "ui-lab-components";
import { useState } from "react";

export function Example() {
  const [open, setOpen] = useState(false);

  const commands = [
    {
      id: "search",
      label: "Search",
      description: "Search documents",
      shortcut: "⌘F",
      action: () => console.log("Search"),
    },
    {
      id: "create",
      label: "Create new",
      description: "Create a new document",
      shortcut: "⌘N",
      action: () => console.log("Create"),
    },
  ];

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Open Palette
      </Button>
      <Command
        open={open}
        onOpenChange={setOpen}
        commands={commands}
      />
    </>
  );
}`;

const CommandPreview = () => {
  const [open, setOpen] = useState(false);
  const commands = [
    {
      id: 'search',
      label: 'Search',
      description: 'Search documents',
      shortcut: '⌘F',
      action: () => console.log('Search'),
    },
    {
      id: 'create',
      label: 'Create new',
      description: 'Create a new document',
      shortcut: '⌘N',
      action: () => console.log('Create'),
    },
  ];
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Palette</Button>
      <Command open={open} onOpenChange={setOpen} commands={commands} />
    </>
  );
};

const CommandRenderPreview = (props: any) => {
  const [open, setOpen] = useState(props.open ?? false);
  const commands = [
    {
      id: 'search',
      label: 'Search',
      description: 'Search documents',
      shortcut: '⌘F',
      action: () => console.log('Search'),
    },
    {
      id: 'create',
      label: 'Create new',
      description: 'Create a new document',
      shortcut: '⌘N',
      action: () => console.log('Create'),
    },
  ];
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Palette</Button>
      <Command
        open={open}
        onOpenChange={(value) => {
          setOpen(value);
          props.handleControlChange('open', value);
        }}
        commands={commands}
      />
    </>
  );
};

export const commandDetail: ComponentDetail = {
  id: 'command',
  name: 'Command',
  description: 'A searchable command palette for quick access to actions.',
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Command Palette component provides a quick way to access actions and navigate through your application. It features keyboard-driven search and navigation for power users.
      </p>
      <p>
        With support for keyboard shortcuts, grouped commands, and custom actions, the Command Palette enhances user productivity and workflow efficiency.
      </p>
    </div>
  ),
  examples: [
    {
      id: 'preview',
      title: 'Preview',
      description: 'Adjust props to customize the component',
      code: commandBasicCode,
      preview: <CommandPreview />,
      controls: commandControls,
      renderPreview: CommandRenderPreview,
    },
    ...loadComponentExamples(examplesData, examplesJson),
  ],
  variants: [
    {
      id: 'default',
      name: 'Default',
      description: 'Basic command with search functionality.',
      code: commandBasicCode,
      preview: <CommandPreview />,
    },
  ],
};

export { commandControls };
export * from './examples';
