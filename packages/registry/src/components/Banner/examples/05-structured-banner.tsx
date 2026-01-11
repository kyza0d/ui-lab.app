import React from 'react';
import { Banner } from 'ui-lab-components';

export const metadata = {
  title: 'Structured Banner',
  description: 'A banner with structured content using Title and Body compound components for semantic and organized layouts.'
};

export default function Example() {
  return (
    <Banner variant="info" size="md">
      <Banner.Title>New Feature Available</Banner.Title>
      <Banner.Body>
        We've added support for dark mode. Check out the settings panel to try it out!
      </Banner.Body>
    </Banner>
  );
}
