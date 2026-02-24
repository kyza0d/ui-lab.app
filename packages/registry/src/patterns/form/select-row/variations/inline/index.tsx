'use client';
import { Select, Label } from 'ui-lab-components';

const timezones = [
  { id: 'utc', label: 'UTC' },
  { id: 'et', label: 'Eastern Time' },
  { id: 'pt', label: 'Pacific Time' },
];

function SelectRowInline({ id, label, defaultValue }: { id: string; label: string; defaultValue?: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2 border-b border-background-800">
      <Label htmlFor={id} className="text-sm text-foreground-200">{label}</Label>
      <Select defaultSelectedKey={defaultValue}>
        <Select.Trigger><Select.Value /></Select.Trigger>
        <Select.Content>
          {timezones.map((tz) => <Select.Item key={tz.id} value={tz.id}>{tz.label}</Select.Item>)}
        </Select.Content>
      </Select>
    </div>
  );
}

export function SelectRowInlineDemo() {
  return (
    <div className="p-6 flex flex-col max-w-md w-full">
      <SelectRowInline id="tz" label="Timezone" defaultValue="et" />
      <SelectRowInline id="tz2" label="Secondary timezone" defaultValue="utc" />
    </div>
  );
}
