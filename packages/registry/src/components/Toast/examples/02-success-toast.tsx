import React from 'react';
import { Button, toast, Toaster } from 'ui-lab-components';

export const metadata = {
  title: 'Success Toast',
  description: 'Toast notification for successful operations.'
};

export default function Example() {
  return (
    <>
      <Button
        size="sm"
        onClick={() =>
          toast({
            title: 'Success',
            description: 'Operation completed successfully',
            variant: 'success',
          })
        }
      >
        Show Success
      </Button>
      <Toaster />
    </>
  );
}
