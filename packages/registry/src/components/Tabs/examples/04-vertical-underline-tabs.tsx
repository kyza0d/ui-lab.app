"use client";

import { useState } from 'react';
import { Tabs } from 'ui-lab-components';

export const metadata = {
  title: 'Vertical Underline',
  description: 'Vertical tabs with underline variant indicator.'
};

export default function Example() {
  const [selected, setSelected] = useState("tab1");

  return (
    <Tabs value={selected} onValueChange={setSelected} variant="underline" orientation="vertical" className="flex w-fit gap-4">
      <Tabs.List aria-label="Tab options" className="flex flex-col w-fit">
        <Tabs.Trigger value="tab1">Profile</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Billing</Tabs.Trigger>
        <Tabs.Trigger value="tab3">Team</Tabs.Trigger>
      </Tabs.List>
    </Tabs>
  );
}
