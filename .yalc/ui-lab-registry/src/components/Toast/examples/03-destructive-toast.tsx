import React from 'react';
import { toast, Toaster } from 'ui-lab-components';

export const metadata = {
  title: 'Destructive Toast',
  description: 'Toast notification for errors or destructive operations.'
};

export default function Example() {
  return (
    <>
      <button
        onClick={() =>
          toast({
            title: 'Error',
            description: 'Something went wrong',
            variant: 'destructive',
          })
        }
        className="px-4 py-2 bg-accent-500 text-white rounded"
      >
        Show Error
      </button>
      <Toaster />
    </>
  );
}
