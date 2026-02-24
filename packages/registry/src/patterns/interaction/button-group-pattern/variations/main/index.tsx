'use client';
import { Button, Group } from 'ui-lab-components';

export function ButtonGroupPatternDemo() {
  return (
    <div className="p-6">
      <Group spacing="none">
        <Button variant="secondary" size="sm">Bold</Button>
        <Button variant="secondary" size="sm">Italic</Button>
        <Button variant="secondary" size="sm">Underline</Button>
      </Group>
    </div>
  );
}
