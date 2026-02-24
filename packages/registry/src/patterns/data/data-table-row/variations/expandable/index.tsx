'use client';
import { useState } from 'react';
import { Badge, Button } from 'ui-lab-components';

const statusVariant = { active: 'success', pending: 'warning', failed: 'danger', inactive: 'default' } as const;

function DataTableRowExpandable({ primary, secondary, status, timestamp, details }: {
  primary: string; secondary: string; status: keyof typeof statusVariant; timestamp: string; details: string;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="border-b border-background-800">
      <div className="flex items-center gap-4 px-4 py-3 hover:bg-background-900 transition-colors">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground-200 truncate">{primary}</p>
          <p className="text-xs text-foreground-400 truncate">{secondary}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs text-foreground-400">{timestamp}</span>
          <Badge size="sm" variant={statusVariant[status] ?? 'default'}>{status}</Badge>
          <Button variant="ghost" size="sm" onPress={() => setExpanded(!expanded)} aria-label="Toggle details">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" className={`transition-transform ${expanded ? 'rotate-180' : ''}`}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Button>
        </div>
      </div>
      {expanded && <div className="px-4 pb-3 text-xs text-foreground-400">{details}</div>}
    </div>
  );
}

export function DataTableRowExpandableDemo() {
  return (
    <div className="w-full max-w-lg">
      <DataTableRowExpandable primary="api-deploy-prod" secondary="github-actions · main" status="active" timestamp="2m ago" details="Deployed to us-east-1. 3 instances updated. Build time: 42s." />
      <DataTableRowExpandable primary="run-integration-tests" secondary="github-actions · staging" status="pending" timestamp="14m ago" details="Waiting for runner. Queue position: 3." />
    </div>
  );
}
