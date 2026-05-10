"use client";

import { useState } from 'react';
import { Popover, Button, Flex, Label, Input } from 'ui-lab-components';

export const metadata = {
  title: 'Input Form',
  description: 'Popover containing a small form with labeled input fields and save/cancel actions.'
};

export default function Example() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <Popover
      position="bottom"
      content={
        <Flex direction="column" gap="sm" styles={{ root: "w-80" }}>
          <Flex direction="column" gap="xs">
            <Label htmlFor="contact-name">Name</Label>
            <Input
              id="contact-name"
              type="text"
              value={name}
              onChange={(e) => setName((e.target as HTMLInputElement).value)}
              placeholder="Full name"
            />
          </Flex>
          <Flex direction="column" gap="xs">
            <Label htmlFor="contact-email">Email</Label>
            <Input
              id="contact-email"
              type="email"
              value={email}
              onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
              placeholder="name@example.com"
            />
          </Flex>
        </Flex>
      }
    >
      <Button>Edit contact</Button>
    </Popover>
  );
}
