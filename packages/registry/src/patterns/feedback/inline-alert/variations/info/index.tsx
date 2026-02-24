'use client';

export function InlineAlertInfoDemo() {
  return (
    <div className="p-6 max-w-md w-full">
      <div className="flex gap-3 px-4 py-3 rounded-lg border bg-background-800 border-background-600" role="status">
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="flex-shrink-0 mt-0.5 text-accent-400">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <p className="text-sm font-medium text-foreground-100">New version available</p>
          <p className="text-sm text-foreground-300 mt-0.5">Refresh the page to get the latest updates and improvements.</p>
        </div>
      </div>
    </div>
  );
}
