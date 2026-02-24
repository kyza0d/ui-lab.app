'use client';

export function EmptyStateMinimalDemo() {
  return (
    <div className="w-full max-w-sm">
      <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-background-800 text-foreground-500">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-sm text-foreground-400 max-w-xs">No activity to show yet.</p>
      </div>
    </div>
  );
}
