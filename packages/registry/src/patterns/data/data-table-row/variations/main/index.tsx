'use client';
import { Badge } from 'ui-lab-components';

const statusVariant = { active: 'success', pending: 'warning', failed: 'danger', inactive: 'default' } as const;

function DataTableRow({ primary, secondary, status, timestamp }: { primary: string; secondary: string; status: keyof typeof statusVariant; timestamp: string }) {
  return (
    <div className="flex items-center gap-4 px-4 py-3 border-b border-background-800 hover:bg-background-900 transition-colors">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground-200 truncate">{primary}</p>
        <p className="text-xs text-foreground-400 truncate">{secondary}</p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-xs text-foreground-400">{timestamp}</span>
        <Badge size="sm" variant={statusVariant[status] ?? 'default'}>{status}</Badge>
      </div>
    </div>
  );
}

export function DataTableRowDemo() {
  return (
    <div className="w-full max-w-lg">
      <DataTableRow primary="api-deploy-prod" secondary="github-actions · main" status="active" timestamp="2m ago" />
      <DataTableRow primary="run-integration-tests" secondary="github-actions · staging" status="pending" timestamp="14m ago" />
      <DataTableRow primary="seed-db-migration" secondary="cli · development" status="failed" timestamp="1h ago" />
      <DataTableRow primary="build-docker-image" secondary="docker · registry" status="inactive" timestamp="3h ago" />
    </div>
  );
}
