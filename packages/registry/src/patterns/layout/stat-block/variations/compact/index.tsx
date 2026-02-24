'use client';

function StatBlockCompact({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-xl font-bold text-foreground-100 tabular-nums">{value}</span>
      <span className="text-xs text-foreground-400">{label}</span>
    </div>
  );
}

export function StatBlockCompactDemo() {
  return (
    <div className="p-6 flex gap-6 flex-wrap w-full">
      <StatBlockCompact value="12,430" label="users" />
      <StatBlockCompact value="$4,821" label="revenue" />
      <StatBlockCompact value="98.6%" label="uptime" />
      <StatBlockCompact value="143ms" label="avg latency" />
    </div>
  );
}
