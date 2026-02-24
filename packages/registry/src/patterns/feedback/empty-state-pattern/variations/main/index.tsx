'use client';
import { Button } from 'ui-lab-components';
import React from 'react';

const FolderIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
  </svg>
);

function EmptyState({ icon, title, description, actionLabel, onAction }: {
  icon?: React.ReactNode; title: string; description?: string; actionLabel?: string; onAction?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
      {icon && (
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-background-800 text-foreground-400">{icon}</div>
      )}
      <div className="max-w-xs space-y-1">
        <p className="text-sm font-medium text-foreground-200">{title}</p>
        {description && <p className="text-sm text-foreground-400">{description}</p>}
      </div>
      {actionLabel && <Button size="sm" onPress={onAction}>{actionLabel}</Button>}
    </div>
  );
}

export function EmptyStateDemo() {
  return (
    <div className="w-full max-w-sm">
      <EmptyState
        icon={<FolderIcon />}
        title="No projects yet"
        description="Create your first project to get started with your team."
        actionLabel="Create project"
        onAction={() => {}}
      />
    </div>
  );
}
