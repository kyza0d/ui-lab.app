import React from 'react';
import { CommandPalette, Button } from 'ui-lab-components';

export const metadata = {
  title: 'Basic Command Palette',
  description: 'A searchable command palette with keyboard shortcuts. Use this for quick access to application actions.'
};

export default function Example() {
  const [open, setOpen] = React.useState(false);

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
    {
      id: 'settings',
      label: 'Settings',
      description: 'Open application settings',
      shortcut: '⌘,',
      action: () => console.log('Settings'),
    },
  ];

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Open Palette (⌘K)
      </Button>
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        commands={commands}
      />
    </>
  );
}
