import React from 'react'
import { Button, Flex } from 'ui-lab-components'
import { FaArrowRight, FaDownload, FaEllipsisVertical, FaPlus } from 'react-icons/fa6'

export const metadata = {
  title: 'Icons',
  description: 'Left, right, and icon-only button patterns.'
};

export default function Example() {
  return (
    <Flex gap="xs" align="center" justify="center" wrap="wrap">
      <Button variant="primary" icon={{ left: <FaPlus /> }}>
        New Project
      </Button>
      <Button variant="outline" icon={{ right: <FaArrowRight /> }}>
        Continue
      </Button>
      <Button variant="secondary" icon={<FaDownload />}>
        Download
      </Button>
      <Button size="icon" variant="ghost" aria-label="More actions" icon={<FaEllipsisVertical />} />
    </Flex>
  )
}
