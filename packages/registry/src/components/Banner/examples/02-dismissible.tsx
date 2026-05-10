"use client";

import { useState } from 'react';
import { Banner, Button, Flex } from 'ui-lab-components';

export const metadata = {
  title: 'Dismissible',
  description: 'A banner with a dismiss button. The caller controls what happens after dismissal.',
};

export default function Example() {
  const [dismissed, setDismissed] = useState(false);

  return (
    <Flex direction="column" gap="md" style={{ width: 480 }}>
      {!dismissed ? (
        <Banner variant="info" isDismissible onDismiss={() => setDismissed(true)}>
          <Banner.Title>Scheduled maintenance</Banner.Title>
          <Banner.Body>The system will be unavailable on Saturday from 2–4 AM UTC.</Banner.Body>
        </Banner>
      ) : (
        <Flex gap="sm" style={{ alignItems: 'center' }}>
          <span className="text-sm text-foreground-400">Banner dismissed.</span>
          <Button variant="ghost" onClick={() => setDismissed(false)}>
            Restore
          </Button>
        </Flex>
      )}
    </Flex>
  );
}
