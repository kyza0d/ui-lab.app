import React from 'react';
import { Banner } from 'ui-lab-components';

export const metadata = {
  title: 'Success Banner',
  description: 'A success banner variant. Use this to indicate successful completion of an action.'
};

export default function Example() {
  return (
    <Banner variant="success" size="md">
      Success! Your changes have been saved.
    </Banner>
  );
}
