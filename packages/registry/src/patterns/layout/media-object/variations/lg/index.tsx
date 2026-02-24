'use client';
import React from 'react';

const Icon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

function MediaObjectLg({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-background-800 text-foreground-300 flex-shrink-0">{icon}</div>
      <div className="min-w-0 pt-1">
        <p className="text-base font-semibold text-foreground-100">{title}</p>
        <p className="text-sm text-foreground-400 mt-1">{description}</p>
      </div>
    </div>
  );
}

export function MediaObjectLgDemo() {
  return (
    <div className="p-6 flex flex-col gap-6 max-w-sm w-full">
      <MediaObjectLg icon={<Icon />} title="Push Notifications" description="Stay updated on new activity in your account." />
      <MediaObjectLg icon={<Icon />} title="Security Alerts" description="Get notified when unusual activity is detected." />
    </div>
  );
}
