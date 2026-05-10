"use client";

import { useState } from 'react';
import { Tabs } from 'ui-lab-components';

export const metadata = {
  title: 'Underline Variant',
  description: 'Horizontal tabs with underline indicator. Great for documentation sites.'
};

export default function Example() {
  const [selected, setSelected] = useState("tab1");

  return (
    <Tabs value={selected} onValueChange={setSelected} variant="underline" className="w-fit">
      <Tabs.List aria-label="Tab options">
        <Tabs.Trigger value="tab1">Install</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Usage</Tabs.Trigger>
        <Tabs.Trigger value="tab3">API</Tabs.Trigger>
      </Tabs.List>
    </Tabs>
  );
}
