'use client';
import React from 'react';
import { Select, Label } from 'ui-lab-components';

const languages = [
  { id: 'en', label: 'English' },
  { id: 'fr', label: 'French' },
  { id: 'de', label: 'German' },
];

const GlobeIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

function SelectRowWithIcon({ id, label, description, icon, defaultValue }: {
  id: string; label: string; description?: string; icon: React.ReactNode; defaultValue?: string;
}) {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-background-800">
      <div className="w-8 h-8 flex items-center justify-center rounded-md bg-background-800 text-foreground-400 flex-shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <Label htmlFor={id} className="text-sm font-medium text-foreground-200">{label}</Label>
        {description && <p className="text-xs text-foreground-400 mt-0.5">{description}</p>}
      </div>
      <Select defaultSelectedKey={defaultValue}>
        <Select.Trigger><Select.Value /></Select.Trigger>
        <Select.Content>
          {languages.map((lang) => <Select.Item key={lang.id} value={lang.id}>{lang.label}</Select.Item>)}
        </Select.Content>
      </Select>
    </div>
  );
}

export function SelectRowWithIconDemo() {
  return (
    <div className="p-6 flex flex-col max-w-md w-full">
      <SelectRowWithIcon id="lang" label="Language" description="Sets the display language." icon={<GlobeIcon />} defaultValue="en" />
      <SelectRowWithIcon id="lang2" label="Secondary language" icon={<GlobeIcon />} defaultValue="fr" />
    </div>
  );
}
