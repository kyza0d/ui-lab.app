"use client";

import { useState } from 'react';
import { Card, Button, Flex, Switch } from 'ui-lab-components';

export const metadata = {
  title: 'Settings Panel',
  description: 'Card used as a settings section with a list of toggle rows and save/cancel actions in the footer.',
};

const items = [
  { label: 'Email alerts', description: 'Receive alerts via email' },
  { label: 'Push notifications', description: 'Browser push notifications' },
  { label: 'Weekly digest', description: 'Summary sent every Monday' },
];

export default function Example() {
  const [enabled, setEnabled] = useState(true);

  return (
    <Card style={{ width: 360 }}>
      <Card.Header>
        <span className="text-sm font-medium text-foreground-100">Notifications</span>
      </Card.Header>
      <Card.Body className="space-y-4 py-4">
        {items.map((item) => (
          <Flex key={item.label} justify="between" align="center">
            <div>
              <p className="text-sm text-foreground-100">{item.label}</p>
              <p className="text-xs text-foreground-500">{item.description}</p>
            </div>
            <Switch
              isSelected={enabled}
              onChange={setEnabled}
              aria-label={item.label}
            />
          </Flex>
        ))}
      </Card.Body>
      <Card.Footer>
        <Flex justify="end" gap="xs">
          <Button size="sm" variant="ghost">Cancel</Button>
          <Button size="sm" variant="primary">Save</Button>
        </Flex>
      </Card.Footer>
    </Card>
  );
}
