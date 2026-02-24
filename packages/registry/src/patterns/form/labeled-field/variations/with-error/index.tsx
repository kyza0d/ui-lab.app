'use client';
import { Label, Input } from 'ui-lab-components';

function LabeledFieldWithError({ id, label, placeholder, error }: { id: string; label: string; placeholder?: string; error?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-foreground-300 flex items-center gap-1">
          <span className="text-foreground-100">&#9679;</span> {error}
        </p>
      )}
    </div>
  );
}

export function LabeledFieldWithErrorDemo() {
  return (
    <div className="p-6 flex flex-col gap-5 max-w-sm w-full">
      <LabeledFieldWithError id="email-err" label="Email address" placeholder="jane@example.com" error="Please enter a valid email address." />
      <LabeledFieldWithError id="username-err" label="Username" placeholder="janesmith" error="Username is already taken." />
    </div>
  );
}
