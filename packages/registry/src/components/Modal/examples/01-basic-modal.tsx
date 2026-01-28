'use client';

import React from 'react';
import { Modal, Button } from 'ui-lab-components';

export const metadata = {
  title: 'Basic Modal',
  description: 'A simple modal dialog with a trigger button. Use this for important user interactions that require focused attention.'
};

export default function Example() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Header>Modal Title</Modal.Header>
        <Modal.Body>This is the modal content. It displays important information or actions.</Modal.Body>
        <Modal.Footer>Modal Footer</Modal.Footer>
      </Modal>
    </>
  );
}
