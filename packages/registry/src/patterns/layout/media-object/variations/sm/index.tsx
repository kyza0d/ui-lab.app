'use client';
import React from 'react';

const Icon = () => (
  <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

function MediaObjectSm({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 flex items-center justify-center rounded-md bg-background-800 text-foreground-300 flex-shrink-0">{icon}</div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-foreground-200 truncate">{title}</p>
        <p className="text-xs text-foreground-400 truncate">{description}</p>
      </div>
    </div>
  );
}

export function MediaObjectSmDemo() {
  return (
    <div className="p-6 flex flex-col gap-3 max-w-sm w-full">
      <MediaObjectSm icon={<Icon />} title="Push Notifications" description="Stay updated on new activity." />
      <MediaObjectSm icon={<Icon />} title="Security Alerts" description="Get notified of unusual activity." />
      <MediaObjectSm icon={<Icon />} title="Analytics Reports" description="Receive weekly summaries." />
    </div>
  );
}
