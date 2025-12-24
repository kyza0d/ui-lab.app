import React from 'react';
import { Popover, Button } from 'ui-lab-components';

export const metadata = {
  title: 'Basic Popover',
  description: 'A simple popover with a trigger button. Use this to display contextual content or actions.'
};

export default function Example() {
  return (
    <Popover content={<p className="text-sm">This is popover content. It appears when you click the button.</p>}>
      <Button>Click me</Button>
    </Popover>
  );
}
