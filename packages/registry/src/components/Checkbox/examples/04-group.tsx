"use client";

import { useState } from 'react';
import { Checkbox, Flex } from 'ui-lab-components';

export const metadata = {
  title: 'Checkbox Group',
  description: 'Use a small group when a user can select any number of related options.',
};

const subscriptionOptions = [
  'Product updates',
  'Security alerts',
  'Billing reminders',
];

export default function Example() {
  const [selected, setSelected] = useState<Set<string>>(
    new Set(['Product updates', 'Security alerts'])
  );

  const toggleOption = (option: string) => {
    setSelected((current) => {
      const next = new Set(current);
      next.has(option) ? next.delete(option) : next.add(option);
      return next;
    });
  };

  return (
    <Flex direction="column" gap="md" style={{ width: 300 }}>
      <div>
        <p className="text-sm font-medium text-foreground-100">Subscriptions</p>
        <p className="text-xs text-foreground-400">Choose the emails this workspace receives.</p>
      </div>
      <Flex direction="column" gap="sm">
        {subscriptionOptions.map((option) => (
          <Checkbox
            key={option}
            id={`subscription-${option.toLowerCase().replace(/ /g, '-')}`}
            label={option}
            checked={selected.has(option)}
            onChange={() => toggleOption(option)}
          />
        ))}
      </Flex>
    </Flex>
  );
}
