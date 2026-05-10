"use client";

import { Popover, Button, Flex } from 'ui-lab-components';

export const metadata = {
  title: 'Arrow & Positions',
  description: 'Directional arrow enabled across all four placement options.'
};

export default function Example() {
  return (
    <Flex align="center">
      {(["top", "bottom", "left", "right"] as const).map((position) => (
        <Popover
          key={position}
          position={position}
          showArrow
          content={<span className="text-sm capitalize">{position}</span>}
        >
          <Button variant="ghost">
            <span className="capitalize">{position}</span>
          </Button>
        </Popover>
      ))}
    </Flex>
  );
}
