"use client";

import { useState } from 'react';
import { Switch } from 'ui-lab-components';

export const metadata = {
  title: 'Small Size',
  description: 'Compact switch for dense UIs.'
};

export default function Example() {
  const [dense, setDense] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <Switch
        size="sm"
        aria-label="Dense mode"
        isSelected={dense}
        onChange={setDense}
      />
      <span className="text-sm text-muted-foreground">Dense mode</span>
    </div>
  );
}
