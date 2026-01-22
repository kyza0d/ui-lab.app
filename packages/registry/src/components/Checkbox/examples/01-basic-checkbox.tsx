'use client';

import React from 'react';
import { Checkbox } from 'ui-lab-components';

export const metadata = {
  title: 'Basic Checkbox',
  description: 'A simple checkbox with a label. Use this as the standard checkbox input in your forms.'
};

export default function Example() {
  const [checked, setChecked] = React.useState(false);

  return (
    <Checkbox
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
      label="Accept terms and conditions"
    />
  );
}
