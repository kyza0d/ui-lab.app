"use client";

import { useState } from 'react';
import { Switch } from 'ui-lab-components';

export const metadata = {
  title: 'Controlled Toggle',
  description: 'Fully controlled switch with external state and reset.'
};

export default function Example() {
  const [active, setActive] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <Switch
        aria-label="Feature flag"
        isSelected={active}
        onChange={setActive}
      />
      <p className="text-xs text-muted-foreground">
        Feature is <strong>{active ? "enabled" : "disabled"}</strong>
      </p>
      <button
        className="text-xs underline text-muted-foreground"
        onClick={() => setActive(false)}
      >
        Reset
      </button>
    </div>
  );
}
