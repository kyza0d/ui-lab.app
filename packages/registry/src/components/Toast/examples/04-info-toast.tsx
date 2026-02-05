import React from 'react';
import { Button, toast, Toaster } from 'ui-lab-components';

export const metadata = {
  title: 'Info Toast',
  description: 'Toast notification for informational messages.'
};

export default function Example() {
  return (
    <>
      <Button
        onClick={() =>
          toast({
            title: 'Info',
            description: 'Here is some useful information',
            variant: 'info',
          })
        }
      >
        Show Info
      </Button>
      <Toaster />
    </>
  );
}
