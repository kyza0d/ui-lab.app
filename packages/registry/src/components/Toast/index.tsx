'use client';

import React from 'react';
import { toast, Toaster } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';
import { FaBell, FaX } from 'react-icons/fa6';
import Example1, { metadata as metadata1 } from './examples/01-basic-toast.js';
import Example2, { metadata as metadata2 } from './examples/02-success-toast.js';
import Example3, { metadata as metadata3 } from './examples/03-destructive-toast.js';
import Example4, { metadata as metadata4 } from './examples/04-info-toast.js';
import Example5, { metadata as metadata5 } from './examples/05-warning-toast.js';
import examplesJson from './examples.json';
import { loadComponentExamples } from '../../utils/load-component-examples';
import { FaInfoCircle } from 'react-icons/fa';

export function getPreview(): React.ReactNode {
  return (
    <div style={{ width: "84%", height: 40 }} className="relative w-full gap-3 flex px-2 bg-background-900 items-center justify-center border border-background-700 rounded-sm">
      <FaX size={7} style={{ color: "var(--foreground-500)" }} className='absolute top-2 right-2 ml-auto' />
      <FaInfoCircle size={16} color="var(--background-500)" />
      <div className='flex flex-col gap-2 w-full'>
        <div style={{ width: "50%", backgroundColor: "var(--background-500)" }} className='opacity-10 w-full rounded-base h-2'></div>
        <div style={{ width: "80%", backgroundColor: "var(--background-500)" }} className='opacity-10 w-full rounded-base h-2'></div>
      </div>
    </div>
  );
}

// Define examplesData locally
const examplesData = [
  { id: '01-basic-toast', Component: Example1, metadata: metadata1 },
  { id: '02-success-toast', Component: Example2, metadata: metadata2 },
  { id: '03-destructive-toast', Component: Example3, metadata: metadata3 },
  { id: '04-info-toast', Component: Example4, metadata: metadata4 },
  { id: '05-warning-toast', Component: Example5, metadata: metadata5 },
];

const toastControls: ControlDef[] = [
  {
    name: 'variant',
    label: 'Variant',
    type: 'select',
    options: [
      { label: 'Default', value: 'default' },
      { label: 'Success', value: 'success' },
      { label: 'Destructive', value: 'destructive' },
      { label: 'Info', value: 'info' },
      { label: 'Warning', value: 'warning' },
    ],
    defaultValue: 'default',
  },
  {
    name: 'position',
    label: 'Position',
    type: 'select',
    options: [
      { label: 'Bottom Right', value: 'bottom-right' },
      { label: 'Bottom Left', value: 'bottom-left' },
      { label: 'Bottom Center', value: 'bottom' },
      { label: 'Top Right', value: 'top-right' },
      { label: 'Top Left', value: 'top-left' },
      { label: 'Top Center', value: 'top' },
    ],
    defaultValue: 'bottom-right',
  },
  {
    name: 'duration',
    label: 'Duration (ms)',
    type: 'text',
    defaultValue: '5000',
  },
];

const toastBasicCode = `import { toast, Toaster } from "ui-lab-components";

export function Example() {
  return (
    <>
      <button onClick={() => toast({ title: 'Notification', description: 'This is a toast message' })}>
        Show Toast
      </button>
      <Toaster />
    </>
  );
}`;

export const toastDetail: ComponentDetail = {
  id: 'toast',
  name: 'Toast',
  description: 'A notification component for displaying temporary messages with multiple variants, positions, and auto-dismiss functionality.',
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Toast component displays temporary notifications to users. It supports multiple variants (default, success, destructive, info, warning) for different message types and can be positioned in any corner or center of the viewport.
      </p>
      <p>
        Toasts automatically dismiss after a configurable duration, support manual dismissal via close button, and can be paused on hover or focus. They're perfect for providing feedback after user actions, displaying system messages, or showing alerts.
      </p>
    </div>
  ),
  examples: [
    {
      id: 'preview',
      title: 'Preview',
      description: 'Adjust props to customize the component',
      code: toastBasicCode,
      preview: (
        <>
          <button
            onClick={() => toast({ title: 'Notification', description: 'This is a toast message' })}
            className="px-4 py-2 bg-accent-500 text-white rounded"
          >
            Show Toast
          </button>
          <Toaster />
        </>
      ),
      controls: toastControls,
      renderPreview: (props: any) => (
        <>
          <button
            onClick={() =>
              toast({
                title: 'Notification',
                description: 'This is a toast message',
                variant: props.variant as any,
                position: props.position as any,
                duration: parseInt(props.duration) || 5000,
              })
            }
            className="px-4 py-2 bg-accent-500 text-white rounded"
          >
            Show Toast
          </button>
          <Toaster />
        </>
      ),
    },
    ...loadComponentExamples(examplesData, examplesJson),
  ],
};

export { toastControls };
export * from './examples';
