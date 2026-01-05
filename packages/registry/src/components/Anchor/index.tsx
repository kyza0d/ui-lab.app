import React from 'react';
import { Anchor, Divider } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';
import Example1, { metadata as metadata1 } from './examples/01-basic-anchor.js';
import Example2, { metadata as metadata2 } from './examples/02-anchor-with-preview.js';
import Example3, { metadata as metadata3 } from './examples/03-underline-variations.js';
import examplesJson from './examples.json';
import { loadComponentExamples } from '../../utils/load-component-examples';

export function getPreview(): React.ReactNode {
  return (
    <div className='w-full grid grid-rows-2 items-start gap-2 justify-center'>
      <div>
        <div>
          <div style={{ width: 70, backgroundColor: "var(--background-500)" }} className='opacity-10 rounded-md h-3'></div>
          <Divider size='sm' variant='dashed' />
        </div>
      </div>
    </div>
  );
}

const examplesData = [
  { id: '01-basic-anchor', Component: Example1, metadata: metadata1 },
  { id: '02-anchor-with-preview', Component: Example2, metadata: metadata2 },
  { id: '03-underline-variations', Component: Example3, metadata: metadata3 },
];

const anchorControls: ControlDef[] = [];

const anchorBasicCode = `import { Anchor } from "ui-lab-components";

export function Example() {
  return (
    <Anchor>
      Click me
      <Anchor.Preview>
        <div>Preview</div>
      </Anchor.Preview>
    </Anchor>
  );
}`;

export const anchorDetail: ComponentDetail = {
  id: 'anchor',
  name: 'Anchor',
  description: 'A styled link component with custom underline animation and popover preview.',
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Anchor component provides a styled link with a custom animated underline. It integrates with the Popover component to display preview content on hover.
      </p>
      <p>
        Use Anchor when you need a visually distinctive link that can show contextual information in a popover. It's perfect for embedding links in text with supplementary information.
      </p>
    </div>
  ),
  examples: [
    {
      id: 'preview',
      title: 'Preview',
      description: 'Basic anchor with popover preview',
      code: anchorBasicCode,
      preview: (
        <Anchor>
          Hover me
          <Anchor.Preview>
            <div className="text-sm">Preview content</div>
          </Anchor.Preview>
        </Anchor>
      ),
      controls: anchorControls,
      renderPreview: () => (
        <Anchor>
          Hover me
          <Anchor.Preview>
            <div className="text-sm">Preview content</div>
          </Anchor.Preview>
        </Anchor>
      ),
    },
    ...loadComponentExamples(examplesData, examplesJson),
  ],
};

export { anchorControls };
export * from './examples';
