'use client';
import { Badge } from 'ui-lab-components';

function SplitRow({ title, description, timestamp, status }: { title: string; description: string; timestamp: string; status: string }) {
  const variant = status === 'active' ? 'success' : status === 'pending' ? 'warning' : 'default';
  return (
    <div className="flex items-center gap-4 py-3 border-b border-background-800 hover:bg-background-900 transition-colors px-2 -mx-2 rounded">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground-200 truncate">{title}</p>
        <p className="text-xs text-foreground-400 truncate">{description}</p>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <span className="text-xs text-foreground-400">{timestamp}</span>
        <Badge size="sm" variant={variant as 'success' | 'warning' | 'default'}>{status}</Badge>
      </div>
    </div>
  );
}

export function SplitRowDemo() {
  return (
    <div className="p-6 flex flex-col max-w-lg w-full">
      <SplitRow title="Deploy production build" description="github-actions · main" timestamp="2m ago" status="active" />
      <SplitRow title="Run integration tests" description="github-actions · staging" timestamp="14m ago" status="pending" />
      <SplitRow title="Seed database migration" description="cli · development" timestamp="1h ago" status="inactive" />
    </div>
  );
}
