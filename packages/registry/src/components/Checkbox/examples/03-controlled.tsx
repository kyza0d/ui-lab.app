"use client";

import { useState } from 'react';
import { Button, Checkbox, Flex } from 'ui-lab-components';

export const metadata = {
  title: 'Controlled',
  description: 'Use checked and onChange when checkbox state is owned by the surrounding interface.',
};

export default function Example() {
  const [checked, setChecked] = useState(true);

  return (
    <Flex direction="column" gap="md" style={{ width: 300 }}>
      <Checkbox
        id="controlled-email"
        label="Email notifications"
        helper={checked ? 'Notifications are enabled.' : 'Notifications are paused.'}
        checked={checked}
        onChange={(event) => setChecked(event.currentTarget.checked)}
      />
      <Button variant="secondary" onClick={() => setChecked((value) => !value)}>
        {checked ? 'Turn off' : 'Turn on'}
      </Button>
    </Flex>
  );
}
