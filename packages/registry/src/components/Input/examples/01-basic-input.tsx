import React from 'react';
import { Input } from 'ui-lab-components';

export const metadata = {
  title: 'Basic Input',
  description: 'A simple text input field with default styling. Use this as the standard input element for collecting user text input.'
};

export default function Example() {
  return <Input placeholder="Enter text..." />;
}
