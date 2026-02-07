import React from 'react';
import { Mask } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';
import Example1, { metadata as metadata1 } from './examples/01-read-more-fade.js';
import Example2, { metadata as metadata2 } from './examples/02-text-gradient.js';
import examplesJson from './examples.json';
import { loadComponentExamples } from '../../utils/load-component-examples';

const examplesData = [
  { id: '01-read-more-fade', Component: Example1, metadata: metadata1 },
  { id: '02-text-gradient', Component: Example2, metadata: metadata2 },
];

const maskControls: ControlDef[] = [
  {
    name: 'variant',
    label: 'Mode',
    type: 'select',
    options: [
      { label: 'Fade Y (Vertical)', value: 'y' },
      { label: 'Fade X (Horizontal)', value: 'x' },
      { label: 'Text Gradient', value: 'gradient' },
    ],
    defaultValue: 'y',
  },
];

const maskBasicCode = `import { Mask } from "ui-lab-components";

export function Example() {
  return (
    <Mask variant="y">
      <div className="h-48 p-4 bg-muted/30">
        <p className="text-sm">
          Long content that fades at the top and bottom...
        </p>
      </div>
    </Mask>
  );
}`;

export const maskDetail: ComponentDetail = {
  id: 'mask',
  name: 'Mask',
  description: 'A versatile masking component for fade effects and text gradients.',
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Mask component is a multi-purpose utility that handles complex masking operations.
        It primarily provides content fading (mask-image) for scrollable areas or edge softening,
        and also supports text gradient masking (background-clip: text).
      </p>
      <p>
        Use the <code>gradient</code> variant to apply custom gradients to text elements,
        or standard <code>x/y</code> variants for content fade effects.
      </p>
    </div>
  ),
  examples: [
    {
      id: 'preview',
      title: 'Preview',
      description: 'Explore the different masking capabilities.',
      code: maskBasicCode,
      preview: (
        <div className="w-full h-64 border rounded-lg overflow-hidden bg-background p-8 flex items-center justify-center">
          <Mask variant="y" className="max-w-md h-full">
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </Mask>
        </div>
      ),
      controls: maskControls,
      renderPreview: (props: any) => (
        <div className="w-full h-64 border rounded-lg overflow-hidden bg-background p-8 flex items-center justify-center">
          <Mask 
            variant={props.variant as any} 
            className="w-full h-full flex items-center justify-center"
            gradient={props.variant === 'gradient' ? "linear-gradient(to right, var(--foreground-200), var(--accent-500))" : undefined}
          >
            {props.variant === 'y' ? (
              <div className="space-y-4 text-sm text-muted-foreground max-w-md">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
            ) : props.variant === 'x' ? (
              <div className="whitespace-nowrap text-6xl font-black tracking-tighter">
                FADE THE EDGES
              </div>
            ) : (
              <div className="whitespace-nowrap text-6xl font-black tracking-tighter">
                GRADIENT
              </div>
            )}
          </Mask>
        </div>
      ),
    },
    ...loadComponentExamples(examplesData, examplesJson),
  ],
};

export { maskControls };
export * from './examples';
