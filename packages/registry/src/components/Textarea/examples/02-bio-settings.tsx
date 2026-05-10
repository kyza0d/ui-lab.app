"use client";

import { useState } from 'react';
import { TextArea, Flex, Button } from 'ui-lab-components';

export const metadata = {
  title: 'Profile Bio',
  description: 'Fixed-height settings textarea with a 160-character cap and save/clear actions.'
};

export default function Example() {
  const [bio, setBio] = useState("UI designer & developer building minimal tools.");

  return (
    <Flex direction="column" gap="sm" style={{ width: 380 }}>
      <TextArea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        showCharacterCount
        maxCharacters={160}
        rows={3}
        resizable={false}
      />
      <Flex justify="end" gap="sm">
        <Button size="sm" variant="ghost" onClick={() => setBio("")}>Clear</Button>
        <Button size="sm" variant="primary">Save</Button>
      </Flex>
    </Flex>
  );
}
