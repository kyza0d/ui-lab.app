import React from 'react';
import { toast, Toaster } from 'ui-lab-components';

export const metadata = {
  title: 'Success Toast',
  description: 'Toast notification for successful operations.'
};

export default function Example() {
  return (
    <>
      <button
        onClick={() =>
          toast({
            title: 'Success',
            description: 'Operation completed successfully',
            variant: 'success',
          })
        }
        className="px-4 py-2 bg-accent-500 text-white rounded"
      >
        Show Success
      </button>
      <Toaster />
    </>
  );
}
