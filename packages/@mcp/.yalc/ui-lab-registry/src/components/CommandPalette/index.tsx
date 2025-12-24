import React, { useState } from 'react';
import { CommandPalette, Button } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';
import Example1, { metadata as metadata1 } from './examples/01-basic-command-palette.js';
import examplesJson from './examples.json';
import { loadComponentExamples } from '../../utils/load-component-examples';

const examplesData = [
  { id: '01-basic-command-palette', Component: Example1, metadata: metadata1 },
];

const commandPaletteControls: ControlDef[] = [
  {
    name: 'open',
    label: 'Open',
    type: 'toggle',
    defaultValue: false,
  },
];

const commandPaletteBasicCode = `import { CommandPalette, Button } from "ui-lab-components";
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
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        commands={commands}
      />
    </>
  );
}`;

const CommandPalettePreview = () => {
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
      <CommandPalette open={open} onOpenChange={setOpen} commands={commands} />
    </>
  );
};

const CommandPaletteRenderPreview = (props: any) => {
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
      <CommandPalette
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

export const commandPaletteDetail: ComponentDetail = {
  id: 'command-palette',
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
      code: commandPaletteBasicCode,
      preview: <CommandPalettePreview />,
      controls: commandPaletteControls,
      renderPreview: CommandPaletteRenderPreview,
    },
    ...loadComponentExamples(examplesData, examplesJson),
  ],
  variants: [
    {
      id: 'default',
      name: 'Default',
      description: 'Basic command palette with search functionality.',
      code: commandPaletteBasicCode,
      preview: <CommandPalettePreview />,
    },
  ],
};

export { commandPaletteControls };
export * from './examples';
