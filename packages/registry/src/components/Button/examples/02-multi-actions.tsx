"use client";

import { Button, Flex } from 'ui-lab-components'
import { FaEllipsisVertical } from "react-icons/fa6";

export const metadata = {
  title: 'Multiple Actions',
  description: 'A primary action button grouped with secondary actions and an options menu.'
};

export default function Example() {
  return (
    <Flex gap="xs" className="w-110 *:not-last:flex-1">
      <Button size="sm" variant="primary" >Subscribe</Button>
      <Button size="sm" >Message</Button>
      <Button size="icon" variant="outline" icon={<FaEllipsisVertical />} />
    </Flex>
  );
}
