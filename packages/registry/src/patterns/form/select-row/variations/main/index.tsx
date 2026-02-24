'use client';
import { Select, Label } from 'ui-lab-components';

const options = [
  { id: 'system', label: 'System' },
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
];

function SelectRow({ id, label, description, defaultValue }: { id: string; label: string; description?: string; defaultValue?: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-background-800">
      <div className="flex-1 min-w-0">
        <Label htmlFor={id} className="text-sm font-medium text-foreground-200">{label}</Label>
        {description && <p className="text-xs text-foreground-400 mt-0.5">{description}</p>}
      </div>
      <Select defaultSelectedKey={defaultValue}>
        <Select.Trigger><Select.Value /></Select.Trigger>
        <Select.Content>
          {options.map((opt) => <Select.Item key={opt.id} value={opt.id}>{opt.label}</Select.Item>)}
        </Select.Content>
      </Select>
    </div>
  );
}

export function SelectRowDemo() {
  return (
    <div className="p-6 flex flex-col max-w-md w-full">
      <SelectRow id="theme" label="Appearance" description="Choose your preferred color scheme." defaultValue="system" />
      <SelectRow id="density" label="Density" description="Controls the spacing of the UI." defaultValue="light" />
    </div>
  );
}
