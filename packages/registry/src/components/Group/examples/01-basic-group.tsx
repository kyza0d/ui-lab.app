import React from 'react';
import { Group, Button } from 'ui-lab-components';

export const metadata = {
  title: 'Basic Group',
  description: 'A simple group container that arranges multiple elements together. Use this to organize related UI elements in a consistent layout.'
};

export default function Example() {
  return (
    <Group>
      <Button>First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
    </Group>
  );
}
