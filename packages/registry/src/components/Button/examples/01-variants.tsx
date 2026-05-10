import React from 'react'
import { Button, Flex } from 'ui-lab-components'

const buttonVariants = [
  { label: "Primary", variant: "primary" },
  { label: "Default", variant: "default" },
  { label: "Secondary", variant: "secondary" },
  { label: "Outline", variant: "outline" },
  { label: "Ghost", variant: "ghost" },
  { label: "Danger", variant: "danger" },
] as const;

export const metadata = {
  title: 'Button Variants',
  description: 'All available button variants side by side in a single row.'
};

export default function Example() {
  return (
    <Flex gap="xs" align="center" justify="center" wrap="nowrap">
      {buttonVariants.map((button) => (
        <Button key={button.variant} variant={button.variant}>
          {button.label}
        </Button>
      ))}
    </Flex>
  )
}
