'use client';
import { Button, Group } from 'ui-lab-components';

function IconActionBarWithMore({ onEdit, onCopy, onMore }: { onEdit: () => void; onCopy: () => void; onMore: () => void }) {
  return (
    <Group spacing="sm">
      <Button variant="ghost" size="sm" onPress={onEdit} aria-label="Edit">
        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </Button>
      <Button variant="ghost" size="sm" onPress={onCopy} aria-label="Duplicate">
        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </Button>
      <Button variant="ghost" size="sm" onPress={onMore} aria-label="More actions">
        <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
        </svg>
      </Button>
    </Group>
  );
}

export function IconActionBarWithMoreDemo() {
  return (
    <div className="p-6 flex flex-col gap-3 max-w-md w-full">
      {['API Key — Production', 'API Key — Staging'].map((label) => (
        <div key={label} className="flex items-center justify-between py-2 border-b border-background-800">
          <span className="text-sm text-foreground-200">{label}</span>
          <IconActionBarWithMore onEdit={() => {}} onCopy={() => {}} onMore={() => {}} />
        </div>
      ))}
    </div>
  );
}
