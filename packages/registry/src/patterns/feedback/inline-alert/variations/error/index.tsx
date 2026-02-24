'use client';

export function InlineAlertErrorDemo() {
  return (
    <div className="p-6 max-w-md w-full">
      <div className="flex gap-3 px-4 py-3 rounded-lg border bg-background-900 border-background-700" role="alert" aria-live="assertive">
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="flex-shrink-0 mt-0.5 text-foreground-200">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <p className="text-sm font-semibold text-foreground-100">Payment failed</p>
          <p className="text-sm text-foreground-300 mt-0.5">Your card was declined. Please update your billing details.</p>
        </div>
      </div>
    </div>
  );
}
