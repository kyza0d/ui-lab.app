'use client';
import { Progress } from 'ui-lab-components';

function ProgressMetricStacked({ label, value, max = 100 }: { label: string; value: number; max?: number }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-foreground-300">{label}</span>
        <span className="text-xs text-foreground-400 tabular-nums">{pct}%</span>
      </div>
      <Progress value={value} max={max} />
    </div>
  );
}

export function ProgressMetricStackedDemo() {
  return (
    <div className="p-6 flex flex-col gap-5 max-w-md w-full">
      <ProgressMetricStacked label="Storage used" value={68} />
      <ProgressMetricStacked label="API calls" value={34} max={1000} />
      <ProgressMetricStacked label="Team seats" value={7} max={10} />
    </div>
  );
}
