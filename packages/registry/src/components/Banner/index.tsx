import React from 'react';
import { Banner } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';
import Example1, { metadata as metadata1 } from './examples/01-basic-banner.js';
import examplesJson from './examples.json';
import { loadComponentExamples } from '../../utils/load-component-examples';
import { FaInfoCircle } from 'react-icons/fa';

export function getPreview(): React.ReactNode {
  return (
    <div style={{ width: "85%", height: 36 }} className="relative w-full gap-3 flex px-2 bg-background-900 items-center justify-center border border-background-700 rounded-sm">
      <FaInfoCircle size={16} color="var(--background-500)" />
      <div className='flex flex-col gap-2 w-full'>
        <div style={{ width: "50%", backgroundColor: "var(--background-500)" }} className='opacity-10 w-full rounded-md h-2'></div>
        <div style={{ width: "80%", backgroundColor: "var(--background-500)" }} className='opacity-10 w-full rounded-md h-1'></div>
      </div>
    </div>
  );
}

const examplesData = [
  { id: '01-basic-banner', Component: Example1, metadata: metadata1 },
];

const bannerControls: ControlDef[] = [
  {
    name: 'variant',
    label: 'Variant',
    type: 'select',
    options: [
      { label: 'Note', value: 'note' },
      { label: 'Info', value: 'info' },
      { label: 'Success', value: 'success' },
      { label: 'Warning', value: 'warning' },
      { label: 'Danger', value: 'danger' },
    ],
    defaultValue: 'note',
  },
  {
    name: 'size',
    label: 'Size',
    type: 'select',
    options: [
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
    ],
    defaultValue: 'md',
  },
  {
    name: 'dismissible',
    label: 'Dismissible',
    type: 'toggle',
    defaultValue: false,
  },
];

const bannerBasicCode = `import { Banner } from "ui-lab-components";

export function Example() {
  return (
    <Banner variant="note" size="md">
      This is an informational banner.
    </Banner>
  );
}`;

export const bannerDetail: ComponentDetail = {
  id: 'banner',
  name: 'Banner',
  description: 'A full-width banner component for displaying important messages and notifications.',
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Banner component provides a prominent way to display information, notifications, and alerts.
        It spans the full width of its container and supports multiple variants and sizes for different contexts.
      </p>
      <p>
        Use Banner when you need to communicate important information at the top of pages, within documentation,
        or as alerts within your application. It can be made dismissible for users to close when not needed.
      </p>
    </div>
  ),
  examples: [
    {
      id: 'preview',
      title: 'Preview',
      description: 'Adjust props to customize the banner',
      code: bannerBasicCode,
      preview: (
        <Banner variant="note" size="md">
          This is an informational banner.
        </Banner>
      ),
      controls: bannerControls,
      renderPreview: (props: any) => (
        <Banner
          variant={props.variant as any}
          size={props.size as any}
          isDismissible={props.dismissible}
        >
          This is a {props.variant} banner.
        </Banner>
      ),
    },
    ...loadComponentExamples(examplesData, examplesJson),
  ],
};

export { bannerControls };
export * from './examples';
