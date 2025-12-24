import React from 'react';
import { toast, Toaster } from 'ui-lab-components';

export const metadata = {
  title: 'Info Toast',
  description: 'Toast notification for informational messages.'
};

export default function Example() {
  return (
    <>
      <button
        onClick={() =>
          toast({
            title: 'Info',
            description: 'Here is some useful information',
            variant: 'info',
          })
        }
        className="px-4 py-2 bg-accent-500 text-white rounded"
      >
        Show Info
      </button>
      <Toaster />
    </>
  );
}
