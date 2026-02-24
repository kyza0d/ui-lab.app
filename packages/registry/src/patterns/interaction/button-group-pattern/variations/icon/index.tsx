'use client';
import { Button, Group } from 'ui-lab-components';

export function ButtonGroupIconDemo() {
  return (
    <div className="p-6">
      <Group spacing="none">
        <Button variant="ghost" size="sm" aria-label="Align left">
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h10M4 18h16" />
          </svg>
        </Button>
        <Button variant="ghost" size="sm" aria-label="Align center">
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M7 12h10M4 18h16" />
          </svg>
        </Button>
        <Button variant="ghost" size="sm" aria-label="Align right">
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M10 12h10M4 18h16" />
          </svg>
        </Button>
      </Group>
    </div>
  );
}
