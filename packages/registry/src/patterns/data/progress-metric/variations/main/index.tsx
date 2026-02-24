'use client';
import { Progress } from 'ui-lab-components';

function ProgressMetric({ label, value, max = 100 }: { label: string; value: number; max?: number }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-foreground-400 w-32 flex-shrink-0 truncate">{label}</span>
      <Progress value={value} max={max} className="flex-1" />
      <span className="text-xs text-foreground-400 w-8 text-right flex-shrink-0 tabular-nums">{pct}%</span>
    </div>
  );
}

export function ProgressMetricDemo() {
  return (
    <div className="p-6 flex flex-col gap-4 max-w-md w-full">
      <ProgressMetric label="TypeScript" value={87} />
      <ProgressMetric label="React" value={92} />
      <ProgressMetric label="Node.js" value={74} />
      <ProgressMetric label="Rust" value={41} />
    </div>
  );
}
