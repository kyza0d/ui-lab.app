import React from 'react';
import { toast, Toaster } from 'ui-lab-components';

export const metadata = {
  title: 'Warning Toast',
  description: 'Toast notification for warnings.'
};

export default function Example() {
  return (
    <>
      <button
        onClick={() =>
          toast({
            title: 'Warning',
            description: 'Please be careful',
            variant: 'warning',
          })
        }
        className="px-4 py-2 bg-accent-500 text-white rounded"
      >
        Show Warning
      </button>
      <Toaster />
    </>
  );
}
