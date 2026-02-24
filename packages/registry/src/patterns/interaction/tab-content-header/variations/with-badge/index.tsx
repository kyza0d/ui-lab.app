'use client';
import { Button, Badge } from 'ui-lab-components';

function TabContentHeaderWithBadge({ title, count, actionLabel, onAction }: { title: string; count: number; actionLabel?: string; onAction?: () => void }) {
  return (
    <div className="flex items-center justify-between gap-4 pb-4 border-b border-background-800">
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-semibold text-foreground-100">{title}</h3>
        <Badge size="sm">{count}</Badge>
      </div>
      {actionLabel && (
        <Button size="sm" variant="secondary" onPress={onAction}>{actionLabel}</Button>
      )}
    </div>
  );
}

export function TabContentHeaderWithBadgeDemo() {
  return (
    <div className="p-6 flex flex-col gap-8 max-w-md w-full">
      <TabContentHeaderWithBadge title="API Keys" count={4} actionLabel="Add key" onAction={() => {}} />
      <TabContentHeaderWithBadge title="Team members" count={12} actionLabel="Invite" onAction={() => {}} />
    </div>
  );
}
