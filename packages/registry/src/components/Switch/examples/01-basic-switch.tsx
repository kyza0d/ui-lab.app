"use client";

import { useState } from 'react';
import { Switch } from 'ui-lab-components';

export const metadata = {
  title: 'Inline Form Field',
  description: 'Switch paired with a label in a horizontal form row.'
};

export default function Example() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="flex items-center justify-between gap-4 w-64">
      <label htmlFor="marketing" className="text-sm">
        Marketing emails
      </label>
      <Switch
        id="marketing"
        aria-label="Marketing emails"
        isSelected={enabled}
        onChange={setEnabled}
      />
    </div>
  );
}
