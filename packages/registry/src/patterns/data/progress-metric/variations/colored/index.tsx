'use client';
import { Progress } from 'ui-lab-components';

function ProgressMetricColored({ label, value, max = 100 }: { label: string; value: number; max?: number }) {
  const pct = Math.round((value / max) * 100);
  const isHigh = pct >= 80;
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-foreground-300">{label}</span>
        <span className={`text-xs tabular-nums ${isHigh ? 'text-foreground-200' : 'text-foreground-400'}`}>{pct}%</span>
      </div>
      <Progress value={value} max={max} className={isHigh ? 'text-foreground-300' : undefined} />
    </div>
  );
}

export function ProgressMetricColoredDemo() {
  return (
    <div className="p-6 flex flex-col gap-5 max-w-md w-full">
      <ProgressMetricColored label="Storage used" value={86} />
      <ProgressMetricColored label="API calls" value={340} max={1000} />
      <ProgressMetricColored label="Team seats" value={9} max={10} />
    </div>
  );
}
