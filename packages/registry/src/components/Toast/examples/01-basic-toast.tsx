import React from 'react';
import { Button, toast, Toaster } from 'ui-lab-components';

export const metadata = {
  title: 'Basic Toast',
  description: 'A simple toast notification. Click the button to trigger a toast message with default styling.'
};

export default function Example() {
  return (
    <>
      <Button onClick={() => toast({ title: 'Notification', description: 'This is a toast message' })}>
        Show Toast
      </Button>
      <Toaster />
    </>
  );
}
