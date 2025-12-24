import React from 'react';
import { Label, Input } from 'ui-lab-components';

export const metadata = {
  title: 'Basic Label',
  description: 'A simple label component associated with a form input. Use this to provide accessible labels for form elements.'
};

export default function Example() {
  return (
    <div>
      <Label htmlFor="name">Name</Label>
      <Input id="name" placeholder="Enter your name" />
    </div>
  );
}
