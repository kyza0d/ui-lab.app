'use client';

import React from 'react';
import { Command, Button, Badge } from 'ui-lab-components';

export const metadata = {
  title: 'Basic Command Palette',
  description: 'A searchable command palette with keyboard shortcuts. Use Cmd+K (or Ctrl+K) to open.'
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
      <Command
        open={open}
        onOpenChange={setOpen}
        items={commands}
      >
        <Command.SearchInput placeholder="Search commands..." />
        <Command.List>
          <Command.Groups
            renderCategory={(category) =>
              category ? <Command.Category>{category}</Command.Category> : null
            }
            renderItem={(cmd) => (
              <Command.Item
                key={cmd.id}
                value={cmd.id}
                textValue={cmd.label}
                action={cmd.action}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 500 }}>{cmd.label}</div>
                    {cmd.description && (
                      <div style={{ fontSize: '0.875em', opacity: 0.7 }}>
                        {cmd.description}
                      </div>
                    )}
                  </div>
                  {cmd.shortcut && (
                    <Badge>{cmd.shortcut}</Badge>
                  )}
                </div>
              </Command.Item>
            )}
          />
        </Command.List>
      </Command>
    </>
  );
}
