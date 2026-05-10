"use client";

import { useState } from 'react';
import { TextArea, Flex } from 'ui-lab-components';

export const metadata = {
  title: 'Validation Error',
  description: 'Error styling triggered when the input is non-empty but below a minimum length.'
};

export default function Example() {
  const [value, setValue] = useState("");
  const hasError = value.trim().length > 0 && value.trim().length < 20;

  return (
    <Flex direction="column" gap="sm" style={{ width: 380 }}>
      <TextArea
        placeholder="Describe the issue in detail..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        error={hasError}
        rows={4}
      />
      {hasError && (
        <span style={{ fontSize: "0.75rem", color: "var(--color-destructive)" }}>
          Description must be at least 20 characters.
        </span>
      )}
    </Flex>
  );
}
