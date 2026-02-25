import React from 'react';
import { Button, toast, Toaster } from 'ui-lab-components';

export const metadata = {
  title: 'Warning Toast',
  description: 'Toast notification for warnings.'
};

export default function Example() {
  return (
    <>
      <Button
        size="sm"
        onClick={() =>
          toast({
            title: 'Warning',
            description: 'Please be careful',
            variant: 'warning',
          })
        }
      >
        Show Warning
      </Button>
      <Toaster />
    </>
  );
}
