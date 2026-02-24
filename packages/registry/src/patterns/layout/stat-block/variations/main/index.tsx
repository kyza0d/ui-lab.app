'use client';

function StatBlock({ value, label, trend }: { value: string; label: string; trend?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-3xl font-bold text-foreground-100 tabular-nums">{value}</p>
      <p className="text-sm text-foreground-400">{label}</p>
      {trend && <p className="text-xs text-accent-400">{trend}</p>}
    </div>
  );
}

export function StatBlockDemo() {
  return (
    <div className="p-6 flex gap-8 flex-wrap w-full">
      <StatBlock value="12,430" label="Total users" trend="+8.2% this month" />
      <StatBlock value="$4,821" label="Monthly revenue" trend="+12.4% vs last month" />
      <StatBlock value="98.6%" label="Uptime" />
    </div>
  );
}
