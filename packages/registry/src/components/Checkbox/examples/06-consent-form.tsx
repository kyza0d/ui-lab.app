"use client";

import { useState } from 'react';
import { Button, Checkbox, Flex } from 'ui-lab-components';

export const metadata = {
  title: 'Consent Form',
  description: 'A required checkbox can gate a form action while optional choices remain independent.',
};

export default function Example() {
  const [accepted, setAccepted] = useState(false);
  const [updates, setUpdates] = useState(false);

  return (
    <Flex direction="column" gap="md" style={{ width: 320 }}>
      <Checkbox
        id="consent-terms"
        label="I agree to the terms"
        helper="Required to create a workspace."
        checked={accepted}
        onChange={(event) => setAccepted(event.currentTarget.checked)}
      />
      <Checkbox
        id="consent-updates"
        label="Send product updates"
        checked={updates}
        onChange={(event) => setUpdates(event.currentTarget.checked)}
      />
      <Button variant="primary" isDisabled={!accepted} styles={{ root: 'w-full' }}>
        Continue
      </Button>
    </Flex>
  );
}
