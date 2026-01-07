import React from 'react';
import { Card } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';
import { FaRectangleList } from 'react-icons/fa6';
import Example1, { metadata as metadata1 } from './examples/01-basic-card.js';
import examplesJson from './examples.json';
import { loadComponentExamples } from '../../utils/load-component-examples';

export function getPreview(): React.ReactNode {
  return (
    <div style={{ width: "50%" }}>
      {/* Row 1: Equal Columns */}
      <div className="w-full border border-background-700 rounded bg-background-950">
        <div className='p-1 mb-2'>
          <div style={{ height: 42, backgroundColor: "var(--background-900)" }} className='w-full rounded-sm' />
        </div>
        <div style={{ width: "70%", backgroundColor: "var(--background-500)" }} className='opacity-10 rounded-md ml-2 h-1'></div>
        <div style={{ width: "60%", backgroundColor: "var(--background-500)" }} className='opacity-10 rounded-md ml-2 mt-2 h-1'></div>

        <div className='mt-4 py-1 border-t border-background-700 flex items-center gap-1 flex'>
          <div style={{ width: "35%", backgroundColor: "var(--background-800)" }} className='ml-auto flex justify-center items-center 
           rounded-xs h-3 gap-2 pl-1'>
            <div style={{ width: "70%", backgroundColor: "var(--background-500)", opacity: 0.2, marginRight: 4 }} className='rounded-md pr-1 h-1'></div>
          </div>
          <div style={{ width: "35%", marginRight: 2, backgroundColor: "var(--background-800)" }} className='flex justify-center items-center 
           rounded-xs h-3 gap-2 pl-1'>
            <div style={{ width: "70%", backgroundColor: "var(--background-500)", opacity: 0.2, marginRight: 4 }} className='h-1 rounded-md'></div>
          </div>
        </div>
      </div>
    </div>
  );
}

const examplesData = [
  { id: '01-basic-card', Component: Example1, metadata: metadata1 },
];

const basicCardCode = `import { Card } from "ui-lab-components";

export function Example() {
  return (
    <Card className="max-w-sm">
      <Card.Header>
        <h3 className="font-semibold text-foreground-100">Card Title</h3>
      </Card.Header>
      <Card.Body>
        <p className="text-foreground-300">
          This is the main content area of the card. You can put any content here.
        </p>
      </Card.Body>
    </Card>
  );
}`;

export const cardDetail: ComponentDetail = {
  id: 'card',
  name: 'Card',
  description: 'A flexible compound component for building card layouts with header, body, and footer sections.',
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Card component provides a clean and flexible way to group related content. Using the compound component pattern, you can easily compose cards with headers, bodies, and footers to match your design needs.
      </p>
      <p>
        Cards work great for product listings, user profiles, settings panels, or any grouped content that needs visual separation and structure.
      </p>
    </div>
  ),
  examples: [
    {
      id: 'preview',
      title: 'Preview',
      description: 'Adjust props to customize the component',
      code: basicCardCode,
      preview: (
        <Card className="max-w-sm">
          <Card.Header>
            <h3 className="font-semibold text-foreground-100">Card Title</h3>
          </Card.Header>
          <Card.Body>
            <p className="text-foreground-300">
              This is the main content area of the card. You can put any content here.
            </p>
          </Card.Body>
        </Card>
      ),
    },
    ...loadComponentExamples(examplesData, examplesJson),
  ],
  variants: [
    {
      id: 'default',
      name: 'Default',
      description: 'Standard card with header and body.',
      code: basicCardCode,
      preview: (
        <Card className="max-w-sm">
          <Card.Header>
            <h3 className="font-semibold text-foreground-100">Card Title</h3>
          </Card.Header>
          <Card.Body>
            <p className="text-foreground-300">
              This is the main content area of the card.
            </p>
          </Card.Body>
        </Card>
      ),
    },
    {
      id: 'with-footer',
      name: 'With Footer',
      description: 'Card with header, body, and footer sections.',
      code: `<Card className="max-w-sm">
  <Card.Header>
    <h3>Card Title</h3>
  </Card.Header>
  <Card.Body>
    <p>Card content goes here.</p>
  </Card.Body>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>`,
      preview: (
        <Card className="max-w-sm">
          <Card.Header>
            <h3 className="font-semibold text-foreground-100">Card Title</h3>
          </Card.Header>
          <Card.Body>
            <p className="text-foreground-300">
              Card with all sections.
            </p>
          </Card.Body>
          <Card.Footer>
            <button className="px-4 py-2 bg-accent-500 text-white rounded">Action</button>
          </Card.Footer>
        </Card>
      ),
    },
  ],
};

export * from './examples';
