import React from 'react';
import { Banner } from 'ui-lab-components';

export const metadata = {
  title: 'Warning Banner',
  description: 'A warning banner variant. Use this to alert users about potential issues or deprecated features.'
};

export default function Example() {
  return (
    <Banner variant="warning" size="md">
      Warning: Please review your settings before proceeding.
    </Banner>
  );
}
