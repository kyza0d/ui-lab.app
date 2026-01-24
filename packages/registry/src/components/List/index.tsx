import React from 'react';
import { List, Button } from 'ui-lab-components';
import { ComponentDetail } from '@/types';
import Example1, { metadata as metadata1 } from './examples/01-basic.js';
import examplesJson from './examples.json';
import { loadComponentExamples } from '../../utils/load-component-examples';

export function getPreview(): React.ReactNode {
  return (
    <div className="w-full flex flex-col gap-4 max-w-sm">
      <div className='h-8 flex flex-col border-b border-background-700'>
        <div style={{ width: "20%", backgroundColor: "var(--background-500)" }} className='opacity-10 rounded-md mb-2 h-6'></div>
        <div style={{ width: "50%", backgroundColor: "var(--background-500)" }} className='opacity-10 rounded-md mb-2 h-6'></div>
      </div>
      <div className='h-8 flex flex-col border-b border-background-700'>
        <div style={{ width: "20%", backgroundColor: "var(--background-500)" }} className='opacity-10 rounded-md mb-2 h-6'></div>
        <div style={{ width: "50%", backgroundColor: "var(--background-500)" }} className='opacity-10 rounded-md mb-2 h-6'></div>
      </div>
    </div>
  );
}

const examplesData = [
  { id: '01-basic', Component: Example1, metadata: metadata1 },
];

const basicListCode = `import { List, Button } from "ui-lab-components";

export function Example() {
  return (
    <List ariaLabel="Items">
      <List.Header>
        <h2>Items</h2>
      </List.Header>
      <List.Item interactive>Item One</List.Item>
      <List.Item interactive>Item Two</List.Item>
      <List.Footer align="center">
        <Button variant="primary" size="sm">Load More</Button>
      </List.Footer>
    </List>
  );
}`;

export const listDetail: ComponentDetail = {
  id: 'list',
  name: 'List',
  description: 'Compound component for displaying item collections with selection and actions.',
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The List component provides a flexible, composable system for displaying collections of
        items. Use it for feeds, directories, and interactive lists with support for selection,
        actions, and custom layouts.
      </p>
      <p>
        Built with accessibility in mind, the List component includes proper ARIA roles, keyboard
        navigation support, and semantic HTML structure for screen readers.
      </p>
    </div>
  ),
  examples: [
    {
      id: 'preview',
      title: 'Preview',
      description: 'Basic list usage with interactive items',
      code: basicListCode,
      preview: (
        <List ariaLabel="Preview List">
          <List.Header>
            <h3>Items</h3>
          </List.Header>
          <List.Item interactive>Item One</List.Item>
          <List.Item interactive>Item Two</List.Item>
          <List.Item interactive>Item Three</List.Item>
          <List.Footer align="center">
            <Button variant="primary" size="sm">Load More</Button>
          </List.Footer>
        </List>
      ),
    },
    ...loadComponentExamples(examplesData, examplesJson),
  ],
  variants: [
    {
      id: 'basic',
      name: 'Basic',
      description: 'Standard list with interactive items.',
      code: basicListCode,
      preview: (
        <List ariaLabel="Basic List">
          <List.Header>
            <h3>Items</h3>
          </List.Header>
          <List.Item interactive>Item One</List.Item>
          <List.Item interactive>Item Two</List.Item>
          <List.Footer align="center">
            <Button variant="primary" size="sm">Load More</Button>
          </List.Footer>
        </List>
      ),
    },
    {
      id: 'with-selection',
      name: 'With Selection',
      description: 'List items with selection state.',
      code: `import { List } from "ui-lab-components";
import { useState } from "react";

export function Example() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  return (
    <List ariaLabel="Items">
      <List.Header>
        <h2>Items</h2>
      </List.Header>
      <List.Item
        selected={selectedId === 1}
        interactive
        onClick={() => setSelectedId(1)}
      >
        Item One
      </List.Item>
      <List.Item
        selected={selectedId === 2}
        interactive
        onClick={() => setSelectedId(2)}
      >
        Item Two
      </List.Item>
    </List>
  );
}`,
      preview: (
        <List ariaLabel="Selection List">
          <List.Header>
            <h3>Items</h3>
          </List.Header>
          <List.Item selected interactive>
            Item One (Selected)
          </List.Item>
          <List.Item interactive>Item Two</List.Item>
        </List>
      ),
    },
    {
      id: 'with-actions',
      name: 'With Actions',
      description: 'List items with action groups.',
      code: `import { List } from "ui-lab-components";

export function Example() {
  return (
    <List ariaLabel="Items">
      <List.Header>
        <h2>Feed</h2>
      </List.Header>
      <List.Item interactive>
        <p>Item with actions</p>
        <List.ActionGroup justify="space-between">
          <button>👍 Like</button>
          <button>💬 Reply</button>
        </List.ActionGroup>
      </List.Item>
    </List>
  );
}`,
      preview: (
        <List ariaLabel="Actions List">
          <List.Header>
            <h3>Feed</h3>
          </List.Header>
          <List.Item interactive>
            <p className="text-sm text-foreground-300">Item with actions</p>
            <List.ActionGroup justify="space-between">
              <button className="text-sm text-foreground-300 hover:text-foreground-100 transition-colors">👍 Like</button>
              <button className="text-sm text-foreground-300 hover:text-foreground-100 transition-colors">💬 Reply</button>
            </List.ActionGroup>
          </List.Item>
        </List>
      ),
    },
    {
      id: 'sticky-header',
      name: 'Sticky Header',
      description: 'List with a sticky header that stays in place when scrolling.',
      code: `import { List } from "ui-lab-components";

export function Example() {
  return (
    <div className="h-64 overflow-y-auto">
      <List ariaLabel="Items">
        <List.Header sticky>
          <h2>Items</h2>
        </List.Header>
        <List.Item interactive>Item One</List.Item>
        <List.Item interactive>Item Two</List.Item>
        <List.Item interactive>Item Three</List.Item>
        <List.Item interactive>Item Four</List.Item>
      </List>
    </div>
  );
}`,
      preview: (
        <div className="h-40 overflow-y-auto border border-background-700 rounded">
          <List ariaLabel="Sticky List">
            <List.Header sticky>
              <h3>Items</h3>
            </List.Header>
            <List.Item interactive>Item One</List.Item>
            <List.Item interactive>Item Two</List.Item>
            <List.Item interactive>Item Three</List.Item>
            <List.Item interactive>Item Four</List.Item>
          </List>
        </div>
      ),
    },
  ],
};

export * from './examples';
