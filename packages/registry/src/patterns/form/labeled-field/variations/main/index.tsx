'use client';
import { Label, Input } from 'ui-lab-components';

function LabeledField({ id, label, placeholder, hint }: { id: string; label: string; placeholder?: string; hint?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} placeholder={placeholder} />
      {hint && <p className="text-xs text-foreground-400">{hint}</p>}
    </div>
  );
}

export function LabeledFieldDemo() {
  return (
    <div className="p-6 flex flex-col gap-5 max-w-sm w-full">
      <LabeledField id="name" label="Full name" placeholder="Jane Smith" />
      <LabeledField id="email" label="Email address" placeholder="jane@example.com" />
      <LabeledField id="username" label="Username" placeholder="janesmith" hint="Only letters, numbers, and underscores." />
    </div>
  );
}
