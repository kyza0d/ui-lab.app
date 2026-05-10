"use client";

import { useState } from 'react';
import { Badge, Flex } from 'ui-lab-components';
import { FaTag } from 'react-icons/fa6';

export const metadata = {
  title: 'Selectable Tags',
  description: 'Icon-prefixed tags that toggle active state, e.g. for filtering or labeling.',
};

const tags = ['design', 'frontend', 'api', 'docs'];

export default function Example() {
  const [active, setActive] = useState<string[]>(['design']);

  function toggle(tag: string) {
    setActive((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  return (
    <Flex gap="xs" align="center" justify="center" wrap="wrap">
      {tags.map((tag) => (
        <Badge
          key={tag}
          icon={<FaTag size={10} />}
          onClick={() => toggle(tag)}
          style={{
            cursor: 'pointer',
            opacity: active.includes(tag) ? 1 : 0.45,
          }}
        >
          {tag}
        </Badge>
      ))}
    </Flex>
  );
}
