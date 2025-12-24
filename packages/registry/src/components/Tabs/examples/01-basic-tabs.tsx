import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from 'ui-lab-components';

export const metadata = {
  title: 'Basic Tabs',
  description: 'A simple tabbed interface with content switching. Use this to organize related content into separate views.'
};

export default function Example() {
  return (
    <Tabs defaultValue="overview">
      <TabsList aria-label="Content sections">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <p>Overview content goes here.</p>
      </TabsContent>
      <TabsContent value="details">
        <p>Details content goes here.</p>
      </TabsContent>
      <TabsContent value="settings">
        <p>Settings content goes here.</p>
      </TabsContent>
    </Tabs>
  );
}
