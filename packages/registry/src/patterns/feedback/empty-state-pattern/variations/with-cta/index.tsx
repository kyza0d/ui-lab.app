'use client';
import { Button } from 'ui-lab-components';

export function EmptyStateWithCTADemo() {
  return (
    <div className="w-full max-w-sm">
      <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-background-800 text-foreground-400">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
        </div>
        <div className="max-w-xs space-y-1">
          <p className="text-sm font-medium text-foreground-200">No projects yet</p>
          <p className="text-sm text-foreground-400">Create your first project to get started with your team.</p>
        </div>
        <Button size="sm">Create project</Button>
      </div>
    </div>
  );
}
