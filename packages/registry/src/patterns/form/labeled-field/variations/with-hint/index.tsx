'use client';
import { Label, Input } from 'ui-lab-components';

function LabeledFieldWithHint({ id, label, placeholder }: { id: string; label: string; placeholder?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} placeholder={placeholder} />
      <p className="text-xs text-foreground-400">Shown publicly on your profile.</p>
    </div>
  );
}

export function LabeledFieldWithHintDemo() {
  return (
    <div className="p-6 flex flex-col gap-5 max-w-sm w-full">
      <LabeledFieldWithHint id="display-name" label="Display name" placeholder="Jane Smith" />
      <LabeledFieldWithHint id="website" label="Website" placeholder="https://example.com" />
    </div>
  );
}
