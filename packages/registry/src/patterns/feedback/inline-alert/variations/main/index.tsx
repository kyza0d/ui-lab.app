'use client';
import React from 'react';

const icons = {
  info: (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  warning: (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  error: (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const styles = {
  info: 'bg-background-800 border-background-600',
  warning: 'bg-background-800 border-background-600',
  error: 'bg-background-800 border-background-700',
};

const iconColor = { info: 'text-accent-400', warning: 'text-foreground-300', error: 'text-foreground-200' };

function InlineAlert({ title, message, variant = 'info' }: { title: string; message?: string; variant?: 'info' | 'warning' | 'error' }) {
  return (
    <div className={`flex gap-3 px-4 py-3 rounded-lg border ${styles[variant]}`} role="alert">
      <span className={`flex-shrink-0 mt-0.5 ${iconColor[variant]}`}>{icons[variant]}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground-100">{title}</p>
        {message && <p className="text-sm text-foreground-300 mt-0.5">{message}</p>}
      </div>
    </div>
  );
}

export function InlineAlertDemo() {
  return (
    <div className="p-6 flex flex-col gap-3 max-w-md w-full">
      <InlineAlert variant="info" title="New version available" message="Refresh the page to get the latest updates." />
      <InlineAlert variant="warning" title="Trial ending soon" message="Your trial expires in 3 days. Upgrade to keep access." />
      <InlineAlert variant="error" title="Payment failed" message="Your card was declined. Update your billing details." />
    </div>
  );
}
