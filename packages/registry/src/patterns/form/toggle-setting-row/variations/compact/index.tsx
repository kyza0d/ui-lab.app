'use client';
import { Switch, Label } from 'ui-lab-components';

function ToggleSettingRowCompact({ id, label, defaultSelected = false }: { id: string; label: string; defaultSelected?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2 border-b border-background-800">
      <Label htmlFor={id} className="text-sm text-foreground-200 cursor-pointer">{label}</Label>
      <Switch id={id} defaultSelected={defaultSelected} />
    </div>
  );
}

export function ToggleSettingRowCompactDemo() {
  return (
    <div className="p-6 flex flex-col max-w-md w-full">
      <ToggleSettingRowCompact id="c-notifs" label="Email notifications" defaultSelected={true} />
      <ToggleSettingRowCompact id="c-sms" label="SMS alerts" />
      <ToggleSettingRowCompact id="c-2fa" label="Two-factor authentication" defaultSelected={true} />
      <ToggleSettingRowCompact id="c-api" label="API access" />
    </div>
  );
}
