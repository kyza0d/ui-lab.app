import React from 'react';
import { Button, toast, Toaster } from 'ui-lab-components';

export const metadata = {
  title: 'Destructive Toast',
  description: 'Toast notification for errors or destructive operations.'
};

export default function Example() {
  return (
    <>
      <Button
        onClick={() =>
          toast({
            title: 'Error',
            description: 'Something went wrong',
            variant: 'destructive',
          })
        }
      >
        Show Error
      </Button>
      <Toaster />
    </>
  );
}
