'use client';
import { useState } from 'react';
import { Badge, Checkbox } from 'ui-lab-components';

const statusVariant = { active: 'success', pending: 'warning', failed: 'danger', inactive: 'default' } as const;

const ROWS = [
  { primary: 'api-deploy-prod', secondary: 'github-actions · main', status: 'active' as const, timestamp: '2m ago' },
  { primary: 'run-integration-tests', secondary: 'github-actions · staging', status: 'pending' as const, timestamp: '14m ago' },
  { primary: 'seed-db-migration', secondary: 'cli · development', status: 'failed' as const, timestamp: '1h ago' },
];

function DataTableRowSelectable({ primary, secondary, status, timestamp, isSelected, onChange }: {
  primary: string; secondary: string; status: keyof typeof statusVariant; timestamp: string;
  isSelected: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className={`flex items-center gap-4 px-4 py-3 border-b border-background-800 transition-colors ${isSelected ? 'bg-background-900' : 'hover:bg-background-900'}`}>
      <Checkbox checked={isSelected} onChange={onChange} aria-label={`Select ${primary}`} />
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

export function DataTableRowSelectableDemo() {
  const [selected, setSelected] = useState<Set<string>>(new Set(['api-deploy-prod']));
  const toggle = (key: string) => setSelected(prev => {
    const next = new Set(prev);
    next.has(key) ? next.delete(key) : next.add(key);
    return next;
  });
  return (
    <div className="w-full max-w-lg">
      {ROWS.map((row) => (
        <DataTableRowSelectable
          key={row.primary}
          {...row}
          isSelected={selected.has(row.primary)}
          onChange={() => toggle(row.primary)}
        />
      ))}
    </div>
  );
}
