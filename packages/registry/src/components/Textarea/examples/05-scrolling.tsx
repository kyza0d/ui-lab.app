"use client";

import { useState } from 'react';
import { TextArea, Flex } from 'ui-lab-components';

export const metadata = {
  title: 'Scrollable with maxHeight',
  description: 'TextArea bounded by a max height — content scrolls once it overflows.'
};

export default function Example() {
  const [value, setValue] = useState(
    "Line 1\nLine 2\nLine 3\nLine 4\nLine 5\nLine 6\nLine 7\nLine 8"
  );

  return (
    <Flex direction="column" gap="sm" style={{ width: 380 }}>
      <TextArea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxHeight="120px"
        resizable={false}
      />
    </Flex>
  );
}
