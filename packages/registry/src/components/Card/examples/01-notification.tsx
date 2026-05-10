"use client";

import { useState } from 'react';
import { Card, Button, Flex, Badge } from 'ui-lab-components';

export const metadata = {
  title: 'Notification Card',
  description: 'A status-driven card with a badge, body copy, and a footer action. Caller controls read state.',
};

export default function Example() {
  const [read, setRead] = useState(false);

  return (
    <Card style={{ width: 360, opacity: read ? 0.6 : 1, transition: 'opacity 0.2s' }}>
      <Card.Header>
        <Flex justify="between" align="center">
          <span className="text-sm font-medium text-foreground-100">Deployment failed</span>
          <Badge variant="destructive">Error</Badge>
        </Flex>
      </Card.Header>
      <Card.Body>
        <p className="text-sm text-foreground-400">
          The production deploy of <span className="text-foreground-200">api-gateway</span> failed at step "Run tests". Check the logs for details.
        </p>
      </Card.Body>
      <Card.Footer>
        <Flex justify="between" align="center">
          <span className="text-xs text-foreground-500">2 minutes ago</span>
          <Button size="sm" variant="ghost" onPress={() => setRead(true)}>
            Mark as read
          </Button>
        </Flex>
      </Card.Footer>
    </Card>
  );
}
