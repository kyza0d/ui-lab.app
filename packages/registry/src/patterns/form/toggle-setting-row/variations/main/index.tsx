'use client';
import { Switch, Label } from 'ui-lab-components';

function ToggleSettingRow({ id, label, description, defaultSelected = false }: { id: string; label: string; description?: string; defaultSelected?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-background-800">
      <div className="flex-1 min-w-0">
        <Label htmlFor={id} className="text-sm font-medium text-foreground-200 cursor-pointer">{label}</Label>
        {description && <p className="text-xs text-foreground-400 mt-0.5">{description}</p>}
      </div>
      <Switch id={id} defaultSelected={defaultSelected} />
    </div>
  );
}

export function ToggleSettingRowDemo() {
  return (
    <div className="p-6 flex flex-col max-w-md w-full">
      <ToggleSettingRow id="notifs" label="Email notifications" description="Receive updates about your account activity." defaultSelected={true} />
      <ToggleSettingRow id="mktg" label="Marketing emails" description="Product news and feature announcements." />
      <ToggleSettingRow id="2fa" label="Two-factor authentication" description="Add an extra layer of security to your account." defaultSelected={true} />
    </div>
  );
}
