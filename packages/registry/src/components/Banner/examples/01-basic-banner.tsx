import React from 'react';
import { Banner } from 'ui-lab-components';

export const metadata = {
  title: 'Basic Banner',
  description: 'A neutral note banner using background shades instead of semantic colors. The default banner variant for general-purpose messaging.'
};

export default function Example() {
  return (
    <Banner variant="note" size="md">
      This is a note banner. Use it for general-purpose messages and information without semantic intent.
    </Banner>
  );
}
