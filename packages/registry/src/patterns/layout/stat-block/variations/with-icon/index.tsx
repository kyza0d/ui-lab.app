'use client';
import React from 'react';

const UsersIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

function StatBlockWithIcon({ icon, value, label, trend }: { icon: React.ReactNode; value: string; label: string; trend?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-background-800 text-foreground-300">{icon}</div>
      <div className="flex flex-col gap-0.5">
        <p className="text-2xl font-bold text-foreground-100 tabular-nums">{value}</p>
        <p className="text-sm text-foreground-400">{label}</p>
        {trend && <p className="text-xs text-accent-400">{trend}</p>}
      </div>
    </div>
  );
}

export function StatBlockWithIconDemo() {
  return (
    <div className="p-6 flex gap-8 flex-wrap w-full">
      <StatBlockWithIcon icon={<UsersIcon />} value="12,430" label="Total users" trend="+8.2% this month" />
      <StatBlockWithIcon icon={<UsersIcon />} value="$4,821" label="Monthly revenue" trend="+12.4% vs last month" />
      <StatBlockWithIcon icon={<UsersIcon />} value="98.6%" label="Uptime" />
    </div>
  );
}
