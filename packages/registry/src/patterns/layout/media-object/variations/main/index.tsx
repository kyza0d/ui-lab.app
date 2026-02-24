'use client';
import React from 'react';

const Icon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

function MediaObject({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-background-800 text-foreground-300 flex-shrink-0">{icon}</div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground-200">{title}</p>
        <p className="text-sm text-foreground-400">{description}</p>
      </div>
    </div>
  );
}

export function MediaObjectDemo() {
  return (
    <div className="p-6 flex flex-col gap-4 max-w-sm w-full">
      <MediaObject icon={<Icon />} title="Push Notifications" description="Stay updated on new activity in your account." />
      <MediaObject icon={<Icon />} title="Security Alerts" description="Get notified when unusual activity is detected." />
      <MediaObject icon={<Icon />} title="Analytics Reports" description="Receive weekly performance summaries." />
    </div>
  );
}
