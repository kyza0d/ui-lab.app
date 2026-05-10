"use client";

import { useState } from 'react';
import { Badge, Flex } from 'ui-lab-components';

export const metadata = {
  title: 'Dismissible Tags',
  description: 'Applied label chips in a multi-select input or filter bar that can be individually removed.',
};

const initial = ['React', 'TypeScript', 'CSS Modules', 'Next.js', 'Radix UI'];

export default function Example() {
  const [tags, setTags] = useState(initial);

  return (
    <Flex gap="xs" align="center" justify="center" wrap="wrap">
      {tags.map((tag) => (
        <Badge
          key={tag}
          dismissible
          onDismiss={() => setTags((prev) => prev.filter((t) => t !== tag))}
        >
          {tag}
        </Badge>
      ))}
      {tags.length === 0 && (
        <span
          className="text-sm text-foreground-400 cursor-pointer"
          onClick={() => setTags(initial)}
        >
          All dismissed — click to reset
        </span>
      )}
    </Flex>
  );
}
