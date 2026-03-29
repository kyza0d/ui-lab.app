import React from 'react';
import { Tabs } from 'ui-lab-components';

export const metadata = {
  title: 'Basic Tabs',
  description: 'A simple tabbed interface with content switching. Use this to organize related content into separate views.'
};

export default function Example() {
  return (
    <Tabs default="overview">
      <Tabs.List aria-label="Content sections">
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="details">Details</Tabs.Trigger>
        <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="overview">
        <p>Overview content goes here.</p>
      </Tabs.Content>
      <Tabs.Content value="details">
        <p>Details content goes here.</p>
      </Tabs.Content>
      <Tabs.Content value="settings">
        <p>Settings content goes here.</p>
      </Tabs.Content>
    </Tabs>
  );
}
