'use client';
import { Button, Group } from 'ui-lab-components';

function SplitRowActions({ title, description, onEdit, onDelete }: { title: string; description: string; onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-background-800 group">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground-200 truncate">{title}</p>
        <p className="text-xs text-foreground-400 truncate">{description}</p>
      </div>
      <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="sm" onPress={onEdit}>Edit</Button>
        <Button variant="ghost" size="sm" onPress={onDelete}>Delete</Button>
      </div>
    </div>
  );
}

export function SplitRowActionsDemo() {
  return (
    <div className="p-6 flex flex-col max-w-lg w-full">
      <SplitRowActions title="API Key — Production" description="Last used 2 hours ago" onEdit={() => {}} onDelete={() => {}} />
      <SplitRowActions title="API Key — Staging" description="Last used 3 days ago" onEdit={() => {}} onDelete={() => {}} />
      <SplitRowActions title="API Key — Development" description="Last used 1 week ago" onEdit={() => {}} onDelete={() => {}} />
    </div>
  );
}
