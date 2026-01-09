import React, { useState } from 'react';
import { Command, Button, type Command as CommandType } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';
import { FaKeyboard } from 'react-icons/fa6';
import Example1, { metadata as metadata1 } from './examples/01-basic-command.js';
import examplesJson from './examples.json';
import { loadComponentExamples } from '../../utils/load-component-examples';
import { FaSearch } from 'react-icons/fa';

export function getPreview(): React.ReactNode {
  return (
    <div style={{ width: "60%" }} className="rounded-sm overflow-hidden border border-background-700 flex flex-col gap-2 max-w-sm">
      <div className='h-8 gap-2 flex border-b border-background-700'>
        <FaSearch style={{ marginTop: 10 }} size={10} className='text-foreground-500 opacity-50 ml-2' />
      </div>
      <div className='h-8 pl-2 gap-2 flex border-b border-background-700'>
        <div style={{ width: 30, height: 20, backgroundColor: "var(--background-500)" }} className='opacity-10 rounded-md mb-2'></div>
        <div className='w-full flex flex-col'>
          <div style={{ width: "20%", backgroundColor: "var(--background-500)" }} className='opacity-10 rounded-md mb-1 h-2'></div>
          <div style={{ width: "50%", backgroundColor: "var(--background-500)" }} className='opacity-10 rounded-md h-2'></div>
        </div>
      </div>

      <div className='h-6 pl-2 gap-2 flex'>
        <div style={{ width: 30, height: 20, backgroundColor: "var(--background-500)" }} className='opacity-10 rounded-md mb-2'></div>
        <div className='w-full flex flex-col'>
          <div style={{ width: "20%", backgroundColor: "var(--background-500)" }} className='opacity-10 rounded-md mb-1 h-2'></div>
          <div style={{ width: "50%", backgroundColor: "var(--background-500)" }} className='opacity-10 rounded-md h-2'></div>
        </div>
      </div>

      <div style={{ backgroundColor: "var(--background-800)" }} className='border-t border-background-700 items-center h-5 px-2 gap-1 flex'>
        <div style={{ width: "30%", backgroundColor: "var(--background-500)", opacity: 0.2 }} className='rounded-md h-2'></div>
        <div style={{ width: "30%", backgroundColor: "var(--background-500)", opacity: 0.2 }} className='rounded-md h-2'></div>
        <div style={{ width: "20%", backgroundColor: "var(--background-500)", opacity: 0.2 }} className='ml-auto rounded-md h-2'></div>
      </div>
    </div>
  );
}

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
