"use client";

import { useState } from 'react';
import { TextArea, Flex, Button } from 'ui-lab-components';

export const metadata = {
  title: 'Feedback Form',
  description: 'TextArea with a character limit and submit button — disabled until the user types.'
};

export default function Example() {
  const [value, setValue] = useState("");

  return (
    <Flex direction="column" gap="sm" style={{ width: 380 }}>
      <TextArea
        placeholder="Tell us what you think..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        showCharacterCount
        maxCharacters={300}
        rows={4}
      />
      <Button variant="primary" disabled={value.trim().length === 0} className="self-end">
        Submit
      </Button>
    </Flex>
  );
}
