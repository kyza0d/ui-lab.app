'use client';
import { Button, Group, Divider } from 'ui-lab-components';

export function ButtonGroupHorizontalDemo() {
  return (
    <div className="p-6">
      <Group spacing="sm">
        <Button variant="secondary" size="sm">Save</Button>
        <Button variant="secondary" size="sm">Duplicate</Button>
        <Divider orientation="vertical" />
        <Button variant="secondary" size="sm">Delete</Button>
      </Group>
    </div>
  );
}
