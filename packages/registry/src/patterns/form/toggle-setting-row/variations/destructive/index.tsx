'use client';
import { Switch, Label } from 'ui-lab-components';

function ToggleSettingRowDestructive({ id, label, description, defaultSelected = false }: { id: string; label: string; description?: string; defaultSelected?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-background-800">
      <div className="flex-1 min-w-0">
        <Label htmlFor={id} className="text-sm font-medium text-foreground-100 cursor-pointer">{label}</Label>
        {description && <p className="text-xs text-foreground-400 mt-0.5">{description}</p>}
      </div>
      <Switch id={id} defaultSelected={defaultSelected} />
    </div>
  );
}

export function ToggleSettingRowDestructiveDemo() {
  return (
    <div className="p-6 flex flex-col max-w-md w-full">
      <ToggleSettingRowDestructive id="del-acct" label="Delete account data on cancellation" description="All data will be permanently removed within 30 days." />
      <ToggleSettingRowDestructive id="pub-data" label="Share usage data with third parties" description="Opt out to keep your data private." defaultSelected={true} />
    </div>
  );
}
