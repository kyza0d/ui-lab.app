import React from 'react';
import { TextArea } from 'ui-lab-components';

export const metadata = {
  title: 'Basic TextArea',
  description: 'A simple multi-line text input field. Use this for collecting longer text input like comments or descriptions.'
};

export default function Example() {
  return (
    <TextArea
      placeholder="Enter your comments here..."
      rows={4}
    />
  );
}
