import React from 'react';
import { Button, toast, Toaster } from 'ui-lab-components';

export const metadata = {
  title: 'Danger Toast',
  description: 'Toast notification for errors or destructive operations.'
};

export default function Example() {
  return (
    <>
      <Button
        size="sm"
        onClick={() =>
          toast({
            title: 'Error',
            description: 'Something went wrong',
            variant: 'danger',
          })
        }
      >
        Show Error
      </Button>
      <Toaster />
    </>
  );
}
