import React from 'react';
import { Modal, Button } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';
import { FaWindowRestore, FaX } from 'react-icons/fa6';
import Example1, { metadata as metadata1 } from './examples/01-basic-modal.js';
import examplesJson from './examples.json';
import { loadComponentExamples } from '../../utils/load-component-examples';

export function getPreview(): React.ReactNode {
  return (
    <div style={{ width: "70%" }} className="rounded-sm overflow-hidden border border-background-700 flex flex-col gap-2 max-w-sm">
      <div className='mb-2 border-b border-background-700 flex items-center p-1 gap-1 flex'>
        <FaX size={8} style={{ color: "var(--foreground-500)" }} className='ml-auto' />
      </div>

      <div className='pl-2'>
        <div style={{ width: "60%", backgroundColor: "var(--background-500)", opacity: 0.2 }} className='rounded-base h-3 mb-2'></div>
        <div style={{ width: "70%", backgroundColor: "var(--background-500)", opacity: 0.2 }} className='rounded-base h-1 mb-2'></div>
        <div style={{ width: "40%", backgroundColor: "var(--background-500)", opacity: 0.2 }} className='rounded-base h-1'></div>
      </div>

      <div className='mt-4 border-t border-background-700 flex items-center p-1 gap-1 flex'>
        <div style={{ width: "40%", backgroundColor: "var(--background-500)" }} className='opacity-10 rounded-base h-2'></div>
        <div style={{ width: "35%", backgroundColor: "var(--background-800)" }} className='ml-auto flex items-center 
           rounded-xs h-3 pl-1'>
        </div>
      </div>
    </div>
  );
}

const examplesData = [
  { id: '01-basic-modal', Component: Example1, metadata: metadata1 },
];

const modalControls: ControlDef[] = [
  {
    name: "size",
    label: "Size",
    type: "select",
    options: [
      { label: "Small", value: "sm" },
      { label: "Medium", value: "md" },
      { label: "Large", value: "lg" },
    ],
    defaultValue: "md",
  },
];

const modalBasicCode = `import { Modal, Button } from "ui-lab-components";
import { useState } from "react";

export function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Header>Modal Title</Modal.Header>
        <Modal.Body>Modal content goes here</Modal.Body>
      </Modal>
    </>
  );
}`;

export const modalDetail: ComponentDetail = {
  id: "modal",
  name: "Modal",
  description: "A dialog component for displaying content in a modal overlay with support for forms, confirmations, and alerts.",

  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Modal component displays content in a centered dialog that blocks interaction with the page behind it. It's built with accessibility in mind and includes keyboard handling (Escape to close) and backdrop click handling.
      </p>
      <p>
        Use modals for important user interactions like confirmations, forms, alerts, or when you need focused user attention. The component supports various sizes and can include headers, bodies, and footers.
      </p>
    </div>
  ),

  examples: [
    {
      id: "preview",
      title: "Preview",
      description: "Adjust props to customize the component",
      code: modalBasicCode,
      preview: (
        <div className="text-sm text-foreground-400">
          Click button to open modal
        </div>
      ),
      controls: modalControls,
      renderPreview: (props: any) => {
        const [isOpen, setIsOpen] = React.useState(false);
        return (
          <>
            <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
            <Modal isOpen={isOpen} onOpenChange={setIsOpen} size={props.size}>
              <Modal.Header>Modal Title</Modal.Header>
              <Modal.Body>This is the modal content</Modal.Body>
            </Modal>
          </>
        );
      },
    },
    ...loadComponentExamples(examplesData, examplesJson),
  ],

  variants: [
    {
      id: "default",
      name: "Default",
      description: "Standard modal with title and content.",
      code: modalBasicCode,
      preview: (
        <div className="text-sm text-foreground-400">
          See preview above
        </div>
      ),
    },
  ],
};

export { modalControls };
export * from './examples';
