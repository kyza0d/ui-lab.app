'use client';
import { Button } from 'ui-lab-components';

function TabContentHeader({ title, description, actionLabel, onAction }: { title: string; description?: string; actionLabel?: string; onAction?: () => void }) {
  return (
    <div className="flex items-start justify-between gap-4 pb-4 border-b border-background-800">
      <div>
        <h3 className="text-sm font-semibold text-foreground-100">{title}</h3>
        {description && <p className="text-sm text-foreground-400 mt-0.5">{description}</p>}
      </div>
      {actionLabel && (
        <Button size="sm" variant="secondary" onPress={onAction}>{actionLabel}</Button>
      )}
    </div>
  );
}

export function TabContentHeaderDemo() {
  return (
    <div className="p-6 flex flex-col gap-8 max-w-md w-full">
      <TabContentHeader title="API Keys" description="Manage your API keys for external integrations." actionLabel="Add key" onAction={() => {}} />
      <TabContentHeader title="Team members" description="Invite and manage access for your team." actionLabel="Invite" onAction={() => {}} />
    </div>
  );
}
