import React from 'react';
import { Confirmation } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';
import Example1, { metadata as metadata1 } from './examples/01-basic-confirm.js';
import examplesJson from './examples.json';
import { loadComponentExamples } from '../../utils/load-component-examples';
import { FaCheck, FaX } from 'react-icons/fa6';

export function getPreview(): React.ReactNode {
  return (
    <div style={{ width: "70%" }} className="rounded-sm overflow-hidden border border-background-700 flex flex-col gap-2 max-w-sm">
      <div className='pl-2 pt-3'>
        <div style={{ width: "60%", backgroundColor: "var(--background-500)", opacity: 0.2 }} className='rounded-md h-3 mb-2'></div>
        <div style={{ width: "70%", backgroundColor: "var(--background-500)", opacity: 0.2 }} className='rounded-md h-1 mb-2'></div>
        <div style={{ width: "40%", backgroundColor: "var(--background-500)", opacity: 0.2 }} className='rounded-md h-1'></div>
      </div>

      <div className='mt-4 border-t border-background-700 flex items-center py-1 gap-1 flex'>
        <div style={{ width: "35%", backgroundColor: "var(--background-800)" }} className='ml-auto flex items-center 
           rounded-xs h-4 gap-2 pl-1'>
          <FaX size={8} style={{ color: "var(--foreground-500)" }} />
          <div style={{ width: "70%", backgroundColor: "var(--background-500)", opacity: 0.2, marginRight: 4 }} className='rounded-md pr-1 h-1'></div>
        </div>
        <div style={{ width: "35%", marginRight: 2, backgroundColor: "var(--background-800)" }} className='flex items-center 
           rounded-xs h-4 gap-2 pl-1'>
          <FaCheck size={10} style={{ color: "var(--foreground-500)" }} />
          <div style={{ width: "70%", backgroundColor: "var(--background-500)", opacity: 0.2, marginRight: 4 }} className='rounded-md h-1'></div>
        </div>
      </div>
    </div>
  );
}

const examplesData = [
  { id: '01-basic-confirm', Component: Example1, metadata: metadata1 },
];

const confirmControls: ControlDef[] = [
  {
    name: 'triggerLabel',
    label: 'Trigger Label',
    type: 'text',
    defaultValue: 'Delete',
  },
  {
    name: 'title',
    label: 'Title',
    type: 'text',
    defaultValue: 'Are you sure?',
  },
  {
    name: 'description',
    label: 'Description',
    type: 'text',
    defaultValue: 'This action cannot be undone.',
  },
];

const confirmBasicCode = `import {Confirm} from "ui-lab-components";

          export function Example() {
  return (
          <Confirm
            triggerLabel="Delete Account"
            title="Are you sure?"
            description="This action cannot be undone."
            confirmLabel="Delete"
            cancelLabel="Cancel"
            onConfirm={() => console.log('Confirmed')}
            onCancel={() => console.log('Cancelled')}
          />
          );
}`;

export const confirmDetail: ComponentDetail = {
  id: 'confirm',
  name: 'Confirm',
  description: 'A confirm dialog for critical user actions.',
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Confirm component provides a safety mechanism for destructive or irreversible actions. It requires explicit user confirmation before proceeding with critical operations.
      </p>
      <p>
        With clear messaging, customizable labels, and accessible keyboard interactions, the Confirm dialog helps prevent accidental actions while maintaining a smooth user experience.
      </p>
    </div>
  ),
  examples: [
    {
      id: 'preview',
      title: 'Preview',
      description: 'Adjust props to customize the component',
      code: confirmBasicCode,
      preview: (
        <Confirmation
          triggerLabel="Delete"
          title="Are you sure?"
          description="This action cannot be undone."
          confirmLabel="Delete"
          cancelLabel="Cancel"
          onConfirm={() => console.log('Confirmed')}
          onCancel={() => console.log('Cancelled')}
        />
      ),
      controls: confirmControls,
      renderPreview: (props: any) => (
        <Confirmation
          triggerLabel={props.triggerLabel}
          title={props.title}
          description={props.description}
          confirmLabel="Delete"
          cancelLabel="Cancel"
          onConfirm={() => console.log('Confirmed')}
          onCancel={() => console.log('Cancelled')}
        />
      ),
    },
    ...loadComponentExamples(examplesData, examplesJson),
  ],
  variants: [
    {
      id: 'default',
      name: 'Default',
      description: 'Basic confirm dialog for destructive actions.',
      code: confirmBasicCode,
      preview: (
        <Confirmation
          triggerLabel="Delete Account"
          title="Are you sure?"
          description="This action cannot be undone."
          confirmLabel="Delete"
          cancelLabel="Cancel"
          onConfirm={() => console.log('Confirmed')}
          onCancel={() => console.log('Cancelled')}
        />
      ),
    },
  ],
};

export { confirmControls };
export * from './examples';
